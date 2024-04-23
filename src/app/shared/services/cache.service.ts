import { Injectable } from '@angular/core';
import { ApiResponse } from '../types/apiresponse';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache: Map<string, ApiResponse> = new Map();

  constructor() { }

  put(url: string, response: ApiResponse) {
    this.cache.set(url, response);
  }

  get(url: string): ApiResponse | undefined {
    return this.cache.get(url);
  }

  clear() {
    this.cache.clear();
  }
}
