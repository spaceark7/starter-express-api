import {
  addBankAccountValidationSchema,
  addCompanyProfileValidationSchema,
  updateCompanyProfileValidationSchema,
} from '../utils/validations/company-validation.js'
import { prismaClient } from '../config/database.js'
import { ResponseError } from '../utils/response-error.js'
import { validate } from '../utils/validations/validation.js'

const addCompanyProfile = async (request, user) => {
  const { name, address, phone_number, website, tagline, logo } =
    await validate(addCompanyProfileValidationSchema, request)

  const result = await prismaClient.company.create({
    data: {
      name: name,
      user_id: parseInt(user.id),
      tagline: tagline,
      address: {
        create: {
          street: address.street,
          city: address.city,
          province: address.province,

          postal_code: address.postal_code,
        },
      },
      logo: logo ? logo : null,
      phone_number: phone_number,
      website: website ? website : null,
    },
  })

  if (!result) {
    throw new ResponseError(500, 'Failed to add company profile')
  }

  return result
}

const getCompanyProfile = async (user) => {
  const result = await prismaClient.company.findUnique({
    where: {
      user_id: parseInt(user.id),
    },

    select: {
      id: true,
      name: true,
      tagline: true,

      address: {
        select: {
          street: true,
          city: true,
          province: true,
          postal_code: true,
        },
      },
      logo: true,

      phone_number: true,
      website: true,
    },
  })

  if (!result) {
    throw new ResponseError(404, 'Failed to get company profile')
  }

  return {
    ...result,
    logo: {
      uri: result.logo,
    },
  }
}

const updateCompanyProfile = async (request, user) => {
  const { name, address, phone_number, tagline, website } = await validate(
    updateCompanyProfileValidationSchema,
    request
  )

  const result = await prismaClient.company.update({
    where: {
      id: parseInt(user.company_id),
    },
    data: {
      name: name,
      tagline: tagline,
      address: {
        update: {
          where: {
            id: parseInt(user.company_id),
          },
          data: {
            street: address.street,
            city: address.city,
            province: address.province,
            postal_code: address.postal_code,
          },
        },
      },
      phone_number: phone_number,
      logo: request?.logo?.uri ? request?.logo?.uri : null,
      website: website,
    },
  })
  if (!result) {
    throw new ResponseError(500, 'Failed to update company profile')
  }

  return result
}

const addBankAccount = async (request) => {
  const { account_name, account_number, bank_name } = await validate(
    addBankAccountValidationSchema,
    request
  )

  console.log({ account_name, account_number, bank_name })

  const alreadyExist = await prismaClient.bankAccount.findFirst({
    where: {
      account_number: account_number,
    },
  })

  console.log({ alreadyExist })

  if (alreadyExist) {
    throw new ResponseError(400, 'Bank account already exist')
  }

  const result = await prismaClient.bankAccount.create({
    data: {
      account_name: account_name,
      account_number: account_number,
      bank_name: bank_name,
    },
  })

  if (!result) {
    throw new ResponseError(500, 'Failed to add bank account')
  }

  return result
}

const getBankAccounts = async () => {
  const result = await prismaClient.bankAccount.findMany()

  if (!result) {
    throw new ResponseError(500, 'Failed to get bank account')
  }

  return result
}

const getBankAccountById = async (id) => {
  console.log({ id })
  const result = await prismaClient.bankAccount.findUnique({
    where: {
      id: parseInt(id),
    },

    select: {
      id: true,
      account_name: true,
      account_number: true,
      bank_name: true,
    },
  })

  if (!result) {
    throw new ResponseError(
      500,
      'Failed to get bank account or account not exist'
    )
  }

  return result
}

const updateBankAccount = async (request, bank_id) => {
  const { account_name, account_number, bank_name } = await validate(
    addBankAccountValidationSchema,
    request
  )

  const result = await prismaClient.bankAccount.update({
    where: {
      id: parseInt(bank_id),
    },

    data: {
      account_name: account_name,
      account_number: account_number,
      bank_name: bank_name,
    },

    select: {
      id: true,
      account_name: true,
      account_number: true,
      bank_name: true,
      updatedAt: true,
    },
  })

  if (!result) {
    throw new ResponseError(500, 'Failed to update bank account')
  }

  return result
}

export default {
  addCompanyProfile,
  getCompanyProfile,
  updateCompanyProfile,

  addBankAccount,
  getBankAccounts,
  getBankAccountById,
  updateBankAccount,
}
