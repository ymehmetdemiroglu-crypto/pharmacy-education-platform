# Security Guidelines & Cloud Protection Model

## 1. Zero-Trust Cloud Architecture
The platform enforces a strict zero-trust model across client and server boundaries. The client application runs in an untrusted browser environment. Therefore, no business-critical logic, payment verification, entitlement elevation, or paid content delivery relies on client assertions.

---

## 2. Cloud Firestore Data & Rules Model

### 2.1 Collection Topology
```text
/users/{uid}
  ├── profile, locale, createdAt
  ├── progress/{courseId}          # User's completion state, scores, review queue
  └── entitlements/{courseId}      # SERVER-ONLY write: active/expired course passes

/courseCatalog/{courseId}          # Public read: metadata, curriculum, lesson titles
/courses/{courseId}/lessons/{id}   # GATED read: full step content (free vs paid)
/payments/{eventId}                # SERVER-ONLY: idempotency journal for webhooks
```

### 2.2 Security Rules Implementation (`firestore.rules`)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    function hasActiveEntitlement(courseId) {
      let entDoc = get(/databases/$(database)/documents/users/$(request.auth.uid)/entitlements/$(courseId));
      return entDoc != null && 
             entDoc.data.status == "active" && 
             entDoc.data.expiresAt > request.time;
    }

    // Default deny
    match /{document=**} {
      allow read, write: if false;
    }

    // Course Catalog (Publicly discoverable curriculum metadata)
    match /courseCatalog/{courseId} {
      allow read: if true;
      allow write: if false;
    }

    // Course Lessons (Free vs Paid Gate)
    match /courses/{courseId}/lessons/{lessonId} {
      allow read: if (resource.data.access == "free" && isAuthenticated()) ||
                     hasActiveEntitlement(courseId);
      allow write: if false; // Only Admin SDK seeds lesson content
    }

    // User Profile
    match /users/{userId} {
      allow read: if isOwner(userId);
      allow create: if isOwner(userId) && request.resource.data.keys().hasOnly(['locale', 'createdAt', 'displayName']);
      allow update: if isOwner(userId) && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['locale', 'displayName']);
      allow delete: if false;

      // User Progress
      match /progress/{courseId} {
        allow read: if isOwner(userId);
        allow create, update: if isOwner(userId) &&
          request.resource.data.keys().hasOnly(['completedSteps', 'lessonScores', 'mastery', 'streak', 'lastPosition', 'reviewQueue', 'updatedAt']) &&
          request.resource.data.completedSteps is list &&
          request.resource.data.completedSteps.size() < 1000 &&
          request.resource.data.streak is int;
        allow delete: if false;
      }

      // Entitlements: Strictly SERVER-WRITE ONLY
      match /entitlements/{courseId} {
        allow read: if isOwner(userId);
        allow write: if false; // Deny all client writes!
      }
    }
  }
}
```

---

## 3. Secret Management & Credential Hygiene
- **Repository Cleanliness**: The repository must never contain service account JSON files, `.env` production files, or private certificates.
- **Application Default Credentials (ADC)**: Cloud Functions and Admin scripts run via Google IAM roles and ADC.
- **Client Configuration**: Firebase client configurations (`apiKey`, `projectId`, `authDomain`) are public project identifiers, NOT secrets. Real data protection is guaranteed by Firestore Security Rules.

---

## 4. Payment Webhook Security (Dodo Payments Plan)
- Webhooks must be verified using HMAC-SHA256 signature verification over the raw request payload before processing.
- Idempotency is enforced by journaling `eventId` in the `/payments/{eventId}` collection within a Firestore transaction.
- If an entitlement is refunded or disputed, the Cloud Function updates `/users/{uid}/entitlements/{courseId}` with `status = 'refunded'`, immediately revoking lesson access in Firestore rules.
