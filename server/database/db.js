import mongoose from "mongoose";
mongoose.set("strictQuery", false);

export const Connection = async (username, password) => {
  const URL = `mongodb+srv://${username}:${password}@cluster0.tzhvvnh.mongodb.net/chatlist?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected Succesfully");
  } catch (error) {
    console.log("Error while connecting with database", error.message);
  }
};
export default Connection;
