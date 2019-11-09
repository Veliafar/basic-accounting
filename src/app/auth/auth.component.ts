import { Component, OnInit, HostBinding } from "@angular/core";
import { fadeStateTrigger } from '../shared/components/animations/fade.animation';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    animations: [fadeStateTrigger]
})
export class AuthComponent implements OnInit {

    @HostBinding('@fade') animation = true;

    constructor() {}

    ngOnInit() {

    }

}