import { ContatoDetalheComponent } from './../contato-detalhe/contato-detalhe.component';
import { ContatoService } from './../contato.service';
import { Component, OnInit } from '@angular/core';
import { Contato } from './contato';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css'],
})
export class ContatoComponent implements OnInit {
  formulario!: FormGroup;
  contatos!: Contato[];
  colunas = ['foto', 'id', 'nome', 'email', 'favorito'];
  totalElementos = 0;
  pagina: number = 0;
  tamanho: number = 10;
  pageSizeOptions: number[] = [10];

  constructor(
    private contatoService: ContatoService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.montarForm();
    this.listarContatos(this.pagina, this.tamanho);
  }

  montarForm() {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
    });
  }

  listarContatos(pagina = 0, tamanho = 10) {
    this.contatoService.list(pagina, tamanho).subscribe((resp) => {
      this.contatos = resp.content ? resp.content : [];
      this.totalElementos = resp.totalElements ? resp.totalElements : 0;
      this.pagina = resp.number ? resp.number : 0;
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

  uploadFoto(event: any, contato: any) {
    const files = event.target.files;
    if (files) {
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append('foto', foto);
      this.contatoService.upload(contato, formData).subscribe((resp) => {
        this.listarContatos();
      });
    }
  }

  visualizarContato(contato: Contato) {
    this.dialog.open(ContatoDetalheComponent, {
      width: '400px',
      height: '450px',
      data: contato,
    });
  }

  paginar(event: PageEvent) {
    this.pagina = event.pageIndex;
    this.listarContatos(this.pagina, this.tamanho);
  }
}
