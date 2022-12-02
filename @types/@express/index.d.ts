import { User } from "../../src/utils/types";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
