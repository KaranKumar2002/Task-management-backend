const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();

    const token = createToken(user);
    res.status(201).json({ user: { email: user.email, role: user.role }, token });
  } catch (err) {
    res.status(400).json({ message: 'Registration failed', error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = createToken(user);
    res.status(200).json({ user: { email: user.email, role: user.role }, token });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message });
  }
};
