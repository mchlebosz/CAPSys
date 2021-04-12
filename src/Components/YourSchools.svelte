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
				console.log(data);
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

	const editSchool = async (school) => {
		errors = {};
		console.log($apiAddress);
		try {
			if (school.type_id == null) throw "Choose Type";

			await axios
				.post($apiAddress + "/addSchool.php", {
					school_id: school.id,
					principal_id: school.principal.id,
					name: school.name,
					type_id: school.type_id,
					address: school.address.street,
					city: school.address.city,
					country: school.address.country,
					photo: school.photo,
					description: school.description,
				})
				.then((resp) => {
					data = resp.data;
					console.log(data);
					data = getDetails();
				})
				.catch(function (error) {
					console.log(error);
					if (error.response) {
						// client received an error response (5xx, 4xx)
						throw "No Universities Found";
					} else if (error.request) {
						// client never received a response, or request never left
						throw "Connection Error";
					} else {
						// anything else
						throw "Whoops?";
					}
				});
		} catch (e) {
			alert(e);
		}
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

	const addRow = () => {
		data = [
			...data,
			{
				id: null,
				name: "",
				description: "",
				type: null,
				address: { street: "", city: "", country: "" },
				principal: { id: $userId },
				type_id: null,
				photo:
					"https://image.shutterstock.com/image-vector/university-logo-template-600w-1331382584.jpg",
			},
		];
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
							<td data-title="Type" contenteditable="false"
								><div class="select">
									<select name="slct" id="slct" class="select" required bind:value={school.type_id}>
										{#if school.type_id == 1}
											<option value="1" selected="selected">Politechnika</option>
										{:else}
											<option value="1">Politechnika</option>
										{/if}
										{#if school.type_id == 2}
											<option value="2" selected="selected">University</option>
										{:else}
											<option value="2">University</option>
										{/if}
										{#if school.type_id == 3}
											<option value="3" selected="selected">UAS</option>
										{:else}
											<option value="3">UAS</option>
										{/if}
										{#if school.type_id == null}
											<option value="3" selected="selected" hidden disabled>Choose Type</option>
										{/if}
									</select>
								</div>
							</td>
							<td
								data-title="street"
								contenteditable="true"
								bind:innerHTML={school.address.street}
							/>
							<td data-title="city" contenteditable="true" bind:innerHTML={school.address.city} />
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
								<button class="button" on:click={editSchool(school)}> Edit </button>
							</td>
						</tr>
					{/if}
				{/each}
			</tbody>
		{/if}
	</table>
	<div id="button">
		<div class="wrapper">
			<button class="button " on:click={addRow}>ADD</button>
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
{/await}

<style type="scss">
	@import "../sass/main";
	@import "../sass/components/table";
	@import "../sass/components/button";

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

	#button {
		margin-top: 15px;
	}
</style>
