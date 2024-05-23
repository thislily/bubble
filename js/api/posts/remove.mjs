import { headers, POSTS_URL } from "../auth/constants.mjs";

/**
 * remove a post by id
 * @param {Object} post - the post data
 * @returns {Object} - the post data
 */

export async function removePost(post) {
  const queryParams = new URLSearchParams(window.location.search);
  const postId = queryParams.get("id");
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authorization token not found.");
  }

  try {
    const response = await fetch(POSTS_URL + "/" + postId, {
      method: "DELETE",
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error("Failed to remove post: " + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
