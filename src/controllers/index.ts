import { Hono } from 'hono';
import FileController from './FileController';

const app = new Hono();

app.route('/files', FileController);

export default app;
