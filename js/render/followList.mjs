import { nameCardTemplate } from "./templates/nameCardTemplate.mjs";
import { fetchProfile } from "../api/profile/read.mjs";
import { backToProfileButton } from "../handlers/backToProfileButton.mjs";

/**
 * render a list of follower/following (first checking the url to see which one) users using the nameCardTemplate
 * @param {Object} users - the user data
 * @returns {Object} - the list of users
 */

export function renderFollowList(users) {
  const followList = document.querySelector("#follow-list");
  followList.innerHTML = "";
  if (window.location.pathname.includes("/followers/")) {
    users.followers.forEach((user) => {
      if (user) {
        let userElement = nameCardTemplate(user);
        followList.appendChild(userElement);
      }
    });
  } else if (window.location.pathname.includes("/following/")) {
    users.following.forEach((user) => {
      if (user) {
        let userElement = nameCardTemplate(user);
        followList.appendChild(userElement);
      }
    });
  }
}

//display a list of followers/following users based on the current URL

export async function displayFollowList() {
  backToProfileButton();
  const queryParams = new URLSearchParams(window.location.search);
  const name = queryParams.get("name");

  const profileData = await fetchProfile(name);

  if (profileData) {
    renderFollowList(profileData);
  } else {
    throw new Error("Failed to fetch profile data.");
  }
}
