import { Component,EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() public emmitSearch: EventEmitter<string> = new EventEmitter();
  @Output() public emmitchange: EventEmitter<string> = new EventEmitter();
  constructor(

  ) { }

  ngOnInit(): void {
  }

  public search(value: string){ //faz o valor do input da pesquisa ser transmitida para a pokelist
    this.emmitSearch.emit(value);
  }

  changeOrder(value:any){
    this.emmitchange.emit(value);
  }
}
