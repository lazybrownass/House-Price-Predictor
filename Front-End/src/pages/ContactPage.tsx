import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Required')
    .min(2, 'Must be at least 2 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  subject: Yup.string()
    .required('Required')
    .min(5, 'Must be at least 5 characters'),
  message: Yup.string()
    .required('Required')
    .min(10, 'Must be at least 10 characters')
});

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitError(null);
        const response = await axios.post('http://localhost:8000/api/contact/submit', values);
        
        if (response.data.status === 'success') {
          setSubmitted(true);
          resetForm();
        } else {
          setSubmitError('Failed to send message. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitError('An error occurred while sending your message. Please try again later.');
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <Mail className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Have questions about our house price predictor? We're here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Get in Touch
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mt-1" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Email
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      support@housepredictor.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mt-1" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Phone
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      +92 300 1234567
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mt-1" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Office
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                    852-B Milaad Street, Block B,<br/> Faisal Town,<br />
                      Lahore, Pakistan
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-200 mb-2">
                Business Hours
              </h3>
              <p className="text-indigo-700 dark:text-indigo-300">
                Monday - Friday: 9:00 AM - 5:00 PM PST<br />
                Saturday - Sunday: Closed
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send us a Message
              </h2>
              
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Thank you for your message!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        {...formik.getFieldProps('name')}
                        className={`block w-full rounded-md shadow-sm text-sm
                          ${formik.touched.name && formik.errors.name
                            ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500'
                          }
                          dark:bg-gray-700 dark:text-white transition-colors duration-200`}
                      />
                      {formik.touched.name && formik.errors.name && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                          {formik.errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        {...formik.getFieldProps('email')}
                        className={`block w-full rounded-md shadow-sm text-sm
                          ${formik.touched.email && formik.errors.email
                            ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500'
                          }
                          dark:bg-gray-700 dark:text-white transition-colors duration-200`}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                          {formik.errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      {...formik.getFieldProps('subject')}
                      className={`block w-full rounded-md shadow-sm text-sm
                        ${formik.touched.subject && formik.errors.subject
                          ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500'
                        }
                        dark:bg-gray-700 dark:text-white transition-colors duration-200`}
                    />
                    {formik.touched.subject && formik.errors.subject && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                        {formik.errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      {...formik.getFieldProps('message')}
                      className={`block w-full rounded-md shadow-sm text-sm
                        ${formik.touched.message && formik.errors.message
                          ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500'
                        }
                        dark:bg-gray-700 dark:text-white transition-colors duration-200`}
                    />
                    {formik.touched.message && formik.errors.message && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                        {formik.errors.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={formik.isSubmitting}
                      className={`w-full flex justify-center items-center px-6 py-3 text-white font-semibold rounded-lg shadow-md
                        ${formik.isSubmitting
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-indigo-600 hover:bg-indigo-700'
                        } 
                        transition-colors duration-200`}
                    >
                      {formik.isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {submitError && (
                <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
                  {submitError}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 