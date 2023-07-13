const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const { Octokit } = require('octokit');

const octokit = new Octokit({
  auth: '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'
})

// GET route for getting repositories
app.get('/repositories', async (req, res) => {
  try {
    const response = await octokit.request('GET /search/repositories', {
      q: 'topics'
    });
    const repositories = response.data;
    res.json(repositories);
  } catch (error) {
    console.error('Error fetching repositories:', error);
    res.status(500).json({ error: 'Failed to fetch repositories' });
  }
})

// POST route for favoriting a repository
app.post('/favorite', (req, res) => {
  let favoriteRepositories = [];
  const { repository } = req.body;
  favoriteRepositories.push(repository);
  res.status(201).json({ message: 'Repository favorited successfully' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});