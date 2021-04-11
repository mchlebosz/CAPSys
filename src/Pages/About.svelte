<script>
	$: slides = [
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

	import { hslide } from "../Layout/Swipe.js";

	let cur = 0;

	function changeSlide(slide) {
		cur = slide;
	}

	const clamp = (number, min, max) => Math.min(Math.max(number, min), max);
	const transition_args = {
		duration: 200,
	};

	function prev(e) {
		cur = clamp(--cur, 0, slides.length - 1);
	}

	function next(e) {
		cur = clamp(++cur, 0, slides.length - 1);
	}

	const ARROW_LEFT = 37;
	const ARROW_RIGHT = 39;
	function handleShortcut(e) {
		if (e.keyCode === ARROW_LEFT) {
			prev();
		}
		if (e.keyCode === ARROW_RIGHT) {
			next();
		}
	}

	function sendMail() {
		var name = document.getElementById("name").value;
		var surname = document.getElementById("surname").value;
		var email = document.getElementById("email").value;
		var message = document.getElementById("message").value;
		window.location.href =
			"mailto:support@capsys.com?subject=The subject - " +
			name +
			" " +
			surname +
			" (" +
			email +
			")" +
			"&body=" +
			message;
	}
</script>

<svelte:window on:keyup={handleShortcut} />

<div class="content">
	<h1>Who we are?</h1>

	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex corporis adipisci sapiente culpa
		sunt? Voluptatum, architecto est labore nisi quas sit hic laudantium quia atque repellat?
		Tempora praesentium aperiam quam nesciunt tempore commodi, porro ipsam mollitia nihil
		reprehenderit! Consequuntur, ratione!
	</p>
	<div class="extra-outer-wrapper">
		<div class="outer-wrapper">
			<div class="inner-wrapper">
				{#each slides as item, id}
					{#if id === cur}
						<div class="img slide" in:hslide={transition_args} out:hslide={transition_args}>
							<img src={item.photo} alt="About us" />
							<div class="text">
								<h2>{item.heading}</h2>
								<p>{item.text}</p>
							</div>
						</div>
					{/if}
				{/each}
				<div class="controls">
					<button on:click={() => prev()}> &lt; </button>
					<button on:click={() => next()}> &gt; </button>
				</div>
			</div>
		</div>
	</div>
	<div class="dots">
		{#each slides as slide, i}
			<button on:click={() => changeSlide(i)} class="dot" class:selected={cur == i}>{i + 1}</button>
		{/each}
	</div>

	<h2 class="ask">Ask us about anything 😁</h2>
	<form class="contact" name="EmailForm" on:submit={sendMail}>
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

	.content .button {
		background-color: $c-background;
		border-color: $c-background;
	}

	// ...
</style>
