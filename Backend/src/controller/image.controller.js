
import multer from 'multer';
import path from 'path';
import { storage } from '../config/Cloudinary.js';



const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const mimeTypeOk = allowedTypes.test(file.mimetype);
    const extNameOk = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimeTypeOk && extNameOk) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

/* Upload Image Handler */
export const uploadImage = [
  upload.single('image'),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({
      message: 'Image uploaded successfully!',
      fileUrl: req.file.path,
    });
  },
];