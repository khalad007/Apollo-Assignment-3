import mongoose from 'mongoose';
import app from './app';
import config from './app/config';


async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(process.env.PORT || config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    // log any errors that occur during startup
    console.log(err);
  }
}

main();
