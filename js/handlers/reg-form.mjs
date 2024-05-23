import { registerUser } from "../api/auth/register.mjs";

/**
 * handle the registration form submission
 * @returns {Object} - the user profile data
 *
 */
export const regForm = document.querySelector("#register-form");

export function handleRegForm() {
  regForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (regForm.banner.value === "") {
      regForm.banner.value = "https://wallpapercave.com/wp/wp12682974.jpg";
    }
    if (regForm.avatar.value === "") {
      regForm.avatar.value =
        "https://cdn.vectorstock.com/i/500p/52/91/cute-happy-soap-bubble-vector-27845291.jpg";
    }

    const profile = {
      name: regForm.name.value,
      email: regForm.email.value,
      password: regForm.password.value,
      avatar: regForm.avatar.value,
      banner: regForm.banner.value,
    };

    registerUser(profile);
  });
}
