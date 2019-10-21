import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/services/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  user: User;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {



    this.form = new FormGroup({
      email: new FormControl(null,
        {
          validators: [
            Validators.required,
            Validators.email
          ],
          asyncValidators: [
            this.forbiddenEmails.bind(this)
          ]
        }),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      name: new FormControl(null, [
        Validators.required
      ]),
      agree: new FormControl(false, [
        Validators.requiredTrue
      ])
    });
  }

  onSubmit() {

    this.user = Object.assign({}, this.form.value);
    this.userService.createNewUser(this.user)
      .subscribe((newUser: User) => {
        this.router.navigate(['/login'], {
          queryParams: {
            nowCanLogin: true
          }
        });
      });
  }

  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.getUserByEmail(control.value)
        .subscribe((user: User) => {
          if (user) {
            resolve({ forbiddenEmail: true });
          } else {
            resolve(null);
          }
        });
    });
  }

}
