import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();
const productId = getParam("product");
const dataSource = new ExternalServices();

const product = new ProductDetails(productId, dataSource);
product.init();

// CUSTOMER COMMENTS

// elements
const form = document.getElementById("commentForm");
const commentInput = document.getElementById("commentText");
const commentsList = document.getElementById("commentsList");

// load comments when page loads
loadComments();

// submit new comment
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = commentInput.value.trim();
  if (!text) return;

  const comment = {
    id: Date.now(),
    text,
    date: new Date().toLocaleString(),
  };

  saveComment(comment);
  commentInput.value = "";
  loadComments();
});

// save to localStorage
function saveComment(comment) {
  const key = `comments-${productId}`;
  const comments = JSON.parse(localStorage.getItem(key)) || [];
  comments.push(comment);
  localStorage.setItem(key, JSON.stringify(comments));
}

// display comments
function loadComments() {
  const key = `comments-${productId}`;
  const comments = JSON.parse(localStorage.getItem(key)) || [];

  commentsList.innerHTML = comments
    .map(
      (c) => `
      <div class="comment">
        <p>${c.text}</p>
        <small>${c.date}</small>
      </div>
    `,
    )
    .join("");
}
