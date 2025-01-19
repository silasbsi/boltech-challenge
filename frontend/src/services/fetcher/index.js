const REACT_APP_HOST = "http://localhost:3000";

const fetcher = async (url, data = {}, method = "GET") => {
   const myHeaders = new Headers();

   const token = localStorage.getItem("app-token") || "";

   if (token) {
      myHeaders.append("Authorization", `Bearer ${token}`);
   }

   myHeaders.append("Content-Type", "application/json");

   const requestOptions = {
      method,
      headers: myHeaders,
      body: data ? JSON.stringify(data) : "",
      redirect: "follow",
   };

   if (method === "GET") {
      delete requestOptions.body;
   }

   return fetch(`${REACT_APP_HOST}/${url}`, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => error);
};

fetcher.post = (url, data) => fetcher(url, data, "POST");

fetcher.get = (url) => fetcher(url);

fetcher.patch = (url, data) => fetcher(url, data, "PATCH");

fetcher.delete = (url, data) => fetcher(url, data, "DELETE");

export default fetcher;
