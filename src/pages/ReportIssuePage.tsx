import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { AlertTriangle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useAuth } from '../firebase/AuthProvider';

export default function ReportIssuePage({ onBack }: { onBack?: () => void }) {
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: user?.email || '',
    issueType: 'Bug',
    relatedItem: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      await addDoc(collection(db, 'reports'), {
        ...formData,
        userId: user?.uid || null,
        status: 'open',
        createdAt: serverTimestamp(),
      });
      
      setStatus('sent');
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: user?.email || '',
          issueType: 'Bug',
          relatedItem: '',
          description: ''
        });
        setStatus('idle');
      }, 3000);
    } catch (error: any) {
      console.error('Error submitting report:', error);
      setStatus('error');
      
      // Show helpful error message
      if (error.code === 'permission-denied') {
        setErrorMessage('Permission denied. Please check Firestore security rules.');
      } else if (error.message?.includes('Missing or insufficient permissions')) {
        setErrorMessage('Firestore security rules need to be configured. See FIRESTORE_RULES.md');
      } else {
        setErrorMessage(error.message || 'Failed to submit report');
      }
      
      setTimeout(() => setStatus('idle'), 5000);
    }
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
                <Input 
                  required 
                  placeholder="Your name" 
                  className="h-12 bg-cream-50 border-beige-200"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <Input 
                  required 
                  type="email" 
                  placeholder="Email address" 
                  className="h-12 bg-cream-50 border-beige-200"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-beige-700 mb-1 block">Issue Type</label>
                  <select 
                    className="w-full h-12 bg-cream-50 border border-beige-200 rounded-md px-3"
                    value={formData.issueType}
                    onChange={(e) => setFormData({...formData, issueType: e.target.value})}
                  >
                    <option>Bug</option>
                    <option>Safety Concern</option>
                    <option>Payment Issue</option>
                    <option>Account / Login</option>
                    <option>Other</option>
                  </select>
                </div>
                <Input 
                  placeholder="Related Item (optional)" 
                  className="h-12 bg-cream-50 border-beige-200"
                  value={formData.relatedItem}
                  onChange={(e) => setFormData({...formData, relatedItem: e.target.value})}
                />
              </div>

              <div>
                <label className="text-sm text-beige-700 mb-1 block">Description</label>
                <Textarea 
                  required 
                  placeholder="Describe the issue with as much detail as possible" 
                  className="min-h-[140px] bg-cream-50 border-beige-200"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Button type="submit" variant="black" disabled={status!=='idle'}>
                    {status==='sending' ? 'Submitting…' : status==='sent' ? 'Submitted ✓' : status==='error' ? 'Failed - Retry' : 'Submit Report'}
                  </Button>
                  {status==='sent' && (
                    <Badge className="bg-green-100 text-green-800 border-0">Report submitted successfully!</Badge>
                  )}
                </div>
                {status==='error' && errorMessage && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
                    <strong>Error:</strong> {errorMessage}
                    {errorMessage.includes('security rules') && (
                      <div className="mt-2 text-xs">
                        Check <code className="bg-red-100 px-1 rounded">FIRESTORE_RULES.md</code> in the project root for setup instructions.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
