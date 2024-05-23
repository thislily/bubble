import { POSTS_URL, headers } from "../auth/constants.mjs";

/**
 * fetch a post by id from the api
 * @returns {Object} - the post data
 */

export async function fetchPostById() {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  const getPost =
    POSTS_URL + "/" + id + "?_author=true&_reactions=true&_comments=true";
  const token = localStorage.getItem("token");

  try {
    if (!token) {
      throw new Error("Authorization token not found.");
    }

    const response = await fetch(getPost, {
      method: "GET",
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch post: " + response.statusText);
    }

    const postData = await response.json();
    return postData;
  } catch (error) {
    console.error(error);
  }
}

/**
 * fetch a profile by id from the api, and filter the posts based on the filter value
 * @param {number} filterValue - the filter value
 * @returns {Object} - the profile data
 */
// fetch all posts or posts from following based on the filter
export async function fetchAllPosts(filterValue) {
  //choose the correct endpoint based on the filter value
  try {
    let url = POSTS_URL + "/?_author=true&_reactions=true&_comments=true";
    if (filterValue === "2") {
      url =
        POSTS_URL + `/following/?_author=true&_reactions=true&_comments=true`;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authorization token not found.");
    }

    const response = await fetch(url, {
      method: "GET",
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts: " + response.statusText);
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
}
