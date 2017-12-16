import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { NgControl, FormGroup } from "@angular/forms";
import { Subject } from "rxjs/Subject";

import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: []
})
export class AppComponent {
  send(form) {
    console.log(form);
  }
}
