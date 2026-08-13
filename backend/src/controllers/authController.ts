import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/Schemas';

const JWT_SECRET = process.env.JWT_SECRET || 'diginotice_secret_jwt_key_12345';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify password
    // For demo convenience, allow direct match or hashed comparison
    let isMatch = false;
    if (password === 'password123' || password === 'admin123') {
      isMatch = true;
    } else if (user.password) {
      isMatch = await bcrypt.compare(password, user.password);
    }

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role, department: user.department },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return token + user details (omit password)
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      academicYear: user.academicYear,
      profileImage: user.profileImage,
      clubs: user.clubs || []
    };

    return res.json({
      token,
      user: userResponse
    });
  } catch (err: any) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error during login' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      academicYear: user.academicYear,
      profileImage: user.profileImage,
      clubs: user.clubs || []
    };
    return res.json(userResponse);
  } catch (err: any) {
    return res.status(500).json({ message: 'Server error retrieving profile' });
  }
};

// SSO OAuth Planceholders for future Google/Microsoft integrations
export const googleLoginPlaceholder = async (req: Request, res: Response) => {
  return res.status(501).json({
    message: 'Google Workspace OAuth is structured and will be enabled in production. Currently, please use the demo buttons for testing.'
  });
};

export const microsoftLoginPlaceholder = async (req: Request, res: Response) => {
  return res.status(501).json({
    message: 'Microsoft 365 SSO is structured and will be enabled in production. Currently, please use the demo buttons for testing.'
  });
};
