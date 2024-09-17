import app from './app';

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`REST API server running on http://localhost:${PORT}`);
});
