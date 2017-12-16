import { Component, ViewChild, AfterViewInit, OnDestroy, OnChanges, OnInit } from '@angular/core';
import { NgControl, FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Subject } from "rxjs/Subject";
import { defer } from "rxjs/observable/defer";
import { combineLatest } from "rxjs/observable/combineLatest";

import { mergeMap, debounceTime,tap, map,filter,startWith } from 'rxjs/operators';
import { HttpParams, HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: []
})
export class AppComponent implements OnInit, AfterViewInit {

  readonly wikiAPI = '//en.wikipedia.org/w/api.php';

  formData: FormGroup;

  searchControlValue$ = defer (
    () => {
      if(this.formData) {
        return this.formData.get('search').valueChanges;
      }
    }
  ).pipe(tap(value => console.log('searchControlValue$', value)));

  checkboxControlValue$ = defer (
    () => {
      if(this.formData) {
        return this.formData.get('isSend').valueChanges.pipe(startWith(true));
      }
    }
  ).pipe(tap(value => console.log('checkboxControlValue$', value)));

  searchResult$ = combineLatest(
    this.searchControlValue$,
    this.checkboxControlValue$,
    (searchVal,chkVal) => ({searchVal, chkVal})).pipe(
    debounceTime(500),
    mergeMap(({searchVal, chkVal}) => {
        return this.http.jsonp<any[]>(
          this.searchUrl(searchVal,this.wikiAPI),
          'callback'
        )
      },
      ({searchVal, chkVal}, data) => ({chkVal, data}) // 第二個參數是做map的功能
    ),
    map(({chkVal,data}) => {
      if(data.length > 0 && chkVal) {
        data.shift();
        return data[0];
      }
      return [];
    })
  );

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ){

  }

  ngOnInit() {

    this.formData = this.fb.group({
      'search': [''],
      'isSend': [true]
    });

  }

  ngAfterViewInit() {

    // this.checkboxControlValue$.subscribe(value => console.log(value));
  }

  searchUrl(term, base) {
    let params = new HttpParams()
      .append('action', 'opensearch')
      .append('search', encodeURIComponent(term))
      .append('format' ,'json');
      return `${base}?${params.toString()}`;
  }

  send() {

    this.http.jsonp(this.searchUrl('1234',this.wikiAPI),
    'callback').subscribe( value => {
      console.log(value);
    });
  }
}
