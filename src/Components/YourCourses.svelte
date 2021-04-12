<script>
	import axios from "axios";

	import { apiAddress, userId, imageKey } from "../stores.js";

	import { navigate } from "svelte-routing";

	let errors = {};
	let schools = [];
	let userCourses = new Array();
	let data = [];

	const columns = new Array("Name", "Description", "School", "Vacancies");

	async function getSchools() {
		errors = {};
		await axios
			.get($apiAddress + "/schools.php")
			.then((resp) => {
				schools = resp.data;
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

		return schools;
	}

	async function getCourses() {
		schools = await getSchools();
		let userSchools = schools.filter((school) => {
			return school.principal.id == $userId;
		});

		userCourses = new Array();
		errors = {};

		userSchools.forEach(async (school) => {
			await axios
				.get($apiAddress + "/recrutation.php?school_id=" + school.id)
				.then((resp) => {
					data = resp.data;
					userCourses = [...userCourses, data];
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
			console.log(userCourses);
		});
	}
	getCourses();

	const openDetails = (course) => {
		navigate("schools/" + course.idSchool + "/courses/" + course.idRecrutation, { replace: true });
	};

	const addRow = async (courses, cid) => {
		await axios
			.post($apiAddress + "/addCourse.php", {
				school_id: courses[0].idSchool,
				programme: "",
				description: "",
				start_date: "",
				end_date: "",
			})
			.then((resp) => {
				data = resp.data;
				courses = [
					...courses,
					{
						idRecrutation: data.id,
						courseName: "",
						courseDescription: "",
						courseStart: "",
						courseEnd: "",
						idSchool: courses[0].idSchool,
						vacancies: 0,
						students: {},
					},
				];
				userCourses[cid] = courses;
				console.log(userCourses);
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
	};

	$: {
		userCourses = userCourses;
		console.log(userCourses);
	}
</script>

<h3>Your Courses</h3>

{#await userCourses}
	...Loading
{:then Courses}
	<div class="courses">
		{#each Courses as courseData, id}
			<table>
				<thead>
					<tr>
						{#each columns as column}
							<th>{column}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each courseData as course}
						<tr>
							<td data-title="Name" contenteditable="true" bind:innerHTML={course.courseName} />
							<td
								data-title="Description"
								contenteditable="true"
								bind:innerHTML={course.courseDescription}
							/>
							<td data-title="School">
								{schools.find((element) => element.id == course.idSchool).name}
							</td>
							<td data-title="Vacancies">{course.students.length} / {course.vacancies}</td>

							<td class="select">
								<button class="button" on:click={openDetails(course)}> Details </button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>

			<div id="button">
				<div class="wrapper">
					<button
						class="button "
						on:click={() => {
							addRow(courseData, id);
						}}>ADD</button
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
		{/each}
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
