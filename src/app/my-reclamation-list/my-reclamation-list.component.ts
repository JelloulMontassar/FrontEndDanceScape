import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-reclamation-list',
  templateUrl: './my-reclamation-list.component.html',
  styleUrls: ['./my-reclamation-list.component.scss']
})
export class MyReclamationListComponent implements OnInit{
  reclamations : any[] | undefined;
  profileId : string;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 5
  };

  constructor(private http: HttpClient,private router: Router) {
    this.profileId = localStorage.getItem("idUser") as string;
  }

  ngOnInit() {
    this.fetchReclamations();
  }

  fetchReclamations() {
    this.http.get<any[]>(`http://localhost:8088/reclamations/user/${this.profileId}`).subscribe(reclamations => {
      this.reclamations = reclamations;

      this.dtTrigger.next(null);
    });

  }
}
