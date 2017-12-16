import {Input} from '@angular/compiler';
import { Component, ViewChild, AfterViewInit, OnDestroy, OnChanges } from '@angular/core';
import { NgControl, FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Subject } from "rxjs/Subject";

import { takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: []
})
export class AppComponent implements OnChanges {

  // when use input pass data pls use onchanges reset form
  @Input() data = {
    'firstName': 'Kevein',
    'lastName': 'Yang',
    'phoneNumber': ''
  };

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

  // data$ = this.formData.valueChanges();
  // summary$ = this.data$.pipe(map(value=>value));

  constructor(private fb: FormBuilder){

  }

  ngOnChanges() {
    console.log('changes');
    this.formData.reset(this.data);
  }

  send() {
    console.log('formData.value',this.formData.value);
    console.log('formData.getRawValue',this.formData.getRawValue());
  }
}
