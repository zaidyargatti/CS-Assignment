import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true,
     unique: true },
  password: {
     type: String,
      required: true },
  profilePic: {
     type: String,
      default: ""
     }
});

const Admin = mongoose.model('Admin', AdminSchema);
export default Admin