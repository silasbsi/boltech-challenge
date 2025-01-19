import fetcher from "./fetcher";

const UserService = {
   authenticate: async (data) => {
      const response = await fetcher.post("auth/authenticate", {
         email: data.userEmail,
         password: data.userPassword,
      });

      if (!response.error) {
         localStorage.setItem("app-token", response.token);
         window.location.href = "/dashboard";
      } else {
         localStorage.removeItem("app-token");
      }
   },
   update: () => {},
   get: () => {},
   delete: () => {},
};

export default UserService;
