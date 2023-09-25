import { prismaClient } from '../config/database.js'
import { ResponseError } from '../utils/response-error.js'
import {
  changePasswordValidationSchema,
  loginValidationSchema,
  registerValidationSchema,
  updateValidationSchema,
} from '../utils/validations/user-validation.js'
import { validate } from '../utils/validations/validation.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const register = async (request) => {
  const user = await validate(registerValidationSchema, request)

  const isExist = await prismaClient.user.count({
    where: {
      AND: {
        OR: [
          {
            email: user.email,
          },
          {
            phone_number: user.phone_number,
          },
        ],
      },
    },
  })

  if (isExist > 0) {
    throw new ResponseError(
      400,
      'User with this email or phone number already exist'
    )
  }

  user.password = await bcrypt.hash(user.password, 10)
  const newUser = await prismaClient.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: user.password,
      phone_number: user.phone_number,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone_number: true,
      createdAt: true,
    },
  })

  return newUser
}

const login = async (request) => {
  const { email, password, phone_number } = await validate(
    loginValidationSchema,
    request
  )

  // find unique user based on email or phone number
  const user = await prismaClient.user.findFirst({
    where: {
      OR: [
        {
          email: {
            equals: email,
          },
        },
        {
          phone_number: {
            equals: phone_number,
          },
        },
      ],
    },
    include: {
      company: true,
    },
  })

  console.log('user', user)

  if (!user) {
    throw new ResponseError(
      400,
      'User with this email or phone number not exist'
    )
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    throw new ResponseError(401, 'Password not match')
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      company_id: user?.company?.id ? user?.company?.id : null,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    }
  )

  return token
}

const getUser = async (user) => {
  const result = await prismaClient.user.findFirst({
    where: {
      id: user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone_number: true,
      createdAt: true,
    },
  })

  return result
}

const updateUser = async (user, request) => {
  const { name, email, phone_number } = await validate(
    updateValidationSchema,
    request
  )

  const result = await prismaClient.user.update({
    where: {
      id: user.id,
    },
    data: {
      name: name,
      email: email,
      phone_number: phone_number,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone_number: true,
      createdAt: true,
    },
  })

  if (!result) {
    throw new ResponseError(500, 'Failed to update user')
  }

  return result
}

const changeUserPassword = async (user, request) => {
  const { old_password, new_password, confirm_new_password } = await validate(
    changePasswordValidationSchema,
    request
  )

  console.log('user', user)

  const updatedUser = await prismaClient.user.findUnique({
    where: {
      id: user.id,
    },

    select: {
      id: true,
      password: true,
    },
  })

  if (!updatedUser) {
    throw new ResponseError(404, 'User not found')
  }

  const passwordMatch = await bcrypt.compare(old_password, updatedUser.password)

  if (!passwordMatch) {
    throw new ResponseError(401, 'Password not match')
  }

  const newPassword = await bcrypt.hash(new_password, 10)

  const result = await prismaClient.user.update({
    where: {
      id: updatedUser.id,
    },
    data: {
      password: newPassword,
    },

    select: {
      id: true,
    },
  })

  if (!result) {
    throw new ResponseError(500, 'Failed to update user password')
  }

  return
}

export default {
  register,
  login,
  getUser,
  updateUser,
  changeUserPassword,
}
