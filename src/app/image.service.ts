// image.service.ts

import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private unsplashAccessKey = '7azHuQGlAeu2x74gy61z_L6ZvGcqyA32DUlyU9d8Ncw';

  constructor() {}

  async searchImages(query: string): Promise<string[]> {
    try {
      const response = await axios.get(
        'https://api.unsplash.com/search/photos',
        {
          params: { query },
          headers: {
            Authorization: `Client-ID ${this.unsplashAccessKey}`,
          },
        }
      );
      return response.data.results.map((result: any) => result.urls.regular);
    } catch (error) {
      console.error('Error fetching images:', error);
      return [];
    }
  }
}
