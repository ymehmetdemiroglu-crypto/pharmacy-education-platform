import React from 'react';
import { Card, Button, StickerBadge } from '@pharmacy/ui';
import { ShieldCheck, ArrowLeft, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export const RefundPage: React.FC = () => {
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
          <StickerBadge variant="outline">GUARANTEE / İADE POLİTİKASI</StickerBadge>
          <span className="text-xs font-mono text-gray-500">Effective: October 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight flex items-center gap-3">
          <RefreshCw className="w-8 h-8 text-[#4CAF50]" />
          Refund Policy (İade Politikası)
        </h1>
        <p className="text-gray-700 dark:text-slate-300 mt-2 font-mono text-sm">
          Transparent, student-friendly refund terms powered by Dodo Payments.
        </p>
      </div>

      <Card className="p-6 sm:p-8 space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-bold uppercase mb-2">1. 14-Day Satisfaction Guarantee (Cayma Hakkı)</h2>
          <p className="text-gray-700 dark:text-slate-300">
            We want you to feel confident in your pharmacy studies. If you purchase a monthly, semester pass, or annual subscription
            and are not completely satisfied, you are entitled to a full refund within <strong>14 days of purchase</strong>,
            no questions asked.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase mb-2">2. Cardless Trial Risk-Free Period</h2>
          <p className="text-gray-700 dark:text-slate-300">
            Our 7-day free trial requires no credit card upfront. You cannot be charged accidentally upon trial expiration.
            Billing only occurs if you explicitly choose to subscribe to a paid tier following your trial.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase mb-2">3. How to Request a Refund</h2>
          <p className="text-gray-700 dark:text-slate-300">
            You may request a refund through either of the following methods:<br />
            1. <strong>Self-Service:</strong> Access your <em>Dodo Payments Customer Portal</em> link sent with your billing receipt
            or from your account profile.<br />
            2. <strong>Support:</strong> Email our support team with your account email and transaction order ID.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase mb-2">4. Processing &amp; Disbursement</h2>
          <p className="text-gray-700 dark:text-slate-300">
            Once approved, refunds are processed immediately by Dodo Payments Inc. and returned directly to your original payment
            method (credit/debit card, bank transfer). Funds typically appear on your statement within <strong>5 to 10 business days</strong>,
            depending on your card issuer.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase mb-2">5. Effect on Account Access &amp; Learning Progress</h2>
          <p className="text-gray-700 dark:text-slate-300">
            When a refund is completed, your account plan returns to the Free plan. <strong>100% of your completed lessons, quiz scores,
            and spaced repetition study decks remain permanently preserved</strong>, and you retain uninterrupted access to all
            permanent Freemium preview lessons (Lessons 1 &amp; 2 of every module).
          </p>
        </section>
      </Card>
    </div>
  );
};
