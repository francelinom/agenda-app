import { ContatoService } from './../contato.service';
import { Component, OnInit } from '@angular/core';
import { Contato } from './contato';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css'],
})
export class ContatoComponent implements OnInit {
  formulario!: FormGroup;
  contatos!: Contato[];
  colunas = ['id', 'nome', 'email', 'favorito'];

  constructor(
    private contatoService: ContatoService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.montarForm();
    this.listarContatos();
  }

  montarForm() {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
    });
  }

  listarContatos() {
    this.contatoService.list().subscribe((resp) => {
      this.contatos = resp;
      console.log('this.contatos ', this.contatos);
    });
  }

  submit() {
    const formValues = this.formulario.value;
    const contato: Contato = new Contato(formValues.nome, formValues.email);
    this.contatoService.save(contato).subscribe(
      (resp) => {
        let lista: Contato[] = [...this.contatos, resp];
        this.contatos = lista;
      },
      (error) => {
        console.log('error', error);
      },
      () => console.log('post completo!')
    );
  }

  favoritar(contato: Contato) {
    this.contatoService.favourite(contato).subscribe((resp) => {
      contato.favorito = !contato.favorito;
    });
  }
}
