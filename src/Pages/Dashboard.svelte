<script>
	import { loggedIn, password } from "../stores.js";

	import LoginForm from "../Components/LoginForm.svelte";

	import axios from "axios";
</script>

<div class="main">
	{#if !$loggedIn}
		<LoginForm />
	{:else}
		<div class="dashboard">
			<aside>
				<nav>
					<ul class="menu">
						<li>My Account</li>
						<li>
							<button
								class="logOut"
								on:click={() => {
									loggedIn.set(false);
									password.set("");
								}}>Log Out</button
							>
						</li>
					</ul>
				</nav>
			</aside>
			<article>Hello, you are Logged In</article>
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
