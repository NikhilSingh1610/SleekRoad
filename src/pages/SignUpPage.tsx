import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../firebase/AuthProvider';

type FormValues = {
  name: string;
  email: string;
  password: string;
};

export default function SignUpPage({ onBack }: { onBack?: () => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const { signUp } = useAuth();
  const { signInWithGoogle } = useAuth();

  const onSubmit = async (data: FormValues) => {
    try {
      await signUp(data.email, data.password);
      alert('Account created — demo flow');
    } catch (err: any) {
      console.error(err);
      alert(err?.message || 'Sign up failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="p-8 max-w-md w-full">
        <div className="mb-6 text-center">
          <Badge className="badge-brand text-black px-4 py-2">Create account</Badge>
          <h2 className="text-2xl font-bold mt-4">Sign up to SleekRoad</h2>
          <p className="text-sm text-muted-foreground mt-2">Join your campus community and start buying & selling.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm block mb-1">Full name</label>
            <Input {...register('name', { required: true })} placeholder="Jane Student" />
            {errors.name && <div className="text-sm text-destructive mt-1">Name is required</div>}
          </div>

          <div>
            <label className="text-sm block mb-1">University email</label>
            <Input {...register('email', { required: true })} placeholder="you@university.edu" type="email" />
            {errors.email && <div className="text-sm text-destructive mt-1">Valid email is required</div>}
          </div>

          <div>
            <label className="text-sm block mb-1">Password</label>
            <Input {...register('password', { required: true, minLength: 6 })} type="password" placeholder="Create a password" />
            {errors.password && <div className="text-sm text-destructive mt-1">Password must be at least 6 characters</div>}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button type="submit" variant="black" className="w-full sm:w-auto">Create account</Button>
            <Button variant="ghost" onClick={onBack} className="w-full sm:w-auto">Back</Button>
          </div>

          <div className="mt-4">
            <Button variant="outline" className="w-full" onClick={() => signInWithGoogle()}>Sign up with Google</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
