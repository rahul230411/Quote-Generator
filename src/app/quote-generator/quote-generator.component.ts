// quote-generator.component.ts

import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations'; // Import Angular animations module
import { QuoteService } from '../quote.service';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-quote-generator',
  templateUrl: './quote-generator.component.html',
  styleUrls: ['./quote-generator.component.css'],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
        })
      ),
      transition('void <=> *', animate(1000)),
    ]),
    trigger('buttonClick', [
      state(
        'initial',
        style({
          transform: 'scale(1)',
        })
      ),
      state(
        'clicked',
        style({
          transform: 'scale(1.1)',
        })
      ),
      transition('initial <=> clicked', animate('200ms ease-in-out')),
    ]),
  ],
})
export class QuoteGeneratorComponent implements OnInit {
  quote: string = '';
  author: string = '';
  backgroundImage: string = '';
  buttonState = 'initial';

  constructor(
    private quoteService: QuoteService,
    private imageService: ImageService
  ) {}

  ngOnInit() {
    this.generateBackgroundImage();
  }

  async generateBackgroundImage() {
    const images = await this.imageService.searchImages('mount everest dusk'); // Change search query
    const randomIndex = Math.floor(Math.random() * images.length);
    this.backgroundImage = `url('${images[randomIndex]}')`;
  }

  generateQuote() {
    this.buttonState = 'clicked'; // Change button state on click
    this.quoteService.getRandomQuote().subscribe((data: any) => {
      this.quote = data.content;
      this.author = data.author;
      setTimeout(() => {
        this.buttonState = 'initial'; // Reset button state after delay
      }, 200);
    });
  }
}
