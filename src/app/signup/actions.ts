
'use server';

import { z } from 'zod';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase'; // Ensure this path is correct

const SignUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export type SignUpState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
  success?: boolean;
};

export async function handleSignUp(prevState: SignUpState, formData: FormData): Promise<SignUpState> {
  const validatedFields = SignUpSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields. Could not create account.',
      success: false,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    // Firebase automatically signs the user in on successful account creation.
    return { message: 'Account created successfully! You are now logged in.', success: true };
  } catch (error: any) {
    let errorMessage = 'Sign up failed. Please try again.';
     if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'This email address is already in use.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email format.';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password is too weak. Please choose a stronger password.';
    }
    // console.error('Firebase sign up error:', error.code, error.message); // For server-side logging
    return { message: errorMessage, success: false };
  }
}

