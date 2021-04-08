<script>
	export let details;
	export let id;
	import { fade } from "svelte/transition";

	let name = "Nazwaaa";
	let photo = "https://www.emerce.nl/content/uploads/2019/10/ruglogo-430x400.jpg";
	let country = "country";
	let address = "address";
	let city = "city";
	let description = "description";
</script>

<div transition:fade class="container">
	<div class="name"><h1>{name}</h1></div>
	<div class="photo">
		<img src={photo} alt="rug" />
	</div>
	<div class="location">
		<div class="country"><h4>Country: <span>{country}</span></h4></div>
		<div class="address"><h4>Address: <span>{address}</span></h4></div>
		<div class="city"><h4>City: <span>{city}</span></h4></div>
	</div>
	<div class="description">{description}</div>
	<div class="programmes">
		<table>Tabelka</table>
	</div>
</div>

<style type="scss">
	@import "../sass/main";

	.container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 50px 200px auto auto;
		height: 500px;
		gap: 10px;
		margin: 10px;
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
			width: 200px;
			height: 200px;
			align-self: center;
			justify-self: center;

			img {
				height: 100%;
				max-height: 200px;
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
			grid-column: 1 / span 1;
			grid-row: 3 / span 2;
		}
		.programmes {
			grid-column: 1 / span 2;
			grid-row: 4 / span 2;
		}
	}
</style>
