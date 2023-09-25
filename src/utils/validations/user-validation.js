import * as yup from 'yup'

export const registerValidationSchema = yup.object({
  name: yup.string(),
  email: yup.string().email().required('Email is required'),
  phone_number: yup
    .string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .required('Phone number is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required(),
  confirm_password: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

export const loginValidationSchema = yup.object({
  email: yup.string().email().required('Email is required'),
  phone_number: yup.string().matches(/^[0-9]+$/, 'Must be only digits'),

  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required(),
})

export const updateValidationSchema = yup.object({
  name: yup.string(),
  email: yup.string().email(),
  phone_number: yup
    .string()
    .matches(/^[0-9]+$/, 'Phone number Must be only digits'),
})

export const changePasswordValidationSchema = yup.object({
  old_password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required(),
  new_password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required(),
  confirm_new_password: yup
    .string()
    .required()
    .oneOf([yup.ref('new_password'), null], 'Passwords must match'),
})
