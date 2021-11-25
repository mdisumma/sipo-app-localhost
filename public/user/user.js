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
	const productList = document.querySelector("#product_list");
	const productOrder = document.querySelector("#product_order");
	const logOut = document.querySelector("#log_out");

	//LOGOUT
	logOut.addEventListener("click", () => {
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

	//ORDER LIST
	const orderList = [
		{
			name: "Name",
			number: "Item",
			unit: "Unit Gr",
			totUnit: "Tot Gr",
			price: "Price £",
			totPrice: "Tot £",
			trash: "",
		},
	];

	const displayOrderList = (e) => {
		productOrder.innerHTML = "";
		let i = 0;
		orderList.map((item) => {
			productOrder.innerHTML += `
		<ul id="${i++}">
		<li class="product_name">${item.name}</li>
		<li>${item.number}</li>
		<li>${item.unit}</li>
		<li>${item.totUnit}</li>
		<li>${item.price}</li>
		<li>${item.totPrice}</li>
		<li class="trash"><button >${item.trash}</button></li>
		</ul>`;
		});

		const trash = document.querySelector("#product_order");

		trash.addEventListener("click", (e) => {
			const position = e.path[3].id;
			console.log(position);

			const deleteProduct = () => {
				orderList.splice(position, 1);
			};
			console.log(orderList);
			deleteProduct();
			console.log(orderList);

			displayOrderList();
		});
	};

	//DATA
	console.log("fetch starts here");
	fetch("http://localhost:3001/api")
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			data.map((item) => {
				productList.innerHTML += `
				<div key=${item.image} class="product">
					<div class="product_image">
						<img src=${item.image} alt=${item.name} />
					</div>
					<div class="product_list">
						<h3>${item.name}</h3>
				      <p>Unit gr:</p>
						<p>${item.pack}</p>
						<p>Price £:</p>
						<p>${item.price}</p>
					</div>
					<div class="product_select">
						<input
							type="number"
							class="input_value"
							name="select_quantity"
							placeholder="0"
							
						/>

						<button
							type="button"
							value="add_Product"
							class="add_Button">
							add
						</button>
					</div>
				</div>
				`;
			});

			//INPUTS
			const addButton = document.querySelector("#product_list");
			// console.log(addButton);
			addButton.addEventListener("click", (e) => {
				if (e.target.className === "add_Button") {
					// console.log(e);
					const productNumber = e.path[1].childNodes[1].value;
					// console.log(productNumber);

					const productName = e.path[2].children[1].children[0].innerText;
					const productPack = e.path[2].children[1].children[2].innerText;
					const productPrice = e.path[2].children[1].children[4].innerText;

					const order = {
						name: productName,
						number: productNumber,
						unit: productPack,
						totUnit: productPack * productNumber,
						price: productPrice,
						totPrice: productPrice * productNumber,
						trash: "<i class='far fa-trash-alt'></i>",
					};
					// console.log(order);
					orderList.push(order);
					// console.log(orderList);
					displayOrderList();
				}
			});
		})
		.catch((error) => console.log("error", error));
});
