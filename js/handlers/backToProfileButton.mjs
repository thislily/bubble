/**
 * Adds a back to profile link to the post page
 */

export function backToProfileButton() {
  const queryParams = new URLSearchParams(window.location.search);
  const name = queryParams.get("name");
  const profile = localStorage.getItem("profile");
  const loggedInUser = JSON.parse(profile);

  const backToProfile = document.querySelector("#back-to-profile");

  if (name !== loggedInUser.name) {
    backToProfile.innerHTML = `<i class="bi bi-arrow-left"></i>  View Profile`;
  }

  backToProfile.href = `/profile/index.html?name=${name}`;
}
