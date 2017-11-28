import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.router.navigateByUrl('/login');
  }

  addProject() {
    this.router.navigateByUrl('/add-project');
  }

  clickProject() {
    this.router.navigateByUrl('/projectName');
  }

  edit(){
    this.router.navigateByUrl('/editProject')
  }
}
