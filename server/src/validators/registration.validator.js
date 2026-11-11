const { body } = require('express-validator');

const registrationValidator = [
  body('participantName')
    .trim()
    .notEmpty().withMessage('Participant name is required')
    .isLength({ min: 3 }).withMessage('Participant name must be at least 3 characters'),

  body('mobileNumber')
    .trim()
    .notEmpty().withMessage('Mobile number is required')
    .matches(/^[6-9]\d{9}$/).withMessage('Mobile number must be a valid 10-digit Indian number'),

  body('collegeName')
    .trim()
    .notEmpty().withMessage('College/University name is required'),

  body('course')
    .trim()
    .notEmpty().withMessage('Course is required')
    .isIn(['B.Tech', 'M.Tech', 'BCA', 'MCA', 'BSc', 'Other'])
    .withMessage('Please select a valid course'),

  body('branch')
    .trim()
    .notEmpty().withMessage('Branch is required')
    .isIn(['CSE', 'IT', 'ECE', 'ME', 'CE', 'Other'])
    .withMessage('Please select a valid branch'),

  body('yearOfStudy')
    .trim()
    .notEmpty().withMessage('Year of study is required')
    .isIn(['1st Year', '2nd Year', '3rd Year', '4th Year'])
    .withMessage('Please select a valid year of study'),

  body('domain')
    .trim()
    .notEmpty().withMessage('Track/Domain is required')
    .isIn([
      'AI / Machine Learning',
      'Web Development',
      'Internet of Things',
      'Cyber Security',
      'Blockchain',
    ])
    .withMessage('Please select a valid hackathon domain'),

  body('projectName')
    .trim()
    .notEmpty().withMessage('Project name is required')
    .isLength({ min: 5 }).withMessage('Project name must be at least 5 characters long'),

  body('pptLink')
    .trim()
    .notEmpty().withMessage('PPT / Presentation link is required')
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('PPT link must be a valid HTTP or HTTPS URL'),

  body('prototypeLink')
    .trim()
    .notEmpty().withMessage('Prototype or repository link is required')
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('Prototype link must be a valid HTTP or HTTPS URL'),

  body('demoVideoLink')
    .optional({ checkFalsy: true })
    .trim()
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('Demo video link must be a valid HTTP or HTTPS URL'),

  body('teamSize')
    .notEmpty().withMessage('Team size is required')
    .isInt({ min: 1, max: 5 }).withMessage('Team size must be between 1 and 5'),

  body('teamMembers')
    .custom((members, { req }) => {
      const teamSize = parseInt(req.body.teamSize, 10);
      const expectedAdditional = teamSize - 1;

      if (teamSize === 1) {
        return true; // Solo registration
      }

      if (!Array.isArray(members) || members.length !== expectedAdditional) {
        throw new Error(
          `For a team size of ${teamSize}, exactly ${expectedAdditional} additional team member(s) must be specified.`
        );
      }

      const emailsSeen = new Set();
      const leaderEmail = (req.user?.email || '').toLowerCase().trim();
      if (leaderEmail) emailsSeen.add(leaderEmail);

      for (let i = 0; i < members.length; i++) {
        const m = members[i];
        if (!m.name || m.name.trim().length < 2) {
          throw new Error(`Member ${i + 2}: Valid name of at least 2 characters is required`);
        }
        if (!m.email || !/^\S+@\S+\.\S+$/.test(m.email.trim())) {
          throw new Error(`Member ${i + 2}: Valid email address is required`);
        }
        const memberEmail = m.email.toLowerCase().trim();
        if (emailsSeen.has(memberEmail)) {
          throw new Error(
            `Member ${i + 2}: Duplicate email detected (${memberEmail}). Team members must have unique emails.`
          );
        }
        emailsSeen.add(memberEmail);
      }

      return true;
    }),
];

module.exports = {
  registrationValidator,
};

