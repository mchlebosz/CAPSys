<script>
	import Icon from "svelte-awesome";
	import { faUser } from "@fortawesome/free-regular-svg-icons";
	import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

	import { Link } from "svelte-routing";

	import { loggedIn } from "../stores.js";

	let items = [
		{ name: "Homepage", url: "/" },
		{ name: "About Us", url: "about" },
		{ name: "Universities", url: "schools" },
	];

	import { fade } from "svelte/transition";

	//export let url = "";

	let mainWidth = window.innerWidth;

	function handleMainResize() {
		mainWidth = window.innerWidth;
	}
	let logoPath = "/Assets/CapLogoMan.svg";
</script>

<svelte:window on:resize={handleMainResize} />
<header>
	<!-- Desktop -->
	{#if mainWidth >= 768}
		<div class="desktop">
			<nav class="menu" id="menu">
				<Link to="/">
					<div class="menu__logo">
						<img src={logoPath} alt="Logo" />
						<p><span>|</span>CAPSys</p>
					</div>
				</Link>
				<ul class="menu__container">
					{#each items as item}
						<li class="menu__item"><Link to={item.url}><span> {item.name}</span></Link></li>
					{/each}
				</ul>
				<div class="menu__login">
					<Link to="dashboard"
						><button
							class="login__button noSelect"
							type="button"
							id="loginButton"
							on:click={(e) => {
								//document.querySelector("#hamburgerButton").classList.remove("is-active");
								//document.querySelector("nav.hamburger-menu").classList.add("closed");
							}}
						>
							{#if $loggedIn}
								<span in:fade>
									<Icon data={faUser} scale={2} />
								</span>
							{:else}
								<span in:fade>
									<Icon data={faSignInAlt} scale={2} />
								</span>
							{/if}
						</button></Link
					>
				</div>
			</nav>
		</div>
	{:else}
		<!--Mobile -->
		<div class="mobile">
			<nav class="hamburger-menu closed" id="hamburger">
				<div class="hamburger-menu__button_container">
					<button
						class="hamburger hamburger--3dy  hamburger-menu__button noSelect"
						type="button"
						id="hamburgerButton"
						on:click={(e) => {
							document.querySelector("#hamburgerButton").classList.toggle("is-active");
							document.querySelector("nav.hamburger-menu").classList.toggle("closed");
						}}
					>
						<span class="hamburger-box">
							<span class="hamburger-inner" />
						</span>
					</button>
					<div class="content">
						<ul class="hamburger-menu__container">
							{#each items as item}
								<li
									class="hamburger-menu__item"
									on:click={(e) => {
										document.querySelector("#hamburgerButton").classList.remove("is-active");
										document.querySelector("nav.hamburger-menu").classList.add("closed");
									}}
								>
									<Link to={item.url}><span> {item.name}</span></Link>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</nav>
			<nav class="login">
				<Link to="dashboard">
					<button
						class="login__button noSelect"
						type="button"
						id="loginButton"
						on:click={(e) => {
							document.querySelector("#hamburgerButton").classList.remove("is-active");
							document.querySelector("nav.hamburger-menu").classList.add("closed");
							console.log("hii");
						}}
						>{#if $loggedIn}
							<span in:fade>
								<Icon data={faUser} scale={2} />
							</span>
						{:else}
							<span in:fade>
								<Icon data={faSignInAlt} scale={2} />
							</span>
						{/if}</button
					></Link
				>
			</nav>
			<div class="top_bar">
				<Link to="/">
					<div class="top_bar__logo">
						<img src={logoPath} alt="Logo" />
						<p><span>|</span>CAPSys</p>
					</div>
				</Link>
			</div>
		</div>
	{/if}
</header>

<style type="text/scss">
	@import "../sass/main";
	@import "../sass/components/header";
</style>
