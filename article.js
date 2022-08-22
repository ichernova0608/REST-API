async function getBlog() {
  let query = window.location.search;
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
}
