# Security, Privacy & Cloud Architecture Rules

## 1. Secrets & Credentials Zero-Tolerance
- NEVER commit secrets, API keys, service account JSON files, `.env` files, or private keys to the git repository.
- Ensure root `.gitignore` contains patterns for `.env*`, `*.pem`, `*credential*.json`, `service-account*.json`.
- Developers and automation must authenticate via `gcloud auth application-default login` or Workload Identity Federation (WIF) in CI/CD.

## 2. Server-Authoritative Entitlements & Access Control
- **Deny Client Entitlement Writes**: Under no circumstances can client applications write to `/users/{uid}/entitlements/{courseId}`. All entitlement writes are strictly performed by trusted Firebase Cloud Functions (e.g. payment webhooks, admin promotions).
- **Single Source of Truth**: The access check function `hasAccess(uid, courseId, lessonId?)` must govern all client and server routing, UI locking, and data access.
- **Paywalled Lesson Security**: Full lesson step data for paid lessons resides in `/courses/{courseId}/lessons/{lessonId}`. Firestore security rules MUST enforce that a read request is granted ONLY IF:
  1. The lesson document has `access == "free"`, OR
  2. The authenticated user has an active entitlement record in `/users/{request.auth.uid}/entitlements/{courseId}` where `status == "active"` and `expiresAt > request.time`.
- **No Client Bundling**: Paid lesson step content must NEVER be bundled in the static client bundle. It is fetched dynamically on demand from Firestore after entitlement verification.

## 3. Cloud Firestore Security Rules Rigor
- Default deny: Every collection not explicitly allowed is blocked (`match /{document=**} { allow read, write: if false; }`).
- Authenticated user isolation: Users can read and write only their own user document and subcollections (`/users/{userId}/**` where `request.auth.uid == userId`).
- Schema validation in rules: Progress writes (`/users/{uid}/progress/{courseId}`) must validate:
  - Required fields and strict types (e.g., `completedSteps is list`, `streak is int`, `lastPosition is string`).
  - Size constraints (preventing storage exhaustion attacks; e.g., payload size < 50KB).
  - No foreign or unauthorized fields (`request.resource.data.keys().hasOnly([...])`).

## 4. Privacy & Regulatory Compliance (GDPR & KVKK)
- Data minimization: Store only essential learning telemetry (completed step IDs, quiz attempt accuracy, streak timestamp).
- Medical disclaimer: Every lesson, simulation, and platform footer must clearly feature the statutory educational disclaimer:
  `"This platform is strictly for academic and pharmacy educational purposes. It does not provide clinical, diagnostic, or dosage advice."`
- No PII in telemetry or analytics events.
