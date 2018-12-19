import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: "wfm-auth",
    templateUrl: 'auth.component.html'
})
export class AuthComponent implements OnInit{

    constructor(private router: Router) {}

    ngOnInit() {
        this.router.navigate(['/login']);// хз зачем, уже сделали редирект в app-routing и все работало без этого
    }
}