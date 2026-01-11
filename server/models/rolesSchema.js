import mongoose from 'mongoose';
mongoose.set('debug', true);

// 1. Define the Schema
const roleSchema = new mongoose.Schema({
  role: {
    type: String,
    required: [true, 'Role name is required'],
    unique: true,
    trim: true,
  },
  role_id: {
    type: String,
    required: true,
    lowercase: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 2. Create the Model
const Role = mongoose.model('Role', roleSchema);

export default Role;