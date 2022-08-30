import mongoose from "mongoose";
import { config } from "./index.js";

// ---- Conexión a mongo ----
export default await mongoose.connect(`${config.mongodb.url}`);