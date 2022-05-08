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
  contatos: Contato[] = [];

  constructor(
    private contatoService: ContatoService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
    });
  }

  submit() {
    const formValues = this.formulario.value;
    const contato: Contato = new Contato(formValues.nome, formValues.email);
    this.contatoService.save(contato).subscribe(
      (success) => {
        this.contatos.push(success);
      },
      (error) => {
        console.log('error', error);
      },
      () => console.log('post completo!')
    );
  }
}
