import { Component, ViewChild, AfterViewInit, OnDestroy, OnChanges, OnInit } from '@angular/core';
import { NgControl, FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Subject } from "rxjs/Subject";

import { takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: []
})
export class AppComponent implements OnInit {

  formData = this.fb.group({
    'firstName': ['', Validators.required],
    'lastName': ['', Validators.required],
    'phoneNumber': ['', [ Validators.required, Validators.minLength(8)]]
  });

  //#region
  // formData = new FormGroup({
  //   'firstName': new FormControl('Kevin', Validators.required),
  //   'lastName': new FormControl({value: 'Yang', disabled:true}),
  //   'phoneNumber': new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(8)
  //   ])
  // });
  //#endregion

  constructor(private fb: FormBuilder){

  }

  ngOnInit() {
    this.formData.reset({
      'firstName': 'Kevein',
      // 'lastName': 'Yang',
      'lastName': { value:'Yang', disable: true },
      'phoneNumber': ''
    });

    const firstNameControl = this.formData.get('firstName');
    if(!!firstNameControl) {
      firstNameControl.clearValidators();
      firstNameControl.setValidators(Validators.required);
    }
  }

  send() {
    console.log('formData.value',this.formData.value);
    console.log('formData.getRawValue',this.formData.getRawValue());
  }
}
