import { postTemplate } from "./templates/postTemplate.mjs";
import { fetchPostById } from "../api/posts/read.mjs";
import { viewCurrentPostInfo } from "../handlers/update-post.mjs";
import { backToProfileButton } from "../handlers/backToProfileButton.mjs";
import { handleRemovePostButton } from "../handlers/removePostButton.mjs";

/**
 * render a post to the profilePostById element
 * @param {Object} post - the post data
 * @returns {Object} - the post element
 */

export function renderPost(post) {
  const profilePostById = document.querySelector("#profile-post-by-id");
  let postElement = postTemplate(post); // ensure postTemplate correctly handles the post data
  const editProfileButton = document.querySelector("#edit-profile-button");

  if (editProfileButton) {
    editProfileButton.classList.add("d-none"); // hide the edit post button
  }

  // render the post to the profilePostById element
  if (profilePostById) {
    // clear previous contents
    profilePostById.appendChild(postElement);
  }
}

// display a post by ID based on the current URL
export async function displayPost() {
  try {
    const post = await fetchPostById(); // fetch the post by ID
    if (post) {
      renderPost(post); // render the fetched post
      viewCurrentPostInfo(post); // view the current post info
      handleRemovePostButton(post); // add a remove post button
      backToProfileButton(post); // add a back to profile button
    } else {
      throw new Error("Failed to fetch post.");
    }
  } catch (error) {
    console.error(error);
  }
}
