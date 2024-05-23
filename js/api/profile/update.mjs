import { PROFILE_URL, headers } from "../auth/constants.mjs";

/**
 * update profile data with the media data
 * @param {Object} media - the media data
 *
 */

export async function editProfile(media) {
  try {
    const name = window.location.search.split("=")[1];
    const response = await fetch(PROFILE_URL + "/" + name + "/media", {
      method: "PUT",
      body: JSON.stringify(media),
      headers: headers(),
    });
    const userData = response.JSON;

    window.location.href = "/profile/index.html" + "?name=" + name;
  } catch (error) {
    console.error(error);
  }
}
