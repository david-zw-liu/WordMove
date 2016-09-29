import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WordmoveService} from '../wordmove.service'
import * as swal from 'sweetalert';

@Component({
  selector: 'app-input-article',
  templateUrl: './input-article.component.html',
  styleUrls: ['./input-article.component.sass']
})
export class InputArticleComponent implements OnInit {

  constructor(private router: Router, private ws: WordmoveService) {
  }

  public article = "兔子嘲笑烏龜的步子爬的慢，但是他笑了，說總有一天他會和她賽跑，並且贏他。";

  ngOnInit() {}

  next() {
    var self = this;
    if (this.article.length > 0) {
      swal({
        title: "Are you sure?",
        text: "請確定文章是否完整，確定後按下確定鍵。",
        type: "info",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
        confirmButtonText: "確定",
        cancelButtonText: "取消"
      }, function () {
        self.ws.inputArticle(self.article)
          .subscribe(
            result => {
              swal.close();
              self.ws.processedResult = result;
              self.router.navigate(['select-animation']);
            }
          )
      });
    }
    else {
      swal({
        title: "Oops...",
        text: "請先輸入文章!",
        type: "error",
        confirmButtonText: "確定"
      });
    }
  }
}
