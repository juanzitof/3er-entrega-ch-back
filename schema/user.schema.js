import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cartSchema from "./carts.schema.js";
import { logger } from "../utils/winston/index.js";

const { model } = mongoose;

const userSchema = new mongoose.Schema({
	email: { type: String, required: true, min: 4, trim: true, lowercase: true },
	password: { type: String, required: true, max: 100, min: 6, trim: true },
	name: { type: String, require: true, trim: true },
	phone: { type: String, require: true, min: 11, max: 15, trim: true },
	birthDate: { type: Date, require: true },
	address: { type: String, require: true, min: 3, trim: true },
	photo: { type: String, require: true, trim: true },
	cart: [cartSchema],
});


userSchema.pre("save", async function () {
	const user = this;

	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 10);
		logger.log(
			"info",
			`Password de ${user.email} encriptado con éxito -> Password: ${user.password}`
		);
	}
});

const User = model("users", userSchema);

export default User;