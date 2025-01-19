import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const REQUIRED_FIELD_MESSAGE = "Field required";

const zodSchema = {
   loginForm: z.object({
      userEmail: z.string().min(1, REQUIRED_FIELD_MESSAGE),
      userPassword: z.string().min(1, REQUIRED_FIELD_MESSAGE),
   }),
   registerForm: z.object({
      userName: z.string().min(1, REQUIRED_FIELD_MESSAGE),
      userEmail: z.string().min(1, REQUIRED_FIELD_MESSAGE),
      userPassword: z.string().min(1, REQUIRED_FIELD_MESSAGE),
   }),
   dashboard: {
      createProject: z.object({
         projectName: z.string().min(1, REQUIRED_FIELD_MESSAGE),
      }),
      createTask: z.object({
         taskName: z.string().min(1, REQUIRED_FIELD_MESSAGE),
      }),
      projectHeader: z.object({
         projectTitle: z.string().min(1, REQUIRED_FIELD_MESSAGE),
      }),
      taskList: z.object({
         taskDescription: z.string().min(1, REQUIRED_FIELD_MESSAGE),
      }),
   },
};

export { zodResolver };

export default zodSchema;
