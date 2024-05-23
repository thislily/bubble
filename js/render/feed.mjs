import { fetchAllPosts } from "../api/posts/read.mjs";
import { addInfoToCreatePostForm } from "./postFormUser.mjs";
import { postTemplate } from "./templates/postTemplate.mjs";

/**
 * display the feed based on the selected filter
 * @returns {Object} - the feed data
 */

export async function displayFeed() {
  const feed = document.getElementById("feed");
  let filterValue = document.getElementById("filter-posts").value; // get the selected filter option

  let posts;
  try {
    posts = await fetchAllPosts(filterValue); // fetch posts based on the selected filter
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return; // exit the function if there is a fetching error
  }

  let filteredPosts = posts;
  if (filterValue === "1") {
    // filter out posts that contain 'test' or 'example'
    filteredPosts = posts.filter(
      (post) =>
        !post.title ||
        !post.body ||
        (!post.title.toLowerCase().includes("test") &&
          !post.title.toLowerCase().includes("example") &&
          !post.body.toLowerCase().includes("test") &&
          !post.body.toLowerCase().includes("example"))
    );
  } else if (filterValue === "2") {
    if (posts.length === 0) {
      const noFriendsYet = document.createElement("p");
      noFriendsYet.textContent =
        "Oops! Looks like you don't have any friends yet. Follow users to see their posts!";
      noFriendsYet.classList.add("text-center", "text-muted", "px-5");
      feed.innerHTML = "";
      feed.appendChild(noFriendsYet);
      return;
    }
  } else if (filterValue === "3") {
    //show only posts from users the logged-in user is not following
    const following = new Set(); // get the names of users the logged-in user is following

    filteredPosts = posts.filter(
      (post) => post.author.name && !following.has(post.author.name)
    );
  }

  feed.innerHTML = ""; // clear existing posts

  // append filtered posts to the feed
  filteredPosts.forEach((post) => {
    feed.appendChild(postTemplate(post));
  });

  addInfoToCreatePostForm(); // add the logged-in user's name to the create post form
}

export const filterPosts = document.getElementById("filter-posts");

export function handleFilterPostsSelector() {
  filterPosts.addEventListener("change", displayFeed);
}
