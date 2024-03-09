// Required Package Import;
import mongoose from 'mongoose';
import 'dotenv/config';
import chalk from 'chalk';

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema;
mongoose.set('strictQuery', false);

// Set the connection database URL with a default value if not set;
const connectionLink: string = process.env.MY_DATABASE ?? 'mongodb://localhost:27017/e_product';

// Connection Confirmation or Error;
mongoose.connect(connectionLink)
    .then(() => {
        console.log(chalk.underline.blackBright("AutoBots, let's transform and roll out!"));
        console.log(`Press ${chalk.yellowBright('CTRL + C')} Stop This Transformers War`);

    })
    .catch((error) => {
        console.log(error);
    });