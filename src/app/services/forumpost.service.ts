import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForumPost } from '../models/ForumPost';
import { Comment } from '../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class ForumpostService {
  private apiUrl = 'http://localhost:8088'
 url : string ='http://localhost:8088/Forum/'
 url_comments : string ='http://localhost:8088/comments/'
 url_sous_comments : string ='http://localhost:8088/sous-comments/'

 idUser : any=""
  constructor(private http : HttpClient) {
    this.idUser=localStorage.getItem("idUser");
  }
  getall(){
     return this.http.get<ForumPost[]>(this.url +'allForumPost')
  }
  getComments(id:any){
    return this.http.get<Comment[]>(this.url_comments+"getAllCommentsForPost/"+id);
  }
  getpost(id:any){
    return this.http.get<any>(this.url+"getForumPostById/"+id);
  }
  recherche(keyword: String) {
    const options = { responseType: 'json' as 'json' }; // Specify the responseType in the options object

    return this.http.get<ForumPost[]>(this.url + "search?keyword=" + keyword, options);
  }


  AddPost(post: any,userId:any): Observable<any> {


    return this.http.post<any>(this.url + "addForumPost/" + userId, post, { responseType: 'text' as 'json' });
  }
  PostLike(id:number,react:any){
    return this.http.post<any>('http://localhost:8088/reacts/like/'+id+'/'+this.idUser,react, { responseType: 'text' as 'json' });
  }

  PostdisLike(id:number,react:any){
    return this.http.post<any>('http://localhost:8088/reacts/dislike/'+id+this.idUser,react,{ responseType: 'text' as 'json' });
  }
  addComment(id:number,message:any){
    return this.http.post<any>(this.url_comments+'addCommentToPost/'+id+'/'+this.idUser,message);
  }
  addSousComment(id:number,message:any){
    return this.http.post<any>(this.url_sous_comments+'add/'+id+'/'+this.idUser,message);
  }
  getsousCommentByComment(postId:number):Observable<Comment[]>{
    return this.http.get<any>("http://localhost:8088/sous-comments/getall/"+postId);
  }
  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(this.url+'upload', formData, { responseType: 'text' as 'json' });
  }

  getImageUrl(imageName: string): string {
    return `${this.url}/getUrl/${imageName}`;
  }

  deletePost(id:any){
    return this.http.delete(this.url +"deleteFOrumPost/"+id)

  }
  updatePost(post:any){
    return this.http.put(this.url +"updateForumPost",post)

  }
  deleteComment(id:number){
    return this.http.delete(this.url_comments +"deleteComment/"+id)

  }
  updateComment(comment:any){
    return this.http.put(this.url_comments +"updateComment",comment)

  }
  deleteSousComment(id:number){
    return this.http.delete(this.url_sous_comments +"delete/"+id)

  }
  updateSousComment(comment:any){
    return this.http.put(this.url_sous_comments +"update",comment)

  }

  addForumPostToFacebook(message: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addForumPostToFacebook`, { message });
  }



}
