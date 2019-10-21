import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from './models/user.model';
import { FormControl } from '@angular/forms';
import { BaseApi } from '../core/base-api';

@Injectable()
export class UserService extends BaseApi {
    constructor(
        public http: HttpClient
    ) {
        super(http);
    }

    getUserByEmail(email: string): Observable<User> {
        return this.get(`users?email=${email}`)
            .map((user: User[]) => user[0] ? user[0] : undefined);
    }

    createNewUser(user: User): Observable<User> {
        return this.post('users', user);
    }



    // getUserByEmail(email: string): Observable<User> {
    //     return this.http.get(`http://localhost:3000/users?email=${email}`)
    //         .map( (user: User[]) => user[0] ? user[0] : undefined);
    // }

    // createNewUser(user: User): Observable<User> {
    //     return this.http.post('http://localhost:3000/users', user)
    //         .map((newUser: User) => newUser);
    // }
}

