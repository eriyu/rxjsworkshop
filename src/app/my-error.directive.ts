import { Directive, Input, OnChanges, AfterViewInit, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[myError]'
})
export class MyErrorDirective implements OnChanges, AfterViewInit {
  @Input('myError') myErrorControl: NgControl;

  ngOnChanges() {
    console.log(this.myErrorControl.errors);
  }

  ngAfterViewInit() {
    const control = this.myErrorControl;
    if(!!control){
      control.statusChanges!.subscribe(value => {
        this.el.nativeElement.innerHTML = '';
        if(value === 'INVALID') {
          this.el.nativeElement.innerHTML = 'ERROR';
        }
        console.log(value);
      });
    }
  }

  constructor(
    private el: ElementRef
  ) { }

}
