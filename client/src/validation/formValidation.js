import * as yup from 'yup';

export const registerValidation = yup.object({
  username: yup.string()
    .min(3, 'Username is too short')
    .max(20, 'Username is too long')
    .required('Username is required'),
  email: yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
});

export const loginValidation = yup.object({
  email: yup.string()
    .email('Invalid email address')
    .required('Email is required'), 
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
});

export const todoValidation = yup.object({
  text: yup.string().min(1,'Todo cannot be empty').required('Todo text is required'),
  avatar: yup
  .mixed()
  .required('File is required')
  .test(
    'fileType',
    'Unsupported File Format',
    (value) => {
      console.log(value)
      if (!value) return false;
      const supportedFormats = [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'image/webp',
      ];

      return supportedFormats.includes(value.type);
    }
  )
});

export const forgetPasswordValidation = yup.object({
     email: yup.string()
    .email('Invalid email address')
    .required('Email is required'),
})
export const resetPasswordValidation = yup.object({
    password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
})