<script>
	import UniversityTile from "../Components/UniversityTile.svelte";

	import axios from "axios";

	import { apiAddress } from "../stores.js";

	let errors = {};
	let data = {};

	async function loadSchools() {
		errors = {};
		console.log($apiAddress);
		await axios
			.get($apiAddress + "/schools.php")
			.then((resp) => {
				data = resp.data;
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

		console.log(data);
	}

	$: data = Array.from(data);

	loadSchools();
</script>

<div class="main">
	{#if Object.keys(errors).length > 0}
		<div class="errors__box">
			<ul class="errors__list">
				{#each Object.keys(errors) as field}
					<li class="errors__item">{errors[field]}</li>
				{/each}
			</ul>
		</div>
	{/if}
	{#each data as item}
		<!--//change to school_id -->
		<UniversityTile
			id={item.id}
			name={item.name}
			description={item.description}
			photourl={item.photo}
		/>
	{/each}
</div>

<style type="text/scss">
	@import "../sass/main";

	.main {
		background-color: $c-background;
		padding: 10px 0px 10px 0px;
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: center;
		width: 84%;
		max-width: 700px;
		margin: auto;
	}
</style>
