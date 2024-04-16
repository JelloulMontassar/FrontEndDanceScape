import { ForumPost } from "./ForumPost";

export class Comment{
    commentId!:number;
    content!:String
    commentDate!:Date
    forumPost!:ForumPost
}