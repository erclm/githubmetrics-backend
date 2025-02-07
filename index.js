import express from 'express';
import mongoose from 'mongoose';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Schema
const RepoSchema = new mongoose.Schema({
  url: String,
  name: String,
  stars: Number,
  forks: Number,
  issues: Number,
  createdAt: { type: Date, default: Date.now }
});

const Repo = mongoose.model('Repo', RepoSchema);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// API Routes
app.post('/api/repos', async (req, res) => {
  try {
    const { url } = req.body;
    
    // Extract owner and repo name from GitHub URL
    const urlParts = url.split('/');
    const owner = urlParts[urlParts.length - 2];
    const repo = urlParts[urlParts.length - 1];
    
    // Fetch repo data from GitHub API
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    const data = await response.json();
    
    // Create new repo entry
    const repoEntry = new Repo({
      url: url,
      name: data.full_name,
      stars: data.stargazers_count,
      forks: data.forks_count,
      issues: data.open_issues_count
    });
    
    await repoEntry.save();
    res.json(repoEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/repos', async (req, res) => {
  try {
    const repos = await Repo.find().sort({ createdAt: -1 });
    res.json(repos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});