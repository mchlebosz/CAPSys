<script>
	export let id;
	export let name;
	export let description;
	export let photourl =
		"https://image.shutterstock.com/image-vector/university-logo-template-600w-1331382584.jpg";

	import Modal from "svelte-simple-modal";
	import PopUpContent from "./PopUpContent.svelte";
	import PopUpLogin from "./PopUpLogin.svelte";
	let bgColor;
	const style = getComputedStyle(document.querySelector("div.main"));
	bgColor = style.backgroundColor;
</script>

<div class="color" id="colorTest" style="display:none" />

<div class="tile">
	<div class="name">
		<h2>{name}</h2>
	</div>
	<div class="description">
		{description}
	</div>
	<div class="photo">
		<img src={photourl} alt={name} />
	</div>
	<div class="apply">
		<Modal styleWindow={{ backgroundColor: bgColor, borderRadius: "20px" }}>
			<PopUpLogin text="Apply" {id} />
		</Modal>
	</div>
	<div class="details">
		<PopUpContent {id} />
	</div>
</div>

<style type="text/scss">
	@import "../sass/main";

	.color {
		background-color: $c-background;
	}
	.tile {
		margin: 15px 0px 15px 0px;
		border: 2px solid $c-shade-1;
		border-radius: 20px;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 50px 1fr 120px;
		box-shadow: 7px 10px 20px -10px black;
		background-color: $c-shade-1;
		.name {
			padding: 5px;
			grid-column: 1 / span 2;
			grid-row: 1 / span 1;
			display: flex;
			justify-content: center;
			align-items: center;
			font-weight: bold;
		}
		.description {
			grid-column: 1 / span 2;
			grid-row: 2 / span 1;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 10px 30px 0px 30px;
		}
		.photo {
			display: none;
			img {
				width: 58%;
				border-radius: 10px;
			}
		}
		.apply {
			grid-column: 1 / span 1;
			grid-row: 3 / span 1;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.details {
			grid-column: 2 / span 1;
			grid-row: 3 / span 1;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	@media (min-width: $sm) {
		.tile {
			display: grid;
			grid-template-columns: 200px 1fr 40px 1fr;
			grid-template-rows: 50px 1fr 120px;
			box-shadow: 7px 10px 20px -10px black;
			background-color: $c-shade-1;
			.name {
				padding: 5px;
				grid-column: 2 / span 3;
				grid-row: 1 / span 1;
			}
			.description {
				grid-column: 2 / span 3;
				grid-row: 2 / span 1;
			}
			.photo {
				display: flex;
				grid-column: 1 / span 1;
				grid-row: 1 / span 3;
				padding: 30px;
				padding-right: 10px;
				align-items: center;
				img {
					background-color: $c-background;
					width: 100%;
					border-radius: 10px;
				}
			}
			.apply {
				grid-column: 2 / span 1;
				grid-row: 3 / span 1;
			}
			.details {
				grid-column: 4 / span 1;
				grid-row: 3 / span 1;
			}
		}
	}
</style>
