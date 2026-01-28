import { getUserByEmail, createUser } from "../db/users";
import { authentication, random } from "../helpers";

import { ApiError } from "../errors/ApiError";

export const login = async (email: string, password: string) => {
  const user = await getUserByEmail(email)
    .select('+authentication.salt +authentication.password');

  const expectedHash = authentication(user.authentication.salt, password);

  if(user.authentication.password !== expectedHash){
    throw new ApiError(403, "Invalid email or password");
  }

  const salt = random();
  user.authentication.sessionToken = authentication(salt, user._id.toString());
  await user.save();

  return user
}

export const register = async (email: string, password: string, username: string) => {
  const existingUser = await getUserByEmail(email);

  if(existingUser) {
    throw new ApiError(409, "User already exists");
  }
  
  const salt = random();
  const user = await createUser({
    email,
    username,
    authentication: {
      salt,
      password: authentication(salt, password)
    },
  });

  return user;
}