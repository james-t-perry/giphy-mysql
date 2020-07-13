import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Res } from './Interfaces/result.interface';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  apiKey: string = 'vyxB06s21Row9VmwQwkhPxKN7BE3YBGi' 
  constructor(private http: HttpClient,) { }

  search(query: string){
    let rating = 'G'
    return this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=25&offset=0&rating=${rating}&lang=en`).pipe(
      map((res: Res) => {
        return {
          pagination: res.pagination,
          meta: res.meta,
          data: res.data.map((gif: any) => gif.images.original)
        }
      })
    )
  }
}
