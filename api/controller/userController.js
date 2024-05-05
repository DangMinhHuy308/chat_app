import User from '../models/userModel.js';

export const getUsers = async (req, res) => {
  try {
    const logInUserId = req.user._id;
    const allUsers = await User.find({ _id: { $ne: logInUserId } }).select('-password');
    res.status(200).json(allUsers);
  } catch (error) {
    console.log('Error fetching users', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};

