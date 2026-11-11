const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Team member name is required'],
      trim: true,
      minlength: [2, 'Team member name must be at least 2 characters'],
    },
    email: {
      type: String,
      required: [true, 'Team member email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Team member email must be valid'],
    },
  },
  { _id: false }
);

const hackathonRegistrationSchema = new mongoose.Schema(
  {
    registrationId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // One registration per participant
      index: true,
    },
    participantName: {
      type: String,
      required: [true, 'Participant name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Leader email is required'],
      lowercase: true,
      trim: true,
      index: true,
    },
    mobileNumber: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
      match: [/^[6-9]\d{9}$/, 'Must be a valid 10-digit Indian mobile number'],
    },
    collegeName: {
      type: String,
      required: [true, 'College name is required'],
      trim: true,
    },
    course: {
      type: String,
      required: [true, 'Course is required'],
      enum: ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'BSc', 'Other'],
    },
    branch: {
      type: String,
      required: [true, 'Branch is required'],
      enum: ['CSE', 'IT', 'ECE', 'ME', 'CE', 'Other'],
    },
    yearOfStudy: {
      type: String,
      required: [true, 'Year of study is required'],
      enum: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
    },
    domain: {
      type: String,
      required: [true, 'Track/Domain is required'],
      enum: [
        'AI / Machine Learning',
        'Web Development',
        'Internet of Things',
        'Cyber Security',
        'Blockchain',
      ],
      index: true,
    },
    projectName: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
      minlength: [5, 'Project name must be at least 5 characters'],
    },
    pptLink: {
      type: String,
      required: [true, 'PPT / Presentation link is required'],
      trim: true,
    },
    prototypeLink: {
      type: String,
      required: [true, 'Prototype repository or design link is required'],
      trim: true,
    },
    demoVideoLink: {
      type: String,
      trim: true,
      default: '',
    },
    teamSize: {
      type: Number,
      required: [true, 'Team size is required'],
      min: [1, 'Team size must be at least 1 (Solo)'],
      max: [5, 'Maximum team size allowed is 5'],
    },
    teamMembers: {
      type: [teamMemberSchema],
      default: [],
    },
    status: {
      type: String,
      enum: ['submitted', 'under_review', 'shortlisted', 'rejected'],
      default: 'submitted',
      index: true,
    },
    emailStatus: {
      type: String,
      enum: ['pending', 'sent', 'failed'],
      default: 'pending',
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('HackathonRegistration', hackathonRegistrationSchema);

