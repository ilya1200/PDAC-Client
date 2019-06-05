import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IColor } from './color';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private serverUrl = 'api/';
  private colors:IColor[];
  private _img: string;
  public get img(): string {
    return this._img;
  }


  constructor(private http: HttpClient,
    private router: Router) { }

  uploadImage(image:string):void{
    this._img=image;
    this.http.post<IColor[]>(this.serverUrl+'UploadImage', {
      img: image
    }).pipe(
      catchError(this.handleError)
    ).subscribe(
      response => {
        this.colors = response;
        this.router.navigate(['result'])},
      error =>  console.log("ERROR:"+<any>error)
    )
  }

  getColors():IColor[]{
    return this.colors;
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Server returned code: ${err.status},\n error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
