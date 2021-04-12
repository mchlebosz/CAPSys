<script>
	export let params;

	import axios from "axios";

	import { apiAddress, userId, imageKey } from "../stores.js";

	let errors = {};
	let schoolPrincipal = [];
	let Course;
	let data;

	const columns = new Array("Name", "Surname");

	async function getSchools() {
		errors = {};
		await axios
			.get($apiAddress + "/schools.php?school_id=" + params.schoolId)
			.then((resp) => {
				let school = resp.data;
				schoolPrincipal = school.principal;
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

	async function getCourses() {
		await getSchools();
		errors = {};

		if (schoolPrincipal.id == $userId) {
			await axios
				.get($apiAddress + "/recrutation.php?course_id=" + params.courseId)
				.then((resp) => {
					Course = resp.data;
					if (Course[0].idRecrutation) Course = Course[0];
					console.log(Course);
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
		} else {
			console.log("Wrong user");
			Course = "Error Wrong User";
		}
	}

	const saveChanges = async (Course) => {
		console.log(Course.courseName);
		errors = {};
		try {
			await axios
				.post($apiAddress + "/addCourse.php", {
					course_id: params.courseId,
					school_id: params.schoolId,
					programme: Course.courseName,
					description: Course.courseDescription,
					start_date: Course.courseStart,
					end_date: Course.CourseEnd,
				})
				.then((resp) => {
					data = resp.data;
					console.log(data);
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

	Course = getCourses();
</script>

<div class="main">
	{#await Course}
		...Loading
	{:then CourseLoad}
		<div class="courseDetails">
			<div class="form__group field">
				<input
					type="text"
					class="form__field"
					placeholder="Course Name"
					name="courseName"
					id="courseName"
					bind:value={Course.courseName}
					required
				/>
				<label for="courseName" class="form__label">Course Name</label>
			</div>
			<div class="form__group field">
				<input
					type="date"
					class="form__field"
					placeholder="Course Start"
					name="courseStart"
					id="courseStart"
					bind:value={Course.courseStart}
					required
				/>
				<label for="courseStart" class="form__label">Course Start</label>
			</div>
			<div class="form__group field">
				<input
					type="date"
					class="form__field"
					placeholder="Course End"
					name="courseEnd"
					id="courseEnd"
					bind:value={Course.CourseEnd}
					required
				/>
				<label for="courseEnd" class="form__label">Course End</label>
			</div>
			<div class="form__group field">
				<textarea
					class="form__field"
					placeholder="Course Description"
					name="description"
					id="description"
					bind:value={Course.courseDescription}
					required
				/>
				<label for="description" class="form__label">Course Description</label>
			</div>
			<div class="form__group field">
				<input
					type="date"
					class="form__field"
					placeholder="Recrutation Start"
					name="recrutationStart"
					id="recrutationStart"
					bind:value={Course.recrutationStart}
					required
				/>
				<label for="recrutationStart" class="form__label">Recrutation Start</label>
			</div>
			<div class="form__group field">
				<input
					type="date"
					class="form__field"
					placeholder="Recrutation End"
					name="recrutationEnd"
					id="recrutationEnd"
					bind:value={Course.recrutationEnd}
					required
				/>
				<label for="recrutationEnd" class="form__label">Recrutation End</label>
			</div>
			<div class="form__group field">
				<input
					type="number"
					class="form__field"
					placeholder="Vacancies"
					name="vacancies"
					id="vacancies"
					bind:value={Course.vacancies}
					required
				/>
				<label for="vacancies" class="form__label">Vacancies</label>
			</div>
		</div>
		<div id="button">
			<div class="wrapper">
				<button class="button" on:click={saveChanges(Course)}>Save Changes</button>
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
		<div class="students">
			<h3>Candidates</h3>
			<thead>
				<tr>
					{#each columns as column}
						<th>{column}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each CourseLoad.students as student}
					<tr>
						<td data-title="Name" contenteditable="false" bind:innerHTML={student.firstname} />
						<td data-title="Surname" contenteditable="salse" bind:innerHTML={student.lastname} />
					</tr>
				{/each}
			</tbody>
		</div>
	{/await}
</div>

<style type="scss">
	@import "../sass/main";
	@import "../sass/components/table";
	@import "../sass/components/input";
	@import "../sass/components/button";

	.main {
		background-color: $c-shade-1;
		padding: 40px;
		border-radius: 10px;
		margin: 40px;
		box-shadow: 5px 5px 15px -5px black;
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
