import companyService from '../services/company-services.js'

const addCompanyProfile = async (req, res, next) => {
  try {
    const company = await companyService.addCompanyProfile(req.body, req.user)
    res.status(201).json({
      status: 'success',
      message: 'Company profile added successfully',
      data: company,
    })
  } catch (error) {
    next(error)
  }
}

const getCompanyProfile = async (req, res, next) => {
  try {
    const company = await companyService.getCompanyProfile(req.user)
    res.status(200).json({
      status: 'success',
      message: 'Company profile fetched successfully',
      data: company,
    })
  } catch (error) {
    next(error)
  }
}

const updateCompanyProfile = async (req, res, next) => {
  try {
    const company = await companyService.updateCompanyProfile(
      req.body,
      req.user
    )
    res.status(200).json({
      status: 'success',
      message: 'Company profile updated successfully',
      data: company,
    })
  } catch (error) {
    next(error)
  }
}

const addBankAccount = async (req, res, next) => {
  try {
    const bankAccount = await companyService.addBankAccount(req.body)
    res.status(201).json({
      status: 'success',
      message: 'Bank account added successfully',
      data: bankAccount,
    })
  } catch (error) {
    next(error)
  }
}

const getBankAccount = async (req, res, next) => {
  try {
    const bankAccount = await companyService.getBankAccountById(req.params.id)
    res.status(200).json({
      status: 'success',
      message: 'Bank account fetched successfully',
      data: bankAccount,
    })
  } catch (error) {
    next(error)
  }
}

const getBankAccounts = async (req, res, next) => {
  try {
    const bankAccounts = await companyService.getBankAccounts()
    res.status(200).json({
      status: 'success',
      message: 'Bank accounts fetched successfully',
      data: bankAccounts,
    })
  } catch (error) {
    next(error)
  }
}

const updateBankAccount = async (req, res, next) => {
  try {
    const bankAccount = await companyService.updateBankAccount(
      req.body,
      req.params.id
    )
    res.status(200).json({
      status: 'success',
      message: 'Bank account updated successfully',
      data: bankAccount,
    })
  } catch (error) {
    next(error)
  }
}

export default {
  addCompanyProfile,
  getCompanyProfile,
  updateCompanyProfile,
  addBankAccount,
  getBankAccount,
  getBankAccounts,
  updateBankAccount,
}
