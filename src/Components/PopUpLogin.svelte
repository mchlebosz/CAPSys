<script>
	export let text = "button";
	export let id = "";
	import LoginForm from "./LoginForm.svelte";
	import { getContext } from "svelte";

	const { open } = getContext("simple-modal");
	import { loggedIn, apiAddress } from "../stores.js";
	import { navigate } from "svelte-routing";

	let windowOpen = false;

	$: if ($loggedIn && windowOpen) navigate("schools/" + id, { replace: true });

	const showDetails = () => {
		if (!$loggedIn) {
			windowOpen = true;

			open(
				LoginForm,
				{},
				{},
				{
					onClose: () => {
						windowOpen = false;
					},
				}
			);
		} else navigate("schools/" + id, { replace: true });
	};
</script>

<div id="button">
	<div class="wrapper">
		<button class="button" on:click={showDetails}> {text} </button>
	</div>

	<!-- Filter: https://css-tricks.com/gooey-effect/ -->
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

<style type="text/scss">
	@import "../sass/main";
	@import "../sass/components/button";

	#button {
		width: 76%;
	}

	.button {
		width: 100%;
		font-size: 1.1rem;
	}
</style>
