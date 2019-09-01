import { Component, OnInit } from '@angular/core';
import { BienService } from '../bien.service';

@Component({
  selector: 'bien-list',
  templateUrl: './bien-list.component.html',
  styleUrls: ['./bien-list.component.css']
})
export class BienListComponent implements OnInit {

  public bienes:Array<any>;

  constructor(private bienService: BienService) { }

  ngOnInit() {
    this.bienService.getAll().subscribe(c => this.bienes = c, this.handleError);
  }

  private handleError(e){
    console.log(e);
  }

}
