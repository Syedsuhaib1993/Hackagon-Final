import Form from '../model/Form.js';

/* Create new form */
export const createForm = async (req, res) => {
  try {
    const form = new Form(req.body);
    const saved = await form.save();
    res.status(201).json({message:"Form Created Successfully",data:saved});
  } catch (err) {
    res.status(400).json({ message:"An error occured while Creating form",error: err.message });
  }
};

/* Get all form */
export const getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(201).json({message:"Forms Fetched Successfully",data:forms});
  } catch (err) {
    res.status(500).json({message:"An error occured while getting forms" ,error: err.message });
  }
};

/* Get single form by ID */
export const getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }
    res.status(201).json({message:"Form is  Fetched by id Successfully",data:form});
  } catch (err) {
    res.status(500).json({message:"An error occured while getting a form" ,error: err.message });
  }
};

/* Update form by ID */
export const updateForm = async (req, res) => {
  try {
    const updated = await Form.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updated) {
      return res.status(404).json({ error: 'Form not found' });
    }
    res.status(201).json({message:"Form Updated Successfully",data:updated});
  } catch (err) {
    res.status(400).json({message:"An error occured while updating form" ,error: err.message });
  }
};

/* Delete form by ID */
export const deleteForm = async (req, res) => {
  try {
    const deleted = await Form.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Form not found' });
    }
    res.status(201).json({message:"Form Deleted Successfully",data:deleted});
  } catch (err) {
    res.status(500).json({message:"An error occured while deleting form" ,error: err.message });
  }
};
