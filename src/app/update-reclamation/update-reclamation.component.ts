import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-update-reclamation',
  templateUrl: './update-reclamation.component.html',
  styleUrls: ['./update-reclamation.component.scss']
})
export class UpdateReclamationComponent implements OnInit{
  reclamation : any;
  ngOnInit(): void {
    this.getReclamation()

  }
  constructor(private http: HttpClient,private route: ActivatedRoute,private router: Router) {
  }
  getReclamation(){
    const reclamationId = this.route.snapshot.params['id'];
    this.http.get<any[]>(`http://localhost:8088/reclamations/reclamation/${reclamationId}`).subscribe(reclamation => {
      this.reclamation = reclamation;
      console.log(this.reclamation)

    });
  }


  resolveReclamation(id:string) {
    console.log(id)
     this.http.post<any[]>(`http://localhost:8088/reclamations/reclamation/resolve/${id}`,null).subscribe(value =>
       this.getReclamation())
  }

  closeReclamation() {
    this.router.navigate(['admin/reclamations']);

  }
}
