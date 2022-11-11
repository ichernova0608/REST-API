const item = document.getElementById("item");

function append(parent, el) {
  return parent.appendChild(el);
}

async function getBlog() {
  let query = window.location.search;
  if (query === null) query === "?page=1";

  const response = await fetch(
    `https://gorest.co.in/public-api/posts${query}`,
    {
      method: "GET",
      headers: {
        Authorization:
          "Bearer e8ce001308941f5be0d2322626ab2d35c0c6d4c5be747f3cae55f8165070c31c",
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  return data;
}

async function main() {
  const data = await getBlog();
  const pages = data.meta.pagination.pages; //кол-во страниц

  data.data.forEach((element) => {
    renderList(element.title, `post.html?id=${element.id}`, element.id);
  });

  renderPagination(pages);

  const lastPage = document.querySelectorAll(".pagination li").length;

  nextItem(lastPage);
  firstPage();
  lastPagePagination(lastPage);
}

main();

async function getImg() {
  const response = await fetch("https://api.thecatapi.com/v1/images/search", {
    method: "GET",
  });

  const image = await response.json();
  return image[0].url;
}

function renderPagination(pages) {
  for (let i = 1; i < pages; i++) {
    if (i === 1) {
      paginationPages(i, "index.html");
    }
  }
  for (let i = 2; i <= pages; i++) {
    paginationPages(i, `index.html?page=${i}`);
  }
}

//СТАТЬИ!!!
async function renderList(text, href, id) {
  const image = await getImg();
  const cards = document.getElementById("cards");
  const card = document.createElement("div");
  card.classList.add("card");
  const img = document.createElement("img");
  img.classList.add("card-img-top");
  img.src = image;
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  const h5 = document.createElement("h5");
  h5.classList.add("card-title");
  h5.innerText = `Статья № ${id}`;
  const p = document.createElement("p");
  p.classList.add("card-text");
  p.textContent = text;
  const a = document.createElement("a");
  a.classList.add("btn");
  a.classList.add("btn-primary");
  a.href = href;
  a.innerText = "Комментарии";
  cards.append(card);
  card.append(img);
  card.append(cardBody);
  cardBody.append(h5);
  cardBody.append(p);
  cardBody.append(a);
  return { cards, card, img, cardBody, h5, p, a };
}

//ПАГИНАЦИЯ!!!!!!!

const pageParams = new URLSearchParams(window.location.search);
const currentPage = pageParams.get("page");
const nav = document.getElementById("navigation");
const pagination = document.createElement("ul");
pagination.classList.add("pagination");
nav.append(pagination);

function paginationPages(text, link) {
  const a = document.createElement("a");
  const li = document.createElement("li");
  li.classList.add("page-item");
  li.value = text;
  a.textContent = text;
  a.href = link;

  if (a.textContent === currentPage) li.classList.add("active");

  if (+li.value < +currentPage - 5) li.classList.add("hidden");

  if (+li.value > +currentPage + 5) li.classList.add("hidden");

  a.classList.add("page-link");
  li.addEventListener("click", () => {
    li.classList.add("active");
  });

  pagination.append(li);

  if (currentPage === null)
    document.querySelectorAll(".pagination li")[0].classList.add("active");

  li.append(a);
  return li, a;
}

// рендер пагинации!!

const previous = document.querySelector(".previous-item");

if (currentPage === null) previous.classList.add("disabled");
const a = document.createElement("a");
a.textContent = "Previous";
a.classList.add("page-link");
a.tabIndex = -1;
const minus = +currentPage - 10;
minus >= 2 ? (a.href = `index.html?page=${minus}`) : (a.href = "index.html");
previous.append(a);

const next = document.querySelector(".next-item");

function nextItem(lastPage) {
  const a = document.createElement("a");
  a.textContent = "Next";
  a.classList.add("page-link");
  a.tabIndex = 0;
  const plus = +currentPage + 10;
  if (+currentPage >= lastPage) next.classList.add("disabled");
  if (plus >= lastPage) next.classList.add("disabled");
  a.href = `index.html?page=${plus}`;
  next.append(a);
}

function firstPage() {
  const first = document.querySelector(".first");
  const a = document.createElement("a");
  a.textContent = "1";
  a.classList.add("page-link");
  a.href = "index.html";
  if (+currentPage <= 10) first.classList.add("hidden");
  first.append(a);
}

function lastPagePagination(lastPage) {
  const last = document.querySelector(".last");
  const a = document.createElement("a");
  a.textContent = `${lastPage}`;
  a.classList.add("page-link");
  a.href = `index.html?page=${lastPage}`;
  if (+currentPage >= +lastPage - 5) last.classList.add("hidden");
  last.append(a);
}

