// src/stores/content.js
import { writable } from "svelte/store";

// Get the value out of storage on load.
const loginState = sessionStorage.getItem("loggedIn");
const usernameState = localStorage.getItem("username");
const passwordState = sessionStorage.getItem("password");

// Set the stored value or a sane default.
export const loggedIn = writable(loginState || Boolean(false));
export const username = writable(usernameState || "");
export const password = writable(passwordState || "");

if (loginState == "false") loggedIn.set(Boolean(false));

// Anytime the store changes, update the session storage value.
loggedIn.subscribe((value) => sessionStorage.setItem("loggedIn", value));
username.subscribe((value) => localStorage.setItem("username", value));
password.subscribe((value) => sessionStorage.setItem("password", value));
