
/**
 * creates a user card with the user's name and avatar
 * @param {Object} user - user object
 * @returns {HTMLAnchorElement} - the user card
 */

export function nameCardTemplate (user){
    const card = document.createElement("a");
    card.classList.add("card", "rounded-5", "bg-light", "m-auto", "p-0", "border-0", "mb-3", "card-w-image", "text-decoration-none", "text-black");
    card.style.cursor = "pointer";
    card.href = `/profile/index.html?name=${user.name}`;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "p-0");
    card.appendChild(cardBody);

    const row = document.createElement("div");
    row.classList.add("row", "p-3");
    cardBody.appendChild(row);

    const col = document.createElement("div");
    col.classList.add("col", "col-auto", "pe-0", "d-flex", "text-decoration-none", "text-black", "flex-row");
    row.appendChild(col);

    const img = document.createElement("img");
    if (user.avatar === null) {
        img.src = "https://cdn.vectorstock.com/i/500p/52/91/cute-happy-soap-bubble-vector-27845291.jpg";
    } else {
        img.src = user.avatar;
    }
    img.alt = `${user.name}`;
    img.classList.add("rounded-circle", "me-3", "object-fit-cover");
    img.style.width = "50px";
    img.style.aspectRatio = "1/1";
    col.appendChild(img);

    const name = document.createElement("h5");
    name.classList.add("card-title", "h5", "mb-0");
    name.textContent = user.name;
    col.appendChild(name);

    return card;
}