import User from '../models/userModel.js'; 
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';
export const register = async (req, res) => {
  try {
    const { fullName, username, password,  confirmPassword, gender } = req.body;
    if(password !== confirmPassword) {
        return res.status(400).json({ error: "Password and confirm password must be same" });
    }
    const user = await User.findOne({ username });
    if(user) {
        return res.status(400).json({ error: "User already exists" });
    }
    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // https://avatar.iran.liara.run/public/boy
    const boy = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girl = `https://avatar.iran.liara.run/public/girl?username=${username}`
    
    
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePicture: gender === 'male' ? boy : girl
    });
    if(newUser){
      // Generate JWT token 
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        password: newUser.password,
        gender: newUser.gender,
        profilePicture: newUser.profilePicture
      });
    }else{
      res.status(400).json({ error: "Internal User Data" });
    }
  } catch (error) {
    console.log("Error in regiser controller ", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if(!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user?.password || '');
    if(!user || !isPasswordValid) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      gender: user.gender,
      profilePicture: user.profilePicture
    });
  } catch (error) {
    console.log("Error in login controller ", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};


export const logout = async (req, res) => {
  try {
    res.cookie('jwt','',{maxAge: 0})
    res.status(200).json({message: 'Logout successfully'})
  } catch (error) {
    console.log("Error in login controller ", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};

