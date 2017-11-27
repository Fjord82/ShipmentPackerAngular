import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-packing-detail-workshop',
  templateUrl: './packing-detail-workshop.component.html',
  styleUrls: ['./packing-detail-workshop.component.css']
})
export class PackingDetailWorkshopComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  back() {
    this.router.navigateByUrl('/workshop')
  }

}
