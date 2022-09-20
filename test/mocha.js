import supertest from "supertest";
import chai from "chai";
const req = supertest("http://localhost:8080/api/productos");
const expect = chai.expect;

describe("Test api de productos", () => {
	describe("Obtener todos los products", () => {
		it("Debería recibir un status 200", async () => {
			const res = await req.get("/");
			expect(res.status).to.eql(200);
		});
		it("Debería retornar un objeto como data", async () => {
			const res = await req.get("/");
			expect(res.body).to.be.an("object");
		});
	});

	describe("crear producto", async () => {
		it("Debería retornar un status 201 y crear un producto", async () => {
			const res = await req.post("/create").send({
				name: "Creado con supertest",
				description: "Prueba generada con supertest",
				code: "007",
				photo: "asd",
				price: 4567,
				stock: 3,
			});
			expect(res.status).to.eql(201);
			expect(res.body.product).include.keys(
				"name",
				"description",
				"code",
				"photo",
				"price",
				"stock",
				"id"
			);
			expect(res.body.product.name).to.eql("Creado con supertest");
			expect(res.body.product.description).to.eql(
				"Prueba generada con supertest"
			);
			expect(res.body.product.code).to.eql("007");
			expect(res.body.product.img).to.eql("asd");
			expect(res.body.product.price).to.eql(4567);
			expect(res.body.product.stock).to.eql(3);
		});
	});

	describe("actualizar producto", async () => {
		it("Debería retornar un status 201 y modificar un producto", async () => {
			let res = await req.post("/create").send({
				name: "Creado con supertest",
				description: "Prueba generada con supertest",
				code: "007",
				photo: "asd",
				price: 4567,
				stock: 3,
			});
			const productId = response.body.product._id;
			res = await req.put(`/${productId}`).send({
				name: "Creado con supertest",
				description: "Prueba generada con supertest",
				code: "007",
				photo: "asd",
				price: 4567,
				stock: 3,
			});
			expect(response.status).to.eql(201);
			expect(response.body.product).include.keys(
				"name",
				"description",
				"code",
				"photo",
				"price",
				"stock",
				"id"
			);
			expect(res.body.product.name).to.eql("Creado con supertest");
			expect(res.body.product.description).to.eql(
				"Prueba generada con supertest"
			);
			expect(res.body.product.code).to.eql("007");
			expect(res.body.product.photo).to.eql("asd");
			expect(res.body.product.price).to.eql(4567);
			expect(res.body.product.stock).to.eql(3);
		});
	});

	describe("borrar producto", async () => {
		it("Debería retornar un status 200 y borrar un producto", async () => {
			let response = await req.post("/create").send({
				name: "Creado con supertest",
				description: "Prueba generada con supertest",
				code: "007",
				photo: "asd",
				price: 4567,
				stock: 3,
			});
			const productId = response.body.product._id;
			response = await request.delete(`/${productId}`);
			expect(response.status).to.eql(200);
			expect(response.body.product).include.keys(
				"name",
				"description",
				"code",
				"photo",
				"price",
				"stock",
				"id"
			);
			expect(response.body.product.name).to.eql(
				"Creado con supertest para ser borrado"
			);
			expect(res.body.product.name).to.eql("Creado con supertest");
			expect(res.body.product.description).to.eql(
				"Prueba generada con supertest"
			);
			expect(res.body.product.code).to.eql("007");
			expect(res.body.product.photo).to.eql("asd");
			expect(res.body.product.price).to.eql(4567);
			expect(res.body.product.stock).to.eql(3);
		});
	});
});