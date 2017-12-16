import { Component, ViewChild, AfterViewInit, OnDestroy, OnChanges, OnInit } from '@angular/core';
import { NgControl, FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Subject } from "rxjs/Subject";
import { defer } from "rxjs/observable/defer";


import { mergeMap, debounceTime,tap, map,filter } from 'rxjs/operators';
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
        return this.formData.get('isSend').valueChanges;
      }
    }
  ).pipe(tap(value => console.log('checkboxControlValue$', value)));

  searchResult$ = this.searchControlValue$.pipe(
    debounceTime(500),
    filter(() => this.formData.get('isSend').value),
    mergeMap(value => this.http.jsonp(
        this.searchUrl(value,this.wikiAPI),
        'callback'
      )),
    map((data: any[]) => {
      if(data.length > 0) {
        data.shift();
        return data[0];
      }
      return [];
    })
  );
  // .subscribe(value => console.log(value));

  // isSend$ = this.checkboxControlValue$.subscribe(value => console.log(value));

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ){

  }

  ngOnInit() {

    this.formData = this.fb.group({
      'search': [''],
      'isSend': [false]
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
