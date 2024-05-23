import { LOGIN_URL } from "../auth/constants.mjs";
import { headers } from "../auth/constants.mjs";

/**
 * login user with the profile data
 * @param {Object} profile - the user profile data
 */

export async function loginUser(profile) {
  try {
    const response = await fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify(profile),
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error("Failed to login user: " + response.statusText);
    }

    const userData = await response.json();

    // if the user is logged in, save the token and profile data
    if (userData) {
      localStorage.setItem("token", userData.accessToken);
      const user = {
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar,
        banner: userData.banner,
      };
      localStorage.setItem("profile", JSON.stringify(user));

      //redirect to the profile page
      window.location.href = "/profile/index.html" + "?name=" + user.name;
    } else {
      throw new Error("Failed to login user: " + response.statusText);
    }
  } catch (error) {
    console.error(error);
  }
}