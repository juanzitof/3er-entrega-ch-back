import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import ProductsGQL from "./products.graphqlModel.js";

const schema = buildSchema(`
  type Query {
    Products: [Product],
    Product(id: String!) : Product
  },
  type Mutation {
    CreateProduct(name: String!, description: String!, code: Int!, photo: String!, price: Float!, stock: Int!) : Product
  },
  type Product {
    id: String
    name: String
    code: Int
    photo: String
    price: Float
    stock: Int
  }
`);

const getProducts = async () => await ProductsGQL.find({});

const getProductById = async ({ id }) => await ProductsGQL.findById(id);

const createProduct = async ({ name, code, photo, price, stock }) => {
	const product = new ProductsGQL({ name, code, photo, price, stock });
	await product.save();
	return product;
};

const rootValue = {
	Products: getProducts,
	Product: getProductById,
	CreateProduct: createProduct,
};

const graphqlInstance = {
	graphql: graphqlHTTP({
		schema,
		rootValue,
		graphiql: true,
	}),
};

export default graphqlInstance;