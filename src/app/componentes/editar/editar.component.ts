import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/service/movie.service';
import { Component, OnInit } from '@angular/core';
import { Movies } from 'src/app/Movies';
import { FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  movies!: any

  constructor(private MovieService: MovieService, private router: Router, private routeA: ActivatedRoute) { }

  ngOnInit(): void {
    const id_entrada = <any>this.routeA.snapshot.params['id']
    console.log('id de entrada: ' + id_entrada)
    this.MovieService.listarUmMovie(id_entrada).subscribe({
      next: (resultado) => {
        console.log(resultado)
        this.movies = resultado
      },
      error: (erro) => console.error(erro),
      complete: () => console.info('tarefa encontrada')
    })
  }
  editar(){
    this.MovieService.editMovie(this.movies.id, this.movies).subscribe({
      next: (resultado) => {
        console.log("editado com sucesso")
      },
      error: (erro) => console.error(erro),
      complete: () => console.info('tarefa editada')
    })
    this.router.navigate(['/lista'])

  }

}
