import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '姓名為必填']
  },
  enName: String,
  birthday: {
    type: Date,
    required: [true, '出生日期為必填'],
  },
  email: {
    type: String,
    required: [true, '信箱為必填'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, '請提供合法信箱']
  },
  photo: String,
  role: {
    type: String,
    enum: { values: ['user', 'admin'], message: '僅接受 user, admin' },
    default: 'user'
  },
  password: {
    type: String,
    required: [true, '請輸入密碼'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, '請輸入確認密碼'],
    validate: {
      validator: function (el) {  // validate when create or save
        return el === this.password;
      },
      message: '確認密碼和密碼不一樣，請確認'
    }
  },
  takeOfficeDate: {
    type: Date,
    required: [true, '到職日為必填'],
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

/*--------------------
  Custom Middleware
---------------------*/
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();  // 只有在 password 修改時才執行

  this.password = await bcrypt.hash(this.password, 12);   // 用長度12的salt去hash
  this.passwordConfirm = undefined;
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });  // 含find關鍵字操作前先篩掉沒繳活的
  next();
});

/*------------------------
  Custom document methods
-------------------------*/
// 比對用戶輸入密碼 candidatePassword 和 DB 中 bcrypt 加鹽雜湊過的密碼 userPassword 是否相同
userSchema.methods.correctPassword = async (
  candidatePassword,
  userPassword
) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// 檢查 JTW 簽發時間是否小於變更密碼時間
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// 透過 node 內建 crypto 安全的亂數產生密碼重設 token，並設置過期時間
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 mins 後過期

  return resetToken;
};

// 設置完成後 new 出 model 實例 export
const User = mongoose.model('User', userSchema);

export default User;
