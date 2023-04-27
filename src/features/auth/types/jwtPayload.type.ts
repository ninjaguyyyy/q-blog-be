import { Role } from 'src/features/users/data-access/contants/role.enum';

export type JwtPayloadType = {
  _id: string;
  role: Role;
};
