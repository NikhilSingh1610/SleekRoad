import React from 'react';
import { Card } from '../components/ui/card';
import { Shield, CheckCircle, XCircle } from 'lucide-react';

export default function SafetyTipsPage({ onBack }: { onBack?: () => void }) {
  const dos = [
    'Meet in public, well-lit places on campus',
    'Verify .edu email and profile before meeting',
    'Use in-app messaging, avoid sharing personal info',
    'Inspect items carefully before paying',
  ];
  const donts = [
    'Don’t send advance payments',
    'Don’t share OTPs or passwords',
    'Don’t meet in isolated locations',
    'Don’t continue if something feels off',
  ];

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center">
              <Shield className="w-6 h-6 text-cream-50" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-black">Safety Tips</h1>
              <p className="text-beige-600">Stay safe while buying and selling on SleekRoad</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-beige-200">
              <h2 className="font-semibold text-black mb-3 flex items-center gap-2"><CheckCircle className="w-5 h-5" /> Do’s</h2>
              <ul className="list-disc pl-5 space-y-2 text-beige-700">
                {dos.map((tip, i) => (<li key={i}>{tip}</li>))}
              </ul>
            </Card>
            <Card className="p-6 border-beige-200">
              <h2 className="font-semibold text-black mb-3 flex items-center gap-2"><XCircle className="w-5 h-5" /> Don’ts</h2>
              <ul className="list-disc pl-5 space-y-2 text-beige-700">
                {donts.map((tip, i) => (<li key={i}>{tip}</li>))}
              </ul>
            </Card>
          </div>

          <Card className="mt-6 p-6 border-beige-200">
            <h3 className="font-semibold text-black mb-2">Report a Concern</h3>
            <p className="text-sm text-beige-700">If you encounter suspicious behavior or listings, please report it immediately using the Report Issue page.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
