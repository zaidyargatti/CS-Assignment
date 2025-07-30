import Admin from '../models/admin.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin || !bcrypt.compareSync(password, admin.password))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, admin });
};

const uploadProfilePic = async (req, res) => {
  try {
    console.log("Uploaded file:", req.file); // DEBUG

    const filePath = req.file.path.replace(/\\/g, '/'); // ensures forward slashes
    const fullUrl = `${req.protocol}://${req.get('host')}/${filePath}`;

    const admin = await Admin.findByIdAndUpdate(
      req.user._id,
      { profilePic: fullUrl },
      { new: true }
    );

    res.status(201).json({
      message: 'Profile updated',
      admin: {
        email: admin.email,
        profilePic: admin.profilePic,
        _id: admin._id
      }
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: 'Failed to upload profile picture' });
  }
};

export {
  login,
  uploadProfilePic
}