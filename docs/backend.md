# Backend Architecture & Cloud Infrastructure Specification

## 1. Executive Summary & Infrastructure Overview

The Pharmacy Education Platform relies on a cloud-native, serverless architecture hosted on **Google Cloud Platform (GCP)** and **Firebase**. The backend is designed for:
- **Zero-Trust Access Control**: Server-authoritative content gating where proprietary lesson steps are inaccessible without cryptographically verified entitlements.
- **Cost Minimization & Predictability**: Pay-per-use serverless execution within free-tier allowances during development, with automated budget alert limits.
- **Local-First Development**: 100% testable offline via the Firebase Local Emulator Suite (Auth, Firestore, Cloud Functions).
- **High-Fidelity Chemistry & Pharmacology Delivery**: Efficient caching of molecular structures, simulation configs, and user spaced-repetition queues.

---

## 2. System Architecture Diagram

```
+---------------------------------------------------------------------------------+
|                                CLIENT APPLICATION                               |
|                  (Vite + React 18 + Tailwind CSS Neo-Brutalist SPA)             |
+-------------------+-----------------------------+-------------------------------+
                    |                             |
      HTTPS / WSS   |                             | HTTPS Callable / REST
      (Live Queries)|                             |
                    v                             v
+-------------------+---------+     +-------------+-------------------------------+
|       CLOUD FIRESTORE       |     |          FIREBASE CLOUD FUNCTIONS           |
|                             |     |                                             |
|  - /courses/{courseId}      |     |  1. createCheckoutSession (Callable)       |
|  - /courses/.../lessons     |     |  2. handleDodoWebhook (HTTP Webhook)        |
|  - /courses/.../steps       |     |  3. syncSpacedRepetitionQueue (Callable)    |
|  - /users/{userId}          |     |  4. verifyContentAccess (Internal Helper)   |
|  - /users/.../entitlements  |     +-------------+-------------------------------+
|  - /users/.../progress      |                   |
|  - /users/.../spaced_review |                   | Webhook Verification / API
|  - /webhook_events (audit)  |                   v
+-------------------+---------+     +-------------+-------------------------------+
                    ^               |            PAYMENT GATEWAY                  |
                    |               |             (Dodo Payments)                 |
                    +---------------+---------------------------------------------+
               Entitlement Writes
              (Admin SDK Privileged)
```

---

## 3. Data Models & Cloud Firestore Schema

All collections adhere to strict naming conventions and schema validation contracts.

### 3.1 Course Catalog & Lesson Content Hierarchy

```
/courses/{courseId}
    ├── /modules/{moduleId}
    └── /lessons/{lessonId}
            └── /steps/{stepId}
```

#### Collection: `/courses/{courseId}`
- `courseId`: string (e.g., `"medchem"` or `"pharmacology"`)
- `title`: string (e.g., `"Medicinal Chemistry"`)
- `slug`: string (e.g., `"medicinal-chemistry"`)
- `description`: string
- `modulesCount`: number
- `totalLessons`: number
- `estimatedHours`: number
- `freePreviewLessonsCount`: number (default: `2`)
- `bannerAsset`: string (SVG/WebP URI)
- `published`: boolean
- `updatedAt`: timestamp

#### Collection: `/courses/{courseId}/modules/{moduleId}`
- `moduleId`: string (e.g., `"mc-mod-01"`)
- `title`: string (e.g., `"Physicochemical Properties & Solubility"`)
- `orderIndex`: number (1-based sequence)
- `summary`: string
- `learningObjectives`: string[]
- `prerequisites`: string[] (array of `moduleId` strings)

#### Collection: `/courses/{courseId}/lessons/{lessonId}`
- `lessonId`: string (e.g., `"mc-les-01"`)
- `moduleId`: string
- `orderIndex`: number
- `title`: string
- `summary`: string
- `isFreePreview`: boolean (`true` for the first 2 lessons of each course, `false` otherwise)
- `stepCount`: number (typically 8–15 steps)
- `estimatedMinutes`: number (typically 10–15 min)
- `sources`: array of `{ file: string, page: string | number }`
- `published`: boolean

