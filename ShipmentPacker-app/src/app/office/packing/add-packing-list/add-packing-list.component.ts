import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PackingService} from '../shared/packing.service';
import {Packing} from '../shared/packing.model';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Project} from "../../project/shared/project.model";
import {ProjectService} from "../../project/shared/project.service";

@Component({
  selector: 'app-add-packing-list',
  templateUrl: './add-packing-list.component.html',
  styleUrls: ['./add-packing-list.component.css']
})
export class AddPackingListComponent implements OnInit {

  project: Project;

  packingGroup: FormGroup;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private packingService: PackingService,
              private projectService: ProjectService) {
    this.packingGroup = this.fb.group({
      packingName: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
      deliveryDate: ['', Validators.required],
    });
  }

  ngOnInit(){
    this.route.paramMap.switchMap(params => this.projectService.getById(+params.get('id')))
      .subscribe(project => this.project = project);
  }

  model: NgbDateStruct;
  date: { year: number, month: number };

  back() {
    this.router.navigateByUrl('/project-detail/'+this.project.id);
  }

  save() {
    const values = this.packingGroup.value;
    const packing: Packing = <Packing> {
      packingName: values.packingName,
      deliveryAddress: values.deliveryAddress,
      deliveryDate: values.deliveryDate
    };
    packing.freightType = 'Hej';
    packing.itemType = 'Hej';
    packing.creatorName = 'Hej';
    packing.projectIds = [];
    packing.projectIds.push(this.project.id);
    this.packingService.create(packing)
      .subscribe(pack => this.back());
  }

  submit() {
    this.save();
  }

}
