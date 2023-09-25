import * as yup from 'yup'

export const addCustomerValidationSchema = yup.object({
  name: yup.string().required('Customer name is required'),
  address: yup.object({
    street: yup.string().required('Street is required'),
    city: yup.string().required('City is required'),
    province: yup.string().required('Province is required'),
    postal_code: yup.string(),
  }),
  attention: yup.string(),
  phone_number: yup.string().required('Customer phone is required'),
  email: yup.string(),
})

export const updateCustomerValidationSchema = yup.object({
  name: yup.string('Customer name must be string'),
  address: yup.object({
    street: yup.string(),
    city: yup.string(),
    province: yup.string(),
    postal_code: yup.string(),
  }),
  attention: yup.string(),
  phone_number: yup.string('Customer phone must be string'),
  email: yup.string('Customer email must be string'),
})
