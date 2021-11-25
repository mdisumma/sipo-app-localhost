const { createClient } = supabase;
supabase = createClient(
	"https://avvelquwyslzkodskshw.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMzM4MzE1NSwiZXhwIjoxOTQ4OTU5MTU1fQ.NHMBE0yY82XaMvPeBVWz56hIgjQLvYL9IkvsfFQkU8g"
);
console.log(supabase);
const user = supabase.auth.user();
console.log(user);

//DOM
window.addEventListener("DOMContentLoaded", () => {
	const email = document.querySelector("#email");
	const password = document.querySelector("#password");
	const signUp = document.querySelector("#sign_up");
	const signIn = document.querySelector("#sign_in");
	const signMagiclink = document.querySelector("#sign_magiclink");
	const signGoogle = document.querySelector("#sign_google");

	//SignUP
	signUp.addEventListener("click", (e) => {
		e.preventDefault();
		if (email.value && password.value) {
			const post = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: email.value,
					password: password.value,
				}),
			};

			fetch("http://localhost:3001/signUp/", post)
				.then((response) => response.json())
				.then((result) => {
					console.log(result);
					if (result.length === 0) {
						alert("please check your email");
					} else {
						alert(`${result[0].email} already exist`);
					}
				})
				.catch((error) => console.log("error", error));
		} else {
			alert("please provide your email and password");
		}
	});

	//LogIN

	signIn.addEventListener("click", (e) => {
		e.preventDefault();

		if (email.value && password.value) {
			fetch("http://localhost:3001/logIn/", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: email.value,
					password: password.value,
				}),
			})
				.then((response) => response.json())
				.then(
					(result) => console.log(result)
					// {
					// 	if (result.data[0].admin === true) {
					// 		window.location.replace(`http://localhost:3001/admin/`);

					// 		console.log(result.data[0].admin);
					// 	}
					// 	if (result.data[0].admin === false) {
					// 		window.location.replace(`http://localhost:3001/user/`);

					// 		console.log(result.data[0].admin);
					// 	}
					// 	console.log(result);
					// }
				)
				.catch((error) => console.log("error", error));
			window.location.replace("/user/");
		} else {
			alert("please provide email and password");
		}
	});

	//SignMAGICLINK
	signMagiclink.addEventListener("click", (e) => {
		e.preventDefault();

		console.log(email.value);
		if (!email.value) {
			alert("please provide your email");
		} else {
			var post = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: email.value,
				}),
			};

			fetch(`http://localhost:3001/authMagicLink/`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: email.value,
				}),
			})
				.then((response) => response.json())
				.then((result) => console.log(result))
				.catch((error) => console.log("error", error));
		}
	});

	//signGOOGLE
	signGoogle.addEventListener("click", async (e) => {
		e.preventDefault();

		const { user, session, error } = await supabase.auth.signIn(
			{
				provider: "google",
			},
			{
				redirectTo: "http://localhost:3001/user/",
			}
		);
	});
});
