import { MovieService } from 'src/app/service/movie.service';
import { Component, OnInit } from '@angular/core';
import { Movies } from 'src/app/Movies';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-livro-form',
  templateUrl: './livro-form.component.html',
  styleUrls: ['./livro-form.component.css']
})
export class LivroFormComponent implements OnInit {

  verificarStatus: boolean = true
  //true - form cadatro
  //false- form de editar

  mModal: boolean = false

  form!: FormGroup
  movie!: any

  constructor(
    private fb: FormBuilder,
    private MovieService: MovieService,
    private router: Router,
    private routeA: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    //fazendo a rotina de editar no mesmo formulário
    const id_entrada = <any>this.routeA.snapshot.params['id']
    console.log('id de entrada: ' + id_entrada)
    this.MovieService.listarUmMovie(id_entrada).subscribe({
      next: (resultado) => {
        console.log(resultado)
        this.movie = resultado
        this.updateForm(this.movie)
        this.verificarStatus = false
      },
      error: (erro) => console.error(erro),
      complete: () => console.info('Ok')
    })

    this.form = this.fb.group({
      id: [null],
      nome: [null],
      diretor: [null],
      foto: [null]
    })
  }

  salvar(){

    console.log(this.form.value)
    if(this.form.value.id){
      //nós vamos editar
      this.MovieService.editMovie(this.form.value.id, this.form.value).subscribe({
        next: (resultado) => console.log("successfully edited movie"),
        error: (erro)=> console.error(erro),
        complete: ()=>{
          console.info("Ok")
          this.router.navigate(['/home'])
        }
      })


    }else{
      //nós vamos cadastrar
      this.MovieService.addMovie(this.form.value).subscribe({
        next: (resultado) => {
         console.log("successfully registered movie")
        },
        error: (erro) => console.error(erro),
        complete: () => {
          console.info('OK')
          this.router.navigate(['/home'])
        }

      })
    }


  }

  //o patchvalue faz alteração dos inputs do formulario
  updateForm(movie: any){
    this.form.patchValue({
      id: movie.id,
      nome: movie.nome,
      diretor: movie.diretor,
      foto: movie.foto
    })
  }

  confirmarAcao(){
    this.MovieService.addMovie(this.form.value).subscribe({
      next: (resultado) => {
       console.log("successfully registered movie")
       this.mModal = false
      },
      error: (erro) => console.error(erro),
      complete: () => {
        console.info('OK')
        this.router.navigate(['/home'])
      }

    })
  }
  cancelarAcao(){
    this.mModal = false
    this.movie.value = ''
  }
  mostrarModal(){
    this.mModal = true
  }
}
