/**
 * sets the navigation links to the correct url.
 */

export function setNavLinks() {
  const profileLink = document.getElementById("profile-link");
  const feedLink = document.getElementById("feed-link");
  const postLink = document.getElementById("create-post-link");
  const settingsLink = document.getElementById("settings-link");
  const searchLink = document.getElementById("search-link");
  const profile = localStorage.getItem("profile");
  const createPost = document.getElementById("create-post");
  const user = JSON.parse(profile);
  const userName = user.name;

  if (profileLink) {
    profileLink.href = `/profile/index.html?name=${userName}`;
  }

  if (feedLink) {
    feedLink.href = "/feed/index.html";
  }

  if (createPost) {
    postLink.href = `#create-post`;
  } else {
    postLink.href = `/feed/index.html#create-post`;
  }

  if (settingsLink) {
    settingsLink.href = `/profile/edit/index.html?name=${userName}`;
  }

  if (searchLink) {
    searchLink.href = "/feed/search/index.html";
  }
}
