import Category from './../models/categoryModal.js';

import Multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: 'auto',
  });
  return res;
}

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

export const uploadCategorPhoto = upload.single('thumbnail');

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      status: 'success',
      results: categories.length,
      data: {
        categories,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      'products'
    );

    res.status(200).json({
      status: 'success',
      data: {
        category,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;

    // Upload image to Cloudinary
    const cldRes = await handleUpload(dataURI);
    const newCategory = await Category.create({
      ...req.body,
      thumbnail: cldRes.secure_url,
    });
    res.status(201).json({
      status: 'success',
      data: {
        category: newCategory,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    let updateData = { ...req.body };
    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;

      // Upload image to Cloudinary
      const cldRes = await handleUpload(dataURI);
      updateData.thumbnail = cldRes.secure_url;
    }
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: {
        category,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
