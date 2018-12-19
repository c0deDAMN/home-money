import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';
import { Message } from 'src/app/shared/models/message.module';

@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(text: string, type: string = 'danger') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;

    // сделать кнопку неактивной пока не валидируется форма
    this.userService.getUserByEmail(formData.email)
      .subscribe((user: User) => {
        if (user[0]) {    //костыль с индексом 
          if (user[0].password === formData.password) {
            //logic
          } else {
            this.showMessage('Пароль не верный')
          }
        } else {
          this.showMessage('Такого пользователя не существует');
        }
      });
  }

}
