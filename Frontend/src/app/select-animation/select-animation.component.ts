import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-select-animation',
  templateUrl: './select-animation.component.html',
  styleUrls: ['./select-animation.component.sass']
})
export class SelectAnimationComponent implements OnInit {

  public isComplete: boolean = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  previous() {
    this.isComplete = false
  }
  next() {
    this.isComplete = true;
  }
  submit() {
    this.router.navigate(['result']);
  }
}
