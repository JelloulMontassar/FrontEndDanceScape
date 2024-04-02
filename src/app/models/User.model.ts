export interface User{

    userId? : number | null,
    firstName : string,
    lastName: string,
    birthday: any,
    email : string,
    password : string,
    phoneNumber : number,
    role: Role,
    enabled: boolean,
    profileImage:String|null

}
export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  PARTICIPANT = 'PARTICIPANT',
  SPECTATOR = 'SPECTATOR',
  JURY = 'JURY',
  DIRECTOR = 'DIRECTOR'
}

