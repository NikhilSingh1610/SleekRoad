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
import { useRouter } from 'next/navigation'; // Import useRouter

type FormValues = {
  email: string;
  password: string;
};

export default function SignInPage({ onBack }: { onBack?: () => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const router = useRouter(); // Initialize router
  const [notification, setNotification] = useState<string | null>(null); // Add notification state

  const { signIn } = useAuth();
  const { signInWithGoogle } = useAuth();
   const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [user, setUser] = useState<any>(null);

  const onSubmit = async (data: FormValues) => {
    try {
      await signIn(data.email, data.password);
      setNotification('Signed in successfully!'); // Set success notification
      setTimeout(() => {
        setNotification(null); // Clear notification after 2 seconds
        router.push('/'); // Redirect to the homepage
      }, 2000);
    } catch (err: any) {
      console.error(err);
      setNotification(err?.message || 'Sign in failed'); // Set error notification
      setTimeout(() => setNotification(null), 3000); // Clear notification after 3 seconds
    }
  };

  const handleGoogleSignIn = async () => {
    try {
        setLoading(true);
        setError('');
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        if (!user.displayName || !user.email) throw new Error("Google account missing name or email");
  
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: user.displayName,
            email: user.email,
            password: Math.random().toString(36).slice(-8),
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Google sign in failed");
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert('Google signin successful');
        router.push('/'); // Redirect to home page
      } catch (err) {
        setError(err.message);
        console.error(err);
        alert('An error occurred during Google signup');
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

        <div className="">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 hover:scale-105 transition-transform border border-gray-300"
            onClick={handleGoogleSignIn} // Updated to use handleGoogleSignIn
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-5 h-5"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.1 0 5.9 1.2 8 3.1l6-6C34.2 3.2 29.4 1 24 1 14.6 1 6.6 6.8 3.4 15l7 5.4C12.2 13.2 17.6 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.5 24c0-1.6-.2-3.1-.5-4.5H24v9h12.7c-1.1 3.2-3.2 5.9-6 7.7l7 5.4c4.1-3.8 6.8-9.4 6.8-15.6z"
              />
              <path
                fill="#FBBC05"
                d="M10.4 28.4c-1-3.2-1-6.6 0-9.8l-7-5.4c-2.6 5.2-2.6 11.4 0 16.6l7-5.4z"
              />
              <path
                fill="#34A853"
                d="M24 46.5c5.4 0 10.2-1.8 13.6-4.9l-7-5.4c-2 1.3-4.5 2.1-6.6 2.1-6.4 0-11.8-3.7-14.4-9.1l-7 5.4c3.2 8.2 11.2 14 21 14z"
              />
              <path fill="none" d="M0 0h48v48H0z" />
            </svg>
            Sign in with Google
          </Button>
        </div>

        <div className="flex items-center justify-center">
          <span className="h-px w-full bg-gray-600"></span>
          <span className="px-3 text-gray-400">or</span>
          <span className="h-px w-full bg-gray-600"></span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="text-sm block mb-1">University email</label>
            <Input
              {...register("email", { required: true })}
              placeholder="you@university.edu"
              type="email"
            />
            {errors.email && <div className="text-sm text-destructive mt-1">
              Valid email is required
            </div>}
          </div>

          <div>
            <label className="text-sm block mb-1">Password</label>
            <Input
              {...register("password", { required: true, minLength: 6 })}
              type="password"
              placeholder="Enter your password"
            />
            {errors.password && <div className="text-sm text-destructive mt-1">
              Password must be at least 6 characters
            </div>}
          </div>

          <Button
            type="submit"
            variant="black"
            className="w-full hover:bg-gray-800 hover:scale-105 transition-transform"
          >
            Sign in
          </Button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <a href="/signup" className="text-primary hover:underline">
              Sign up here
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
}