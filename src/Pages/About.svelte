<script>
	import Carousel from "svelte-carousel";
	import "svelte-carousel/dist/index.css";
	import * as jQuery from "jquery";
	// ...
	//jQuery("#carousel").slick();
	$: items = [
		{
			heading: "Lorem ipsum dolor sit amet.",
			photo: "https://picsum.photos/seed/pccc/300/200",
			text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus, unde?",
		},
		{
			heading: "Lorem ipsum dolor sit amet.",
			photo: "https://picsum.photos/seed/pfdgc/300/200",
			text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus, unde?",
		},
		{
			heading: "Lorem ipsum dolor sit amet.",
			photo: "https://picsum.photos/seed/ertreec/300/200",
			text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus, unde?",
		},
		{
			heading: "Lorem ipsum dolor sit amet.",
			photo: "https://picsum.photos/seed/pgrgtrcc/300/200",
			text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus, unde?",
		},
	];
</script>

<div class="content">
	<h1>Who we are?</h1>

	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex corporis adipisci sapiente culpa
		sunt? Voluptatum, architecto est labore nisi quas sit hic laudantium quia atque repellat?
		Tempora praesentium aperiam quam nesciunt tempore commodi, porro ipsam mollitia nihil
		reprehenderit! Consequuntur, ratione!
	</p>
	<!-- <Carousel autoplay={true} autoplayDuration={2000}> -->
	<div id="carousel">
		{#each items as item}
			<div class="img">
				<img src={item.photo} alt="About us" />
				<div class="text">
					<h2>{item.heading}}</h2>
					<p>{item.text}</p>
				</div>
			</div>
		{/each}
	</div>
	<!-- </Carousel> -->
	<h2 class="ask">Ask us about anything 😁</h2>
	<form
		action="mailto:support@capsys.com"
		class="contact"
		method="POST"
		enctype="multipart/form-data"
		name="EmailForm"
	>
		<div class="form__group field">
			<input type="text" class="form__field" placeholder="Name" name="name" id="name" required />
			<label for="name" class="form__label">Name</label>
		</div>
		<div class="form__group field">
			<input
				type="text"
				class="form__field"
				placeholder="Surname"
				name="surname"
				id="surname"
				required
			/>
			<label for="surname" class="form__label">Surname</label>
		</div>
		<div class="form__group field texbox">
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
		<div class="form__group field">
			<textarea
				class="form__field"
				rows="6"
				placeholder="Message"
				name="message"
				id="message"
				required
			/>
			<label for="message" class="form__label">Message</label>
		</div>

		<div id="button">
			<div class="wrapper">
				<button class="button">Submit</button>
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
	</form>
</div>

<style type="scss">
	@import "../sass/main";
	@import "../sass/components/about";
	@import "../sass/components/input";
	@import "../sass/components/button";
	@import "../sass/components/textarea";
</style>
