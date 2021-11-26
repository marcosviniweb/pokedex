   
import { Component, OnInit } from '@angular/core';
import { ApiPokeService } from 'src/app/services/api-poke.service';

@Component({
  selector: 'app-pokelist',
  templateUrl: './pokelist.component.html',
  styleUrls: ['./pokelist.component.scss']
})


export class PokelistComponent implements OnInit {

  data: any;
  setData: any;
  sizeData = 20;
  tdados: any;
  favorite: any;
  currentFav: string | null;
  showHeartRegular: any;
  showHeartSolid: any;
  divShowMore = true;
  constructor(
    private apiPokeService: ApiPokeService
  ) {
    // this.showHeart = false;
    this.currentFav = localStorage.getItem("fav");
  }

  ngOnInit(): void {
    this.apiPokeService.getDados().subscribe((res: any) => { //puxa todos os pokemons da api
      this.setData = res.results;
      var DataList = this.setData
      var output: any[] = [];
      this.setData.reduce(function (isDup: any, Data: any, index: any) {
        var nextData = DataList[index + 1];
        if (nextData && Data.national_number === nextData.national_number) {
          return true;
        } else {
          output.push(Data);
        }
        return false;
      }, false);
      this.setData = output;
      this.data = this.setData.slice(0, this.sizeData);
    })
    this.favorite = [];
    if (this.currentFav) this.favorite = JSON.parse(this.currentFav)
  }



  public SearchNameID(value: any) {
    if (Number.isInteger(+value)) { //Se a Busca for por Registro Nacional
      const filter = this.setData.filter((res: any) => {
        return !res.national_number.indexOf(value);
      });
      this.data = filter;
    } else { //Busca por Nome

      let capitalized = "";
      const str = value.toLowerCase();

      if (str) capitalized = str[0].toUpperCase() + str.substr(1);
      const filter = this.setData.filter((res: any) => {
        return !res.name.indexOf(capitalized);
      });
      this.data = filter;
    }
    this.divShowMore = false;
  }

  public SearchType(value: string) {//Pesquisar por Tipo
    const filter = this.setData.filter((res: any) => {
      if (res.type[1]) {
        return !res.type[0].indexOf(value) || !res.type[1].indexOf(value)
      }
      return !res.type[0].indexOf(value)
    });
    this.data = filter;
    this.divShowMore = false;
  }

  heartId(id: number) {
    this.showHeartSolid = this.favorite.filter((res: any) => {
      return !res.indexOf(id)

    })

    if (this.showHeartSolid.length == 0) {
      this.showHeartRegular = id;

    }

  }

  public fav(value: number) {
    for (let i = 0; i <= this.favorite.length + 1; i++) {
      if (value == this.favorite[i]) {
        this.favorite.splice(this.favorite.indexOf(value), 1);
        break;
      }
      if (i == this.favorite.length) {
        this.favorite[this.favorite.length] = value;
        break;
      }
    }
    localStorage.setItem("fav", JSON.stringify(this.favorite))
    this.showHeartRegular = 0;
  }

  public ChangeFav(bool: any) {
    if (bool == true) {
      let filteredData = this.setData.filter((res: any) => this.favorite.includes(res.national_number));
      this.data = filteredData;
      this.divShowMore = false;
    } else {
      this.data = this.setData.slice(0, this.sizeData);
      this.divShowMore = true;
    }
  }

  public orderBy(value: any) {
    if (value === 'nameAsc') {
      this.data.sort(function compare(a: any, b: any) {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
      });
    } else if (value === 'nameDesc') {
      this.data.sort(function compare(a: any, b: any) {
        if (a.name > b.name)
          return -1;
        if (a.name < b.name)
          return 1;
        return 0;
      });
    } else if (value === 'smallerNumber') {
      this.data.sort(function compare(a: any, b: any) {
        if (a.national_number < b.national_number)
          return -1;
        if (a.national_number > b.national_number)
          return 1;
        return 0;
      });
    } else if (value === 'higherNumber') {
      this.data.sort(function compare(a: any, b: any) {
        if (a.national_number > b.national_number)
          return -1;
        if (a.national_number < b.national_number)
          return 1;
        return 0;
      });
    }

  }

  public showMore() {
    this.sizeData += 10;
    this.data = this.setData.slice(0, this.sizeData);
  }

}