import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-colli-detail',
  templateUrl: './admin-colli-detail.component.html',
  styleUrls: ['./admin-colli-detail.component.css']
})
export class AdminColliDetailComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  back() {
    this.router.navigateByUrl('/admin');
  }

}
