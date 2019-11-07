import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.less']
})
export class NotFoundComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  moveToLogin() {
  
    this.router.navigate(['']);
  }

}
