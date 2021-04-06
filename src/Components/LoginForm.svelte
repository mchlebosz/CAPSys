<script>
  import axios from "axios";

  let register = false;
  $: register = register;


  // TODO: W przypadku innym niz dobre logowanie strona się przeładowuje bez znaku
  const userLogin = () => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let response;

    axios
      .post("http://localhost:8080/login.php", {
        username: username,
        password: password,
      })
      .then(function (res) {
        response = res;
		alert(response.status + " | " + response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  const userRegister = () => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let rpassword = document.getElementById("rpassword").value;
	let mail = document.getElementById("email").value;

    let response;

if (password == rpassword) {
console.log("password ok")

    axios
      .post("http://localhost:8080/register.php", {
        username: username,
        password: password,
		mail: mail
      })
      .then(function (res) {
        response = res;
		alert(response.status + " | " + response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
else {console.log("password wrong")}};

</script>

<div class="loginPage">
  {#if register == false}
    <div class="loginPage slide-content">
      <form class="login" id="form-id">
        <div class="form__group field" id="in1">
          <input
            type="input"
            class="form__field"
            placeholder="Username"
            name="username"
            id="username"
            required
          />
          <label for="username" class="form__label">Username</label>
        </div>
        <div class="form__group field" id="in2">
          <input
            type="input"
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
              <button class="button" on:click={userLogin}>Log In</button>
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
                  ><feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="10"
                    result="blur"
                  />
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
      </form>
    </div>
  {:else}
    <!-- Register -->
    <div class="loginPage slide-content">
      <form class="login" id="register-id">
        <div class="form__group field" id="in1">
          <input
            type="input"
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
            type="input"
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
            type="input"
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
            type="input"
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
            <option value="null" disabled selected="selected" hidden
              >Select Account Type</option
            >
            <option value="student">Student</option>
            <option value="school">University</option>
          </select>
        </div>
        <div class="controls">
          <div id="button">
            <div class="wrapper">
              <button class="button" on:click={userRegister}>Register</button>
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
                  ><feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="10"
                    result="blur"
                  />
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
      </form>
    </div>
  {/if}
</div>

<style type="scss">
  @import "../sass/main";
  @import "../sass/form";
</style>
