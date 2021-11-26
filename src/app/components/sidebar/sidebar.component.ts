import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiPokeService } from 'src/app/services/api-poke.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() public emmitSearch: EventEmitter<string> = new EventEmitter();
  @Output() public emmitSwitch: EventEmitter<string> = new EventEmitter();
  data:any;
  setData:any;
  types: any;
  alltypes: any;
  constructor(
    private apiPokeService: ApiPokeService

  ) { }

  ngOnInit(): void {
    this.apiPokeService.getDados().subscribe((res:any) => { //Extrai todos os tipos de pokemons da api
      this.setData = res.results;
      this.data = this.setData;

      this.types = [""]
      for(let i=0; i<this.setData.length;i++){
        this.types[i] =  this.setData[i].type[0];
      }
      this.alltypes = [...new Set(this.types)];
      this.alltypes.sort(function compare(a: any, b: any) {
        if (a < b)
          return -1;
        if (a > b)
          return 1;
        return 0;
      });
    })
  }

  switchClicked(event: any) {
    this.emmitSwitch.emit(event.srcElement.checked);
}

  public search(value: string){ //Valor do tipo de pokemon seja transmitida para a pokelist
    this.emmitSearch.emit(value);
  }
}
