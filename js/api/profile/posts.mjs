import { PROFILE_URL, headers } from "../auth/constants.mjs";

//fetch user posts from the api using the user name

export async function fetchPosts(userName) {    
    try {
        const getPosts = PROFILE_URL + "/" + userName + "/posts?_author=true&_reactions=true&_comments=true";
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Authorization token not found.");
        }
        const response = await fetch(getPosts, {
            method: "GET",
            headers: headers()
        });
        if (!response.ok) {
            throw new Error("Failed to fetch posts: " + response.statusText);
        }
        const postData = await response.json();
        console.log(postData);
        return postData;
    } catch (error) {
        console.error("Error fetching posts:", error.message);
        throw error;
    }
}