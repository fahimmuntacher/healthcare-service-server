import { Role } from "better-auth/plugins";

export interface IRequestUser {
  userId: string;
  role: Role;
  email: string;
}
