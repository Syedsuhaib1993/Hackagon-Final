import express from 'express';
import { uploadImage } from '../controller/image.controller.js';


const ImageRoutes = express.Router();

ImageRoutes.post('/upload',uploadImage)


export default ImageRoutes;