import { BannerComponent } from './Front/body/banner/banner.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateComponent } from './Front/all-template/all-template.component';
import { TrainingsComponent } from './Front/body/trainings/trainings.component';
import { ClassComponent } from './Front/body/class/class.component';
import { ShowsComponent } from './Front/body/shows/shows.component';
import { ShortCodeComponent } from './Front/body/short-code/short-code.component';
import { ContactComponent } from './Front/body/contact/contact.component';
import { AdminAllComponent } from './Back/admin-all/admin-all.component';
import { AdminHomeComponent } from './Back/admin/admin-home/admin-home.component';
import { RegisterComponent } from './Register/Register.component';
import { ListUserComponent } from './list-user/list-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import {ProfileComponent} from "./profile/profile.component";
import {LogoutComponent} from "./logout/logout.component";
import {ConfirmforgotpasswordComponent} from "./confirmforgotpassword/confirmforgotpassword.component";
import {ForumpostComponent} from "./Front/forumpost/forumpost.component";
import {AjouterPostComponent} from "./Front/ajouter-post/ajouter-post.component";
import {UpdatePostComponent} from "./Front/update-post/update-post.component";
import {ChatComponent} from "./chat-component/chat-component.component";
import {PrivateChatComponent} from "./private-chat/private-chat.component";
import {ReclamationListComponent} from "./reclamation-list/reclamation-list.component";
import {CreateReclamationComponent} from "./create-reclamation/create-reclamation.component";
import {UpdateReclamationComponent} from "./update-reclamation/update-reclamation.component";
import {PendingFriendRequestsComponent} from "./pending-friend-requests/pending-friend-requests.component";
import {MyReclamationListComponent} from "./my-reclamation-list/my-reclamation-list.component";

const routes: Routes = [
  { path:'DanceScape', component:AllTemplateComponent,
  children:[
    { path: 'reclamations/new', component: CreateReclamationComponent },
    {path:'home', component: BannerComponent},
    {path:'trainings', component: TrainingsComponent},
    {path:'posts', component:ForumpostComponent},
    {path:'chatRoom', component:ChatComponent},
    {path:'PrivateChatRoom', component:PrivateChatComponent},
    {path:'ajouterPost', component:AjouterPostComponent},
    {path:'updatePost/:id', component:UpdatePostComponent},
    {path:'friendRequests', component:PendingFriendRequestsComponent},
    {path:'reclamations/MyReclamations', component:MyReclamationListComponent},

    {path: 'class', component:ClassComponent},
    {path: 'shows', component: ShowsComponent},
    {path: 'shortcode', component:ShortCodeComponent},
    {path: 'contact', component:ContactComponent},
    { path: 'profile', component: ProfileComponent }
  ]
},

{path: 'admin', component:AdminAllComponent,
children:[
  {path:'body', component:AdminHomeComponent},
  {path:'list-users',component:ListUserComponent},
  { path: 'reclamations', component: ReclamationListComponent },
  {path:'reclamation/:id', component:UpdateReclamationComponent},
  {path:'update-user/:userId',component:UserDetailsComponent}
]
},

  { path: 'logout', component: LogoutComponent },
  { path: 'login', component: LoginComponent },
  {path:'Register',component:RegisterComponent},
  { path: 'forgot-password', component: ForgotpasswordComponent },
  {path:'forgot-password/:resetToken',component:ConfirmforgotpasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
