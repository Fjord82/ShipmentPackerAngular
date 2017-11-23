import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

const now = new Date();

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  model: NgbDateStruct;
  date: {year: number, month: number};

  backbtn() {
    this.router.navigateByUrl('/office');

  }
}



