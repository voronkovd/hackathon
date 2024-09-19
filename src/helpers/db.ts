import mongoose from 'mongoose';

export default function initConnection(uri: string) {
  mongoose.connect(`mongodb://${uri}`, { connectTimeoutMS: 1000 }).then(() => {}).catch((err) => {
    throw err;
  });

  mongoose.set('autoIndex', true);
}
