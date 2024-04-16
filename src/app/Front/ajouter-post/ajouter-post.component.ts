import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ForumpostService} from 'src/app/Services/forumpost.service';
import {FacebookServiceService} from 'src/app/Services/facebook-service.service';
import {HttpClient} from "@angular/common/http";
import {ProfileService} from "../../services/profile.service";

declare const FB: any;

@Component({
  selector: 'app-ajouter-post',
  templateUrl: './ajouter-post.component.html',
  styleUrls: ['./ajouter-post.component.scss']
})
export class AjouterPostComponent implements OnInit {
  user: any;
  imageUrl: any = null;
  msg:any = "";

  post = {
    title: '',
    postContent: '',
    imageUrl: ''
  };

  constructor(private service: ForumpostService,
              private http: HttpClient,
              private router: Router,
              private profileService: ProfileService,
              private facebookService: FacebookServiceService) {}

  ngOnInit(): void {
    this.getUserById();
    this.getUserInfo();
  }

  async getUserInfo(): Promise<void> {
    try {
      const res = await FB.api('/me');
      console.log('Informations de l\'utilisateur:', res);
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  }

  getUserById(): void {
    this.profileService.getUserProfile().subscribe(
      (profile: any) => {
        this.user = profile;
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

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

  async ajouterPost(): Promise<void> {
    try {
      if (!this.imageUrl) {
        console.error('Image URL is not available.');
        return;
      }

      this.post.imageUrl = await this.uploadImage(this.imageUrl);
      console.log('Image URL:', this.post.imageUrl);

      const res = await this.service.AddPost(this.post, this.user.id).toPromise();
      console.log(res);

      if (res === 'Post is added successfully!') {
        // Publish to Facebook
        this.facebookService.publishToFacebookPage(
          this.post.postContent,
          '280277211832893',
          'EAATVoeZB7NrABO3dCzm0Xajwl0RJ3OcdBU15121qG8Ew3lwVn30OgJVMBguMujbZCebB5elBZADYGgftpCbaceBnFtIXTQO5qsZBphp5pQRqKyGw1KsLcqnE2bk4NTpHcQeD8sNYK5zECHZC6rZA9LxcnSv5eRyONvMhm9UgBE3l85OcWPPGBsK5iXbge4bSAZD',
          this.post.imageUrl
        ).subscribe(
          () => {
            console.log('Published to Facebook successfully!');
            this.router.navigate(['/DanceScape/posts']);
          },
          error => {
            console.error('Error publishing to Facebook:', error);
            this.router.navigate(['/DanceScape/posts']);
          }
        );
      } else {
        alert(res);
        if (res === 'You have been banned for 1 hour') {
          this.router.navigate(['']);
        }
      }
    } catch (error) {
      console.error('Error adding post:', error);
    }
  }


  buttonRetour(): void {
    this.router.navigate(['']);
  }
}
