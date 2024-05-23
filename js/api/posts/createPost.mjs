import { headers, POSTS_URL } from "../auth/constants.mjs";

/**
 * create a new post with the post data
 * @param {Object} post - the post data
 * @returns {Object} - the post data
 */

export async function createPost(post) {
    try {
        const response = await fetch(POSTS_URL, {
            method: "POST",
            body: JSON.stringify(post),
            headers: headers(),
        });

        const data = await response.json();
        return data
    }
    catch (error) {
        console.error(error);
    }
}