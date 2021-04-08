<script>
	import axios from "axios";

	import Icon from "svelte-awesome";
	import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";

	import { fade } from "svelte/transition";
	import { loggedIn, username, password } from "../stores.js";

	let register = false;
	$: register = register;

	let errors = {};

	var loading = false;

	// TODO: W przypadku innym niz dobre logowanie strona się przeładowuje bez znaku
	async function userLogin() {
		errors = {};
		loading = true;

		let usernameLocal = document.getElementById("username").value;
		let passwordLocal = document.getElementById("password").value;
		password.set(passwordLocal);

		if (usernameLocal.length === 0) {
			errors.Username = "Field cannot be empty";
			loading = false;
		} else if (passwordLocal.length === 0) {
			errors.Password = "Field cannot be empty";
			loading = false;
		} else {
			let response;

			axios
				.post("http://localhost:8080/login.php", {
					username: usernameLocal,
					password: passwordLocal,
				})
				.then(function (res) {
					response = res;
					console.log(response.status + " | " + response.data.message);
					loggedIn.set(true);
					username.set(usernameLocal);

					loading = true;
				})
				.catch(function (error) {
					console.log(error);
					if (error.response) {
						// client received an error response (5xx, 4xx)
						errors.LogIn = "Wrong Username or Password";
					} else if (error.request) {
						// client never received a response, or request never left
						errors.LogIn = "Connection Error";
					} else {
						// anything else
						errors.LogIn = "Whoops?";
					}
				})
				.then(() => {
					loading = false;
				});
		}
	}

	async function userRegister() {
		errors = {};
		loading = true;
		try {
			let username = document.getElementById("username").value;
			let password = document.getElementById("password").value;
			let rpassword = document.getElementById("rpassword").value;
			let mail = document.getElementById("email").value;
			let role = document.getElementById("slct");
			role = role.value;
			switch (role) {
				case "student":
					role = 1;
					break;
				case "school":
					role = 2;
					break;
				default:
					role = 0;
					break;
			}
			if (username == "") throw new Error("Enter Username");
			if (mail == "") throw new Error("Enter E-mail");
			if (password != rpassword) throw new Error("Passwords doesn't match");
			if (role == 0) throw new Error("Select Account type");

			let response;

			axios
				.post("http://localhost:8080/register.php", {
					username: username,
					password: password,
					mail: mail,
					role: role,
				})
				.then(function (res) {
					response = res;
					alert(response.status + " | " + response.data.message);
					loggedIn.set(true);

					username.set(usernameLocal);
				})
				.catch(function (error) {
					if (error.response) {
						// client received an error response (5xx, 4xx)
						errors.Register = "Wrong Data";
					} else if (error.request) {
						// client never received a response, or request never left
						errors.Register = "Connection Error";
					} else {
						// anything else
						errors.Register = "Whoops?";
					}
				})
				.then(() => {
					loading = false;
				});
		} catch (e) {
			loading = false;
			errors.Error = e.message;
		}
	}
</script>

<div class="loginPage">
	{#if register == false}
		<!-- login -->
		<div class="loginPage slide-content" in:fade>
			<form
				class="login"
				id="form-id"
				on:submit={(e) => {
					e.preventDefault();
				}}
			>
				<div class="form__group field" id="in1">
					<input
						type="text"
						class="form__field"
						placeholder="Username"
						name="username"
						id="username"
						bind:value={$username}
						required
					/>
					<label for="username" class="form__label">Username</label>
				</div>
				<div class="form__group field" id="in2">
					<input
						type="password"
						class="form__field"
						placeholder="Password"
						name="password"
						id="password"
						required
					/>
					<label for="password" class="form__label">Password</label>
				</div>
				<div class="controls">
					<div id="button">
						<div class="wrapper">
							<button class="button" on:click={userLogin}>
								Log In {#if loading} <Icon data={faSyncAlt} scale={1} spin /> {/if}</button
							>
						</div>
						<!-- Filter: https://css-tricks.com/gooey-effect/ -->
						<svg
							style="visibility: hidden; position: absolute;"
							width="0"
							height="0"
							xmlns="http://www.w3.org/2000/svg"
							version="1.1"
						>
							<defs>
								<filter id="goo"
									><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
									<feColorMatrix
										in="blur"
										mode="matrix"
										values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
										result="goo"
									/>
									<feComposite in="SourceGraphic" in2="goo" operator="atop" />
								</filter>
							</defs>
						</svg>
					</div>
					<div id="register">
						<a
							href="#"
							on:click={(e) => {
								register = true;
							}}>Register</a
						>
					</div>
				</div>

				{#if Object.keys(errors).length > 0}
					<div class="errors__box">
						<ul class="errors__list">
							{#each Object.keys(errors) as field}
								<li class="errors__item">{errors[field]}</li>
							{/each}
						</ul>
					</div>
				{/if}
			</form>
		</div>
	{:else}
		<!-- Register -->
		<div class="loginPage slide-content" in:fade>
			<form
				class="login"
				id="register-id"
				on:submit={(e) => {
					e.preventDefault();
				}}
			>
				<div class="form__group field" id="in1">
					<input
						type="text"
						class="form__field"
						placeholder="Username"
						name="username"
						id="username"
						required
					/>
					<label for="username" class="form__label">Username</label>
				</div>
				<div class="form__group field" id="in1">
					<input
						type="email"
						class="form__field"
						placeholder="E-mail"
						name="email"
						id="email"
						required
					/>
					<label for="email" class="form__label">E-Mail</label>
				</div>
				<div class="form__group field" id="in2">
					<input
						type="password"
						class="form__field"
						placeholder="Password"
						name="password"
						id="password"
						required
					/>
					<label for="password" class="form__label">Password</label>
				</div>
				<div class="form__group field" id="in2">
					<input
						type="password"
						class="form__field"
						placeholder="Repeat Password"
						name="rpassword"
						id="rpassword"
						required
					/>
					<label for="rpassword" class="form__label">Repeat Password</label>
				</div>
				<div class="select" id="in2">
					<select name="slct" id="slct" class="select" required>
						<option value="null" disabled selected="selected" hidden>Select Account Type</option>
						<option value="student">Student</option>
						<option value="school">University</option>
					</select>
				</div>
				<div class="controls">
					<div id="button">
						<div class="wrapper">
							<button class="button" on:click={userRegister}
								>Register {#if loading} <Icon data={faSyncAlt} scale={1} spin /> {/if}</button
							>
						</div>
						<!-- Filter: https://css-tricks.com/gooey-effect/ -->
						<svg
							style="visibility: hidden; position: absolute;"
							width="0"
							height="0"
							xmlns="http://www.w3.org/2000/svg"
							version="1.1"
						>
							<defs>
								<filter id="goo"
									><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
									<feColorMatrix
										in="blur"
										mode="matrix"
										values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
										result="goo"
									/>
									<feComposite in="SourceGraphic" in2="goo" operator="atop" />
								</filter>
							</defs>
						</svg>
					</div>
					<div id="register">
						<a
							href="#"
							on:click={() => {
								register = false;
							}}>Log In</a
						>
					</div>
				</div>
				{#if Object.keys(errors).length > 0}
					<div class="errors__box">
						<ul class="errors__list">
							{#each Object.keys(errors) as field}
								<li class="errors__item">{errors[field]}</li>
							{/each}
						</ul>
					</div>
				{/if}
			</form>
		</div>
	{/if}
</div>

<style type="scss">
	@import "../sass/main";
	@import "../sass/form";
</style>
