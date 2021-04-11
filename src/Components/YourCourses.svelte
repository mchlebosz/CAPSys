<script>
	import axios from "axios";
	import { loggedIn, password, username, role, apiAddress } from "../stores.js";
	import Icon from "svelte-awesome";
	import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";

	let errors = {};
	let data = {};

	const getDetails = async () => {
		errors = {};
		console.log($apiAddress);
		await axios
			.get($apiAddress + "/recrutation.php?username=" + $username)
			.then((resp) => {
				data = resp.data;
			})
			.catch(function (error) {
				console.log(error);
				if (error.response) {
					// client received an error response (5xx, 4xx)
					errors.LogIn = "No Acocunt Found";
				} else if (error.request) {
					// client never received a response, or request never left
					errors.LogIn = "Connection Error";
				} else {
					// anything else
					errors.LogIn = "Whoops?";
				}
			});
		console.log(data);
		return data;
	};

	data = getDetails();
	let loading = false;

	const handleAdd = async () => {
		loading = true;
		let firstname = document.getElementById("name").value;
		let lastname = document.getElementById("surname").value;
		let birthdate = document.getElementById("birthdate").value;
		let userId = data.user_id;
		console.log(birthdate);
		let response;
		axios
			.post($apiAddress + "/addUserData.php", {
				user_id: userId,
				name: firstname,
				surname: lastname,
				birthdate: birthdate,
			})
			.then(function (res) {
				response = res;
				alert(response.data.message);
			})
			.catch(function (error) {
				console.log(error);
				if (error.response) {
					// client received an error response (5xx, 4xx)
					errors.Register = "Wrong Data";
				} else if (error.request) {
					// client never received a response, or request never left
					errors.Register = "Connection Error";
				} else {
					// anything else
					errors.Register = "Whoops?";
				}
			})
			.then(() => {
				loading = false;
			});
	};
</script>

Your Courses
