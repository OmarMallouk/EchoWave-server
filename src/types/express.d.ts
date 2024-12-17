
import { User } from "../modules/userModule/users.model"; 

declare global {
  namespace Express {
    interface Request {
      user?: User;  // Adds 'user' the Request 
    }
  }
}
