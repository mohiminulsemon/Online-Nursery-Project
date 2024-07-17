import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is listening at http://localhost:${config.port}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

main();
