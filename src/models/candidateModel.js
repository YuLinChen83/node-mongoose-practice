import mongoose from 'mongoose';
import validator from 'validator';

const candidateSchema = new mongoose.Schema({
  hrId: {
    type: String,
    required: [true, '負責HR的ID為必填']
  },
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
  cellphoneNumber: {
    type: String,
    required: [true, '手機號碼為必填']
  },
  telephoneNumber: {
    type: String,
    required: [true, '市內電話為必填'],
    validate: {
      validator: function (v) {
        return /\d{2}-\d{4}-\d{4}/.test(v);
      },
      message: props => `請輸入格式：區碼-XXXX-XXXX`
    },
  },
  educationList: {
    type: [
      {
        school: {
          type: String,
          required: [true, '學校為必填']
        },
        department: {
          type: String,
          required: [true, '系別/類組為必填']
        },
        status: {
          type: String,
          enum: { values: ['畢業', '肄業', '休學'], message: '請輸入在校狀況（畢業／肄業／休學）' },
          required: [true, '在校狀態為必填']
        },
      },
    ],
    validate: [val => val.length > 0, '{PATH} 學歷請至少填寫一項']
  },
  schoolClubsExperiences: [
    {
      club: String,
      description: String,
    }
  ],
  yearsOfWorkingExperience: {
    type: Number,
    required: [true, '工作年資為必填']
  },
  team: {
    type: String,
    enum: { values: ['HR', 'FE', 'BE', 'PM', 'APP', 'GO', 'UI'], message: '請輸入任一現有組別' },
    required: [true, '組別為必填']
  },
  jobTitle: {
    type: String,
    required: [true, '職稱為必填']
  },
  recentWorkingExperiences: [
    {
      company: { type: String, required: [true, '公司為必填'] },
      jobTitle: { type: String, required: [true, '職稱為必填'] },
      startDate: { type: Date, required: [true, '到職日為必填'] },
      endDate: { type: Date, required: [true, '到職日為必填'] },
      description: { type: String, required: [true, '請簡述職務工作內容'] },
    }
  ],
  interviewDate: {
    type: Date,
    required: [true, '面試日期為必填'],
  },
  takeOfficeDate: {
    type: Date,
    required: [true, '預計最快到職日為必填'],
  },
  mark: String,
  changedAt: Date,
  firstDeliveredPlatform: {
    type: String,
    enum: { values: ['104', 'cakeresume', 'yourator'], message: '首次履歷投遞平台' },
    required: [true, '首次履歷投遞平台為必填']
  },
});

// /*--------------------
//   Custom Middleware
// ---------------------*/
// candidateSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();  // 只有在 password 修改時才執行

//   this.password = await bcrypt.hash(this.password, 12);   // 用長度12的salt去hash
//   this.passwordConfirm = undefined;
//   this.passwordChangedAt = Date.now() - 1000;
//   next();
// });

// candidateSchema.pre(/^find/, function (next) {
//   this.find({ active: { $ne: false } });  // 含find關鍵字操作前先篩掉沒繳活的
//   next();
// });

// /*------------------------
//   Custom document methods
// -------------------------*/
// // 比對用戶輸入密碼 candidatePassword 和 DB 中 bcrypt 加鹽雜湊過的密碼 userPassword 是否相同
// candidateSchema.methods.correctPassword = async (
//   candidatePassword,
//   userPassword
// ) => {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

// // 檢查 JTW 簽發時間是否小於變更密碼時間
// candidateSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
//   if (this.passwordChangedAt) {
//     const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

//     return JWTTimestamp < changedTimestamp;
//   }
//   return false;
// };

// // 透過 node 內建 crypto 安全的亂數產生密碼重設 token，並設置過期時間
// candidateSchema.methods.createPasswordResetToken = function () {
//   const resetToken = crypto.randomBytes(32).toString('hex');

//   this.passwordResetToken = crypto
//     .createHash('sha256')
//     .update(resetToken)
//     .digest('hex');

//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 mins 後過期

//   return resetToken;
// };

// 設置完成後 new 出 model 實例 export
const Candidate = mongoose.model('Candidate', candidateSchema);

export default Candidate;
