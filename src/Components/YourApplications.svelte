<script>
	import axios from "axios";

	import { apiAddress, userId, imageKey } from "../stores.js";
	const columns = new Array("Name", "Description", "School", "Vacancies");

	let errors = {};
	let data = " ";

	async function getCourses() {
		await axios
			.get($apiAddress + "/recrutation.php")
			.then((resp) => {
				data = resp.data;
				console.log(data);

				data = data.filter((item) => {
					return item.students.find((element) => element.idUser == $userId);
				});
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
	}
	data = getCourses();
</script>

<h3>Your Applications</h3>

<div class="main">
	{#await data}
		...Loading
	{:then Applications}
		<table>
			<thead>
				<tr>
					{#each columns as column}
						<th>{column}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each Applications as application}
					<tr>
						<td data-title="Name" contenteditable="false" bind:innerHTML={application.courseName} />
						<td
							data-title="Description"
							contenteditable="false"
							bind:innerHTML={application.courseDescription}
						/>
						<td
							data-title="Course Start"
							contenteditable="false"
							bind:innerHTML={application.courseStart}
						/>
						<td
							data-title="Recrutation End"
							contenteditable="false"
							bind:innerHTML={application.recrutationEnd}
						/>
					</tr>
				{/each}
			</tbody>
		</table>
	{:catch error}
		No Applications
	{/await}
</div>

<style type="scss">
	@import "../sass/main";
	@import "../sass/components/table";
	@import "../sass/components/input";
	@import "../sass/components/button";

	td {
		img {
			width: 50px;
		}
	}

	#button {
		margin-top: 15px;
	}
</style>
