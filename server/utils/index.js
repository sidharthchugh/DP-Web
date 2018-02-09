import jwt from 'jsonwebtoken';
 import {jwtSecret} from '../config/secrets';

function generateToken(user) {
  // Dont use password and other sensitive fields
  // Use fields that are useful in other parts of the app/collections/models
  const u = {
    userId: user.userId,
    _id: user._id.toString(),
  };

  return jwt.sign(u, jwtSecret, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
}

// strips internal fields like password and verifyEmailToken etc
function getCleanUser(user) {
  const u = user.toJSON();
  return {
    _id: u._id,
    email: u.email,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
    isEmailVerified: u.isEmailVerified
  };
}

module.exports = {
  getCleanUser,
  generateToken
};
