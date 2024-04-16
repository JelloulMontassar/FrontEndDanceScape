import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ForumpostService } from 'src/app/Services/forumpost.service';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit{
  post:any
  id:any
  imageUrl: any = null;


  constructor(private service:ForumpostService,private router:Router,private activatedRoute:ActivatedRoute,private http: HttpClient,){}
routeSub!: Subscription;
ngOnInit(): void {


  this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
    this.id = params['id']; });

   this.service.getpost(this.id).subscribe(p =>{
    console.log(p);
    this.post = p;
     this.imageUrl= this.post.imageUrl;

  });

}
IMG : any = ""
  async uploadImage(file: File): Promise<string> {
    try {
      const apiKey = '203ebb86668b0b0018d57ae3bc0a3a62';
      const formData = new FormData();
      formData.append('image', file);

      const response: any = await this.http.post<any>(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      ).toPromise();

      console.log('Image uploaded successfully:', response);
      return response.data.url || '';
    } catch (error) {
      console.error('Error uploading image:', error);
      return '';
    }
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadImage(file).then((imageUrl: string) => {
        this.imageUrl = imageUrl;
        console.log('Image URL:', this.imageUrl);
      });
    }
  }
updatePost(){
  if (this.imageUrl!==null) {
    this.post.imageUrl = this.imageUrl;
  }
  this.service.updatePost(this.post).subscribe(
    res => {
      this.post = {
        title: '',
        postContent: "",
        imageUrl: this.IMG


      };
      console.log(res)
      this.router.navigate(['/DanceScape/posts']);

    },
    err => {
      console.log(err);
    }
  );


  }
  buttonRetour(){
    this.router.navigate(['']);
  }

}
