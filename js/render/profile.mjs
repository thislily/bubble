import { fetchPosts } from "../api/profile/posts.mjs";
import { fetchProfile } from "../api/profile/read.mjs";
import { handleReactionButton } from "../handlers/reactions.mjs";
import { postTemplate } from "./templates/postTemplate.mjs";

/**
 * render the user profile
 * @param {Object} userName - the user data
 * @returns {Object} - the user profile
 * @throws {Error} - the error
 */
//render the user profile
export function renderProfile(userName) {
  const bannerImg = document.querySelector("#banner-img");
  const avatarImg = document.querySelector("#avatar-img");
  const avatarImgPost = document.querySelector("#avatar-img-post");
  const profileName = document.querySelector("#profile-name");
  const profileNamePost = document.querySelector("#profile-name-post");
  const followersCount = document.querySelector("#followers-count");
  const followingCount = document.querySelector("#following-count");
  const postsCount = document.querySelector("#posts-count");
  const editProfileLink = document.querySelector("#edit-profile-link");
  const createPostCard = document.querySelector("#create-post-card");

  const editProfileButton = document.querySelector("#edit-profile-button");

  const queryParams = new URLSearchParams(window.location.search);
  const name = queryParams.get("name");
  const user = JSON.parse(localStorage.getItem("profile"));
  const loggedInUser = user.name;

  //hide the create post card & the edit profile button if the user is not on their own profile
  if (name !== loggedInUser && createPostCard) {
    createPostCard.classList.add("d-none");
    editProfileButton.classList.add("d-none");
  }

  //set the user images to the user's images or default images if the user has not set an image
  if (userName.banner === "" || userName.banner === null) {
    bannerImg.src = "https://wallpapercave.com/wp/wp12682974.jpg";
  } else {
    bannerImg.src = userName.banner;
  }

  if (userName.avatar === "" || userName.avatar === null) {
    avatarImg.src =
      "https://cdn.vectorstock.com/i/500p/52/91/cute-happy-soap-bubble-vector-27845291.jpg";
  } else {
    avatarImg.src = userName.avatar;
  }

  if (avatarImgPost) {
    if (avatarImgPost.src === "") {
      avatarImgPost.src =
        "https://cdn.vectorstock.com/i/500p/52/91/cute-happy-soap-bubble-vector-27845291.jpg";
    } else {
      avatarImgPost.src = userName.avatar;
    }
  }

  followersCount.textContent = userName._count.followers;
  followingCount.textContent = userName._count.following;
  postsCount.textContent = userName._count.posts;

  const nameH1 = document.createElement("h1");
  nameH1.textContent = userName.name;
  profileName.appendChild(nameH1);

  if (profileNamePost) {
    profileNamePost.textContent = userName.name;
  }

  if (editProfileLink) {
    editProfileLink.href = "/profile/edit/index.html?name=" + userName.name;
  }
}

//render the user's posts to the profile page
export function renderProfilePosts(posts) {
  const postsContainer = document.querySelector("#profile-post-feed");

  //render each post with the post template from postTemplate.mjs
  if (postsContainer) {
    posts.forEach((post) => {
      postsContainer.appendChild(postTemplate(post));
    });
  }
}

export async function displayProfile(userName) {
  try {
    const profile = await fetchProfile(userName);
    renderProfile(profile);
  } catch (error) {
    console.error(error);
  }
}

export async function displayProfilePosts() {
  const posts = await fetchPosts();
  renderProfilePosts(posts);
  handleReactionButton();
}
