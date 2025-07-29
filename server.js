
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Dummy talk data
const talksData = [
  {
    "title": "The Future of WebAssembly",
    "speakers": ["Alice Johnson"],
    "category": ["Web Development", "Performance"],
    "duration": "1 hour",
    "description": "An in-depth look at the current state and future potential of WebAssembly, exploring its impact on web applications and beyond."
  },
  {
    "title": "Demystifying Microservices with Kubernetes",
    "speakers": ["Bob Williams", "Carol Davis"],
    "category": ["Cloud", "DevOps", "Architecture"],
    "duration": "1 hour",
    "description": "Learn how to design, deploy, and manage microservices effectively using Kubernetes, with practical examples and best practices."
  },
  {
    "title": "Introduction to Quantum Computing",
    "speakers": ["David Lee"],
    "category": ["Emerging Tech", "AI"],
    "duration": "1 hour",
    "description": "A beginner-friendly introduction to the fascinating world of quantum computing, covering fundamental concepts and potential applications."
  },
  {
    "title": "Securing Your APIs: A Practical Guide",
    "speakers": ["Eve Brown"],
    "category": ["Security", "API"],
    "duration": "1 hour",
    "description": "Explore common API security vulnerabilities and learn practical strategies and tools to protect your web services."
  },
  {
    "title": "Machine Learning for Front-End Developers",
    "speakers": ["Frank White", "Grace Green"],
    "category": ["AI", "Web Development"],
    "duration": "1 hour",
    "description": "Discover how front-end developers can leverage machine learning techniques to create more intelligent and dynamic user experiences."
  },
  {
    "title": "Building Scalable Real-time Applications",
    "speakers": ["Henry Black"],
    "category": ["Architecture", "Performance"],
    "duration": "1 hour",
    "description": "Best practices and architectural patterns for building high-performance, real-time applications that can scale to millions of users."
  }
];

// Function to calculate talk timings
const calculateTalkTimings = (talks) => {
  const schedule = [];
  let currentTime = new Date();
  currentTime.setHours(10, 0, 0, 0); // Event starts at 10:00 AM

  for (let i = 0; i < talks.length; i++) {
    const talk = { ...talks[i] };
    const startTime = new Date(currentTime);
    talk.startTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add 1 hour for the talk duration
    currentTime.setHours(currentTime.getHours() + 1);
    const endTime = new Date(currentTime);
    talk.endTime = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    schedule.push(talk);

    // Add 10 minutes transition, except after the last talk
    if (i < talks.length - 1) {
      currentTime.setMinutes(currentTime.getMinutes() + 10);
    }

    // Insert lunch break after the 3rd talk (index 2)
    if (i === 2) {
      schedule.push({
        title: "Lunch Break",
        description: "Enjoy your lunch!",
        startTime: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        endTime: new Date(currentTime.setHours(currentTime.getHours() + 1)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isBreak: true
      });
    }
  }
  return schedule;
};

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get all talks with timings
app.get('/api/talks', (req, res) => {
  const scheduledTalks = calculateTalkTimings(talksData);
  res.json(scheduledTalks);
});

// API endpoint to get unique categories
app.get('/api/categories', (req, res) => {
  const categories = new Set();
  talksData.forEach(talk => {
    talk.category.forEach(cat => categories.add(cat));
  });
  res.json(Array.from(categories));
});

// API endpoint to get unique speakers
app.get('/api/speakers', (req, res) => {
  const speakers = new Set();
  talksData.forEach(talk => {
    talk.speakers.forEach(speaker => speakers.add(speaker));
  });
  res.json(Array.from(speakers));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
