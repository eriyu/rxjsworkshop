import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { NgControl, FormGroup, FormControl, Validators } from "@angular/forms";
import { Subject } from "rxjs/Subject";

import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: []
})
export class AppComponent {

  formData = new FormGroup({
    'firstName': new FormControl('Kevin', Validators.required),
    'lastName': new FormControl({value: 'Yang', disabled:true}),
    // 'phoneNumber': new FormControl('', [
    //   Validators.required,
    //   Validators.minLength(8)
    // ])
    'phoneNumber': new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8)
    ]))
  });

  send() {
    console.log('formData.value',this.formData.value);
    console.log('formData.getRawValue',this.formData.getRawValue());
  }
}
