import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTemplateComponent } from './Front/all-template/all-template.component';
import { HeaderComponent } from './Front/header/header.component';
import { FooterComponent } from './Front/footer/footer.component';
import { BodyComponent } from './Front/body/body.component';
import { TrainingsComponent } from './Front/body/trainings/trainings.component';
import { BannerComponent } from './Front/body/banner/banner.component';
import { ClassComponent } from './Front/body/class/class.component';
import { ShowsComponent } from './Front/body/shows/shows.component';
import { ShortCodeComponent } from './Front/body/short-code/short-code.component';
import { ContactComponent } from './Front/body/contact/contact.component';
import { AdminAllComponent } from './Back/admin-all/admin-all.component';
import { AdminFooterComponent } from './Back/admin-footer/admin-footer.component';
import { AdminHeaderComponent } from './Back/admin-header/admin-header.component';
import { AdminSideBarComponent } from './Back/admin-side-bar/admin-side-bar.component';
import { AdminHomeComponent } from './Back/admin/admin-home/admin-home.component';
import { RegisterComponent } from './Register/Register.component';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { ListUserComponent } from './list-user/list-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { RoleToStringPipe } from './role-to-string.pipe';
import { LoginComponent } from './login/login.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerConfigComponent } from './datepicker-config/datepicker-config.component';
import { DropdownModule } from 'primeng/dropdown';
import { ProfileComponent } from './profile/profile.component';
import { LogoutComponent } from './logout/logout.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import {DataTablesModule} from "angular-datatables";
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ConfirmforgotpasswordComponent } from './confirmforgotpassword/confirmforgotpassword.component';
import {AjouterPostComponent} from "./Front/ajouter-post/ajouter-post.component";
import {ForumpostComponent} from "./Front/forumpost/forumpost.component";
import {UpdatePostComponent} from "./Front/update-post/update-post.component";
import {ChatComponent} from "./chat-component/chat-component.component";
import { PrivateChatComponent } from './private-chat/private-chat.component';
import { ReclamationListComponent } from './reclamation-list/reclamation-list.component';
import { CreateReclamationComponent } from './create-reclamation/create-reclamation.component';
import { UpdateReclamationComponent } from './update-reclamation/update-reclamation.component';
import { PendingFriendRequestsComponent } from './pending-friend-requests/pending-friend-requests.component';
import { MyReclamationListComponent } from './my-reclamation-list/my-reclamation-list.component';




@NgModule({
  declarations: [
    AppComponent,

    AllTemplateComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    TrainingsComponent,
    BannerComponent,
    ClassComponent,
    ShowsComponent,
    ShortCodeComponent,
    ContactComponent,
    AdminAllComponent,
    AdminFooterComponent,
    AdminHeaderComponent,
    AdminSideBarComponent,
    AdminHomeComponent,
    RegisterComponent,
    ListUserComponent,
    UserDetailsComponent,
    RoleToStringPipe,
    LoginComponent,
    DatepickerConfigComponent,
    AjouterPostComponent,
    ForumpostComponent,
    MyReclamationListComponent,
    PendingFriendRequestsComponent,
    UpdateReclamationComponent,
    UpdatePostComponent,
    ChatComponent,
    PrivateChatComponent,
    ProfileComponent,
    LogoutComponent,
    ForgotpasswordComponent,
    ConfirmforgotpasswordComponent,
    PrivateChatComponent,
    ReclamationListComponent,
    CreateReclamationComponent,
    UpdateReclamationComponent,
    PendingFriendRequestsComponent,
    MyReclamationListComponent,

  ],
  imports: [
    CommonModule,
    DataTablesModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    NgbModule,
    DropdownModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
