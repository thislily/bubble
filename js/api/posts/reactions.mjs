import { POSTS_URL, headers } from "../auth/constants.mjs";

// Send reaction to the API 
export async function addReaction(post) {
    try {
        const response = await fetch(`${POSTS_URL}/${post.postId}/react/👍`, {
            method: "PUT",
            body: JSON.stringify(post),
            headers: headers(),
        });
        
        if (!response.ok) {
            throw new Error("Failed to add reaction");
        }
        
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error adding reaction:", error);
        throw error;
    }
}
