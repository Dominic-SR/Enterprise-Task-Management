import mongoose from 'mongoose';
mongoose.set('debug', true);

// 1. Define the Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
   password : {
    type: String,
    require: true,
  },
rold_id:{
    type: String,
    require: true,
  },
  organization_id :{
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 2. Create the Model
const User = mongoose.model('User', userSchema);

export default User;