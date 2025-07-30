// /models/List.js
import mongoose from 'mongoose';

const ListSchema = new mongoose.Schema({
  firstName: {
    type:String
  },
  phone:{
    type:Number
  },
  notes: {
    type:String
  },
  assignedTo: {
     type: mongoose.Schema.Types.ObjectId,
      ref: 'Agent' 
    },
  sourceFileUrl: {
    type:String
  },
  admin: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Admin' }  // 👈 Linked to Admin
});

const List = mongoose.model('List', ListSchema);
export default List