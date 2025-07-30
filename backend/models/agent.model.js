
import mongoose from 'mongoose';

const AgentSchema = new mongoose.Schema({
  name: {
    type:String
  },
  email: {
    type:String
  },
  mobile: {
    type:String
  },
  password: {
    type:String
  },
  admin: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Admin'
    }  // 👈 Linked to Admin
});

const Agent = mongoose.model('Agent', AgentSchema);
export default Agent
