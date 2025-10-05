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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl mb-4">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
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
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
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
