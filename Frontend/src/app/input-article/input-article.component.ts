import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-input-article',
  templateUrl: './input-article.component.html',
  styleUrls: ['./input-article.component.sass']
})
export class InputArticleComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  next() {
    this.router.navigate(['select-animation']);
  }
}
