/**
 * Defining a User Model in mongoose
 * Code modified from https://github.com/sahat/hackathon-starter
 */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import mongoosastic from 'mongoosastic';
import {ENV} from '../config/appConfig';
import {elasticURL} from '../config/secrets';


/*
 User Schema
 */
const UserSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId},
  email: { type: String, index: { unique: true }},
  password: String,
  role: String,
  userPhone: String,
  isEmailVerified: Boolean,
  verifyEmailToken: String,
  verifyEmailTokenExpires: Date,
  firstName: String,
  lastName: String,
  userCompany: String,
  position: String,
  partnerId: {type: mongoose.Schema.Types.ObjectId},
  language: { type: String, default: 'English' },
  newsletter: Boolean,
  resetPasswordToken: String,
  inviteTeamMemberToken: String,
  inviteTeamMemberTokenExpires: Date,
  invitePartnerToken: String,
  invitePartnerTokenExpires: Date,
  resetPasswordExpires: Date
}, {
  timestamps: true
});


/*
 User ORM Methods
 */

function encryptPassword(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  return bcrypt.genSalt(5, (saltErr, salt) => {
    if (saltErr) return next(saltErr);
    return bcrypt.hash(user.password, salt, null, (hashErr, hash) => {
      if (hashErr) return next(hashErr);
      user.password = hash;
      return next();
    });
  });
}

/**
 * Password hash middleware.
 */
UserSchema.pre('save', encryptPassword);

/*
Defining our own custom document instance method
 */
UserSchema.methods = {
  comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return cb(err);
      return cb(null, isMatch);
    });
  }
};

/**
 * Statics
 */

 if (ENV === 'production') {
UserSchema.plugin(mongoosastic, {
  index: 'elastic_digital',
  hosts: [
   'http://localhost:9220/'
  ]
});
 } else {
   UserSchema.plugin(mongoosastic, {
  index: 'elastic_digital',
  hosts: [
     elasticURL
  ]
});
 }


export default mongoose.model('User', UserSchema);
