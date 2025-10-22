import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { AlertTriangle } from 'lucide-react';

export default function ReportIssuePage({ onBack }: { onBack?: () => void }) {
  const [status, setStatus] = useState<'idle'|'sending'|'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 800);
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-cream-50" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-black">Report an Issue</h1>
              <p className="text-beige-600">Tell us what went wrong so we can fix it quickly</p>
            </div>
          </div>

          <Card className="p-6 border-beige-200">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input required placeholder="Your name" className="h-12 bg-cream-50 border-beige-200" />
                <Input required type="email" placeholder="Email address" className="h-12 bg-cream-50 border-beige-200" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-beige-700 mb-1 block">Issue Type</label>
                  <select className="w-full h-12 bg-cream-50 border border-beige-200 rounded-md px-3">
                    <option>Bug</option>
                    <option>Safety Concern</option>
                    <option>Payment Issue</option>
                    <option>Account / Login</option>
                    <option>Other</option>
                  </select>
                </div>
                <Input placeholder="Related Item (optional)" className="h-12 bg-cream-50 border-beige-200" />
              </div>

              <div>
                <label className="text-sm text-beige-700 mb-1 block">Description</label>
                <Textarea required placeholder="Describe the issue with as much detail as possible" className="min-h-[140px] bg-cream-50 border-beige-200" />
              </div>

              <div className="flex items-center gap-3">
                <Button type="submit" variant="black" disabled={status!=='idle'}>
                  {status==='sending' ? 'Submitting…' : status==='sent' ? 'Submitted ✓' : 'Submit Report'}
                </Button>
                {status==='sent' && (
                  <Badge className="bg-beige-100 text-beige-800 border-0">Thank you for your report</Badge>
                )}
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
