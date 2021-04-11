<script>
	export let params;
	import axios from "axios";
	const id = params.schoolId;

	import { apiAddress, loggedIn, username } from "../stores.js";

	import UniversityDetails from "../Components/UniversityDetails.svelte";
	import { navigate } from "svelte-routing";

	let errors = {};
	let data = [];

	async function loadProgrammes() {
		errors = {};
		await axios
			.get($apiAddress + "/courses.php?school_id=" + id)
			.then((resp) => {
				data = Array.from(resp.data);
			})
			.catch(function (error) {
				console.log(error);
				if (error.response) {
					// client received an error response (5xx, 4xx)
					errors.LogIn = "No Courses Found";
				} else if (error.request) {
					// client never received a response, or request never left
					errors.LogIn = "Connection Error";
				} else {
					// anything else
					errors.LogIn = "Whoops?";
				}
			});

		console.log(data);
	}

	loadProgrammes();

	$: console.log(data);

	const columns = new Array("ID", "Name", "Description", "Start Date", "End Date");
	//if ($loggedIn) columns.push("Apply");

	const applyCourse = async (idCourse, courseName) => {
		if ($loggedIn) {
			var r = confirm("Are You sure you want to apply to this course: " + courseName + "?");
			if (r) {
				console.log("Helo");
				await axios
					.post($apiAddress + "/applyToCourse.php" + idCourse, {
						idCourse: idCourse,
						username: username,
					})
					.then(function (res) {
						response = res;
						console.log(response.status + " | " + response.data.message);
					});
			} else {
				return 0;
			}
		} else {
			alert("Please Log In");
		}
	};
</script>

<div class="main">
	<UniversityDetails {id} />
	<div class="programmes">
		<main>
			<table>
				{#if data != 0}
					<thead>
						<tr>
							{#each columns as column}
								<th>{column}</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each data as course, id}
							<tr>
								<td data-title="Id"> {id}</td>

								<td data-title="Name" contenteditable="false" bind:innerHTML={course.name} />
								<td
									data-title="Description"
									contenteditable="false"
									bind:innerHTML={course.programmeDescription}
								/>
								<td
									data-title="Start Date"
									contenteditable="false"
									bind:innerHTML={course.startDate}
								/>
								<td data-title="End Date" contenteditable="false" bind:innerHTML={course.endDate} />

								{#if $loggedIn}
									<td class="select">
										<button
											class="button"
											on:click={() => applyCourse(course.idCourse, course.name)}
										>
											Apply
										</button>
									</td>
								{/if}
							</tr>
						{/each}
					</tbody>
				{/if}
			</table>
		</main>
	</div>
</div>

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
</style>
