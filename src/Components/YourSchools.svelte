<script>
	import axios from "axios";

	import { apiAddress, userId, imageKey } from "../stores.js";

	let errors = {};
	let data = {};

	const columns = new Array("Name", "Description", "Type", "Street", "City", "Country", "Logo");
	async function getDetails() {
		errors = {};
		console.log($apiAddress);
		await axios
			.get($apiAddress + "/schools.php")
			.then((resp) => {
				data = resp.data;
			})
			.catch(function (error) {
				console.log(error);
				if (error.response) {
					// client received an error response (5xx, 4xx)
					errors.LogIn = "No Universities Found";
				} else if (error.request) {
					// client never received a response, or request never left
					errors.LogIn = "Connection Error";
				} else {
					// anything else
					errors.LogIn = "Whoops?";
				}
			});

		return data;
	}

	data = getDetails();

	const editSchool = (school) => {
		console.log(school.id);
		console.log(school.name);
		console.log(school.type);
		console.log(school.photo);
	};

	const uploadPhoto = async (school) => {
		let photo = document.getElementById("logo" + school.id).files[0];
		let body = new FormData();
		body.set("key", $imageKey);
		body.append("image", photo);

		return axios({
			method: "post",
			url: "https://api.imgbb.com/1/upload",
			data: body,
		});
	};
</script>

<h3>Your Schools</h3>

{#await data}
	...Loading
{:then schoolsData}
	<table>
		{#if schoolsData != 0}
			<thead>
				<tr>
					{#each columns as column}
						<th>{column}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each schoolsData as school}
					{#if school.principal.id == $userId}
						<tr>
							<td data-title="Name" contenteditable="true" bind:innerHTML={school.name} />
							<td
								data-title="Description"
								contenteditable="true"
								bind:innerHTML={school.description}
							/>
							<td data-title="Type" contenteditable="true" bind:innerHTML={school.type} />
							<td
								data-title="street"
								contenteditable="true"
								bind:innerHTML={school.address.street}
							/>
							<td data-title="city" contenteditable="false" bind:innerHTML={school.address.city} />
							<td
								data-title="country"
								contenteditable="true"
								bind:innerHTML={school.address.country}
							/>
							<td data-title="Logo" contenteditable="false">
								<img
									src={school.photo}
									alt="Logo"
									on:click={() => {
										document.getElementById("logo" + school.id).click();
									}}
								/>
								<input
									type="file"
									id="logo{school.id}"
									name="logo"
									accept="image/png, image/jpeg"
									style="display:none"
									on:change={() => {
										uploadPhoto(school).then((resp) => {
											school.photo = resp.data.data.url; // I'm aware it's data.data, that is how it returns stuff
										});
									}}
								/>
							</td>
							<td class="select">
								<button class="button" on:click={() => editSchool(school)}> Edit </button>
							</td>
						</tr>
					{/if}
				{/each}
			</tbody>
		{/if}
	</table>
{/await}

<style type="scss">
	@import "../sass/main";
	@import "../sass/components/table";

	.main {
		background-color: $c-background;
		width: 100%;
		height: 100%;
	}

	.programmes {
		padding: 20px;
	}

	td {
		img {
			width: 50px;
		}
	}
</style>
