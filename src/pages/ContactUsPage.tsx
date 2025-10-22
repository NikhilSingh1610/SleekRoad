import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Mail } from 'lucide-react';

export default function ContactUsPage({ onBack }: { onBack?: () => void }) {
  const [status, setStatus] = useState<'idle'|'sending'|'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 800); // Placeholder send
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center">
              <Mail className="w-6 h-6 text-cream-50" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-black">Contact Us</h1>
              <p className="text-beige-600">We’ll get back to you within 1–2 business days</p>
            </div>
          </div>

          <Card className="p-6 border-beige-200">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input required placeholder="Full name" className="h-12 bg-cream-50 border-beige-200" />
                <Input required type="email" placeholder="Email address" className="h-12 bg-cream-50 border-beige-200" />
              </div>
              <Input required placeholder="Subject" className="h-12 bg-cream-50 border-beige-200" />
              <Textarea required placeholder="How can we help?" className="min-h-[140px] bg-cream-50 border-beige-200" />
              <div className="flex items-center gap-3">
                <Button type="submit" variant="black" disabled={status!=='idle'}>
                  {status==='sending' ? 'Sending…' : status==='sent' ? 'Sent ✓' : 'Send Message'}
                </Button>
                {status==='sent' && (
                  <span className="text-beige-700 text-sm">Thanks! We’ll be in touch soon.</span>
                )}
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
