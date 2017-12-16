import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { NgControl, FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Subject } from "rxjs/Subject";

import { takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: []
})
export class AppComponent {

  formData = this.fb.group({
    'firstName': ['', Validators.required],
    'lastName': ['', Validators.required],
    'phoneNumber': ['', [ Validators.required, Validators.minLength(8)]]
  });

  // formData = new FormGroup({
  //   'firstName': new FormControl('Kevin', Validators.required),
  //   'lastName': new FormControl({value: 'Yang', disabled:true}),
  //   'phoneNumber': new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(8)
  //   ])
  // });

  // data$ = this.formData.valueChanges();
  // summary$ = this.data$.pipe(map(value=>value));

  constructor(private fb: FormBuilder){

  }

  send() {
    console.log('formData.value',this.formData.value);
    console.log('formData.getRawValue',this.formData.getRawValue());
  }
}
