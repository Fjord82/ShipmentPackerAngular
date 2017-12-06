import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PackingService} from '../shared/packing.service';
import {Packing} from '../shared/packing.model';
import {Project} from "../../project/shared/project.model";
import {ProjectService} from "../../project/shared/project.service";
import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-packing-list',
  templateUrl: './add-packing-list.component.html',
  styleUrls: ['./add-packing-list.component.css']
})
export class AddPackingListComponent implements OnInit {

  project: Project;
  packing: Packing;
  packingGroup: FormGroup;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private packingService: PackingService,
              private projectService: ProjectService,
              private ngbDateParserFormatter: NgbDateParserFormatter) {
    this.packingGroup = this.fb.group({
      packingName: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
      deliveryDate: ['', Validators.required],
      freightType: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.paramMap.switchMap(params => this.projectService.getById(+params.get('id')))
      .subscribe(project => this.project = project);
  }

  back() {
    this.router.navigateByUrl('/project-detail/'+this.project.id);
  }

  save() {
    const values = this.packingGroup.value;
    const packing: Packing = <Packing> {
      packingName: values.packingName,
      deliveryAddress: values.deliveryAddress,
      deliveryDate: this.ngbDateParserFormatter.format(values.deliveryDate),
      freightType: values.freightType
    };
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
