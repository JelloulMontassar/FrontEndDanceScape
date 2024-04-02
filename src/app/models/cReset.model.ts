// auth.model.ts

export interface CResetPasswordRequest {
  email: string;
  resetToken : string
}

export interface CResetPasswordResponse {
  email: string;
   messageResponse:string;

}
