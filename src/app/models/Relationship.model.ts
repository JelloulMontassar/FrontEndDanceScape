export interface Relationship {
  id: number;
  sender: {
    userId: number;
    firstName: string;
    lastName:string;
    profileImage:string;
  };
  receiver: {
    userId: number;
    firstName: number;
  };
  status: string;
}
