import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api/api.service';

@Component({
  selector: 'app-main-carousel',
  templateUrl: './main-carousel.component.html'
})
export class MainCarouselComponent implements OnInit {
  // slides array to fill the carousel
  slides: any[];

  // caption text to display a brief description of the slide
  captionTxt: string;

  // error handler
  apiError = {
    error: false,
    msg: ''
  };

  // current slide's index
  private slideIndex = 1;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.fetch('../../assets/api/data.json').subscribe(
      (slides) => {
        // We fill our slides array with the data retrieved
        this.slides = slides;
        this.showSlides(this.slideIndex);
      },
      (err) => {
        console.error(err);
        this.apiError.error = true;
        this.apiError.msg = err;
      }
    );

  }

  // gets the text of the current slide
  getCaptionTxt() {
    this.slides.map(
      (slide) => {
        if (slide.show) {
          this.captionTxt = slide.txt;
        }
      }
    );
  }

  // triggers the `showSlides()` method passing as parameter the index of the slide that we want to show
  changeSlide(n) {
    this.showSlides(this.slideIndex += n);
    this.getCaptionTxt();
  }

  // Shows and hides a slide according to the parameter passed.
  // Also gets the text of the current slide
  private showSlides(n) {
    // if we go forwards and there are no more slides, we'll get to the first one
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }

    // if we go backwards and there are no more slides, we'll get to the last one
    if (n < 1) {
      this.slideIndex = this.slides.length;
    }

    // updates the `show` property of each slide, if the slide is the current selected we'll set it `true`
    // if is the first time that this method is running, it will add the `show` property to each slide's object
    this.slides.map(
      (slide, i) => {
        slide.show = i === this.slideIndex - 1;
      }
    );

    // we update the caption text
    this.getCaptionTxt();
  }
}
