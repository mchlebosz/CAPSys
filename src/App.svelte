<script>
	import { Router, Route } from "svelte-routing";
	import Home from "./Pages/Home.svelte";
	import About from "./Pages/About.svelte";
	import Dashboard from "./Pages/Dashboard.svelte";
	import SchoolPage from "./Pages/SchoolPage.svelte";
	import ProgrammePage from "./Pages/ProgrammePage.svelte";
	//import PokeList from "./Pages/PokeList.svelte";
	import Schools from "./Pages/Schools.svelte";
	import { loggedIn } from "./stores.js";

	import Header from "./Layout/Header.svelte";
	import Footer from "./Layout/Footer.svelte";

	//export let url = "";

	$: {
		console.log(
			"Global: " + $loggedIn + typeof $loggedIn + " Session: " + sessionStorage.getItem("loggedIn")
		);
	}
</script>

<Router>
	<Header />

	<div class="main">
		<Route path="dashboard" component={Dashboard} />
		<Route path="about" component={About} />
		<Route path="schools" component={Schools} />
		<Route path="schools/:schoolId" let:params>
			<SchoolPage {params} />
		</Route>
		<Route path="schools/:schoolId/programme/:programmeId" let:params>
			<ProgrammePage {params} />
		</Route>
		<!-- <Route path="pokelist" component={PokeList} /> -->
		<Route path="/"><Home /></Route>
	</div>
	<Footer />
</Router>

<style type="text/scss">
	@import "./sass/main";

	.main {
		background-color: $c-background;
	}

	:global(body.contrast *) {
		font-weight: 500;
		background-color: white;
		color: black;
		button {
			background-color: red;
			color: white;
			&:hover {
				color: black;
			}
		}
		a {
			background-color: red;
			color: white;
			&:hover {
				color: black;
			}
		}
		input,
		select,
		textarea {
			color: black;
			background-color: white;
			option {
				color: black;
			}
		}
		$c-shade-1: gray;
		$c-shade-2: gray;
		$c-accent: red;
	}

	:global(body.font *) {
		font-weight: 500;
		font-size: 1.06em;
		h1 {
			font-size: 1.3em;
		}
		h2 {
			font-size: 1.2em;
		}
		h3 {
			font-size: 1.1em;
		}
		button {
			font-size: 1.1em;
		}
		a {
			font-size: 1.4em;
		}
		input,
		select,
		textarea {
			font-size: 1.1em;
		}
	}
</style>
