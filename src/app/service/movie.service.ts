import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movies } from 'src/app/Movies'

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly API = "http://localhost:3000/Movies"

  constructor(private http: HttpClient) { }

  listar():Observable<any>{
    return this.http.get<any>(this.API)
  }
  listarUmMovie(id:any){
    return this.http.get(this.API + '/' + id)
  }
  addMovie(movies: Movies){
    return this.http.post(this.API, movies)
  }
  deletaMovie(id:any){
    return this.http.delete(this.API + '/' + id)
  }
  editMovie(id:any, movie:Movies){
    return this.http.put(this.API + '/' + id, movie)
  }

}
