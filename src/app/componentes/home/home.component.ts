import { Component, OnInit } from '@angular/core';
import { MovieService } from './../../service/movie.service';
import {Movies} from 'src/app/Movies'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  isModal: boolean = false
  movieExcluir!: any

  movies!: Movies[]
  constructor(private MovieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.listarMovies()
  }
  listarMovies(){
    this.MovieService.listar().subscribe(resultado=>{
      console.log(resultado)
      this.movies = <any>resultado
    })
  }
  excluir(id:any){

  }
  confirmarAcao(){
    this.MovieService.deletaMovie(this.movieExcluir).subscribe({
      next: (resultado)=>{
        console.log('movie deleted with success')
        this.listarMovies()
        this.isModal = false
      },
      error: (erro)=> console.error(erro),
      complete: () => console.info("ok")

    })
  }
  cancelarAcao(){
    this.isModal = false

  }

  editar(id:any){
    this.router.navigate(['/edit/' + id])
  }

  mostrarModal(id: any){
    this.isModal = true
    this.movieExcluir = id
  }
}

