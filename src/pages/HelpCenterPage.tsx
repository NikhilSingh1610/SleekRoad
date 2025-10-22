import React from 'react';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Search, HelpCircle, BookOpen, MessageCircle } from 'lucide-react';

export default function HelpCenterPage({ onBack }: { onBack?: () => void }) {
  const faqs = [
    { q: 'How do I list an item for sale?', a: 'Go to Sell Item from the header, fill in details, upload photos, and publish.' },
    { q: 'How do I contact a seller?', a: 'Open an item and click Message to start a secure in-app chat.' },
    { q: 'Is my account verified?', a: 'All users are verified with university emails to keep the marketplace safe.' },
  ];

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-cream-50" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-black">Help Center</h1>
              <p className="text-beige-600">Find answers and learn how SleekRoad works</p>
            </div>
          </div>

          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-beige-400" />
            <Input placeholder="Search help articles" className="pl-12 h-12 bg-cream-50 border-beige-200 rounded-xl" />
          </div>

          <div className="grid gap-4 mb-10">
            <Card className="p-5 border-beige-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-beige-100 flex items-center justify-center border border-beige-200">
                  <BookOpen className="w-5 h-5 text-beige-800" />
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-1">Getting Started</h3>
                  <p className="text-sm text-beige-600">Create an account, set up your profile, and explore the marketplace.</p>
                </div>
              </div>
            </Card>
            <Card className="p-5 border-beige-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-beige-100 flex items-center justify-center border border-beige-200">
                  <MessageCircle className="w-5 h-5 text-beige-800" />
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-1">Messaging & Safety</h3>
                  <p className="text-sm text-beige-600">Best practices for contacting buyers and sellers.</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-black">Frequently Asked Questions</h2>
            {faqs.map((f, i) => (
              <Card key={i} className="p-5 border-beige-200">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-black">{f.q}</p>
                    <p className="text-sm text-beige-700 mt-1">{f.a}</p>
                  </div>
                  <Badge className="bg-beige-100 text-beige-800 border-0">FAQ</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
