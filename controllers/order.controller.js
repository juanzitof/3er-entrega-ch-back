import Orders from "../schema/order.schema.js";
import Products from "../schema/products.schema.js";
import { logger } from "../utils/winston/index.js";
import moment from "moment";
import { checkOutSms, checkOutWhatsapp } from "../utils/sms_wsp.js";
import { checkOutEmail } from "../utils/mail.js";

export const checkout = async (req, res) => {
	const user = req.user;

	try {
		const productsInCart = await Promise.all(
			user.cart.map(async (elem) => {
				const product = await Products.findById(elem.product);
				return {
					product: product.name,
					quantity: elem.quantity,
				};
			})
		);

		const order = new Orders({
			userName: user.name,
			products: productsInCart,
			userEmail: user.email,
			date: moment(new Date()).format("DD/MM/YY HH:mm"),
		});
		user.cart = [];
		checkOutEmail(order);
		checkOutSms(user.phone);
		checkOutWhatsapp(order, user.phone);
		await user.save();
		await order.save();

		res.redirect("/api/order/orderSuccess");
	} catch (err) {
		logger.log("error", `Error al generar pedido. ${err}`);
		return res.status(500).json({ error_description: "Error del servidor." });
	}
};

export const orderSuccess = async (req, res) => {
	res.render("order-success");
};