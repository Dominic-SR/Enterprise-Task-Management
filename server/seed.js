import mongoose from 'mongoose';
import Role from './models/rolesSchema.js'; 
import dotenv from 'dotenv';

dotenv.config();

const roles = [
  { role: 'Super Admin', role_id: "1" },
  { role: 'Admin', role_id: "2" },
  { role: 'User', role_id: "3" }
];

const seedDB = async () => {
  try {
    // In newer Node versions, you can use await at the top level, 
    // but keeping it inside an async function is safer for script execution.
    await mongoose.connect(process.env.MONGO_URI);
    
    await Role.deleteMany({});
    console.log('Old roles cleared');

    await Role.insertMany(roles);
    console.log('Roles seeded successfully!');

    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();