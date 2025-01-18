import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const REQUIRED_FIELD_MESSAGE = "Field required";

const zodSchema = {
   loginForm: z.object({
      userEmail: z.string().min(1, REQUIRED_FIELD_MESSAGE),
      userPassword: z.string().min(1, REQUIRED_FIELD_MESSAGE),
   }),
};

export { zodResolver };

export default zodSchema;
