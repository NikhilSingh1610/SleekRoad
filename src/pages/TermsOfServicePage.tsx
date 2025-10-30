import React from 'react';
import { Card } from '../components/ui/card';

export default function TermsOfServicePage({ onBack }: { onBack?: () => void }) {
  return (
    <div className="min-h-screen bg-cream-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-black">Terms of Service</h1>
            {onBack && (
              <button onClick={onBack} className="text-beige-700 hover:underline">Back</button>
            )}
          </div>

          <Card className="p-6 border-beige-200 bg-white space-y-6">
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">Agreement to Terms</h2>
              <p className="text-beige-800 leading-relaxed">
                Welcome to SleekRoad. By accessing or using our platform (website, mobile app, or any related services),
                you agree to be bound by these Terms of Service ("Terms"). If you do not agree, please do not use SleekRoad.
              </p>
              <p className="text-beige-800 leading-relaxed">
                These Terms constitute a legally binding agreement between you and SleekRoad. We may update these Terms
                from time to time. Continued use after changes means you accept the revised Terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">Eligibility</h2>
              <ul className="list-disc pl-6 text-beige-800 space-y-2">
                <li>You must be at least 18 years old (or the age of majority in your jurisdiction) to use SleekRoad.</li>
                <li>You must provide accurate, complete, and current information when creating an account.</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                <li>You may not use SleekRoad if you have been previously banned or if your use violates any applicable law.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">Acceptable Use</h2>
              <p className="text-beige-800 leading-relaxed">You agree to use SleekRoad only for lawful purposes and in accordance with these Terms. You agree NOT to:</p>
              <ul className="list-disc pl-6 text-beige-800 space-y-2">
                <li>Post, sell, or promote illegal items, services, or content (including drugs, weapons, stolen goods, counterfeit products, or hacking tools).</li>
                <li>Engage in fraud, scams, deceptive practices, or misrepresent items or services.</li>
                <li>Upload or share sexually explicit content, nudity, or pornographic material.</li>
                <li>Exploit, endanger, or share content involving minors.</li>
                <li>Post violent, threatening, hateful, harassing, or discriminatory content.</li>
                <li>Spam, phish, or send unsolicited commercial messages.</li>
                <li>Impersonate others, create fake accounts, or manipulate platform features (e.g., fake reviews, vote manipulation).</li>
                <li>Share others' personal information (doxxing) or violate privacy rights.</li>
                <li>Introduce malware, viruses, or code designed to disrupt or harm the platform or users.</li>
                <li>Attempt to bypass security measures, rate limits, or access restrictions.</li>
                <li>Scrape, crawl, or extract data from SleekRoad without permission.</li>
                <li>Violate intellectual property rights, including posting content you don't own or have rights to.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">User-Generated Content</h2>
              <ul className="list-disc pl-6 text-beige-800 space-y-2">
                <li>You retain ownership of content you post (listings, messages, photos, etc.).</li>
                <li>By posting content, you grant SleekRoad a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content to operate the platform.</li>
                <li>You are solely responsible for the accuracy, legality, and safety of your content.</li>
                <li>We may remove content that violates these Terms or our policies without notice.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">Transactions & Disputes</h2>
              <ul className="list-disc pl-6 text-beige-800 space-y-2">
                <li>SleekRoad is a platform that connects buyers and sellers. We do not participate in transactions.</li>
                <li>You are solely responsible for transactions, including payment, delivery, and resolution of disputes.</li>
                <li>We strongly recommend meeting in safe, public places and inspecting items before payment.</li>
                <li>SleekRoad is not liable for loss, damage, fraud, or disputes arising from transactions between users.</li>
                <li>Report suspicious activity or scams immediately via the Report Issue page.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">Account Suspension & Termination</h2>
              <p className="text-beige-800 leading-relaxed">
                We reserve the right to suspend, restrict, or terminate your account if you violate these Terms, our
                Privacy & Community Policy, or engage in conduct that harms the platform or other users.
              </p>
              <ul className="list-disc pl-6 text-beige-800 space-y-2">
                <li>Minor violations may result in warnings or temporary restrictions.</li>
                <li>Serious violations (illegal activity, exploitation, severe harassment) may result in immediate permanent bans.</li>
                <li>We may report illegal activity to law enforcement and cooperate with investigations.</li>
                <li>You may close your account at any time via settings or by contacting support.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">Disclaimers & Limitations of Liability</h2>
              <p className="text-beige-800 leading-relaxed">
                <strong>SleekRoad is provided "AS IS" without warranties of any kind, express or implied.</strong> We do not guarantee:
              </p>
              <ul className="list-disc pl-6 text-beige-800 space-y-2">
                <li>The accuracy, completeness, or reliability of listings or user content.</li>
                <li>That the platform will be uninterrupted, error-free, or secure.</li>
                <li>That transactions will be successful, safe, or free from fraud.</li>
              </ul>
              <p className="text-beige-800 leading-relaxed mt-3">
                <strong>To the fullest extent permitted by law, SleekRoad and its affiliates are not liable for:</strong>
              </p>
              <ul className="list-disc pl-6 text-beige-800 space-y-2">
                <li>Losses, damages, or disputes arising from transactions between users.</li>
                <li>Harm caused by user content, including scams, fraud, or false listings.</li>
                <li>Unauthorized access to your account or data breaches caused by third parties.</li>
                <li>Indirect, incidental, consequential, or punitive damages arising from your use of SleekRoad.</li>
              </ul>
              <p className="text-beige-800 leading-relaxed mt-3">
                In jurisdictions that do not allow exclusions or limitations of liability, our liability is limited to the maximum extent permitted by law.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">Indemnification</h2>
              <p className="text-beige-800 leading-relaxed">
                You agree to indemnify, defend, and hold harmless SleekRoad, its officers, employees, and affiliates from
                any claims, damages, losses, or expenses (including legal fees) arising from:
              </p>
              <ul className="list-disc pl-6 text-beige-800 space-y-2">
                <li>Your violation of these Terms or applicable laws.</li>
                <li>Your content, listings, or transactions.</li>
                <li>Your infringement of others' intellectual property or privacy rights.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">Dispute Resolution & Governing Law</h2>
              <ul className="list-disc pl-6 text-beige-800 space-y-2">
                <li>These Terms are governed by the laws of [Your Jurisdiction], without regard to conflict of law principles.</li>
                <li>Any disputes arising from these Terms or your use of SleekRoad shall be resolved through binding arbitration or in the courts of [Your Jurisdiction].</li>
                <li>You waive the right to participate in class actions or class arbitrations.</li>
              </ul>
              <p className="text-xs text-beige-700 mt-2">Note: Update jurisdiction details as needed for your location.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">Intellectual Property</h2>
              <ul className="list-disc pl-6 text-beige-800 space-y-2">
                <li>SleekRoad's name, logo, design, and platform features are protected by copyright, trademark, and other intellectual property laws.</li>
                <li>You may not copy, modify, distribute, or reverse-engineer any part of SleekRoad without permission.</li>
                <li>If you believe content on SleekRoad infringes your intellectual property, contact us via the Report Issue or Contact Us page.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">Modifications to Service</h2>
              <p className="text-beige-800 leading-relaxed">
                We reserve the right to modify, suspend, or discontinue SleekRoad (or any features) at any time without
                notice or liability. We may also impose limits on features or restrict access to parts of the platform.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">General Provisions</h2>
              <ul className="list-disc pl-6 text-beige-800 space-y-2">
                <li><strong>Entire Agreement:</strong> These Terms, along with our Privacy & Community Policy, constitute the entire agreement between you and SleekRoad.</li>
                <li><strong>Severability:</strong> If any provision is found invalid, the remaining provisions remain in effect.</li>
                <li><strong>Waiver:</strong> Our failure to enforce any provision does not waive our right to enforce it later.</li>
                <li><strong>Assignment:</strong> You may not transfer your account or rights under these Terms without our consent. We may assign our rights freely.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">Contact</h2>
              <p className="text-beige-800 leading-relaxed">
                Questions about these Terms? Contact us via the Contact Us page or email legal@sleekroad.app.
              </p>
              <p className="text-xs text-beige-700 mt-2">
                Last Updated: [Date]. By continuing to use SleekRoad after updates, you accept the revised Terms.
              </p>
            </section>
          </Card>
        </div>
      </div>
    </div>
  );
}
