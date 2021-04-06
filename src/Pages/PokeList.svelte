<script>
	// PokeList.svelte
	const pageName = "Poke-List";
	import { onMount } from "svelte";
	import { getPokemonList, getPokemonByName } from "../api/pokemon"; // import our pokemon api calls

	let pokemonDetail = {};
	let pokemonList = [];

	// Get the data from the api, after the page is mounted.
	onMount(async () => {
		const res = await getPokemonList();
		pokemonList = res;
	});

	// method to handle the event to get the detail of the pokemon.
	const handleOnClick = (event) => {
		const name = event.target.name;
		getPokemonByName(name).then((res) => {
			pokemonDetail = {
				name,
				types: res.types,
				image: res.sprites.front_default,
			};
		});
	};

	const getPokemonTypes = () => {
		return pokemonDetail.types.map((e) => e.type.name).join(",");
	};
</script>

<main>
	<h1>{pageName}!</h1>
	<p>Welcome to my <b>{pageName}</b></p>
	<ul class="pokemonList">
		{#each pokemonList as pokemon}
			<li>
				<label class="pokeName">
					{pokemon.name}
				</label>
				<button type="button" name={pokemon.name} on:click={handleOnClick}>See Details</button>
			</li>
		{/each}
	</ul>
	<div class="pokemonDetails">
		<h3>Pokemon Detail</h3>
		{#if pokemonDetail.image}
			<img class="pokeimage" src={pokemonDetail.image} alt="pokeimage" />
			<label><b>{pokemonDetail.name ? pokemonDetail.name : ""}</b></label>
			<label><b>Types: </b>{pokemonDetail.types ? getPokemonTypes() : ""}</label>
		{/if}
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	.pokemonDetails {
		float: right;
		width: 500px;
		text-transform: capitalize;
	}
	.pokemonList {
		width: 300px;
		float: left;
		max-height: 400px;
		overflow-y: auto;
	}
	.pokemonList li {
		list-style: none;
		text-align: left;
		margin-bottom: 5px;
	}
	.pokemonList .pokeName {
		text-transform: capitalize;
		font-size: 18px;
		font-weight: 700;
	}
	button {
		background: none !important;
		border: none;
		padding: 0 !important;
		color: #069;
		text-decoration: underline;
		cursor: pointer;
	}
</style>
