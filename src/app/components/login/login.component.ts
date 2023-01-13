import { Component, OnInit } from '@angular/core';
import { MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    submitted: boolean;
    password: string;
    user: string;
    constructor(
        private messageService: MessageService,
    ) { }

    ngOnInit(): void {
    }
    getLogin(){}

}
