import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reclamation-list',
  templateUrl: './reclamation-list.component.html',
  styleUrls: ['./reclamation-list.component.scss']
})
export class ReclamationListComponent implements OnInit {
  reclamations : any[] | undefined;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 5
  };

  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit() {
    this.fetchReclamations();
  }

  fetchReclamations() {
    this.http.get<any[]>('http://localhost:8088/reclamations').subscribe(reclamations => {
      this.reclamations = reclamations;

          this.dtTrigger.next(null);
        });

  }

  openReclamation(id:string) {
    this.router.navigate(['admin/reclamation', id]);


  }
}
