import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import config from 'helpers/config';
import controllers from 'controllers';
import initConnection from 'helpers/db';

const app = new Hono();
initConnection(config.MONGO_URI);

app.use('*', logger());
app.use('*', cors());
app.route('/api', controllers);

export default app;
