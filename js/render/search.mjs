import { fetchAllPosts } from "../api/posts/read.mjs";
import { postTemplate } from "./templates/postTemplate.mjs";

/**
 * display the search results based on the search term
 * @param {Object} posts - the post data
 * @returns {Object} - the search results
 */

const feed = document.getElementById("feed");

//display all of the posts in the feed
export async function displaySearchResults(posts) {
  feed.innerHTML = "";
  posts.forEach((post) => {
    let newPost = postTemplate(post);
    feed.appendChild(newPost);
  });
}

// search posts based on the search term
export async function searchPosts() {
  let allPosts = await fetchAllPosts(0);

  const searchTerm = document
    .getElementById("search-posts-input")
    .value.toLowerCase();
  const filteredPosts = allPosts.filter((post) => {
    // check if the search term is included in the post title, body, or author name
    const title = post.title ? post.title.toLowerCase() : "";
    const body = post.body ? post.body.toLowerCase() : "";
    const author = post.author.name ? post.author.name.toLowerCase() : "";
    return (
      title.includes(searchTerm) ||
      body.includes(searchTerm) ||
      author.includes(searchTerm)
    );
  });
  displaySearchResults(filteredPosts);
}
