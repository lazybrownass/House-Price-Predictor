import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Must be at least 3 characters')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          'Must contain at least one uppercase letter, one lowercase letter, and one number'
        )
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required')
    }),
    onSubmit: async (values) => {
      try {
        setError(null);
        
        // Register user
        await axios.post('http://localhost:8000/api/auth/register', {
          username: values.username,
          email: values.email,
          password: values.password
        });

        // Login after successful registration
        const loginResponse = await axios.post('http://localhost:8000/api/auth/token', {
          username: values.username,
          password: values.password
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });

        localStorage.setItem('token', loginResponse.data.access_token);
        navigate('/profile');
      } catch (error: any) {
        setError(error.response?.data?.detail || 'Registration failed');
      }
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div>
          <div className="flex justify-center">
            <UserPlus className="h-12 w-12 text-indigo-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </a>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-md">
              {error}
            </div>
          )}

          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Username
              </label>
              <input
                id="username"
                type="text"
                {...formik.getFieldProps('username')}
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border
                  border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400
                  text-gray-900 dark:text-white rounded-md focus:outline-none
                  focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm
                  dark:bg-gray-700 transition-colors duration-200
                  ${formik.touched.username && formik.errors.username
                    ? 'border-red-300 text-red-900 placeholder-red-300'
                    : ''
                  }`}
                placeholder="Choose a username"
              />
              {formik.touched.username && formik.errors.username && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {formik.errors.username}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...formik.getFieldProps('email')}
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border
                  border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400
                  text-gray-900 dark:text-white rounded-md focus:outline-none
                  focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm
                  dark:bg-gray-700 transition-colors duration-200
                  ${formik.touched.email && formik.errors.email
                    ? 'border-red-300 text-red-900 placeholder-red-300'
                    : ''
                  }`}
                placeholder="Enter your email"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...formik.getFieldProps('password')}
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border
                  border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400
                  text-gray-900 dark:text-white rounded-md focus:outline-none
                  focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm
                  dark:bg-gray-700 transition-colors duration-200
                  ${formik.touched.password && formik.errors.password
                    ? 'border-red-300 text-red-900 placeholder-red-300'
                    : ''
                  }`}
                placeholder="Create a strong password"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...formik.getFieldProps('confirmPassword')}
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border
                  border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400
                  text-gray-900 dark:text-white rounded-md focus:outline-none
                  focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm
                  dark:bg-gray-700 transition-colors duration-200
                  ${formik.touched.confirmPassword && formik.errors.confirmPassword
                    ? 'border-red-300 text-red-900 placeholder-red-300'
                    : ''
                  }`}
                placeholder="Confirm your password"
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {formik.errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent
                text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                ${formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {formik.isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage; 