/**
 * set links in profile to correct url
 */

export function setProfileLinks() {
    const followersLink = document.getElementById("followers-link");
    const followingLink = document.getElementById("following-link");
    const postsLink = document.getElementById("posts-link");
    const queryParams = new URLSearchParams(window.location.search);
    const userName = queryParams.get('name');

    if (followersLink) {
        followersLink.href = `/profile/followers/index.html?name=${userName}`;
    }

    if (followingLink) {
        followingLink.href = `/profile/following/index.html?name=${userName}`;
    }

    if (postsLink) {
        postsLink.href = `/profile/index.html?name=${userName}`;
    }
}