import express from 'express';
import { createForm, deleteForm, getFormById, getForms, updateForm } from '../controller/form.controller.js';

const FormRouter = express.Router()



FormRouter.post('/form', createForm);         // Create
FormRouter.get('/form', getForms);            // Read all
FormRouter.get('/form/:id', getFormById);     // Read one
FormRouter.put('/:id', updateForm);      // Update
FormRouter.delete('/:id', deleteForm);   // Delete


export default FormRouter;