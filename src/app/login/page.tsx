
"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, LogIn } from 'lucide-react';
import Link from 'next/link';
import { handleLogin } from './actions';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Logging in...
        </>
      ) : (
        <>
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </>
      )}
    </Button>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(handleLogin, initialState);

  useEffect(() => {
    if (user && !authLoading) {
      router.push('/'); // Redirect if already logged in
    }
  }, [user, authLoading, router]);
  
  useEffect(() => {
    if (state.success) {
      router.push('/'); // Redirect to dashboard or home on successful login
    }
  }, [state.success, router]);

  if (authLoading || user) {
     // Show a loader or null while checking auth state or if user is already logged in and redirecting
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }


  return (
    <div className="flex justify-center items-center py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-primary">Login</CardTitle>
          <CardDescription>Access your TeeTime Trainer account.</CardDescription>
        </CardHeader>
        <form action={dispatch}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
              {state.errors?.email && <p className="text-sm text-destructive">{state.errors.email.join(', ')}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
              {state.errors?.password && <p className="text-sm text-destructive">{state.errors.password.join(', ')}</p>}
            </div>
            
            {state.message && !state.success && (
              <Alert variant="destructive">
                <AlertTitle>Login Failed</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <SubmitButton />
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-semibold text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