#### Collection: `/courses/{courseId}/lessons/{lessonId}/steps/{stepId}`
*Critical: Protected by Firestore Security Rules. Unlocks only if `step.isFreePreview == true` OR `lesson.isFreePreview == true` OR user possesses an active entitlement.*
- `stepId`: string (e.g., `"step-01"`)
- `orderIndex`: number (1-indexed)
- `isFreePreview`: boolean (denormalized from lesson for O(1) security rule evaluation)
- `pedagogicalType`: string (`"predict_reveal"` | `"worked_example"` | `"faded_practice"` | `"independent_challenge"`)
- `interactionType`: string (`"multiple_choice"` | `"atom_select"` | `"pk_slider"` | `"curve_match"` | `"bioisostere_replace"`)
- `prompt`: string (concise instructional text, <40 words)
- `widgetConfig`: object (typed JSON configuration matching Zod widget schema)
- `correctAnswer`: any (validated against widget output)
- `misconceptionFeedback`: map of `{ [misconceptionKey: string]: string }`
- `hints`: string[] (3-tier ladder: 1. Nudge, 2. Structural/kinetic clue, 3. Solution step)
- `explanation`: string (revealed post-attempt)
- `sources`: array of `{ file: string, page: string | number }`

---

### 3.2 User State, Entitlements & Progress Hierarchy

```
/users/{userId}
    ├── /entitlements/{courseId}
    ├── /progress/{courseId}
    └── /spaced_repetition/{cardId}
```

#### Document: `/users/{userId}`
- `userId`: string (matches Firebase Auth UID)
- `email`: string
- `displayName`: string
- `preferredLanguage`: `"tr"` | `"en"`
- `country`: string (ISO-2 code, used for PPP determination)
- `createdAt`: timestamp
- `lastActiveAt`: timestamp

#### Collection: `/users/{userId}/entitlements/{courseId}`
*Strictly read-only for clients. Writes restricted exclusively to Cloud Functions via Firebase Admin SDK. Document ID is `courseId` (`"medchem"`, `"pharmacology"`, or `"dual_bundle"`) to enable O(1) direct exists() evaluation in security rules.*
- `courseId`: string (`"medchem"` | `"pharmacology"` | `"dual_bundle"`)
- `entitlementId`: string (unique audit ID, e.g., `"ent_mc_annual_2026"`)
- `planId`: string (`"monthly"` | `"semester"` | `"annual"` | `"lifetime"`)
- `status`: string (`"active"` | `"canceled"` | `"expired"` | `"past_due"`)
- `billingCycle`: string (`"monthly"` | `"semi-annual"` | `"annual"` | `"one-time"`)
- `currency`: string (`"USD"` | `"TRY"` | `"SAR"` | `"EUR"`)
- `amountPaid`: number
- `paymentGateway`: string (`"dodo_payments"`)
- `gatewaySubscriptionId`: string | null
- `gatewayOrderId`: string
- `startedAt`: timestamp
- `expiresAt`: timestamp (ISO timestamp marking end of granted period)
- `autoRenew`: boolean
- `revokedAt`: timestamp | null

#### Collection: `/users/{userId}/progress/{courseId}`
- `courseId`: string
- `completedLessonIds`: string[]
- `currentModuleId`: string
- `currentLessonId`: string
- `currentStepIndex`: number
- `streakDays`: number
- `lastStreakDate`: string (YYYY-MM-DD)
- `totalXP`: number
- `accuracyRate`: number (percentage of first-try correct steps)
- `updatedAt`: timestamp

