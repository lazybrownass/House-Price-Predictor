import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Required'),
      password: Yup.string()
        .required('Required')
    }),
    onSubmit: async (values) => {
      try {
        setError(null);
        const response = await axios.post('http://localhost:8000/api/auth/token', {
          username: values.username,
          password: values.password
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });

        localStorage.setItem('token', response.data.access_token);
        navigate('/profile');
      } catch (error) {
        setError('Invalid username or password');
      }
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div>
          <div className="flex justify-center">
            <LogIn className="h-12 w-12 text-indigo-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{' '}
            <a
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              create a new account
            </a>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-md">
              {error}
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                type="text"
                {...formik.getFieldProps('username')}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border
                  border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400
                  text-gray-900 dark:text-white rounded-t-md focus:outline-none
                  focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm
                  dark:bg-gray-700 transition-colors duration-200
                  ${formik.touched.username && formik.errors.username
                    ? 'border-red-300 text-red-900 placeholder-red-300'
                    : ''
                  }`}
                placeholder="Username"
              />
              {formik.touched.username && formik.errors.username && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {formik.errors.username}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...formik.getFieldProps('password')}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border
                  border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400
                  text-gray-900 dark:text-white rounded-b-md focus:outline-none
                  focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm
                  dark:bg-gray-700 transition-colors duration-200
                  ${formik.touched.password && formik.errors.password
                    ? 'border-red-300 text-red-900 placeholder-red-300'
                    : ''
                  }`}
                placeholder="Password"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {formik.errors.password}
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
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage; 