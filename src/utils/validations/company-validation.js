import * as yup from 'yup'

// needed to add this to make the validation work
export const addCompanyProfileValidationSchema = yup.object({
  name: yup.string().required('Name is required'),
  tagline: yup.string().required('Tagline is required'),
  address: yup
    .object({
      street: yup.string().required('Street is required'),
      city: yup.string().required('City is required'),
      province: yup.string().required('Province is required'),
      postal_code: yup.string().required('Postal code is required'),
    })
    .required('Address is required'),
  phone_number: yup.string().required('Phone number is required'),
  logo: yup.string().required('Logo is required'),
  website: yup.string(),
})

export const updateCompanyProfileValidationSchema = yup.object({
  name: yup.string().required('Name is required'),
  tagline: yup.string(),
  address: yup
    .object({
      street: yup.string().required('Street is required'),
      city: yup.string().required('City is required'),
      province: yup.string().required('Province is required'),

      postal_code: yup.string().required('Postal code is required'),
    })
    .required('Address is required'),
  phone_number: yup.string(),

  website: yup.string(),
})

export const addBankAccountValidationSchema = yup.object({
  bank_name: yup.string().required('Bank name is required'),
  account_name: yup.string().required('Account name is required'),
  account_number: yup.string().required('Account number is required'),
})

export const updateBankAccountValidationSchema = yup.object({
  bank_name: yup.string(),
  account_name: yup.string(),
  account_number: yup.string(),
})
