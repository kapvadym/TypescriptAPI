import 'dotenv/config';
import http from 'http';
import app from './app';

import { connectDB } from './config/database';
import { env } from './config/env';

const PORT = env.PORT;

const server = http.createServer(app);
connectDB();

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`)
});