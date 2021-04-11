<script>
	export let id;
	console.log(id);

	import axios from "axios";
	import { fade } from "svelte/transition";

	import { apiAddress } from "../stores.js";

	let errors = {};
	var data = [];
	console.log(id);

	async function loadSchool() {
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

	loadSchool();
</script>

<div transition:fade class="container">
	{#if Object.keys(errors).length > 0}
		<div class="errors__box">
			<ul class="errors__list">
				{#each Object.keys(errors) as field}
					<li class="errors__item">{errors[field]}</li>
				{/each}
			</ul>
		</div>
	{/if}
	<div class="name"><h1>{name}</h1></div>
	<div class="photo">
		<img src={photo} alt="rug" />
	</div>
	<div class="location">
		<div class="country"><h4>Country: <span>{country}</span></h4></div>
		<div class="address"><h4>Address: <span>{address}</span></h4></div>
		<div class="city"><h4>City: <span>{city}</span></h4></div>
		<div class="type"><h4>Type: <span>{type}</span></h4></div>
	</div>
	<div class="description">{description}</div>
</div>

<style type="scss">
	@import "../sass/main";

	.container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 50px 250px auto;
		height: 500px;
		gap: 20px;
		column-gap: 5px;
		width: 100%;
		.name {
			grid-column: 1 / span 2;
			grid-row: 1 / span 1;
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			align-items: center;
			text-align: center;
		}
		.photo {
			grid-column: 1 / span 1;
			grid-row: 2 / span 1;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 250px;
			height: 250px;
			align-self: center;
			justify-self: center;

			img {
				height: 100%;
				max-height: 250px;
				width: auto;
				border-radius: 10px;
				background-color: $c-background;
			}
		}
		.location {
			grid-column: 2 / span 1;
			grid-row: 2 / span 1;
			display: flex;
			flex-flow: column nowrap;
			padding: 10px;
			text-align: center;
			span {
				font-weight: normal;
			}
		}
		.description {
			grid-column: 1 / span 2;
			grid-row: 3 / span 1;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 10px;
		}
	}
</style>
