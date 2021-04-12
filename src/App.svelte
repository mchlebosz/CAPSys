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
		<Route path="schools/:schoolId/courses/:courseId" let:params>
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
		position: relative;
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		background-color: $c-background;
		min-height: calc(100% - 344px);
	}
</style>
