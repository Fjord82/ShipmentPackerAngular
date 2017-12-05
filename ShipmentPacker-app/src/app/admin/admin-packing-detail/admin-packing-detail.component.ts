import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-packing-detail',
  templateUrl: './admin-packing-detail.component.html',
  styleUrls: ['./admin-packing-detail.component.css']
})
export class AdminPackingDetailComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  back() {
    this.router.navigateByUrl('/admin');
  }

}
