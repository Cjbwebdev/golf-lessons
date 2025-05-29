
"use client";

import { useActionState, useFormStatus } from 'react'; // Changed from 'react-dom' and useFormState
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Alert for general messages will be replaced by toast
import { Loader2, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { handleSignUp, type SignUpState } from './actions'; // Added type SignUpState import
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from "@/hooks/use-toast"; // Import useToast

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating account...
        </>
      ) : (
        <>
          <UserPlus className="mr-2 h-4 w-4" />
          Create Account
        </>
      )}
    </Button>
  );
}

export default function SignUpPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast(); // Initialize toast

  const initialState: SignUpState = { message: null, errors: {}, success: false };
  const [state, dispatch] = useActionState(handleSignUp, initialState); // Changed from useFormState

  useEffect(() => {
    // This effect handles redirection if the user becomes authenticated
    // (e.g., after successful Firebase sign-up which auto-logs in, or if already logged in)
    if (user && !authLoading) {
      router.push('/'); 
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    // This effect handles showing toast messages based on the form submission state
    if (state.success && state.message) {
      toast({
        title: "Account Created!",
        description: state.message + " You will be redirected shortly.",
        duration: 5000, // Show toast for 5 seconds
      });
      // The redirection will be primarily handled by the auth state change effect above.
    } else if (!state.success && state.message && (!state.errors || Object.keys(state.errors).length === 0)) {
      // Show a general error toast if there's a message, no success, AND no specific field errors
      toast({
        title: "Sign Up Failed",
        description: state.message,
        variant: "destructive",
      });
    }
    // Field-specific errors (state.errors) are displayed inline below their respective input fields.
  }, [state.success, state.message, state.errors, toast]);


  if (authLoading || (user && !state.success)) { 
    // Show loader if auth is loading or if user is logged in (and not immediately after a successful signup action)
    // This helps prevent flashing the signup form if already logged in.
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
          <CardTitle className="text-3xl text-primary">Create Account</CardTitle>
          <CardDescription>Join TeeTime Trainer today!</CardDescription>
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
              <Input id="password" name="password" type="password" placeholder="••••••••" required />
              {state.errors?.password && <p className="text-sm text-destructive">{state.errors.password.join(', ')}</p>}
            </div>
            
            {/* General non-field error messages and success messages are now handled by toasts */}
            {/* Removed Alert components for state.message to avoid redundancy with toasts */}

          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <SubmitButton />
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Log in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

