import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { fromEvent } from 'rxjs';
import { map, distinctUntilChanged, debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'giphy-practice';
  gifs: Array<Object>;
  gifSearch: string = '';
  rating: string = 'G';
  constructor(private searchService: SearchService) {

  }

  search(query) {
    this.searchService.search(query).subscribe(res => this.gifs = res.data)
  }

  ngOnInit() {
    let queryInput = document.getElementById('query')
    const inputObs = fromEvent(queryInput, 'input').pipe(
      debounceTime(400),
      map(event => event['target']['value']),
      filter(text => text.length > 3),
      distinctUntilChanged(),
    );
    inputObs.subscribe(val => this.search(val));
  }


}
