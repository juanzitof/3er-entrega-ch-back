export default class ProductsForIndexDTO {
	constructor(product) {
		this.name = product.name;
		this.id = product.id;
		this.price = product.price;
		this.photo = product.photo;
	}

	product = async () => this;
}