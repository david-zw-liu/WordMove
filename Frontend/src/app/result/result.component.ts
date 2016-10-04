import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WordmoveService } from '../wordmove.service'
import { Howl, Howler } from 'howler';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.sass']
})
export class ResultComponent implements OnInit {
  public currentIndex = -1;
  public currentImage = null;
  public currentImageUrl = null;
  public processedResult = null;
  public sharedId = null;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public wm: WordmoveService
  ) { }

  ngOnInit() {
    let id = (<any>this.route.params).value['id'];
    if(!id) {
      this.processedResult = this.wm.processedResult;
      this.wm.saveResult().subscribe(result => { this.sharedId = result.id });
      this.nextPic();
      this.play();
    }
    else {
      this.wm.getResult(id).subscribe(
        result => {
          this.processedResult = JSON.parse(result.text());
          this.sharedId = id;
          this.nextPic();
          this.play();
        }
      );
    }

  }

  play() {
    if(this.currentImage.sound != "") {
      let self = this;
      let staticUrl = "http://localhost:3000";
      let soundUrl = staticUrl+this.currentImage.sound;
      $('#resultImage').attr('src', self.currentImageUrl);
      $('#sentence_' + self.currentIndex).addClass('current');
      new Howl({
        src: soundUrl,
        autoplay: true,
        loop: false,
        volume: 1.0,
        onend:function () {
          $('#sentence_'+self.currentIndex).removeClass('current');
          if(self.nextPic()) {
            $('#resultImage').attr('src', self.currentImageUrl);
            $('#sentence_' + self.currentIndex).addClass('current');
            self.play();
          }
        }
      });
    }
    else {
      $('#sentence_'+this.currentIndex).removeClass('current');
      if(this.nextPic()) {
        $('#resultImage').attr('src', this.currentImageUrl);
        $('#sentence_' + this.currentIndex).addClass('current');
        this.play();
      }
    }


  }
  
  nextPic() {
    if(this.currentIndex == this.processedResult.length - 1) {
      return false;
    }
    else {
      this.currentIndex += 1;
    }

    this.currentImage = this.processedResult[this.currentIndex];

    if(this.currentImage.selectedImgIndex != undefined) {
      if(this.currentImage.images[this.currentImage.selectedImgIndex]) {
        this.currentImageUrl = this.currentImage.images[this.currentImage.selectedImgIndex];
      }
    } else if (this.currentImage["recommend_index"] != null) {
      if(this.currentImage.images[this.currentImage["recommend_index"]]) {
        this.currentImageUrl = this.currentImage.images[this.currentImage["recommend_index"]];
      }
    }

    return true;
  }


  replay() {
    this.currentIndex = -1;
    this.nextPic();
    $('#resultImage').attr('src', this.currentImageUrl);
    $('#sentence_' + this.currentIndex).addClass('current');
    this.play();
  }
}
