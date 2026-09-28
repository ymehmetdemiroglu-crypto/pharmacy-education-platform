# /deploy-staging Workflow

## Description
Executes a fully validated deployment to the approved Firebase staging environment.

## Execution Steps
1. Verify user confirmation of staging GCP Project ID.
2. Confirm active budget alert in GCP console.
3. Execute local automated verification suite:
   ```bash
   pnpm test && pnpm test:rules && pnpm build
   ```
4. Verify zero unverified chemical structures or missing sources in content bundle.
5. Deploy to Firebase staging:
   ```bash
   firebase deploy --only hosting,functions,firestore:rules,firestore:indexes --project <staging-project-id>
   ```
6. Execute staging smoke tests (HTTPS status 200, CSP headers, sample unauthenticated free lesson fetch).
7. Report staging URL and smoke test results to user.
