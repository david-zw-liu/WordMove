import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WordmoveService } from '../wordmove.service';
import * as swal from 'sweetalert';

@Component({
  selector: 'app-select-animation',
  templateUrl: './select-animation.component.html',
  styleUrls: ['./select-animation.component.sass']
})
export class SelectAnimationComponent implements OnInit {
  public processedResult = null;
  public hasImgSection = [];
  public currentSection = null;
  public currentIndex = 0;
  public isComplete: boolean = false;
  constructor(private router: Router, private ws: WordmoveService) { }

  ngOnInit() {
    this.processedResult = this.ws.processedResult;
    this.hasImgSection = this.processedResult.filter((r) => {return r.selectable});
    this.currentSection = this.hasImgSection[0];
  }
  previous() {
    if(this.currentIndex - 1 >= 0) {
      this.currentIndex--;
      this.currentSection = this.hasImgSection[this.currentIndex];
    }

    this.isComplete = (this.currentSection == this.hasImgSection[this.hasImgSection.length - 1]);
  }
  next() {
    if(this.currentIndex + 1 < this.hasImgSection.length) {
      this.currentIndex++;
      this.currentSection = this.hasImgSection[this.currentIndex];
    }
    this.isComplete = (this.currentSection == this.hasImgSection[this.hasImgSection.length - 1]);
  }

  clickChange(item) {
    for(let i = 0; i < this.hasImgSection.length; i++) {
      let his = this.hasImgSection[i];
      if(his == item) {
        this.currentSection = his;
        this.currentIndex = i;
        this.isComplete = (this.currentSection == this.hasImgSection[this.hasImgSection.length - 1]);
      }
    }
  }

  submit() {
    if(this.isAllSelected()){
      console.log(this.processedResult);
      this.router.navigate(['result']);
    }
    else {
      swal({
        title: "Oops...",
        text: "還有單詞尚未選擇圖片哦！",
        type: "error",
        confirmButtonText: "確定"
      });
    }
  }

  isAllSelected() {
    for(let i = 0; i < this.hasImgSection.length; i++) {
      let s = this.hasImgSection[i];
      if(typeof s.selectedImgIndex == 'undefined' && s['recommend_index'] == null){
        return false;
      }
    }
    return true;
  }
}
