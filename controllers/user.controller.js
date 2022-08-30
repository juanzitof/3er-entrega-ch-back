import { logger } from "../utils/winston/index.js";
import User from "../schema/user.schema.js";
import { signUpEmail } from "../utils/mail.js";

export const signUp = async (req, res) => {
	const newUser = new User(req.body);
	newUser.photo = req.file.filename;
	newUser.cart = [];
	signUpEmail(newUser);
	try {
		await newUser.save();
		logger.log("info", `Usuario ${newUser.email} registrado`);
		res.redirect("/login");
	} catch (error) {
		logger.log("error", `Error al registrar usuario. ${error}`);
	}
};

export const login = (req, res) => {
	res.render("login");
};

export const profile = (req, res) => {
	const user = req.user;
	res.render("profile", { user });
};

export const logout = (req, res) => {
	req.logout();
	res.render("logout");
};

export const loginError = (req, res) => {
	logger.log("error", `Error en las credenciales del usuario`);
	res.render("login-error");
};

export const signupGet = (req, res) => {
	res.render("signup");
};