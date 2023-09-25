import * as yup from 'yup'

export const addProductValidationSchema = yup.object({
  name: yup.string().required('Product name is required'),
  specification: yup.string().required('Product specification is required'),
  price: yup.number().required('Product price is required'),
  unit: yup.string().required('Product unit is required'),
})

export const addManyProductsValidationSchema = yup
  .array()
  .of(
    yup.object({
      name: yup.string().required('Product name is required'),
      specification: yup.string().required('Product specification is required'),
      price: yup.number().required('Product price is required'),
      unit: yup.string().required('Product unit is required'),
    })
  )
  .min(1)
  .required('Products is required')

export const updateProductValidationSchema = yup.object({
  name: yup.string('Product name must be string'),
  specification: yup.string('Product specification must be string'),
  price: yup.number('Product price must be number'),
  unit: yup.string('Product unit must be string'),
})
