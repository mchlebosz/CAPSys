<script>
	export let details;
	export let id;
	import { fade } from "svelte/transition";
</script>

<div transition:fade>
	<h1>{details}</h1>
</div>
