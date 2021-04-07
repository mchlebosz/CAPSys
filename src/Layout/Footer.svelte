<script>
	import { Router, Link, Route } from "svelte-routing";
	import { loggedIn } from "../stores.js";
	let LogMessage = "Log In";
	$: {
		if (!$loggedIn) LogMessage = "Log In";
		else LogMessage = "Your Account";
	}
	$: LogMessage = LogMessage;

	let items;
	$: items = [
		{ name: "Homepage", url: "/" },
		{ name: "About Us", url: "about" },
		{ name: "Universities", url: "schools" },
		{ name: LogMessage, url: "dashboard" },
	];

	export let url = "";
</script>

<footer>
	<div class="menu">
		<Router {url}>
			<ul class="menu__container flex">
				{#each items as item}
					<li class="menu__item"><Link to={item.url}><span> {item.name}</span></Link></li>
				{/each}
			</ul>
		</Router>
	</div>
	<div class="flex">Created by Mateusz Chlebosz 4C</div>
</footer>

<style type="scss">
	@import "../sass/main";
	@import "../sass/components/footer";
</style>
