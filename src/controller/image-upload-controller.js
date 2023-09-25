import imageUploadServices from '../services/image-upload-services.js'

const AuthImageUpload = async (req, res, next) => {
  try {
    const image = await imageUploadServices.uploadImage(req.query)
    res.status(201).json({
      status: 'success',
      message: 'Image added successfully',
      data: image,
    })
  } catch (error) {
    next(error)
  }
}

export default {
  AuthImageUpload,
}
