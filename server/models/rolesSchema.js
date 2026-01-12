import mongoose from 'mongoose';

// 1. Define the Schema
const roleSchema = new mongoose.Schema({
  role: {
    type: String,
    required: [true, 'Role name is required'],
    unique: true,
    trim: true,
  },
  role_no: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 2. Create the Model
const Role = mongoose.model('Role', roleSchema);

export default Role;