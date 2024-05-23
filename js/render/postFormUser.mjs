
/**
 * assign info to create post form img and name
 */

export function addInfoToCreatePostForm() {
    const user = JSON.parse(localStorage.getItem("profile"));
    const avatarImg = document.querySelector("#avatar-img-post");
    const profileNamePost = document.querySelector("#profile-name-post");
    if (avatarImg.src === "") {
        avatarImg.src =
            "https://cdn.vectorstock.com/i/500p/52/91/cute-happy-soap-bubble-vector-27845291.jpg";
    } else {
        avatarImg.src = user.avatar;
    }
    profileNamePost.textContent = user.name;
}