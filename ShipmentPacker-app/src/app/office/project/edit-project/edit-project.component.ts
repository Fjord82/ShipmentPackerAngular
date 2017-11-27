import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  model: NgbDateStruct;
  date: {year: number, month: number};

  backbtn() {
    this.router.navigateByUrl('/office');
  }
}
