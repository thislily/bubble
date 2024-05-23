import { addReaction } from "../api/posts/reactions.mjs";

/**
 * handle the reaction button click
 * @returns {Object} - the post data
 *
 */

export function handleReactionButton() {
  const heart = document.querySelectorAll(".heart");

  heart.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const postId = e.target.closest(".card").id;
      const reaction = e.target.id;
      const post = {
        symbol: "👍",
        postId: postId,
      };
      await addReaction(post);
    });
  });
}
