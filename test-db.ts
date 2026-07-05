import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function check() {
  try {
    console.log('Connecting to:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected!');
    
    // Check collections
    const collections = await mongoose.connection.db?.listCollections().toArray();
    console.log('Collections:', collections?.map(c => c.name));

    // Check count in a collection
    const projectsCount = await mongoose.connection.db?.collection('projects').countDocuments();
    console.log('Projects count:', projectsCount);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    mongoose.disconnect();
  }
}
check();
