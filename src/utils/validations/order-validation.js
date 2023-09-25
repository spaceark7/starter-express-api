import * as yup from 'yup'

export const addOrderValidationSchema = yup.object({
  user_id: yup.number().required(`user is required`),
  customer: yup.number().required(`customer is required`),
  status: yup.string().required(`status is required`),
  order_product: yup
    .array()
    .of(
      yup.object({
        product_id: yup.number().required('product_id is required'),
        product_name: yup.string().required('product_name is required'),
        price: yup.number().required('price is required'),
        unit: yup.string().required('unit is required'),
        discount: yup.number().required('discount is required'),
        qty: yup.number().required('quantity is required'),
        amount: yup.number().required('amount is required'),
      })
    )
    .required('order_products is required'),
  order_detail: yup
    .object({
      notes: yup.string(),
      customer_attention: yup.string(),
      valid_until: yup.date(),
      down_payment: yup.number(),
      discount_amount: yup.number(),
      bank_accounts: yup
        .array()
        .of(
          yup.object({
            id: yup.number().required('bank is required'),
          })
        )
        .required('bank_accounts is required'),
      total_amount: yup.number().required('total_amount is required'),
    })
    .required('order_detail is required'),
})
