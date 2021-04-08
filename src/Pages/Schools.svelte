<script>
	import UniversityTile from "../Components/UniversityTile.svelte";

	const items = [
		{
			id: 1,
			name: "Groningen",
			description:
				" wpływem dodanego humoru czy przypadkowych słów, które nawet w najmniejszym stopniu nie przypominają istniejących. Jeśli masz zamiar",
			schoolType: "University",
			address: "Groningen",
			city: "Groningen",
			country: "Netherlands",
			photo: "https://picsum.photos/200",
		},
		{
			id: 2,
			name: "Polibuda",
			description:
				"et Malorum”, czyli „O granicy dobra i zła”, napisanej właśnie w 45 p.n.e. przez Cycerona. Jest to bardzo popularna w czasach renesansu rozprawa na temat etyki. Pierwszy wiersz Lorem Ipsum, „Lorem ipsu",
			schoolType: "Politechnika",
			address: "tutaj",
			city: "Poznań",
			country: "Poland",
			photo: "https://upload.wikimedia.org/wikipedia/commons/1/11/Logo_PP.png",
		},
		{
			id: 3,
			name: "Polibuda",
			description:
				"et Malorum”, czyli „O granicy dobra i zła”, napisanej właśnie w 45 p.n.e. przez Cycerona. Jest to bardzo popularna w czasach renesansu rozprawa na temat etyki. Pierwszy wiersz Lorem Ipsum, „Lorem ipsu",
			schoolType: "Politechnika",
			address: "tutaj",
			city: "Poznań",
			country: "Poland",
			photo: "https://upload.wikimedia.org/wikipedia/commons/1/11/Logo_PP.png",
		},
	];
</script>

<div class="main">
	{#each items as item}
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
