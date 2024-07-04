import Product from './../models/productModel.js';
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

export const uploadProductPhoto = upload.single('thumbnail');

export const getAllProducts = async (req, res, next) => {
  try {
    let filter = {};
    if (req.params.categoryName) {
      const category = await Category.findOne({
        title: req.params.categoryName,
      });

      filter = { category: category.id };
    }

    const products = await Product.find(filter);
    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;

    // Upload image to Cloudinary
    const cldRes = await handleUpload(dataURI);

    const newProduct = await Product.create({
      ...req.body,
      thumbnail: cldRes.secure_url,
    });
    res.status(201).json({
      status: 'success',
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    let updateData = { ...req.body };

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;

      // Upload image to Cloudinary
      const cldRes = await handleUpload(dataURI);

      // Add the secure URL to the update data
      updateData.thumbnail = cldRes.secure_url;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
