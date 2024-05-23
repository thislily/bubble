import { createPost } from "../api/posts/createPost.mjs";

/**
 * handle create post form submission
 */

export const createPostForm = document.getElementById("create-post-form");

export function handleCreatePostForm() {
  if (!createPostForm) {
    return;
  }

  createPostForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const post = {
      title: createPostForm.title.value,
      body: createPostForm.body.value,
      media: createPostForm.media.value,
    };

    // send to API and wait for the operation to complete
    try {
      await createPost(post);
      window.location.reload(); // reload the page to show the new post
    } catch (error) {
      console.error(error);
    }
  });
}
