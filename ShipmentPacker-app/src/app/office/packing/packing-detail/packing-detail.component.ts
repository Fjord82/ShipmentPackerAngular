import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-packing-detail',
  templateUrl: './packing-detail.component.html',
  styleUrls: ['./packing-detail.component.css']
})
export class PackingDetailComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  backbtn() {
    this.router.navigateByUrl('/project-detail');
  }

  clickProject() {

  }

}
