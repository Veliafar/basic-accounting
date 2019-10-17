import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/services/models/user.model';
import { Message } from 'src/app/shared/services/models/message.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message = new Message('', 'danger');
  user: User

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required,Validators.minLength(6)])
    })

  }

  private showMessage(text: string, type: string = 'danger')  {
    this.message = new Message( text, type);
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;
    this.userService.getUserByEmail(formData.email)
      .subscribe( (user: User) => {
        if (user) {
          if (user.password === formData.password) {

          } else {
            this.showMessage('Пароль не верный');
          }
         } else {
          this.showMessage('Юзер не существует');
        }
        
      });
    
    
  }

}
