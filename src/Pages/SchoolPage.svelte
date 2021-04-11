<script>
	export let params;
	import axios from "axios";
	const id = params.schoolId;
	console.log(params);
	console.log(id);

	import UniversityDetails from "../Components/UniversityDetails.svelte";
</script>

<div class="main">
	<UniversityDetails {id} />
	<div class="programmes">
		<table>Tabelka</table>
	</div>
</div>

<style type="scss">
	@import "../sass/main";

	.main {
		background-color: $c-background;
		width: 100%;
		height: 100%;
	}
</style>
