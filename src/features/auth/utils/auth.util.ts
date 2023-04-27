import { hash, compare } from 'bcryptjs';

export const hashPassword = async (password: string) => {
  const SALT_ROUND = 10;
  const hashedPassword = await hash(password, SALT_ROUND);
  return hashedPassword;
};

export const verifyPassword = async (lPassword: string, password: string) => {
  return await compare(lPassword, password);
};
