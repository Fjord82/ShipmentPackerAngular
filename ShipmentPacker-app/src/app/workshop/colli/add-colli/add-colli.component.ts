import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-colli',
  templateUrl: './add-colli.component.html',
  styleUrls: ['./add-colli.component.css']
})
export class AddColliComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  back(){
    this.router.navigateByUrl('packingDetailWorkshop')
  }

  add() {

  }

  save() {

  }

}
