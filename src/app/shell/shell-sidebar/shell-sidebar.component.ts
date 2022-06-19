import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../shared/auth/user.model';
import {Subscription} from 'rxjs';
import {AuthService} from '../../shared/auth/auth.service';

@Component({
  selector: 'bg-shell-sidebar',
  templateUrl: './shell-sidebar.component.html',
  styleUrls: ['./shell-sidebar.component.scss']
})
export class ShellSidebarComponent implements OnInit, OnDestroy {
  curUser: User;
  userSub: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      if (!user){
        return;
      }
      if (user) {
        this.curUser = user;
      }
    });
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
