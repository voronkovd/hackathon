import { Hono } from 'hono';
import services from 'services';
import { createWriteStream } from "fs";
import path from 'path';

const app = new Hono();

app.get('/', async (context) => {
  const { limit, offset } = context.req.query();
  const result = await services.file.find({
    limit: limit ? Number(limit) : 50,
    offset: offset ? Number(offset) : 0,
  });

  return context.json(result);
});

app.get('/:id{[a-z, 0-9]{24}}', async (context) => {
  const { id } = context.req.param();
  const result = await services.file.findById(id);
  return result ? context.json(result) : context.notFound();
});

app.post('/upload', async (context, next) => {
  const { file } = await context.req.parseBody();
  const fileBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileBuffer);
  createWriteStream(path.join("./public", file.name)).write(buffer);

  return context.json({ message: "File uploaded successfully" });
});

export default app;
