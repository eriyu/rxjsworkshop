import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { NgControl } from "@angular/forms";
import { Subject } from "rxjs/Subject";

import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: []
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('searchRef') searchControl: NgControl;
  sub;
  destroy$ = new Subject();

  ngAfterViewInit() {
    console.log(this.searchControl);
    // this.sub = this.searchControl.valueChanges.subscribe(value => {
    //   console.log(value);
    // });
    this.searchControl.valueChanges
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(value => console.log(value));
  }

  ngOnDestroy() {
    // 1: use sub
    // this.sub.unsubscribe();

    // 2: use subject takeUntil
    // this.destroy$.next('');
    // this.destroy$.unsubscribe();

    // 2: use subject takeUntil or use complete
    this.destroy$.complete();
  }
}
