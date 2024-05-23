import { updatePost } from "../api/posts/update.mjs";

/**
 * handle update post form submission
 * @returns {Object} - the post data
 */

export const updatePostForm = document.getElementById("update-post-form");

//inputs of the form are set to the current post values
export function viewCurrentPostInfo(post) {
  if (!updatePostForm) {
    return;
  } else {
    const postTitle = document.getElementById("postTitle");
    const postBody = document.getElementById("postBody");
    const postMedia = document.getElementById("postMedia");

    postTitle.value = post.title;
    postBody.value = post.body;
    postMedia.value = post.media;
  }
}

//handle the update post form submission
export function handleUpdatePostForm() {
  if (!updatePostForm) {
    return;
  }

  const queryParams = new URLSearchParams(window.location.search);
  const postId = queryParams.get("id");
  const profileName = queryParams.get("name");

  updatePostForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const post = {
      title: updatePostForm.title.value,
      body: updatePostForm.body.value,
      media: updatePostForm.media.value,
    };

    // send to API and wait for the operation to complete
    await updatePost(post);
    window.location = `/profile/post/index.html?name=${profileName}&id=${postId}`; // go back to post page
  });
}
