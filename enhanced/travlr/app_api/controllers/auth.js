
const bcrypt = require('bcrypt');
const User = require('../models/user');

// ========================================
// REGISTER NEW USER
// ========================================

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string'
    ) {
      return res.status(400).json({
        message: 'Name, email, and password are required.'
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (
      cleanName.length < 2 ||
      cleanName.length > 100 ||
      cleanEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) ||
      password.length < 12 ||
      Buffer.byteLength(password, 'utf8') > 72
    ) {
      return res.status(400).json({
        message: 'Enter a valid name, email, and password.'
      });
    }

    const existingUser = await User.findOne({
      email: cleanEmail
    });

    if (existingUser) {
      return res.status(409).json({
        message: 'An account with this email already exists.'
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: cleanName,
      email: cleanEmail,
      passwordHash
    });

    return res.status(201).json({
      message: 'Account created successfully.',
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'An account with this email already exists.'
      });
    }

    console.error('Registration error:', error);

    return res.status(500).json({
      message: 'Unable to create account.'
    });
  }
};

// ========================================
// LOGIN USER WITH SESSION
// ========================================

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (
      typeof email !== 'string' ||
      typeof password !== 'string'
    ) {
      return res.status(400).json({
        message: 'Email and password are required.'
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: cleanEmail
    }).select('+passwordHash');

    const validPassword = user?.passwordHash
      ? await bcrypt.compare(password, user.passwordHash)
      : false;

    if (!validPassword) {
      return res.status(401).json({
        message: 'Invalid email or password.'
      });
    }

    // Regenerate the session after successful login
    req.session.regenerate((sessionError) => {
      if (sessionError) {
        console.error('Session error:', sessionError);

        return res.status(500).json({
          message: 'Unable to start login session.'
        });
      }

      // Store the logged-in user's ID
      req.session.userId = user._id.toString();

      // Save the session to MongoDB
      req.session.save((saveError) => {
        if (saveError) {
          console.error('Session save error:', saveError);

          return res.status(500).json({
            message: 'Unable to save login session.'
          });
        }

        return res.status(200).json({
          message: 'Login successful.',
          user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email
          }
        });
      });
    });

  } catch (error) {
    console.error('Login error:', error);

    return res.status(500).json({
      message: 'Unable to log in.'
    });
  }
};



// ========================================
// GET CURRENT LOGGED-IN USER
// ========================================

exports.me = async (req, res) => {
  try {
    if (!req.session?.userId) {
      return res.status(401).json({
        message: 'Not authenticated.'
      });
    }

    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.status(401).json({
        message: 'User not found.'
      });
    }

    return res.status(200).json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Current user error:', error);

    return res.status(500).json({
      message: 'Unable to retrieve current user.'
    });
  }
};



 
// ========================================
// LOGOUT USER AND DESTROY SESSION
// ========================================

exports.logout = (req, res) => {

  if (!req.session) {
    return res.status(401).json({
      message: 'No active session found.'
    });
  }

  // Destroy the session stored in MongoDB
  req.session.destroy((error) => {

    if (error) {
      console.error('Logout error:', error);

      return res.status(500).json({
        message: 'Unable to log out. Please try again.'
      });
    }

    // Remove the session cookie from the browser
    res.clearCookie('connect.sid', {
      path: '/'
    });

    return res.status(200).json({
      message: 'Logged out successfully.'
    });

  });

};
