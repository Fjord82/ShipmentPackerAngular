import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-workshop-project-list',
  templateUrl: './workshop-packing-list.component.html',
  styleUrls: ['./workshop-packing-list.component.css']
})
export class WorkshopPackingListComponent implements OnInit {

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
