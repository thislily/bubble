import { removePost } from "../api/posts/remove.mjs";

/**
 * handle remove post button
 * @param {Object} post - the post data
 */

export function handleRemovePostButton(post) {
  const removePostButton = document.getElementById("remove-post-button");
  const queryParams = new URLSearchParams(window.location.search);
  const userName = queryParams.get("name");

  if (!removePostButton) {
    return;
  }

  removePostButton.addEventListener("click", async function () {
    try {
      await removePost(post);
      removePostButton.classList.remove("btn-danger");
      removePostButton.classList.add("btn-success");
      removePostButton.innerText = "Post Removed!";
      removePostButton.disabled = true;

      //wait for 2 seconds and then redirect to the profile page
      setTimeout(() => {
        window.location.href = `/profile/index.html?name=${userName}`;
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  });
}
