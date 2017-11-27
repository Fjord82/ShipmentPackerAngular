import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-workshop-project-list',
  templateUrl: './workshop-project-list.component.html',
  styleUrls: ['./workshop-project-list.component.css']
})
export class WorkshopProjectListComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  logoutbtn() {
    this.router.navigateByUrl('/login');
  }
  clickPackingDetail() {
    this.router.navigateByUrl('/packingDetailWorkshop')
  }
}
