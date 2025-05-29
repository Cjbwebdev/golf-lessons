
'use server';

import { z } from 'zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase'; // Ensure this path is correct

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
  success?: boolean;
};

export async function handleLogin(prevState: LoginState, formData: FormData): Promise<LoginState> {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields. Could not log in.',
      success: false,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { message: 'Login successful!', success: true };
  } catch (error: any) {
    let errorMessage = 'Login failed. Please try again.';
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      errorMessage = 'Invalid email or password.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email format.';
    }
    // console.error('Firebase login error:', error.code, error.message); // For server-side logging
    return { message: errorMessage, success: false };
  }
}
