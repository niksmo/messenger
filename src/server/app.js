import express from 'express';
import { resolve } from 'node:path';

const PORT = 3000;

const app = express();

const STATIC_ROOT = resolve('dist');

app.use(express.static(STATIC_ROOT, { index: false }));

app.get('*', (req, res) => {
  res.sendFile(resolve(STATIC_ROOT, 'index.html'));
});

app.listen(PORT, () => {
  console.warn(`express server listen ${PORT}`);
});
