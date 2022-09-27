import mongoose from "mongoose";
import { productSchema } from "../schema/products.schema.js";

const ProductsGQL = new mongoose.model("productsGQL", productSchema);

export default ProductsGQL;