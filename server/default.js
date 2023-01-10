import { celebrities } from "./constants/data.js";
import Celebritie from "./model/celebritie-schema.js";
const DefaultData = async () => {
  try {
    await Celebritie.insertMany(celebrities);
    console.log("Data imported successfully");
  } catch (error) {
    console.log("Error while inserting default data", error.message);
  }
};
export default DefaultData;
