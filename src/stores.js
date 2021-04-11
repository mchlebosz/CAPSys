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

// Image API keys
export const imageKey = writable("239191f237c9027b2ff75d159230c528");

export const apiAddress = writable("http://192.168.1.19:8088/");

//curl --location --request POST "https://api.imgbb.com/1/upload?expiration=600&key=YOUR_CLIENT_API_KEY" --form "image=R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"

// Anytime the store changes, update the session storage value.
loggedIn.subscribe((value) => sessionStorage.setItem("loggedIn", value));
username.subscribe((value) => localStorage.setItem("username", value));
password.subscribe((value) => sessionStorage.setItem("password", value));
