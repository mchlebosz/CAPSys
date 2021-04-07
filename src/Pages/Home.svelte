<script>
	let lorem = `

		Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym.
		Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej
		książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie
		niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu,
		zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym

	`;

	let slides = [
		{ photo: "https://picsum.photos/300/200", content: lorem },
		{ photo: "https://picsum.photos/300/200", content: lorem },
		{ photo: "https://picsum.photos/300/200", content: lorem },
	];

	import IntersectionObserver from "../Components/IntersectionObserver.svelte";
</script>

<div class="main">
	<h1>Find best university for You! 🏫</h1>
	<!-- <PokeList /> -->
	<div class="container">
		{#each slides as slide, i}
			<div class="flex">
				<div class="photo">
					<IntersectionObserver once={true} let:intersecting>
						{#if intersecting}
							<img src={slide.photo + "?random=" + i} alt="stock" />
						{/if}
					</IntersectionObserver>
				</div>
				<div class="text">
					<p>{slide.content}</p>
				</div>
			</div>
			<hr />
		{/each}
	</div>
</div>

<style type="text/scss">
	@import "../sass/main";
	.main {
		background-color: $c-background;
		padding: 20px 5% 20px 5%;
		h1 {
			text-align: center;
		}
	}

	.container {
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		hr:not(:last-of-type) {
			border: 1px solid $c-shade-1;
			width: 100%;
		}
	}
	.flex {
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		align-items: center;

		.photo {
			margin: 20px;
			flex-grow: 3;
			img {
				border-radius: 14px;
				height: auto;
				width: auto;
				margin: auto;
			}
		}
		.text {
			flex-grow: 6;

			p {
				margin: 20px;
			}
		}
	}
	@media (min-width: $sm) {
		.flex {
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
			width: 100%;

			.photo {
				margin: 20px;
				flex-grow: 3;
				img {
					border-radius: 14px;
					height: auto;
					width: auto;
					margin: auto;
				}
			}
			.text {
				flex-grow: 6;

				p {
					margin: 20px;
				}
			}

			&:nth-last-of-type(even) {
				flex-direction: row-reverse;
			}
		}
	}
</style>
