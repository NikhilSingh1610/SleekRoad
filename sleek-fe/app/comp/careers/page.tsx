"use client"

import React from 'react';
import { Card } from '../../../components/ui/card';

export default function CareersPage({ onBack }: { onBack?: () => void }) {
  const roles = [
    { title: 'Frontend Engineer (React + TS)', type: 'Remote', status: 'Open' },
    { title: 'Product Designer', type: 'Remote', status: 'Open' },
    { title: 'Community Manager', type: 'Remote', status: 'Upcoming' },
  ];

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-black">Careers at SleekRoad</h1>
            {onBack && (
              <button onClick={onBack} className="text-beige-700 hover:underline">Back</button>
            )}
          </div>

          <Card className="p-6 border-beige-200 bg-white">
            <p className="text-beige-800 leading-relaxed mb-6">
              Help us build the cleanest, safest local marketplace. We’re a small team that values craft,
              kindness, and speed. If you love polished UI and community-focused products, we’d love to hear from you in feedback form.
            </p>

            <div className="space-y-3">
              {roles.map((r, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-cream-50 border border-beige-200 rounded-md">
                  <div>
                    <div className="font-semibold text-black">{r.title}</div>
                    <div className="text-sm text-beige-700">{r.type}</div>
                  </div>
                  <span className="text-sm px-2 py-1 rounded bg-black text-white">
                    {r.status}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-beige-800 leading-relaxed mt-6">
              Don’t see a fit? Send your portfolio or resume to hotdrop.tech@gmail.com.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}