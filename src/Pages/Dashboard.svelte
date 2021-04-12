<script>
	import { loggedIn, password, username, role, apiAddress, userId } from "../stores.js";

	import LoginForm from "../Components/LoginForm.svelte";

	import YourAccount from "../Components/YourAccount.svelte";
	import YourCourses from "../Components/YourCourses.svelte";
	import YourSchools from "../Components/YourSchools.svelte";
	import YourApplications from "../Components/YourApplications.svelte";
	import AdminPanel from "../Components/YourApplications.svelte";

	import axios from "axios";

	const options = [
		{ name: "Your Account", component: YourAccount, role: ["student", "school", "admin"] },
		{ name: "Your Courses", component: YourCourses, role: ["school"] },
		{ name: "Your Schools", component: YourSchools, role: ["school"] },
		{ name: "Your Applications", component: YourApplications, role: ["student"] },
		{ name: "Admin Panel", component: AdminPanel, role: ["admin"] },
	];

	let selected = options[0];

	$: console.log(selected);

	const getRole = async () => {
		await axios.get($apiAddress + "/getAccount.php?username=" + $username).then((res) => {
			console.log(res.data);
			switch (res.data.role) {
				case 1:
					role.set("student");
					break;
				case 2:
					role.set("school");
					break;
				case 3:
					role.set("admin");
					break;
				default:
					role.set("null");
			}
			userId.set(res.data.user_id);
			console.log(res.data.role);
		});
		return $role;
	};
	let promise = $role;
	$: if ($loggedIn) {
		if ($role == "null" || $role == null) {
			promise = getRole();
		}
	}

	const handleMenu = () => {};
</script>

<div class="main">
	{#if !$loggedIn}
		<LoginForm />
	{:else}
		<div class="dashboard">
			{#await promise then curentRole}
				<aside>
					<nav>
						<ul class="menu">
							{#each options as option}
								{#if option.role.includes($role)}
									<li
										on:click={() => {
											selected = option;
											handleMenu;
										}}
									>
										{option.name}
									</li>
								{/if}
							{/each}
							<li>
								<div id="button">
									<div class="wrapper">
										<button
											class="button logOut"
											on:click={() => {
												loggedIn.set(false);
												password.set("");
												role.set("null");
												userId.set("");
											}}>Log Out</button
										>
									</div>
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
							</li>
						</ul>
					</nav>
				</aside>
				<article>
					<h1>Hello, {$username}</h1>
					<svelte:component this={selected.component} />
				</article>
			{/await}
		</div>
	{/if}
</div>

<style type="scss">
	@import "../sass/main";
	@import "../sass/components/dashboard";
	@import "../sass/components/button";
	.main {
		height: 100%;
		width: 100%;

		h1 {
			text-align: center;
		}
	}
</style>
