const Api = (app, database, table, order) => {
	//DATA
	app.get("/api", async (request, response) => {
		let { data, error } = await database
			.from(table)
			.select("*")
			.order(order, { ascending: true });
		response.send(data);
	});
};
export default Api;
