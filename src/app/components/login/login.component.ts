import { Component, OnInit } from '@angular/core';
import { MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    /******** variables********** */
    submitted: boolean;
    password: string;
    user: string;
    form_codigo: number;
    /******** modales ******** */
    dialogCodigo: boolean;

    constructor(
        private messageService: MessageService,
    ) { }

    ngOnInit(): void {
    }
    getLogin(){}
    sendCode(){}
}
