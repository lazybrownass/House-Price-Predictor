import React from 'react';
import { FormikProps } from 'formik';
import { AlertCircle } from 'lucide-react';

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  step?: string;
  min?: string;
  max?: string;
  tooltip?: string;
  formik: FormikProps<any>;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type,
  step,
  min,
  max,
  tooltip,
  formik,
}) => {
  const hasError = formik.touched[name] && formik.errors[name];

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {label}
        {tooltip && (
          <div className="group relative ml-1">
            <AlertCircle className="h-4 w-4 text-gray-400" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
              {tooltip}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        )}
      </label>
      <input
        id={name}
        type={type}
        step={step}
        min={min}
        max={max}
        {...formik.getFieldProps(name)}
        className={`mt-1 block w-full rounded-md shadow-sm text-sm
          ${
            hasError
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500'
          }
          dark:bg-gray-700 dark:text-white transition-colors duration-200`}
      />
      {hasError && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
        </div>
      )}
      {hasError && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
          {formik.errors[name] as string}
        </p>
      )}
    </div>
  );
};

export default FormField; 