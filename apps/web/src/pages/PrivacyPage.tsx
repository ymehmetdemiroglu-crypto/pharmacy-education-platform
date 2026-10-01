import React from 'react';
import { Card, Button, StickerBadge } from '@pharmacy/ui';
import { ShieldCheck, ArrowLeft, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link to="/pricing">
          <Button variant="outline" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Platform
          </Button>
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <StickerBadge variant="neutral">KVKK / GDPR / GİZLİLİK</StickerBadge>
          <span className="text-xs font-mono text-gray-500">Effective: October 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight flex items-center gap-3">
          <Lock className="w-8 h-8 text-[#00BCD4]" />
          Privacy &amp; Data Protection (Gizlilik Politikası)
        </h1>
        <p className="text-gray-700 dark:text-slate-300 mt-2 font-mono text-sm">
          Compliance Notice under Turkish Law No. 6698 (KVKK) and EU General Data Protection Regulation (GDPR).
        </p>
      </div>

      <Card className="p-6 sm:p-8 space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-bold uppercase mb-2">1. Data Controller (Veri Sorumlusu)</h2>
          <p className="text-gray-700 dark:text-slate-300">
            Pharmacy Education Platform operates as the Data Controller under Law No. 6698 on the Protection of Personal
            Data (&quot;KVKK&quot;) and Regulation (EU) 2016/679 (&quot;GDPR&quot;). We are committed to safeguarding student data and
            respecting fundamental rights and freedoms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase mb-2">2. Personal Data We Collect</h2>
          <p className="text-gray-700 dark:text-slate-300">
            • <strong>Identity &amp; Contact:</strong> Name, email address, preferred language (tr/ar/en).<br />
            • <strong>Learning Progress:</strong> Completed lesson IDs, quiz and step scores, spaced repetition Leitner box
            states, streak days.<br />
            • <strong>Subscription &amp; Entitlement Data:</strong> Plan type (free, trial, premium), expiration dates, gateway
            subscription identifiers.<br />
            • <strong>Financial Data:</strong> We do <em>not</em> store credit card numbers, CVVs, or bank details on our servers.
            All payment transactions are handled directly by Dodo Payments Inc.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase mb-2">3. Third-Party Sub-Processors</h2>
          <p className="text-gray-700 dark:text-slate-300">
            We work with verified sub-processors adhering to international data security standards (SOC 2, ISO 27001):<br />
            • <strong>Firebase / Google Cloud:</strong> Secure authentication, cloud hosting, and encrypted Firestore database.<br />
            • <strong>Dodo Payments Inc.:</strong> Payment processing, invoice generation, VAT/tax compliance, and merchant of record.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase mb-2">4. Your Rights (KVKK Article 11 &amp; GDPR Articles 15-22)</h2>
          <p className="text-gray-700 dark:text-slate-300">
            Students and subscribers hold the right to:<br />
            1. Learn whether personal data is processed and request information regarding processing.<br />
            2. Correct incomplete or inaccurate personal data.<br />
            3. Request permanent deletion or destruction of personal data.<br />
            4. Object to automated data processing that leads to unfavorable outcomes.<br />
            5. Exercise self-service account deletion directly from the platform interface.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase mb-2">5. Data Deletion Procedure</h2>
          <p className="text-gray-700 dark:text-slate-300">
            When you invoke account deletion, our automated backend immediately cancels any active recurring payment subscriptions
            via Dodo Payments and permanently purges your user profile, progress history, and entitlement records.
          </p>
        </section>
      </Card>
    </div>
  );
};
