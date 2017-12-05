import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-project-detail',
  templateUrl: './admin-project-detail.component.html',
  styleUrls: ['./admin-project-detail.component.css']
})
export class AdminProjectDetailComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  back() {
    this.router.navigateByUrl('/admin');
  }

}
