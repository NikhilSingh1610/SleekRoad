import React, { useEffect, useState, useRef } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { auth, db } from '../firebase/firebaseConfig';
import { useAuth } from '../firebase/AuthProvider';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
  getDocs
} from 'firebase/firestore';

type Conversation = {
  id: string;
  participantsEmails: string[];
  lastMessage?: string;
  lastUpdated?: any;
};

export default function MessagesPage({ onBack, initialRecipientEmail }: { onBack?: () => void; initialRecipientEmail?: string }) {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');
  const [recipientEmail, setRecipientEmail] = useState(initialRecipientEmail || '');
  const messagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'conversations'), where('participantsEmails', 'array-contains', user.email));
    const unsub = onSnapshot(q, (snap) => {
      const items: Conversation[] = [];
      snap.forEach((d) => {
        const data = d.data() as any;
        items.push({ id: d.id, participantsEmails: data.participantsEmails || [], lastMessage: data.lastMessage, lastUpdated: data.lastUpdated });
      });
      // sort by lastUpdated desc
      items.sort((a, b) => (b.lastUpdated?.toMillis?.() || 0) - (a.lastUpdated?.toMillis?.() || 0));
      setConversations(items);
    });
    return () => unsub();
  }, [user]);

  // load messages for selected conversation
  useEffect(() => {
    if (!selectedConversationId) return;
    const q = query(collection(db, 'conversations', selectedConversationId, 'messages'), orderBy('createdAt'));
    const unsub = onSnapshot(q, (snap) => {
      const msgs: any[] = [];
      snap.forEach((d) => msgs.push({ id: d.id, ...d.data() }));
      setMessages(msgs);
      // scroll to bottom
      setTimeout(() => messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: 'smooth' }), 50);
    });
    return () => unsub();
  }, [selectedConversationId]);

  useEffect(() => {
    // auto-start a conversation if an initial recipient email is provided
    if (initialRecipientEmail && user) {
      (async () => {
        const convId = await ensureConversation(user.email || '', initialRecipientEmail);
        setSelectedConversationId(convId);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialRecipientEmail, user]);

  async function ensureConversation(meEmail: string, otherEmail: string) {
    // try to find existing conversation that includes both emails
    const q = query(collection(db, 'conversations'), where('participantsEmails', 'array-contains', otherEmail));
    const snap = await getDocs(q);
    for (const d of snap.docs) {
      const data = d.data() as any;
      const parts: string[] = data.participantsEmails || [];
      if (parts.includes(meEmail) && parts.includes(otherEmail)) return d.id;
    }
    // create new conversation
    const ref = await addDoc(collection(db, 'conversations'), {
      participantsEmails: [meEmail, otherEmail],
      createdAt: serverTimestamp(),
      lastMessage: '',
      lastUpdated: serverTimestamp()
    });
    return ref.id;
  }

  async function handleSend() {
    if (!user) return;
    if (!selectedConversationId) {
      if (!recipientEmail) return alert('Please enter recipient email');
      const convId = await ensureConversation(user.email || '', recipientEmail);
      setSelectedConversationId(convId);
    }

    if (!text.trim()) return;
    const convId = selectedConversationId as string;
    const msgRef = collection(db, 'conversations', convId, 'messages');
    await addDoc(msgRef, {
      text: text.trim(),
      senderEmail: user.email,
      senderUid: user.uid,
      createdAt: serverTimestamp()
    });
    // update conversation metadata
    await setDoc(doc(db, 'conversations', convId), { lastMessage: text.trim(), lastUpdated: serverTimestamp() }, { merge: true });
    setText('');
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8 max-w-xl w-full">
          <h2 className="text-2xl font-bold mb-4">Messages</h2>
          <p className="text-muted-foreground mb-6">Please sign in to access messaging.</p>
          <div className="flex gap-2">
            <Button variant="black" onClick={onBack}>Back</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Conversations</h3>
                <Button variant="ghost" onClick={onBack}>Back</Button>
              </div>
              <div className="space-y-2">
                {conversations.map((c) => {
                  const other = c.participantsEmails.find(e => e !== user.email) || 'Unknown';
                  return (
                    <div key={c.id} className={`p-3 rounded-md cursor-pointer ${selectedConversationId === c.id ? 'bg-cream-50' : ''}`} onClick={() => setSelectedConversationId(c.id)}>
                      <div className="font-medium text-black">{other}</div>
                      <div className="text-sm text-muted-foreground truncate">{c.lastMessage || 'No messages yet'}</div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4">
                <h4 className="font-semibold mb-2">Start New</h4>
                <Input placeholder="Recipient email" value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} />
                <div className="mt-2">
                  <Button onClick={async () => {
                    if (!recipientEmail) return;
                    const convId = await ensureConversation(user.email || '', recipientEmail);
                    setSelectedConversationId(convId);
                    setRecipientEmail('');
                  }}>Start</Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="p-4 flex flex-col h-[70vh]">
              <div className="flex-1 overflow-auto mb-4" ref={messagesRef}>
                {selectedConversationId ? (
                  <div className="space-y-3">
                    {messages.map((m) => (
                      <div key={m.id} className={`${m.senderEmail === user.email ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block px-3 py-2 rounded ${m.senderEmail === user.email ? 'bg-black text-white' : 'bg-cream-50 text-black'}`}>
                          {m.text}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{m.senderEmail}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground">Select a conversation or start a new one.</div>
                )}
              </div>

              <div className="flex gap-2">
                <Input placeholder="Write a message..." value={text} onChange={(e) => setText(e.target.value)} />
                <Button onClick={handleSend}>Send</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