#### Collection: `/users/{userId}/spaced_repetition/{cardId}`
*Implements Leitner 5-box spaced repetition algorithm.*
- `cardId`: string
- `courseId`: string
- `drugOrConcept`: string (e.g., `"Propranolol_Beta1_Selectivity"`)
- `box`: number (1 to 5)
- `intervalDays`: number (1, 3, 7, 14, 30)
- `lastReviewedAt`: timestamp
- `nextReviewDue`: timestamp
- `reviewCount`: number
- `lapseCount`: number
- `history`: array of `{ date: timestamp, correct: boolean, latencyMs: number }`

---

### 3.3 Financial & System Audit Collections

#### Collection: `/webhook_events/{eventId}`
*Stores incoming webhook events to enforce strict idempotency.*
- `eventId`: string (gateway event identifier)
- `gateway`: string (`"dodo_payments"`)
- `eventType`: string (`"payment.succeeded"`, `"subscription.renewed"`, etc.)
- `receivedAt`: timestamp
- `processedAt`: timestamp
- `status`: string (`"success"` | `"ignored"` | `"failed"`)
- `rawPayload`: map / object

#### Collection: `/orders/{orderId}`
*Immutable audit trail of customer purchases.*
- `orderId`: string
- `userId`: string
- `courseId`: string
- `planId`: string
- `gateway`: string
- `currency`: string
- `amount`: number
- `taxAmount`: number
- `status`: string (`"succeeded"` | `"refunded"` | `"disputed"`)
- `createdAt`: timestamp

---

