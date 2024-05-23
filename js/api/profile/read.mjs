import { SOCIAL_URL, headers, PROFILE_URL } from "../auth/constants.mjs";

/**
 * fetch user posts from the api using the user name
 * @returns {Object} - the user posts data
 */

export async function fetchProfile() {
    try {
        // get the user name from the query string
        const queryParams = new URLSearchParams(window.location.search);
        const userName = queryParams.get('name');
        const getProfile = PROFILE_URL + "/" + userName + "?_posts=true&_followers=true&_following=true";
        const profile = JSON.parse(localStorage.getItem("profile"));

        // get the token from local storage
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Authorization token not found.");
        }

        // fetch the profile data
        const response = await fetch(getProfile, {
            method: "GET",
            headers: headers()
        }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch profile: " + response.statusText);
        }

        const profileData = await response.json();

        // update the profile data in local storage to include the user's posts, followers, and following
        let user = {};
        if (userName === profile.name) {
            user = {
                name: profileData.name,
                email: profileData.email,
                avatar: profileData.avatar,
                banner: profileData.banner,
                followers: profileData.followers,
                following: profileData.following,
                posts: profileData.posts
            }
            localStorage.setItem("profile", JSON.stringify(user));

        }

        return profileData;
    } catch (error) {
        console.error(error);
    }
}
