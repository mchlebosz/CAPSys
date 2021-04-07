<script>
	import { loggedIn } from "../stores.js";

	import LoginForm from "../Components/LoginForm.svelte";
</script>

<div class="main">
	{#if !$loggedIn}
		<LoginForm />
	{:else}
		<div class="dashboard">Logged In</div>
	{/if}
</div>

<style type="scss">
	@import "../sass/main";
	@import "../sass/components/dashboard";
	.main {
		height: 100vh;
	}
</style>
