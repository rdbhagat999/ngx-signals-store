import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { UserStore } from '../../store/users.store';
import { GenderTitlePipe } from '../../shared/pipes/gender-title.pipe';
import { User } from '../../store/user.model';
import { Router } from '@angular/router';
import { MetaTagService } from '../../meta-tag.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-account',
  imports: [GenderTitlePipe, NgOptimizedImage],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent implements OnInit {
  private readonly metaTagService = inject(MetaTagService);
  readonly userStore = inject(UserStore);
  readonly router = inject(Router);

  authUser: any = {};

  constructor() {
    this.metaTagService.updateTitle('Account');
    this.metaTagService.updateMetaTag(
      'description',
      'This is the account page of the Angular application.'
    );

    if (!this.userStore.authUser()) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    if (this.userStore.authUser()) {
      this.authUser = this.userStore.authUser();
    }
  }
}
