import { REGISTER_URL } from "../auth/constants.mjs";
import { loginUser } from "./login.mjs";

/**
 * register a new user with the profile data
 * @param {Object} profile - the user profile data
 * @throws {Error} - if the user is not registered
 */

export async function registerUser(profile) {
  try {
    const response = await fetch(REGISTER_URL, {
      method: "POST",
      body: JSON.stringify(profile),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to register user: " + response.statusText);
    }

    const userData = await response.json();

    // if the user is registered, log them in
    if (userData) {
      loginUser(profile);
    } else {
      throw new Error("Failed to register user: " + response.statusText);
    }
  } catch (error) {
    console.error(error);
  }
}
