<script>
	import { Link } from "svelte-routing";
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

	let isFont = false;
	let isContrast = false;
</script>

<footer>
	<div class="menu">
		<ul class="menu__container flex">
			{#each items as item}
				<li class="menu__item"><Link to={item.url}><span> {item.name}</span></Link></li>
			{/each}
		</ul>
	</div>
	<div class="flex">Created by Mateusz Chlebosz 4C, Zespół Szkół Komunikacji</div>
	<div class="a11y">
		<button
			on:click={() => {
				document.body.classList.toggle("contrast");
				isFont = isFont ? false : true;
			}}
		>
			{#if isFont} Decrease Contrast{:else}Increase Contrast{/if}</button
		>
		<button
			on:click={() => {
				document.body.classList.toggle("font");
				isContrast = isContrast ? false : true;
			}}
			>{#if isContrast} Decrease Font Size{:else}Increase Font Size {/if}</button
		>
	</div>
</footer>

<style type="scss">
	@import "../sass/main";
	@import "../sass/components/footer";
</style>