## 4. Firestore Security Rules Specification (`firestore.rules`)

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

    // Server-authoritative entitlement check:
    // User has access if they hold an active entitlement for this specific course OR the dual bundle
    function hasCourseAccess(courseId) {
      return isAuthenticated() && (
        (
          exists(/databases/$(database)/documents/users/$(request.auth.uid)/entitlements/$(courseId)) &&
          get(/databases/$(database)/documents/users/$(request.auth.uid)/entitlements/$(courseId)).data.status == 'active' &&
          get(/databases/$(database)/documents/users/$(request.auth.uid)/entitlements/$(courseId)).data.expiresAt > request.time
        ) || (
          exists(/databases/$(database)/documents/users/$(request.auth.uid)/entitlements/dual_bundle) &&
          get(/databases/$(database)/documents/users/$(request.auth.uid)/entitlements/dual_bundle).data.status == 'active' &&
          get(/databases/$(database)/documents/users/$(request.auth.uid)/entitlements/dual_bundle).data.expiresAt > request.time
        )
      );
    }

    // Courses & Modules: Public catalog view
    match /courses/{courseId} {
      allow read: if true;
      allow write: if false; // Admin SDK only

      match /modules/{moduleId} {
        allow read: if true;
        allow write: if false;
      }

      match /lessons/{lessonId} {
        allow read: if true;
        allow write: if false;

        // Steps collection: GATED
        match /steps/{stepId} {
          allow read: if resource.data.isFreePreview == true ||
                         get(/databases/$(database)/documents/courses/$(courseId)/lessons/$(lessonId)).data.isFreePreview == true ||
                         hasCourseAccess(courseId);
          allow write: if false;
        }
      }
    }

    // User document & subcollections
    match /users/{userId} {
      allow read: if isOwner(userId);
      allow create: if isOwner(userId) &&
                       request.resource.data.userId == request.auth.uid &&
                       !request.resource.data.keys().hasAny(['roles', 'isAdmin']);
      allow update: if isOwner(userId) &&
                       !request.resource.data.diff(resource.data).affectedKeys().hasAny(['roles', 'isAdmin', 'userId']);
      allow delete: if false;

      // Entitlements: Client READ ONLY. Write restricted to Cloud Functions via Admin SDK
      match /entitlements/{courseId} {
        allow read: if isOwner(userId);
        allow write: if false;
      }

      // Progress & Spaced Repetition: User can update own learning state
      match /progress/{courseId} {
        allow read: if isOwner(userId);
        allow create, update: if isOwner(userId) &&
          request.resource.data.completedLessonIds is list &&
          request.resource.data.completedLessonIds.size() < 500;
        allow delete: if false;
      }

      match /spaced_repetition/{cardId} {
        allow read, write: if isOwner(userId);
      }
    }

    // Webhook events & Orders: Complete client lockout
    match /webhook_events/{eventId} {
      allow read, write: if false;
    }

    match /orders/{orderId} {
      allow read: if isAuthenticated() && resource.data.userId == request.auth.uid;
      allow write: if false;
    }
  }
}
```

---

## 5. Firebase Cloud Functions Architecture

Implemented in **TypeScript** targeting the **Node.js 20/22 runtime** using Firebase Functions v2 (Cloud Run architecture).

### 5.1 Cloud Function Endpoints

| Function Name | Trigger | Auth Required | Purpose |
| :--- | :--- | :--- | :--- |
| `createCheckoutSession` | `onCall` (HTTPS Callable) | Yes (User Auth) | Validates user & selected plan, generates Dodo Payments checkout session URL with PPP calculation, returns redirect link. |
| `handleDodoWebhook` | `onRequest` (HTTP) | No (Signature Verified) | Receives signed webhook payloads from Dodo Payments, checks event idempotency, provisions or cancels entitlements. |
| `syncSpacedRepetitionQueue` | `onCall` (HTTPS Callable) | Yes (User Auth) | Computes daily cards due for review based on Leitner intervals and returns prioritized queue. |
| `onUserCreated` | `auth.user().onCreate` | Background Trigger | Initializes default `/users/{userId}` profile document and tracks onboarding metrics. |

### 5.2 Webhook Signature & Idempotency Pipeline

1. **Signature Verification**: Dodo Payments sends an `x-dodo-signature` header containing an HMAC-SHA256 hash. The function retrieves the webhook secret from **Google Cloud Secret Manager** and verifies the signature prior to reading the body.
2. **Idempotency Transaction**:
   - The function extracts `event_id` from the payload.
   - It performs an atomic Firestore read against `/webhook_events/{event_id}`.
   - If the document exists, the function immediately returns `HTTP 200 OK` (duplicate request dismissed safely).
   - If new, it creates `/webhook_events/{event_id}` with status `"processing"` in the transaction.
3. **Entitlement Provisioning**:
   - On `"payment.succeeded"` or `"subscription.active"`: Updates or creates `/users/{userId}/entitlements/{courseId}` with `status = "active"` and computes `expiresAt`.
   - On `"subscription.cancelled"`: Updates `autoRenew = false`. Entitlement remains `"active"` until `expiresAt`.
   - On `"refund.processed"`: Sets `status = "revoked"` immediately and logs the refund event.
4. **Completion**: Updates `/webhook_events/{event_id}` status to `"success"`.

---

## 6. Cold-Start, Scalability & Regional Deployment

1. **GCP Region**: Functions and Firestore are staged in **`europe-west1` (Belgium)** or **`europe-west3` (Frankfurt)** to guarantee minimal latency (<60ms) for our core student demographics in Turkey, Europe, and the Middle East.
2. **Concurrency**: Utilizing Cloud Functions v2 concurrency (up to 80 concurrent requests per container instance), drastically minimizing cold starts while eliminating excess container costs.
3. **Budget Guard**: Minimum instances are set to `0` to prevent baseline idle costs. Maximum instances are capped at `10` for staging and `50` for production to eliminate the risk of billing spikes.

---

## 7. Local Emulator & Testing Strategy

All backend rules and functions are tested offline before cloud deployment:
1. `@firebase/rules-unit-testing`: Tests all 12 permission branches (public access, anonymous lock, valid entitlement unlock, expired entitlement lock, client entitlement write rejection).
2. Local Cloud Functions testing using the Firebase Functions Emulator with mock Dodo webhook triggers.
3. Zero network egress during automated test execution.
