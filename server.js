import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import { SERVICE_KEY, SUPABASE_URL } from "./src/key/key.js";
import Api from "./src/routes/api.js";
import Auth from "./src/routes/auth.js";
import Product from "./src/routes/product.js";

const server = express();
const port = 3001;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use(express.static("public"));

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

const products_table = "sipo_products";
const users_table = "sipo_users";
const orderBy = "name";

Api(server, supabase, products_table, orderBy);

Auth(server, supabase, users_table);

Product(server, supabase, products_table);

server.listen(port, () => {
	console.log(`The server is listening on port ${port}.`);
});
