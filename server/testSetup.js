import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});
