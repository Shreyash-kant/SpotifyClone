import "./style.css";
const APP_URL = import.meta.env.VITE_APP_URL;
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("accessToken")) {
    //if we are logged in then we have access to the accessToken
    window.location.href = `${APP_URL}/dashboard/dashboard.html`;
  } else {
    window.location.href = `${APP_URL}/login/login.html`; //else the login page will be delivered
  }
});
