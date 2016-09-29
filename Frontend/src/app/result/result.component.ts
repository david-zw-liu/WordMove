import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WordmoveService } from '../wordmove.service'
import { Howl, Howler } from 'howler';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.sass']
})
export class ResultComponent implements OnInit {
  public currentIndex = 0;
  public currentImage = null;
  public currentImageUrl = null;
  public processedResult = null;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public wm: WordmoveService
  ) { }

  ngOnInit() {
    let id = this.route.params['id'];
    this.processedResult = this.wm.processedResult;
    this.currentImage = this.processedResult[0];
    this.currentImageUrl = this.currentImage.images[this.currentImage.selectedImgIndex];
    this.play();
    console.log(this.wm.processedResult);
  }


  play() {
    let self = this;
    let staticUrl = "http://localhost:3000";
    let soundUrl = staticUrl+this.currentImage.sound;

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
  nextPic() {
    if(this.currentIndex == this.processedResult.length - 1) {
      return false;
    }
    else {
      this.currentIndex += 1;
    }
    this.currentImage = this.processedResult[this.currentIndex];

    if(this.currentImage.images[this.currentImage.selectedImgIndex]) {
      this.currentImageUrl = this.currentImage.images[this.currentImage.selectedImgIndex];
    }
    return true;
  }
  replay() {
    this.currentImage = this.processedResult[0];
    this.currentIndex = 0;
    this.currentImageUrl = this.currentImage.images[this.currentImage.selectedImgIndex];
    $('#resultImage').attr('src', this.currentImageUrl);
    $('#sentence_' + this.currentIndex).addClass('current');
    this.play();
  }
}
