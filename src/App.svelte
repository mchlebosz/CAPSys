<script>
	import { Router, Route } from "svelte-routing";
	import Home from "./Pages/Home.svelte";
	import About from "./Pages/About.svelte";
	import Dashboard from "./Pages/Dashboard.svelte";
	import PokeList from "./Pages/PokeList.svelte";
	import Schools from "./Pages/Schools.svelte";
	import { loggedIn } from "./stores.js";

	import Header from "./Layout/Header.svelte";
	import Footer from "./Layout/Footer.svelte";

	export let url = "";

	$: {
		console.log("Global: " + $loggedIn + " Session: " + sessionStorage.getItem("loggedIn"));
	}
</script>

<Header />
<button
	on:click={() => {
		if ($loggedIn) loggedIn.set(false);
		else loggedIn.set(true);
	}}>{$loggedIn}</button
>

<Router {url}>
	<div class="main">
		<Route path="dashboard" component={Dashboard} />
		<Route path="about" component={About} />
		<Route path="schools" component={Schools} />
		<Route path="pokelist" component={PokeList} />
		<Route path="/"><Home /></Route>
	</div>
</Router>

<Footer />

<style>
</style>
