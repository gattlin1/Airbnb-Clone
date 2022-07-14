import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  textArea?: boolean;
};

function InputField({
  label,
  textArea = false,
  size: _,
  ...props
}: InputFieldProps) {
  const [field, { error }] = useField(props);
  const classes = `text-sm border rounded focus:outline-none focus:shadow-outline text-gray-700 appearance-none leading-loose pl-2 w-full h-12 ${
    error ? 'border-red-500' : ''
  }`;

  let InputOrTextArea = null;
  if (textArea) InputOrTextArea = <textarea className={classes} cols={4} />;
  else {
    InputOrTextArea = (
      <input
        type='text'
        className={classes}
        placeholder={props.placeholder}
        {...field}
        {...props}
      />
    );
  }

  return (
    <div className='w-full'>
      <div className='mb-2'>
        <label className='text-sm '>{label}</label>
      </div>
      <div className='mb-2'>{InputOrTextArea}</div>
      {error && <div className='text-red-500 text-sm mb-2'>{error}</div>}
    </div>
  );
}

export default InputField;
