//render a post
import { timeAgo } from "./timeAgo.mjs";

/**
 * creates an anchor element with the post data which inclues the users name, avatar, post image, post title, post body, post date, follow or edit button, reactions, comments, and comment form.
 * @param {Object} post - the post data
 * @returns {Object} - the post template
 */

export function postTemplate(post) {
  const user = localStorage.getItem("profile");
  const profile = JSON.parse(user);
  const author = post.author;

  const card = document.createElement("div");
  card.id = post.id;
  card.classList.add(
    "card",
    "rounded-5",
    "bg-light",
    "m-auto",
    "p-0",
    "border-0",
    "mb-3",
    "card-w-image"
  );

  //the card body is a link to the post page
  const cardBody = document.createElement("div");
  const cardBodyLink = document.createElement("a");
  cardBodyLink.classList.add("text-decoration-none", "text-black");
  cardBodyLink.style.cursor = "pointer";

  if (window.location.pathname.includes("/post/")) {
    cardBodyLink.href = "";
  } else {
    if (!author) {
      cardBodyLink.href = `/profile/post/index.html?name=${profile.name}&id=${post.id}`;
    } else if (author) {
      cardBodyLink.href = `/profile/post/index.html?name=${author.name}&id=${post.id}`;
    }
  }
  cardBody.classList.add("card-body", "p-0");
  cardBody.style.textDecoration = "none";
  card.appendChild(cardBody);
  cardBody.appendChild(cardBodyLink);

  const row = document.createElement("div");
  row.classList.add("row", "p-3");
  cardBodyLink.appendChild(row);

  //the name & avatar are links to the user's profile page
  const col = document.createElement("a");
  col.classList.add(
    "col",
    "col-auto",
    "pe-0",
    "d-flex",
    "text-decoration-none",
    "text-black",
    "flex-row"
  );
  if (author) {
    col.href = `/profile/index.html?name=${author.name}`;
  } else {
    col.href = `/profile/index.html?name=${profile.name}`;
  }
  row.appendChild(col);

  //if the post is the user's own post, the avatar is set to the user's avatar or a default avatar if the user has not set an avatar, else the avatar is set to the post author's avatar or a default avatar if the post author has not set an avatar
  const img = document.createElement("img");
  if (author) {
    if (author.avatar === null) {
      img.src =
        "https://cdn.vectorstock.com/i/500p/52/91/cute-happy-soap-bubble-vector-27845291.jpg";
    } else {
      img.src = author.avatar;
    }
    img.alt = `${author.name}`;
  } else {
    if (profile.avatar === "") {
      img.src =
        "https://cdn.vectorstock.com/i/500p/52/91/cute-happy-soap-bubble-vector-27845291.jpg";
    } else {
      img.src = profile.avatar;
    }
    img.alt = `${profile.name}`;
  }
  img.classList.add(
    "profile-thumbnail",
    "img-thumbnail",
    "rounded-circle",
    "p-0",
    "object-fit-cover"
  );
  img.style.aspectRatio = "1/1";
  col.appendChild(img);

  //if the post is the user's own post, the name is set to the user's name, else the name is set to the post author's name
  const h3 = document.createElement("h3");
  h3.classList.add("card-title", "h4", "pt-3", "ps-2");
  if (author) {
    h3.textContent = author.name;
  } else {
    h3.textContent = profile.name;
  }
  col.appendChild(h3);

  const col2 = document.createElement("div");
  col2.classList.add("col", "text-end");
  row.appendChild(col2);

  //if the post is the user's own post, the button is set to edit, else the button is set to follow
  const editButton = document.createElement("a");
  const followButton = document.createElement("button");
  if (author && author.name !== profile.name) {
    followButton.classList.add(
      "btn",
      "bg-success-subtle",
      "btn-outline-success",
      "text-dark",
      "text-emphasis-success",
      "ps-1",
      "p-1",
      "m-1",
      "text-end"
    );
    followButton.innerHTML = `follow  <i class="bi bi-plus-circle"></i>`;

    col2.appendChild(followButton);
  } else {
    editButton.classList.add(
      "btn",
      "bg-info-subtle",
      "btn-outline-info",
      "text-dark",
      "text-emphasis",
      "ps-1",
      "p-1",
      "m-1",
      "text-end"
    );
    editButton.innerHTML = `edit  <i class="bi bi-pencil-square"></i
  >`;
    editButton.href = `/profile/post/edit/index.html?name=${profile.name}&id=${post.id}`;
    col2.appendChild(editButton);
  }

  //if the post has a media, the media is set to the post media
  if (post.media !== null && post.media !== "") {
    const img2 = document.createElement("img");
    img2.src = post.media;
    img2.alt = `${post.title}`;
    img2.classList.add("card-image", "w-100", "pb-3");
    cardBodyLink.appendChild(img2);
  }

  const row2 = document.createElement("div");
  row2.classList.add("row");
  cardBodyLink.appendChild(row2);

  const col3 = document.createElement("div");
  col3.classList.add("col");
  row2.appendChild(col3);

  //the post title and body are set to the post title and body
  const b = document.createElement("b");
  b.classList.add("card-text", "px-4", "pb-3", "mb-3");
  b.textContent = post.title;
  col3.appendChild(b);

  const p = document.createElement("p");
  p.classList.add("card-text", "px-4", "pb-3");
  p.textContent = post.body;
  col3.appendChild(p);

  const row3 = document.createElement("div");
  row3.classList.add("row", "px-3");
  cardBody.appendChild(row3);

  //the post date is set to the post created date, if the post has been updated, the post date is set to the post updated date
  const i = document.createElement("i");
  i.classList.add(
    "text-dark",
    "col",
    "d-flex",
    "justify-content-start",
    "align-items-center",
    "ps-4",
    "pb-3"
  );
  if (post.created === post.updated) {
    i.textContent = `${timeAgo(post.created)}`;
  } else {
    i.textContent = `${timeAgo(post.created)}, updated: ${timeAgo(
      post.updated
    )}`;
  }
  row3.appendChild(i);

  const reactions = document.createElement("div");
  reactions.classList.add(
    "col",
    "d-flex",
    "justify-content-end",
    "align-items-center",
    "pe-4",
    "pb-3"
  );
  row3.appendChild(reactions);

  const likeCount = document.createElement("span");
  likeCount.classList.add("text-dark");
  if (post._count.reactions > 0) {
    post.reactions;
    likeCount.innerHTML = `${post._count.reactions} <button class="heart btn btn-light border-0" style="cursor: pointer;"><i class="bi bi-heart"></i></button>`;
  } else {
    likeCount.innerHTML = `0 <button class="heart btn btn-light border-0" style="cursor: pointer;"><i class="bi bi-heart"></i></button>`;
  }
  reactions.appendChild(likeCount);

  const commentSection = document.createElement("div");
  commentSection.classList.add("col", "border-top", "border-2", "px-3");
  cardBody.appendChild(commentSection);

  const commentForm = document.createElement("form");
  commentForm.classList.add("p-2", "row");
  commentSection.appendChild(commentForm);

  const commentInput = document.createElement("input");
  commentInput.classList.add(
    "col",
    "form-control",
    "rounded-pill",
    "border-0",
    "p-2",
    "px-3",
    "m-2"
  );
  commentInput.placeholder = "leave a comment";
  commentForm.appendChild(commentInput);

  const submitComment = document.createElement("button");
  submitComment.classList.add(
    "col",
    "col-2",
    "btn",
    "btn-success",
    "border-0",
    "rounded-pill",
    "p-2",
    "px-3",
    "m-2"
  );
  submitComment.innerHTML = `<i class="bi bi-chat"></i>`;
  commentForm.appendChild(submitComment);

  //for each comment
  post.comments.forEach((comment) => {
    const commentCard = document.createElement("div");
    commentCard.classList.add(
      "row",
      "bg-light",
      "m-2",
      "p-2",
      "border-top",
      "border-2"
    );
    commentSection.appendChild(commentCard);

    const commentRow = document.createElement("div");
    commentRow.classList.add("row");
    commentCard.appendChild(commentRow);

    const commentCol = document.createElement("div");
    commentCol.classList.add("col", "d-flex", "align-items-center");

    const commentImg = document.createElement("img");
    commentImg.classList.add(
      "profile-thumbnail",
      "img-thumbnail",
      "rounded-circle",
      "p-0",
      "object-fit-cover"
    );
    commentImg.style.width = "36px";
    commentImg.style.aspectRatio = "1/1";
    commentImg.src = comment.author.avatar;
    commentImg.alt = `${comment.author.name}`;
    commentCol.appendChild(commentImg);

    const commentName = document.createElement("h5");
    commentName.classList.add("card-title", "h5", "ps-2", "pt-2");
    commentName.textContent = comment.author.name;
    commentCol.appendChild(commentName);

    commentRow.appendChild(commentCol);

    const commentBody = document.createElement("p");
    commentBody.classList.add("card-text", "p-0", "ps-5");
    commentBody.textContent = comment.body;
    commentCard.appendChild(commentBody);

    const commentDate = document.createElement("i");
    commentDate.classList.add("text-dark", "pt-1", "ps-3");
    commentDate.textContent = `${timeAgo(comment.created)}`;
    commentCol.appendChild(commentDate);
  });

  return card;
}
