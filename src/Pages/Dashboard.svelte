<script>
	import { loggedIn, password } from "../stores.js";

	import LoginForm from "../Components/LoginForm.svelte";
</script>

<div class="main">
	{#if !$loggedIn}
		<LoginForm />
	{:else}
		<div class="dashboard">
			Logged In
			<button
				class="logOut"
				on:click={() => {
					loggedIn.set(false);
					password.set("");
				}}>Log Out</button
			>
		</div>
	{/if}
</div>

<style type="scss">
	@import "../sass/main";
	@import "../sass/components/dashboard";
	.main {
		height: 100vh;
	}
</style>
