const Product = (app, database, table) => {
	app
		.route("/")

		//POST
		.post(async (request, response) => {
			let { data, error } = await database.from(table).insert([request.body]);
			console.log(request.body);
		})

		//DELETE
		.delete(async (request, response) => {
			let { data, error } = await database
				.from(table)
				.delete()
				.match(request.body);
			console.log(request.body);
		})

		//PUT
		.put(async (request, response) => {
			console.log(request.body);

			let { data, error } = await database
				.from(table)
				.update({
					name: request.body.replace_name,
					pack: request.body.replace_pack,
					image: request.body.replace_image,
					price: request.body.replace_price,
				})
				.match({
					name: request.body.name,
					pack: request.body.pack,
					image: request.body.image,
					price: request.body.price,
				});
		});
};

export default Product;
