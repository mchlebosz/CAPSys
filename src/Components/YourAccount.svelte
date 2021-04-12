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
			.get($apiAddress + "/getAccount.php?username=" + $username)
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

	const handleSubmit = async () => {
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

<main>
	<h3>Your Account</h3>
	{#await data}
		...Loading
	{:then userData}
		<div class="container">
			<div class="form__group field">
				<input
					type="text"
					name="name"
					id="name"
					value={userData.firstname}
					class="form__field"
					placeholder="First Name"
					required
				/>
				<label for="name" class="form__label">First Name</label>
			</div>
			<div class="form__group field">
				<input
					type="text"
					name="surname"
					id="surname"
					value={userData.lastname}
					class="form__field"
					placeholder="Surname"
					required
				/>
				<label for="surname" class="form__label">Surname</label>
			</div>
			<div class="form__group field">
				<input
					type="date"
					name="birthdate"
					id="birthdate"
					value={userData.birthdate}
					class="form__field"
					placeholder="Birthdate"
					required
				/>
				<label for="password" class="form__label">Birthdate</label>
			</div>
			<div id="button">
				<div class="wrapper">
					<button class="button" on:click={handleSubmit}
						>Update Data {#if loading} <Icon data={faSyncAlt} scale={1} spin /> {/if}</button
					>
				</div>
				<svg
					style="visibility: hidden; position: absolute;"
					width="0"
					height="0"
					xmlns="http://www.w3.org/2000/svg"
					version="1.1"
				>
					<defs>
						<filter id="goo"
							><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
							<feColorMatrix
								in="blur"
								mode="matrix"
								values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
								result="goo"
							/>
							<feComposite in="SourceGraphic" in2="goo" operator="atop" />
						</filter>
					</defs>
				</svg>
			</div>
		</div>
	{/await}
	{#if Object.keys(errors).length > 0}
		<div class="errors__box">
			<ul class="errors__list">
				{#each Object.keys(errors) as field}
					<li class="errors__item">{errors[field]}</li>
				{/each}
			</ul>
		</div>
	{/if}
</main>

<style type="scss">
	@import "../sass/main";
	@import "../sass/components/input";
	@import "../sass/components/button";
	main {
		margin: auto;
		h3 {
			text-align: center;
		}
	}

	.container {
		margin: auto;

		width: 300px;
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: center;
	}

	.form__field {
		background-color: transparent;
	}
</style>
