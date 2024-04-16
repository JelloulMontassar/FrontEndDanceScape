
import { User } from "./User.model";

export class ForumPost{
    postId!:number;
    title!:String;

    postDate !:Date;
    postContent!:String;
    user!:User;
    nbLikes!: number;
    nbdisLikes!:number;
    comments!:any;
    imageUrl:any;
    postCreator:any;
    reacts!:any


}
