<script>
	import Icon from "svelte-awesome";
	import { faUser } from "@fortawesome/free-regular-svg-icons";

	import { Router, Link, Route } from "svelte-routing";

	let items = [
		{ name: "Homepage", url: "/" },
		{ name: "About Us", url: "about" },
		{ name: "Universities", url: "schools" },
	];

	export let url = "";

	let mainWidth = window.innerWidth;

	function handleMainResize() {
		mainWidth = window.innerWidth;
	}

	let logoPath = "./Assets/CapLogoMan.svg";
</script>

<svelte:window on:resize={handleMainResize} />
<header>
	<!-- Desktop -->
	{#if mainWidth >= 768}
		<div class="desktop">
			<nav class="menu" id="menu">
				<div class="menu__logo">
					<img src={logoPath} alt="Logo" />
					<p><span>|</span>CAP</p>
				</div>
				<Router {url}>
					<ul class="menu__container">
						{#each items as item}
							<li class="menu__item"><Link to={item.url}><span> {item.name}</span></Link></li>
						{/each}
					</ul>
				</Router>
				<div class="menu__login">
					<Router {url}>
						<Link to="dashboard"
							><button
								class="login__button noSelect"
								type="button"
								id="loginButton"
								on:click={(e) => {
									document.querySelector("#hamburgerButton").classList.remove("is-active");
									document.querySelector("nav.hamburger-menu").classList.add("closed");
								}}><Icon data={faUser} scale={2} /></button
							></Link
						>
					</Router>
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
						<Router {url}>
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
						</Router>
					</div>
				</div>
			</nav>
			<nav class="login">
				<Router {url}>
					<Link to="dashboard"
						><button
							class="login__button noSelect"
							type="button"
							id="loginButton"
							on:click={(e) => {
								document.querySelector("#hamburgerButton").classList.remove("is-active");
								document.querySelector("nav.hamburger-menu").classList.add("closed");
								console.log("hii");
							}}><Icon data={faUser} scale={2} /></button
						></Link
					>
				</Router>
			</nav>
			<div class="top_bar">
				<div class="top_bar__logo">
					<img src={logoPath} alt="Logo" />
					<p><span>|</span>CAP</p>
				</div>
			</div>
		</div>
	{/if}
</header>

<style type="text/scss">
	@import "../sass/main";
	@import "../sass/components/header";
	//@import "../../node_modules/hamburgers/_sass/hamburgers/hamburgers.scss";
</style>
