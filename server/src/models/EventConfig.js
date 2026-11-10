const mongoose = require('mongoose');

const eventConfigSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      default: 'Code-a-Nova',
    },
    tagline: {
      type: String,
      default: 'Build Something That Moves the Future.',
    },
    description: {
      type: String,
      default:
        'A premier national hackathon bringing together the sharpest student engineers, designers, and innovators to solve high-impact technological challenges.',
    },
    contactEmail: {
      type: String,
      default: 'contact@codeanova.org',
    },
    registrationOpen: {
      type: Boolean,
      default: true,
    },
    maxTeamSize: {
      type: Number,
      default: 5,
    },
    minTeamSize: {
      type: Number,
      default: 1,
    },
    allowedDomains: {
      type: [String],
      default: [
        'AI / Machine Learning',
        'Web Development',
        'Internet of Things',
        'Cyber Security',
        'Blockchain',
      ],
    },
    importantDates: {
      registrationStart: { type: String, default: 'November 15, 2026' },
      registrationDeadline: { type: String, default: 'December 20, 2026' },
      shortlistAnnouncement: { type: String, default: 'January 05, 2027' },
      grandFinale: { type: String, default: 'January 23-24, 2027' },
    },
    socialLinks: {
      github: { type: String, default: 'https://github.com' },
      twitter: { type: String, default: 'https://x.com' },
      linkedin: { type: String, default: 'https://linkedin.com' },
      discord: { type: String, default: 'https://discord.gg' },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('EventConfig', eventConfigSchema);
