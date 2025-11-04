"use client"

import React from 'react';
import { Card } from '../../../components/ui/card';

export default function PrivacyPolicyPage({ onBack }: { onBack?: () => void }) {
  return (
    <div className="min-h-screen bg-cream-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-black">Privacy & Community Policy</h1>
            {onBack && (
              <button onClick={onBack} className="text-beige-700 hover:underline">Back</button>
            )}
          </div>

          <Card className="p-6 border-beige-200 bg-white space-y-6">
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">Overview</h2>
              <p className="text-beige-800 leading-relaxed">
                SleekRoad is built for a safe, respectful marketplace experience. This page combines our
                privacy practices (how we handle your data) and core community standards (what’s allowed on the
                platform). By using SleekRoad, you agree to these terms and to our enforcement approach.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">What We Collect</h2>
              <ul className="list-disc pl-6 text-beige-800 space-y-2">
                <li>Account info: name, email, profile details, and authentication identifiers.</li>
                <li>Listing and transaction details: titles, descriptions, prices, images, and related metadata.</li>
                <li>Communications: messages sent via in‑app chat and support requests.</li>
                <li>Usage data: device/browser info, IP address, and activity logs (for security and reliability).</li>
                <li>Optional data: feedback, surveys, or media you choose to upload.</li>
              </ul>
              <p className="text-xs text-beige-700">We do not sell your personal information.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">How We Use Data</h2>
              <ul className="list-disc pl-6 text-beige-800 space-y-2">
                <li>Provide core features: login, listings, search, favorites, and messaging.</li>
                <li>Protect users and the platform: fraud prevention, abuse detection, and account security.</li>
                <li>Improve experience: troubleshooting, performance, analytics, and feature development.</li>
                <li>Communicate important updates: transaction notices, policy changes, and support replies.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">Your Choices & Rights</h2>
              <ul className="list-disc pl-6 text-beige-800 space-y-2">
                <li>Access/Update: edit your profile and listings at any time.</li>
                <li>Delete: request account/data deletion via the Contact Us page.</li>
                <li>Controls: manage notifications and what you share publicly in listings.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">Security & Retention</h2>
              <ul className="list-disc pl-6 text-beige-800 space-y-2">
                <li>We use industry‑standard safeguards to protect account and message data.</li>
                <li>We retain data only as long as needed for legal, security, and operational purposes.</li>
                <li>Some logs may be briefly retained to diagnose incidents and prevent abuse.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">Community Standards (Prohibited Content & Conduct)</h2>
              <p className="text-beige-800">To keep SleekRoad safe, the following are strictly prohibited:</p>
              <ul className="list-disc pl-6 text-beige-800 space-y-2">
                <li>Exploitation or endangerment of minors; sexual content involving minors.</li>
                <li>Nudity, sexually explicit material, or pornographic services.</li>
                <li>Illegal items or services (drugs, weapons, stolen goods, counterfeit items, hacking tools).</li>
                <li>Violent, hateful, harassing, or threatening conduct; doxxing or targeted abuse.</li>
                <li>Fraud, scams, deceptive listings, or misrepresentation of items/services.</li>
                <li>Self‑harm encouragement or content intended to cause injury or property damage.</li>
                <li>Intellectual‑property infringement or selling content you don’t have rights to.</li>
                <li>Sharing others’ personal data without consent (phone, address, IDs, financial info).</li>
                <li>Malware, phishing, or attempts to bypass security, rate limits, or platform restrictions.</li>
              </ul>
              <p className="text-xs text-beige-700">
                Tip: If you’re unsure whether an item or post is allowed, don’t list it. When in doubt, ask support first.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">Enforcement & Legal</h2>
              <ul className="list-disc pl-6 text-beige-800 space-y-2">
                <li>We may remove content, restrict features, or suspend/terminate accounts that violate our policies.</li>
                <li>Repeat or severe violations (e.g., illegal activity, exploitation, serious threats) may result in permanent bans.</li>
                <li>If we reasonably believe a law is being broken or someone is at risk, we may report to law enforcement and cooperate with investigations.</li>
                <li>Where permitted by law, we may pursue civil or criminal remedies for abuse, fraud, or platform misuse.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">Reporting Concerns</h2>
              <p className="text-beige-800">
                Use the Report Issue page or Contact Us page to flag suspicious activity, prohibited content, or safety concerns.
                Please include links, screenshots, or listing IDs to help us act quickly.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">Children’s Safety</h2>
              <p className="text-beige-800">
                SleekRoad is not intended for children under the age required by local law to consent to online services.
                Never share or request private information from minors. We strictly prohibit any sexual content involving minors.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">International & Legal</h2>
              <ul className="list-disc pl-6 text-beige-800 space-y-2">
                <li>Data may be processed and stored in regions where we or our providers operate.</li>
                <li>Your use of SleekRoad must comply with local laws and regulations.</li>
                <li>This policy may be updated. Continued use after changes constitutes acceptance.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">Contact</h2>
              <p className="text-beige-800">
                Questions or requests? Reach us via the Contact Us page. For urgent safety issues, use the Report Issue page.
              </p>
              <p className="text-xs text-beige-700">This page provides general information and does not constitute legal advice. Consider consulting counsel for specific compliance needs.</p>
            </section>
          </Card>
        </div>
      </div>
    </div>
  );
}