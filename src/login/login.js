import { ACCESS_TOKEN, EXPIRES_IN, TOKEN_TYPE } from "../../common";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const scopes =
  "user-top-read user-follow-read playlist-read-private user-library-read";
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

const APP_URL = import.meta.env.VITE_APP_URL;
const authorizeUser = () => {
  const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${scopes}&show_dialog=true`;
  window.open(url, "login", "width=800,height=600");
};
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("login-to-spotify")
    .addEventListener("click", authorizeUser);
});

window.setItemsInLocalStorage = ({ accessToken, tokenType, expiresIn }) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  localStorage.setItem(TOKEN_TYPE, tokenType);
  localStorage.setItem(EXPIRES_IN, Date.now() + expiresIn * 1000);
  window.location.href = APP_URL;
};
//the login functionality is happening on a different
//website(pop/external window casued by window.open()) that is provided by the spotify.

//after successful login
//we will get back within our website.

window.addEventListener("load", () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  //if access_token is present in local storage of browser than
  //the dashboard page will get opened.
  if (accessToken) {
    console.log("hello from access token is there");
    window.location.href = `${APP_URL}/dashboard/dashboard.html`;
  }

  //incase the access token is not there
  //check whether the pop up window is still opened
  //!window.opener (window is not there?)
  //!window.opener.closed (window is not closed?)
  if (window.opener !== null && !window.opener.closed) {
    window.focus();
    if (window.location.href.includes("error")) {
      window.close();
    }

    const { hash } = window.location;
    console.log(hash);
    const searchParams = new URLSearchParams(hash);
    const accessToken = searchParams.get("#access_token");
    const tokenType = searchParams.get("token_type");
    const expiresIn = searchParams.get("expires_in");
    if (accessToken) {
      window.close();
      window.opener.setItemsInLocalStorage({
        accessToken,
        tokenType,
        expiresIn,
      });
    } else {
      window.close();
    }
  }
});
// you left the video at 1:12:00
