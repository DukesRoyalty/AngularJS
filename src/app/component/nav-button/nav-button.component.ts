import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav-button',
  templateUrl: './nav-button.component.html',
  styleUrls: ['./nav-button.component.css']
})
export class NavButtonComponent implements OnInit {

  @Input()
  icon: string = '';

  @Input()
  url: string;

  active = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Determine if this nav button's route is active
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationStart)
      )
      .subscribe((event: NavigationStart) =>
        this.active = (event.url === `/${this.url}`)
      );
  }

}
