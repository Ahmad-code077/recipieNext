'use client';

import { AuthForm } from '@/components/AuthForm';
import { useRouter } from 'next/navigation';
import { loginSchema } from '@/lib/schema';
import { useShowToast } from '@/components/Toasts/DestructiveToast';
import { LoginType } from './LoginTypes';

export default function LoginPage() {
  const router = useRouter();
  const showToast = useShowToast();

  const handleLogin = async (data: LoginType) => {
    try {
      // Fetch users from the JSON server
      const response = await fetch('http://localhost:5000/users');
      const users = await response.json();

      // Find the user with matching email and password
      const user = users.find(
        (u: LoginType) => u.email === data.email && u.password === data.password
      );

      if (!user) {
        showToast({
          title: 'Invalid Credentials',
          description: 'Please check your email and password.',
          variant: 'destructive',
        });
        return;
      }

      // Extracting password and storing rest of the user data
      const { password, ...restOfData } = user; // Destructure and exclude password

      // Save the logged-in user to localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(restOfData));
      showToast({
        title: 'Login Successful!',
        description: `Welcome back, ${user.email}!`,
      });

      router.push('/');
    } catch (error) {
      console.error('Error during login:', error);
      showToast({
        title: 'Error',
        description: 'An error occurred while logging in. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <AuthForm type='login' schema={loginSchema} onSubmit={handleLogin} />
    </div>
  );
}
