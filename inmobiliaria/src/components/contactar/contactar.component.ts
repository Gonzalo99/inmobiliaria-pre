import { Component } from '@angular/core';
import { Email } from '../../models/email';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'contactar',
  templateUrl: './contactar.component.html',
  styleUrls: ['./contactar.component.css'],
  providers: [ EmailService ]
})

export class ContactarComponent {

  public email: Email;
  public correct_email: boolean; //Mensajo enviado correcto o no
  public termino;

  constructor(private _emailService: EmailService) {

    this.email = new Email("", "", "", "", "");

  }

  ngOnInit() {
      
  }

  //Metodo que envia un email
  sendEmail() {

    this._emailService.setEmail(this.email).subscribe(
      response => {
        if(response['code'] == 200){

          console.log('Email enviado con exito ');

        }else{

          console.log('Fallo al enviar email');
        
        }
      },
      error => {
        console.log(<any>error);
      }
    );

    this.cleanValues();

    this.correct_email = true;

  }

  //Metodo que limpia los valores del formulario
  cleanValues() {

    this.email.nombre = "";
    this.email.apellidos = "";
    this.email.asunto = "";
    this.email.correo = "";
    this.email.mensaje = "";

  }

}