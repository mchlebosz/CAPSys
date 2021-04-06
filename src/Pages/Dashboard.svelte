<script>
	let loggedIn = false;

	import LoginForm from "../Components/LoginForm.svelte";
</script>

{#if !loggedIn}
	<LoginForm />
{/if}

<style type="scss">
	@import "../sass/main";
	@import "../sass/components/dashboard";
	@import "../sass/form";
</style>
