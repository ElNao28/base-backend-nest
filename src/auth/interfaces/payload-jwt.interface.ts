import { Rol } from '../../users/entities/rol.entity';

export interface PayloadJwt {
  sub: string;
  email: string;
  jti: string;
  rol: Rol;
}
