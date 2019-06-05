import { Component, OnInit } from '@angular/core';
import { IColor } from '../color';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  colors:IColor[];
  image:string;

  constructor(private http:HttpService,private router: Router) { }

  ngOnInit() {
    this.colors=this.http.getColors();
    this.image=this.http.img;

    if( !this.colors || !this.image){
      this.back();
    }
  }

  back():void{
    this.router.navigate(['']);
  }
 
}
