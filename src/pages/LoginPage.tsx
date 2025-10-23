import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../firebase/AuthProvider';

type FormValues = {
  email: string;
  password: string;
};

export default function LoginPage({ onBack }: { onBack?: () => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const { signIn, signInWithGoogle } = useAuth();

  const onSubmit = async (data: FormValues) => {
    try {
      await signIn(data.email, data.password);
      alert('Signed in — demo flow');
    } catch (err: any) {
      console.error(err);
      alert(err?.message || 'Sign in failed');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert('Signed in with Google — demo flow');
    } catch (err: any) {
      console.error('Google sign in error', err);
      alert(err?.message || 'Google sign in failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4">
      <Card className="p-10 max-w-md w-full shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <div className="mb-8 text-center">
          <img src="/file.svg" alt="SleekRoad" className="h-16 w-auto mx-auto mb-4" />
          <Badge className="badge-brand text-black px-5 py-2 text-sm font-medium shadow-sm">Welcome back</Badge>
          <h2 className="text-3xl font-bold mt-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Sign in</h2>
          <p className="text-base text-muted-foreground mt-3">Sign in to access your account and listings.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="text-sm font-semibold block mb-2 text-gray-700">University email</label>
            <Input {...register('email', { required: true })} placeholder="you@university.edu" type="email" className="h-12 text-base bg-gray-50 border-gray-200 focus:bg-white transition-all duration-200" />
            {errors.email && <div className="text-sm text-red-600 mt-2 font-medium">Email is required</div>}
          </div>

          <div>
            <label className="text-sm font-semibold block mb-2 text-gray-700">Password</label>
            <Input {...register('password', { required: true })} type="password" placeholder="Your password" className="h-12 text-base bg-gray-50 border-gray-200 focus:bg-white transition-all duration-200" />
            {errors.password && <div className="text-sm text-red-600 mt-2 font-medium">Password is required</div>}
          </div>

          <div className="pt-2">
            <Button type="submit" variant="black" className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">Sign in</Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <Button variant="outline" className="w-full h-12 text-base font-semibold border-2 hover:bg-gray-50 transition-all duration-200" onClick={handleGoogleSignIn}>
            Sign in with Google
          </Button>

          <div className="text-center pt-2">
            <Button variant="ghost" onClick={onBack} className="text-gray-600 hover:text-gray-900">← Back to home</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
