import React from 'react';
import { Card } from '../components/ui/card';

export default function PrivacyPolicyPage({ onBack }: { onBack?: () => void }) {
  return (
    <div className="min-h-screen bg-cream-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-black">Privacy Policy</h1>
            {onBack && (
              <button onClick={onBack} className="text-beige-700 hover:underline">Back</button>
            )}
          </div>

          <Card className="p-6 border-beige-200 bg-white space-y-4">
            <p className="text-beige-800 leading-relaxed">
              Your privacy matters. We collect only the information needed to operate the platform and provide
              core features like authentication, messaging, and listing management.
            </p>
            <ul className="list-disc pl-6 text-beige-800 space-y-2">
              <li>We do not sell your personal data.</li>
              <li>We use industry-standard security practices.</li>
              <li>You can request data deletion by contacting support.</li>
            </ul>
            <p className="text-beige-800 leading-relaxed">
              For questions, contact us via the Contact Us page.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
