"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { auth, provider } from '../../firebase/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { useAuth } from "../../firebase/AuthProvider";
import { useRouter } from 'next/navigation';

type FormValues = {
  email: string;
  password: string;
};

export default function SignInPage({ onBack }: { onBack?: () => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const router = useRouter();
  const [notification, setNotification] = useState<string | null>(null);

  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data: FormValues) => {
    try {
      await signIn(data.email, data.password);
      setNotification('Signed in successfully!');
      setTimeout(() => {
        setNotification(null);
        router.push('/');
      }, 1200);
    } catch (err: any) {
      console.error(err);
      setNotification(err?.message || 'Sign in failed');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (!user.displayName || !user.email) throw new Error("Google account missing name or email");

      // Optionally create user in backend (guard against HTML error pages)
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: user.displayName, email: user.email, password: Math.random().toString(36).slice(-8) })
        });
        if (res.ok) {
          const data = await res.json();
          localStorage.setItem('user', JSON.stringify(data.user || {}));
        } else {
          console.warn('Backend create user returned', res.status);
        }
      } catch (e) {
        console.warn('Backend create user request failed', e);
      }

      router.push('/');
    } catch (err: any) {
      setError(err?.message || String(err));
      console.error(err);
      alert('An error occurred during Google signin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {notification}
        </div>
      )}

      <Card className="p-6 max-w-md w-full border border-black">
        <div className="mb-4 text-center">
          <Badge className="badge-brand text-black px-4 py-2">Welcome Back</Badge>
          <h2 className="text-2xl font-bold mt-2">Sign in to SleekRoad</h2>
        </div>

        <div className="mb-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-transform border border-gray-300"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            Sign in with Google
          </Button>
        </div>

        <div className="flex items-center justify-center mb-4">
          <span className="h-px w-full bg-gray-600"></span>
          <span className="px-3 text-gray-400">or</span>
          <span className="h-px w-full bg-gray-600"></span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="text-sm block mb-1">University email</label>
            <Input {...register('email', { required: true })} placeholder="you@university.edu" type="email" />
            {errors.email && <div className="text-sm text-destructive mt-1">Valid email is required</div>}
          </div>

          <div>
            <label className="text-sm block mb-1">Password</label>
            <Input {...register('password', { required: true, minLength: 6 })} type="password" placeholder="Enter your password" />
            {errors.password && <div className="text-sm text-destructive mt-1">Password must be at least 6 characters</div>}
          </div>

          <Button type="submit" variant="black" className="w-full">Sign in</Button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">Don't have an account? <a href="/signup" className="text-primary hover:underline">Sign up here</a></p>
        </div>
      </Card>
    </div>
  );
}