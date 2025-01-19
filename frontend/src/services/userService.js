import fetcher from "./fetcher";

const UserService = {
   authenticate: async (data) => {
      const response = await fetcher.post("auth/authenticate", {
         email: data.userEmail,
         password: data.userPassword,
      });

      if (!response.error) {
         localStorage.setItem("app-token", response.token);
         localStorage.setItem("user-name", response.user.name);
      } else {
         localStorage.removeItem("app-token");
      }

      return response;
   },
   register: async (payload) => {
      const response = await fetcher.post("auth/register", payload);

      return response;
   },
};

export default UserService;
