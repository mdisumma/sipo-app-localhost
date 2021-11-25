//SUPABASE
const { createClient } = supabase;
supabase = createClient(
	"https://avvelquwyslzkodskshw.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMzM4MzE1NSwiZXhwIjoxOTQ4OTU5MTU1fQ.NHMBE0yY82XaMvPeBVWz56hIgjQLvYL9IkvsfFQkU8g"
);

console.log(supabase);
const user = supabase.auth.user();
console.log(user);

//DOM
document.addEventListener("DOMContentLoaded", () => {
	const product = document.querySelector("#product");
	const pack = document.querySelector("#pack");
	const image = document.querySelector("#image");
	const price = document.querySelector("#price");
	const productList = document.querySelector("#product_list");
	const submitBt = document.querySelector("#submit");
	const logOut = document.querySelector("#log_out");
	console.log("the DOM is loaded");
	//DATA
	fetch("http://localhost:3001/api")
		.then((response) => response.json())
		.then((data) => {
			data.map((item) => {
				productList.innerHTML += `
				<div id="${item.name}" class="product">
							<div class="product_image">
								<img src="${item.image}" alt="${item.name}" />
							</div>
							<div class="product_list">
						    <h3>${item.name}</h3>
				         <p>Unit Gr:</p>
						   <p>${item.pack}</p>
						   <p>Price £:</p>
						   <p>${item.price}</p>
					      </div>
							<div class="product_select">
							<button id="delete" type="delete" value="delete">delete</button>

							<button id="update" type="update" value="update">update</button>
							</div>
				`;
			});

			//LOGOUT
			logOut.addEventListener("click", async () => {
				var post = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						message: "Log out",
					}),
				};
				fetch("http://localhost:3001/logout/", post)
					.then((response) => response.text())
					.then((result) => console.log(result))
					.catch((error) => console.log("error", error));
				window.location.href = `http://localhost:3001/`;
			});

			//SUBMIT
			submitBt.addEventListener("click", (event) => {
				fetch("http://localhost:3000", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						name: product.value,
						pack: pack.value,
						image: image.value,
						price: price.value,
					}),
				})
					.then((response) => response.text())
					.then((result) => console.log(result))
					.catch((error) => console.log("error", error));
			});

			//DELETE
			const deleteBt = document.querySelector("#product_list");

			deleteBt.addEventListener("click", (e) => {
				if (e.target.value === "delete") {
					console.log(e.path[2].children[1].children[0].innerText);
					console.log(e.path[2].children[1].children[2].innerText);
					console.log(e.path[2].children[1].children[4].innerText);
					console.log(
						e.path[2].children[0].attributes[0].ownerElement.childNodes[1]
							.currentSrc
					);

					fetch("http://localhost:3000", {
						method: "DELETE",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							name: e.path[2].children[1].children[0].innerText,
							pack: e.path[2].children[1].children[2].innerText,
							image:
								e.path[2].children[0].attributes[0].ownerElement.childNodes[1]
									.currentSrc,
							price: e.path[2].children[1].children[4].innerText,
						}),
					})
						.then((response) => response.text())
						.then((result) => console.log(result))
						.catch((error) => console.log("error", error));
				}
			});

			//PUT
			const updateBt = document.querySelector("#product_list");

			updateBt.addEventListener("click", (e) => {
				if (e.target.id === "update") {
					console.log(e);
					const targetName = e.path[2].children[1].children[0].innerHTML;
					const targetPack = e.path[2].children[1].children[2].innerHTML;
					const targetImage =
						e.path[2].children[0].attributes[0].ownerElement.childNodes[1]
							.currentSrc;
					const targetPrice = e.path[2].children[1].children[4].innerHTML;

					console.log(targetName);
					console.log(targetPack);
					console.log(targetImage);
					console.log(targetPrice);

					fetch("http://localhost:3000", {
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							name: targetName,
							pack: targetPack,
							image: targetImage,
							price: targetPrice,

							replace_name: product.value,
							replace_pack: pack.value,
							replace_image: image.value,
							replace_price: price.value,
						}),
					})
						.then((response) => response.text())
						.then((result) => console.log(result))
						.catch((error) => console.log("error", error));
				}
			});
		})
		.catch((error) => console.log("error", error));
});
