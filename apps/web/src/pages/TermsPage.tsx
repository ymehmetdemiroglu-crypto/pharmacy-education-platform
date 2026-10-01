import React from 'react';
import { Card, Button, StickerBadge } from '@pharmacy/ui';
import { ShieldCheck, ArrowLeft, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TermsPage: React.FC = () => {
  return (
    <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link to="/pricing">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Platform
          </Button>
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <StickerBadge variant="outline">LEGAL / ŞARTLAR</StickerBadge>
          <span className="text-xs font-mono text-gray-500">Effective: October 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight flex items-center gap-3">
          <FileText className="w-8 h-8 text-[#FF5722]" />
          Terms of Service (Kullanım Koşulları)
        </h1>
        <p className="text-gray-700 dark:text-slate-300 mt-2 font-mono text-sm">
          Please read these terms carefully before accessing the Pharmacy Education Platform.
        </p>
      </div>

      <Card className="p-6 sm:p-8 space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-bold uppercase mb-2">1. Agreement to Terms</h2>
          <p className="text-gray-700 dark:text-slate-300">
            By creating an account, beginning a free trial, or purchasing a subscription on the Pharmacy Education Platform
            (&quot;Platform&quot;, &quot;we&quot;, &quot;our&quot;), you agree to be bound by these Terms of Service. If you do not agree,
            do not access or use our services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase mb-2">2. Educational Disclaimer</h2>
          <p className="text-gray-700 dark:text-slate-300">
            The platform provides simulated educational modules, pharmacokinetic models, and medicinal chemistry visualizations
            specifically designed for undergraduate and graduate pharmacy students. It is strictly an educational tool and does
            not constitute medical advice, clinical guidelines, prescription instructions, or clinical decision support.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase mb-2">3. Permanent Freemium &amp; 7-Day Cardless Trial</h2>
          <p className="text-gray-700 dark:text-slate-300">
            • <strong>Permanent Freemium:</strong> Lessons 1 and 2 of every curriculum module remain permanently accessible
            without charge or payment information.<br />
            • <strong>7-Day Free Trial:</strong> Eligible users may activate a single 7-day cardless free trial. No credit card
            is required. Upon trial expiration, accounts gracefully revert to the free plan with 100% of student progress,
            spaced repetition data, and notes preserved.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase mb-2">4. Payment Processing &amp; Merchant of Record</h2>
          <p className="text-gray-700 dark:text-slate-300">
            Payment processing, invoicing, and tax collection are handled authoritatively by our payment partner,
            <strong> Dodo Payments Inc.</strong> (&quot;Merchant of Record&quot;). By subscribing to a paid plan, you authorize Dodo
            Payments to charge your selected payment method according to your chosen billing cycle (monthly, semester pass, or annual).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase mb-2">5. Subscriptions, Renewals &amp; Cancellations</h2>
          <p className="text-gray-700 dark:text-slate-300">
            • <strong>Auto-Renewal:</strong> Subscriptions renew automatically at the end of each billing cycle unless cancelled
            prior to the renewal date.<br />
            • <strong>Self-Service Cancellation:</strong> You may cancel anytime via the Customer Portal. Cancellations take effect
            at the end of the current paid billing period, maintaining full access until then.<br />
            • <strong>Grace Period:</strong> If a renewal charge fails, a 7-day past-due grace period applies to allow card updates
            without immediate interruption of learning access.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase mb-2">6. Account Deletion &amp; Data Rights (KVKK / GDPR)</h2>
          <p className="text-gray-700 dark:text-slate-300">
            In compliance with Turkish Personal Data Protection Law (KVKK No. 6698) and EU GDPR, users may permanently delete
            their accounts at any time. Deletion cancels all active recurring subscriptions and permanently purges personal data
            and learning records from our databases.
          </p>
        </section>
      </Card>
    </div>
  );
};
