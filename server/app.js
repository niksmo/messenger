import express from 'express';
import { resolve } from 'node:path';

const PORT = 3000;

const app = express();

const STATIC_ROOT = resolve('dist');

app.use(express.static(STATIC_ROOT));

app.listen(PORT, () => {
  console.log(`express server listen ${PORT}`);
});
