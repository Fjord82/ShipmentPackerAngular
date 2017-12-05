import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ColliService} from '../shared/colli.service';
import {Colli} from '../shared/colli.model';
import {ProjectService} from '../../../office/project/shared/project.service';
import {Project} from '../../../office/project/shared/project.model';

@Component({
  selector: 'app-add-colli',
  templateUrl: './add-colli.component.html',
  styleUrls: ['./add-colli.component.css']
})
export class AddColliComponent implements OnInit {

  colliGroup: FormGroup;
  project: Project;
  colli: Colli;
  constructor(private router: Router,
              private fb: FormBuilder,
              private projectService: ProjectService,
              private colliService: ColliService) {
    this.colliGroup = this.fb.group({
      totalWeight: ['', Validators.required],
      dimensions: ['', Validators.required],
      freightType: ['', Validators.required],
    });
  }

  ngOnInit() {

  }

  back() {
    this.router.navigateByUrl('packingDetailWorkshop')
  }

  add() {

  }

  save() {
    const values = this.colliGroup.value;
    if (values.totalWeight == "") values.totalWeight = this.colli.totalWeight;
    if (values.dimensions == "") values.dimensions = this.colli.dimensions;
    if (values.freightType == "") values.freightType = this.colli.freightType;
    this.colli = <Colli> {
      totalWeight: values.totalWeight,
      dimensions: values.dimensions,
      freightType: values.freightType,
    };
    this.colliService.create(this.colli).subscribe(coll => this.back());
  }
}
