import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "../config/db.config.js";
import Admin from "../models/admin.model.js";

dotenv.config();
 connectDB();

const createAdmin = async () => {
  try {
    const email = 'admin01@gmail.com';
    const password = 'Admin@01';

    const existingUser = await Admin.findOne({ email });

    if (existingUser) {
      console.log(" Admin already exists with this email!");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await Admin.create({
        email,
        password: hashedPassword,
      });
      console.log(" Admin created successfully!");
    }

  } catch (error) {
    console.error(" Error creating admin:", error);
  } finally {
    process.exit();
  }
};

createAdmin();
