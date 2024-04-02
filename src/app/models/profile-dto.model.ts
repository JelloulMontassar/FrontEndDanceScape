export interface ProfileDto {
  id: number | null;
  firstName: string;
  lastName: string;
  birthday: Date;
  email: string;
  role: Role;
  phoneNumber: number;
  profileImage:Blob;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  PARTICIPANT = 'PARTICIPANT',
  SPECTATOR = 'SPECTATOR',
  JURY = 'JURY',
  DIRECTOR = 'DIRECTOR'
}
