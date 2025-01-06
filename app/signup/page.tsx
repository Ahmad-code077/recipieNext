'use client';

import { AuthForm } from '@/components/AuthForm';
import { useShowToast } from '@/components/Toasts/DestructiveToast';
import { signupSchema } from '@/lib/schema';
import { useRouter } from 'next/navigation';
import { SignupFormData } from './signupTypes';

// Define the type for the signup form data

export default function SignupPage() {
  const router = useRouter();
  const showToast = useShowToast();

  const handleSignup = async (data: SignupFormData) => {
    try {
      // Fetch existing users from the JSON server
      const response = await fetch('http://localhost:5000/users');
      const users = await response.json();

      // Check if the email already exists
      if (users.some((u: { email: string }) => u.email === data.email)) {
        showToast({
          title: 'User Already Exists',
          description: 'The email you entered is already registered.',
          variant: 'destructive',
        });
        return;
      }

      // Add the new user to the JSON server
      const addUserResponse = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!addUserResponse.ok) {
        throw new Error('Failed to add user to database');
      }

      const { password, ...restofData } = data; // Destructure password out
      // Save the new user to localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(restofData));

      showToast({
        title: 'Signup Successful!',
        description: `Welcome, ${data.email}!`,
      });

      router.push('/');
    } catch (error) {
      console.error('Error during signup:', error);
      showToast({
        title: 'Signup Failed',
        description: 'An error occurred while signing up. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <AuthForm type='signup' schema={signupSchema} onSubmit={handleSignup} />
    </div>
  );
}
