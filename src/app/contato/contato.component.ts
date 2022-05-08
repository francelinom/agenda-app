import { ContatoService } from './../contato.service';
import { Component, OnInit } from '@angular/core';
import { Contato } from './contato';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css'],
})
export class ContatoComponent implements OnInit {
  constructor(private contatoService: ContatoService) {}

  ngOnInit(): void {
    const contato: Contato = new Contato();
    contato.nome = 'Francelino Silva';
    contato.email = 'francelino.silva@gmail.com';
    contato.favorito = false;

    this.contatoService.save(contato).subscribe(
      (success) => {
        console.log('gravado com sucesso!');
      },
      (error) => {
        console.log('error', error);
      },
      () => console.log('post completo!')
    );
  }
}
