const content = document.getElementById("content");
async function getBlog() {
  let query = window.location.search;
  console.log(query);
  if (query === null) query === "1";
  const response = await fetch(
    `https://gorest.co.in/public-api/posts/${query}`,
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
  console.log(data);

  data.data.forEach((element) => {
    const title = document.createElement("h1");
    const body = document.createElement("p");
    const sectionComments = document.createElement("h2");
    const comment = document.createElement("ul");

    title.innerHTML = element.title;
    body.innerHTML = element.body;
    sectionComments.innerHTML = "Комментарии:";

    async function getDataofComment() {
      const getComment = await fetch(
        `https://gorest.co.in/public-api/comments?post_id=${element.id}`,
        {
          method: "GET",
          headers: {
            Authorization:
              "Bearer e8ce001308941f5be0d2322626ab2d35c0c6d4c5be747f3cae55f8165070c31c",
            "Content-Type": "application/json",
          },
        }
      );
      const dataComment = await getComment.json();

      dataComment.data.forEach((element) => {
        const name = document.createElement("h3");
        const text = document.createElement("p");
        name.innerHTML = `Имя пользователя: ${element.name}`;
        text.innerHTML = element.body;
        comment.append(name, text);
      });
    }
    getDataofComment();

    content.append(title, body, sectionComments, comment);
  });
}
getBlog();

