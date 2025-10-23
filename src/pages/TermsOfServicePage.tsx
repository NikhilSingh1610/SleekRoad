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

          <Card className="p-6 border-beige-200 bg-white space-y-4">
            <p className="text-beige-800 leading-relaxed">
              By using SleekRoad, you agree to follow local laws and our community guidelines. You are solely
              responsible for your listings, messages, and transactions.
            </p>
            <ul className="list-disc pl-6 text-beige-800 space-y-2">
              <li>No illegal, dangerous, or prohibited items.</li>
              <li>Respect other users and communicate honestly.</li>
              <li>Meet in safe, public places whenever possible.</li>
            </ul>
            <p className="text-beige-800 leading-relaxed">
              We may update these terms from time to time. Continued use of SleekRoad means you accept the latest terms.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
