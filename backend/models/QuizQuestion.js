import mongoose from 'mongoose';

const QuizQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true,
    validate: [arr => arr.length >= 2, 'At least two options required']
  },
  correctIndex: {
    type: Number,
    required: true
  },
  category: {
    type: String
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  }
});

const QuizQuestion = mongoose.model('QuizQuestion', QuizQuestionSchema);

// Static method to seed sample questions
QuizQuestion.seedSampleQuestions = async function() {
  const sampleQuestions = [
    {
      question: 'Who is known as the father of the Indian space program?',
      options: ['A.P.J. Abdul Kalam', 'Vikram Sarabhai', 'Satish Dhawan', 'Homi Bhabha'],
      correctIndex: 1,
      category: 'India',
      difficulty: 'medium'
    },
    {
      question: 'Which Indian woman was the first to go to space?',
      options: ['Sunita Williams', 'Kalpana Chawla', 'Tessy Thomas', 'Ritu Karidhal'],
      correctIndex: 1,
      category: 'India',
      difficulty: 'medium'
    },
    {
      question: 'Which planet is known as the “Red Planet”?',
      options: ['Jupiter', 'Mars', 'Mercury', 'Saturn'],
      correctIndex: 1,
      category: 'Planets',
      difficulty: 'easy'
    },
    {
      question: 'Which Indian astronaut went to space aboard the Soyuz T-11 mission in 1984?',
      options: ['A.P.J. Abdul Kalam', 'Rakesh Sharma', 'Vikram Sarabhai', 'K. Sivan'],
      correctIndex: 1,
      category: 'India',
      difficulty: 'medium'
    },
    {
      question: 'Which is the largest planet in our solar system?',
      options: ['Earth', 'Saturn', 'Jupiter', 'Neptune'],
      correctIndex: 2,
      category: 'Planets',
      difficulty: 'easy'
    },
    {
      question: 'What was the name of India’s first satellite?',
      options: ['INSAT-1A', 'Bhaskara', 'Aryabhata', 'Rohini'],
      correctIndex: 2,
      category: 'India',
      difficulty: 'medium'
    },
    {
      question: 'Which ISRO scientist is known as the "Rocket Woman of India"?',
      options: ['Kalpana Chawla', 'Tessy Thomas', 'Ritu Karidhal', 'Nandini Harinath'],
      correctIndex: 2,
      category: 'India',
      difficulty: 'medium'
    },
    {
      question: 'Which planet has the most moons?',
      options: ['Jupiter', 'Neptune', 'Uranus', 'Saturn'],
      correctIndex: 3,
      category: 'Planets',
      difficulty: 'medium'
    },
    {
      question: 'Who was the ISRO Chairman during the Chandrayaan-2 mission?',
      options: ['Vikram Sarabhai', 'U.R. Rao', 'K. Sivan', 'S. Somanath'],
      correctIndex: 2,
      category: 'India',
      difficulty: 'medium'
    },
    {
      question: 'Which Indian space mission was launched to study the Moon?',
      options: ['Mangalyaan', 'Gaganyaan', 'Chandrayaan', 'Astrosat'],
      correctIndex: 2,
      category: 'India',
      difficulty: 'medium'
    },
    {
      question: 'Which planet is closest to the Sun?',
      options: ['Mercury', 'Venus', 'Earth', 'Mars'],
      correctIndex: 0,
      category: 'Planets',
      difficulty: 'easy'
    },
    {
      question: 'Which scientist played a major role in Mangalyaan (Mars Orbiter Mission)?',
      options: ['Tessy Thomas', 'Ritu Karidhal', 'Sunita Williams', 'K. Radhakrishnan'],
      correctIndex: 1,
      category: 'India',
      difficulty: 'medium'
    },
    {
      question: 'What is the name of India’s first mission to the Sun?',
      options: ['Surya', 'Helios', 'Aditya-L1', 'Solaris'],
      correctIndex: 2,
      category: 'India',
      difficulty: 'medium'
    },
    {
      question: 'Which is the hottest planet in our solar system?',
      options: ['Mercury', 'Venus', 'Mars', 'Jupiter'],
      correctIndex: 1,
      category: 'Planets',
      difficulty: 'easy'
    },
    {
      question: 'Who was the first Indian woman to head a rocket launch project at ISRO?',
      options: ['Nandini Harinath', 'Kalpana Chawla', 'Muthayya Vanitha', 'Tessy Thomas'],
      correctIndex: 2,
      category: 'India',
      difficulty: 'medium'
    },
    {
      question: 'Which Indian mission was aimed at exploring Mars?',
      options: ['Chandrayaan-1', 'Mangalyaan', 'Astrosat', 'Gaganyaan'],
      correctIndex: 1,
      category: 'India',
      difficulty: 'medium'
    },
    {
      question: 'How many planets are in our solar system?',
      options: ['7', '8', '9', '10'],
      correctIndex: 1,
      category: 'Planets',
      difficulty: 'easy'
    },
    {
      question: 'Which organization launched India\'s first satellite Aryabhata?',
      options: ['DRDO', 'NASA', 'ISRO', 'BARC'],
      correctIndex: 2,
      category: 'India',
      difficulty: 'medium'
    },
    {
      question: 'Which planet has prominent rings?',
      options: ['Jupiter', 'Neptune', 'Saturn', 'Uranus'],
      correctIndex: 2,
      category: 'Planets',
      difficulty: 'easy'
    },
    {
      question: 'Who is the current (as of 2024) chairman of ISRO?',
      options: ['K. Sivan', 'S. Somanath', 'U.R. Rao', 'G. Madhavan Nair'],
      correctIndex: 1,
      category: 'India',
      difficulty: 'medium'
    },
    {
      question: 'Which planet is also called the Earth’s twin?',
      options: ['Mars', 'Neptune', 'Venus', 'Jupiter'],
      correctIndex: 2,
      category: 'Planets',
      difficulty: 'easy'
    },
    {
      question: 'Which Indian space observatory studies celestial objects in space?',
      options: ['Chandrayaan', 'Astrosat', 'Mangalyaan', 'Gaganyaan'],
      correctIndex: 1,
      category: 'India',
      difficulty: 'medium'
    },
    {
      question: 'What is the approximate time taken by light to travel from Sun to Earth?',
      options: ['5 seconds', '8 minutes', '1 hour', '24 hours'],
      correctIndex: 1,
      category: 'Space',
      difficulty: 'medium'
    },
    {
      question: 'Which space mission aims to send humans to space from Indian soil?',
      options: ['Mangalyaan', 'Chandrayaan', 'Astrosat', 'Gaganyaan'],
      correctIndex: 3,
      category: 'India',
      difficulty: 'medium'
    },
    {
      question: 'Which Indian physicist worked extensively on black hole thermodynamics and quantum gravity?',
      options: ['Thanu Padmanabhan', 'Meghnad Saha', 'Vikram Sarabhai', 'Venkatraman Ramakrishnan'],
      correctIndex: 0,
      category: 'India',
      difficulty: 'hard'
    }
  ];
  await this.deleteMany({});
  await this.insertMany(sampleQuestions);
};

export default QuizQuestion; 