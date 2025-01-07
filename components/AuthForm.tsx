'use client';

import React from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import Link from 'next/link'; // Import Link for navigation
import { SignupFormData } from '@/lib/schema';
import { LoginType } from '@/app/login/LoginTypes';

type Props = {
  type: 'signup' | 'login';
  schema: z.ZodSchema;
  onSubmit: (data: SignupFormData | LoginType) => void; // Use SignupFormData type here
};

export const AuthForm: React.FC<Props> = ({ type, schema, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data as SignupFormData | LoginType); // Cast data to the correct type
  };

  return (
    <>
      {/* Form */}
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className='space-y-4 w-[90%] md:w-1/2 '
      >
        {type === 'login' && (
          <h1 className='text-lg text-center sm:text-2xl font-bold mb-6 '>
            Welcome Back! Please log in.
          </h1>
        )}
        {type === 'signup' && (
          <h1 className='text-lg text-center sm:text-2xl font-bold mb-6 '>
            Create Your Account to Get Started
          </h1>
        )}

        {type === 'signup' && (
          <div>
            <Label htmlFor='name' className=''>
              Name
            </Label>
            <Input
              id='name'
              placeholder='Name'
              {...register('name')}
              className=''
            />
            {errors.name && (
              <p className='text-red text-sm'>
                {String(errors.name.message)} {/* Cast to string */}
              </p>
            )}
          </div>
        )}

        <div>
          <Label htmlFor='email' className=''>
            Email
          </Label>
          <Input
            id='email'
            placeholder='Email'
            type='email'
            {...register('email')}
            className=''
          />
          {errors.email && (
            <p className='text-red text-sm'>
              {String(errors.email.message)} {/* Cast to string */}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor='password' className=''>
            Password
          </Label>
          <Input
            id='password'
            placeholder='Password'
            type='password'
            {...register('password')}
            className=''
          />
          {errors.password && (
            <p className='text-red text-sm'>
              {String(errors.password.message)} {/* Cast to string */}
            </p>
          )}
        </div>

        <Button
          type='submit'
          className='w-full bg-secondary hover:bg-bisque hover:text-black'
        >
          {type === 'signup' ? 'Sign Up' : 'Log In'}
        </Button>

        {/* Links to switch between Login and Signup */}
        {type === 'login' && (
          <div className='mt-4 text-center'>
            <p>
              Don&apos;t have an account?{' '}
              <Link href='/signup'>
                <span className=' hover:underline hover:text-secondary font-semibold'>
                  Sign up
                </span>
              </Link>
            </p>
          </div>
        )}

        {type === 'signup' && (
          <div className='mt-4 text-center'>
            <p>
              Already have an account?{' '}
              <Link href='/login'>
                <span className=' hover:underline font-semibold'>Log in</span>
              </Link>
            </p>
          </div>
        )}
      </form>
    </>
  );
};
