<script>
	export let id;

	import axios from "axios";
	import { apiAddress } from "../stores.js";

	let errors = {};
	var data = [];
	console.log(id);

	async function loadProgrammes() {
		errors = {};
		await axios
			.get($apiAddress + "schools.php?id=" + id)
			.then((resp) => {
				data = resp.data;
				console.log(data);

				name = data.name;
				photo = data.photo;
				country = data.address.country;
				address = data.address.street;
				city = data.address.city;
				description = data.description;
				type = data.type;
			})
			.catch(function (error) {
				console.log(error);
				if (error.response) {
					// client received an error response (5xx, 4xx)
					errors.LogIn = "No University Found";
				} else if (error.request) {
					// client never received a response, or request never left
					errors.LogIn = "Connection Error";
				} else {
					// anything else
					errors.LogIn = "Whoops?";
				}
			});
	}

	let name = "";
	let photo = "";
	let country = "";
	let address = "";
	let city = "";
	let description = "";
	let type = "";

	$: {
		console.log(data);
	}

	loadProgrammes();
</script>
