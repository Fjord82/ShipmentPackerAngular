import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-packing-list',
  templateUrl: './add-packing-list.component.html',
  styleUrls: ['./add-packing-list.component.css']
})
export class AddPackingListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  backbtn() {
    this.router.navigateByUrl('/project-detail');
  }

}
