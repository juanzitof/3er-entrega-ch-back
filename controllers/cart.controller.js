import { logger } from "../utils/winston/index.js";
import Products from "../schema/products.schema.js";

export const getCartProducts = async (req, res) => {
	try {
		const user = req.user;
		const userCart = await user.cart;
		const cartArray = await Promise.all(
			userCart.map(async (elem) => {
				return {
					product: await Products.findById(elem.product),
					quantity: elem.quantity,
					id: elem._id,
				};
			})
		);
		res.render("cart", { cartArray });
	} catch (err) {
		logger.log("error", `Error al obtener carrito. ${err}`);
		return res.status(500).json({ error_description: "Error del servidor." });
	}
};

export const deleteCartProduct = async (req, res) => {
	const user = req.user;
	const itemInCart = req.params.id;
	try {
		const userCart = await user.cart;

		for (let index = 0; index < userCart.length; index++) {
			let id = userCart[index]._id;
			id = JSON.stringify(id);
			id = id.slice(1);
			id = id.slice(0, id.length - 1);
			if (id === itemInCart) {
				userCart.splice(index, 1);
			}
		}
		await user.save();
		res.redirect("/api/carrito");
	} catch (error) {
		logger.log("error", `Error al borrar producto del carrito. ${error}`);
		return res.status(500).json({ error_description: "Error del servidor." });
	}
};