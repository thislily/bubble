/**
 *This is the main entry point for the application. This file is responsible for loading the necessary modules and setting up the event listeners for the application.
 */

import {
  handleCreatePostForm,
  createPostForm,
} from "./handlers/create-post.mjs";
import {
  handleUpdatePostForm,
  updatePostForm,
} from "./handlers/update-post.mjs";
import {
  editProfileForm,
  handleEditProfileForm,
} from "./handlers/edit-profile-form.mjs";
import { handleLoginForm, loginForm } from "./handlers/login-form.mjs";
import { handleRegForm, regForm } from "./handlers/reg-form.mjs";
import { displayPost } from "./render/post.mjs";
import { displayProfile, displayProfilePosts } from "./render/profile.mjs";
import { handleRemovePostButton } from "./handlers/removePostButton.mjs";
import { displayFeed } from "./render/feed.mjs";
import { setNavLinks } from "./handlers/setNavLinks.mjs";
import { handleFilterPostsSelector, filterPosts } from "./render/feed.mjs";
import { setSearchInput, searchPostsInput } from "./handlers/search-input.mjs";
import { searchPosts } from "./render/search.mjs";
import { setProfileLinks } from "./handlers/setProfileLinks.mjs";
import { displayFollowList } from "./render/followList.mjs";
import { backToProfileButton } from "./handlers/backToProfileButton.mjs";

document.addEventListener("DOMContentLoaded", function () {

  //check if the current page is the profile page or a post page
  if (window.location.pathname.includes("/profile/")) {
    displayProfile();
    setProfileLinks();
  }

  if (window.location.pathname === "/profile/index.html") {
    displayProfilePosts();
  }

  if (window.location.pathname.includes("/post/")) {
    displayPost();
    handleRemovePostButton();
  }

  if (window.location.pathname === "/feed/index.html") {
    displayFeed();
    handleFilterPostsSelector();
  }

  if (
    window.location.pathname.includes("/followers/") ||
    window.location.pathname.includes("/following/")
  ) {
    displayFollowList();
  }

  //check if the current page is the registration page, login page, edit profile page, or create post page
  if (regForm) {
    handleRegForm();
  } else if (loginForm) {
    handleLoginForm();
  } else if (editProfileForm) {
    handleEditProfileForm();
    backToProfileButton();
  } else if (createPostForm) {
    handleCreatePostForm();
  } else if (updatePostForm) {
    handleUpdatePostForm();
  } else if (filterPosts) {
    handleFilterPostsSelector();
  } else if (searchPostsInput) {
    setSearchInput();
    searchPosts();
  }

  setNavLinks();
});

// Required features

// The following user stories are required for a passing submission:

//************************** User with @noroff.no or @stud.noroff.no email can register profile
//************************** Registered user can login
//************************** User can view a post content feed
//************************** User can filter the post content feed
//************************** User can search the post content feed
//************************** User can view a post content item by ID
//************************** User can create a post content item
//************************** User can update a post content item
//************************** User can delete a post content item
// Additional features

// The following user stories are optional:

// User can create a comment on a post
//************************** User can edit profile media
// User can follow/unfollow a profile
// User can react to a post content item
