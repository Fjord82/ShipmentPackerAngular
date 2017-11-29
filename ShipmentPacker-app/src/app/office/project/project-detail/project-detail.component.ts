import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  backbtn() {
    this.router.navigateByUrl('/office');
  }

  packingClick() {
    this.router.navigateByUrl('/packingName');
  }

  addPackingClick() {
    this.router.navigateByUrl('/addPackingList');
  }

}
