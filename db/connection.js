import mongoose from "mongoose";
import chalk from "chalk";

const DATABASE_URL = process.env.DATABASE_URL

mongoose.connect(DATABASE_URL)

mongoose.connection.on("connected", () => {
  console.log(chalk.bold("connected to MongoDB"));
})

mongoose.connection.on("disconnected", () => {
  console.log(chalk.bold("Disconnected from MongoDB!"));
});

mongoose.connection.on("error", (err) => {
  console.log(chalk.red(`MongoDB connection error: ${err}`));
});
