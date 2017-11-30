import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Packing} from '../shared/packing.model';

@Component({
  selector: 'app-packing-detail',
  templateUrl: './packing-detail.component.html',
  styleUrls: ['./packing-detail.component.css']
})
export class PackingDetailComponent implements OnInit {

  packing: Packing;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  back() {
    this.router.navigateByUrl('/office');
  }

  clickProject() {

  }

}
