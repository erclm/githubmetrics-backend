# GitHub Metrics Backend

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A Node.js backend service that analyzes GitHub repositories and provides insightful metrics. This project serves as the backend for the [frontend project](https://github.com/erclm/githubmetrics-frontend) and is deployed on [Railway](https://railway.com).

## Features

- Analyzes GitHub repositories using the GitHub API
- Calculates repository health metrics and insights
- Stores analysis results in MongoDB
- RESTful API endpoints for data access

### Repository Metrics

The service calculates several key metrics for each repository:

- **Health Score**: Overall repository health (0-100)
- **Trending Factor**: Repository's current popularity and momentum
- **Activity Level**: Current development activity status
- **Language Analysis**: Primary programming language used

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/repos` | POST | Submit a repository for analysis |
| `/api/repos` | GET | Retrieve all analyzed repositories |
| `/api/repos/:id` | DELETE | Remove a repository analysis |

## Tech Stack

- Node.js & Express
- MongoDB
- GitHub API
- Docker
- Railway for deployment

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```
   MONGODB_URI=your_mongodb_uri
   GITHUB_TOKEN=your_github_token
   PORT=3000
   ```
4. Run the server:
   ```bash
   npm start
   ```

## Railway Deployment Case Study

This project demonstrates why organizations might transition from AWS to Railway:
- Simplified deployment workflow
- Cost-effective for small to medium applications
- Reduced operational overhead
- Integrated CI/CD pipeline
- Automatic SSL/TLS certification

## License

MIT

