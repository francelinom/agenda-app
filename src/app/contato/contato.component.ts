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
  constructor(
    private contatoService: ContatoService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', Validators.email],
    });
  }

  submit() {
    console.log('formulário', this.formulario.value);
    // this.contatoService.save(contato).subscribe(
    //   (success) => {
    //     console.log('gravado com sucesso!');
    //   },
    //   (error) => {
    //     console.log('error', error);
    //   },
    //   () => console.log('post completo!')
    // );
  }
}
