import { Role } from 'src/features/users/data-access/contants/role.enum';
import { User } from 'src/features/users/data-access/schemas/user.schema';

export const isAdmin = (user: User) => {
  return user.role === Role.Admin;
};
