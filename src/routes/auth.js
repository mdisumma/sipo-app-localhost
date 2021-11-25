const Auth = (app, database, table) => {
	//SINGUP
	app.post("/signup/", async function (request, response) {
		console.log(request.body);

		const { data, data_error } = await database
			.from(table)
			.select("email, id ,admin")
			.eq("email", request.body.email);

		console.log(data.length);
		if (data.length === 0) {
			const { user, user_error } = await database.auth.signUp(request.body);

			const { data, data_error } = await database
				.from(table)
				.insert([{ email: user.email, id: user.id, admin: false }]);
		}
		response.json(data);
	});

	//LOGIN
	app.post("/login/", async function (request, response) {
		const { data, data_error } = await database
			.from(table)
			.select("email, id ,admin")
			.eq("email", request.body.email);
		console.log(data);

		const { session, session_error } = await database.auth.signIn(request.body);

		console.log(session);
		// console.log(data);

		if (session && data) {
			response.json({ session, data });
		}
	});

	//LOGOUT
	app.post("/logout/", async function (request, response) {
		const { error } = await database.auth.signOut();
		console.log(request.body);
	});

	//MAGICLINK
	app.post("/authMagicLink/", async function (request, response) {
		console.log(request.body.email);
		const { user, session, error } = await database.auth.signIn({
			email: request.body.email,
		});
		console.log(session);
	});
};

export default Auth;
