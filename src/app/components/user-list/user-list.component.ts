import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { UserListItemComponent } from './user-list-item/user-list-item.component';
import { JsonPipe } from '@angular/common';
import { UserStore } from '../../store/users.store';

@Component({
    selector: 'app-user-list',
    imports: [JsonPipe, UserListItemComponent],
    providers: [],
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {
  readonly userStore = inject(UserStore);

  constructor() {
    const query = this.userStore.filter.query;
    // 👇 Re-fetch users whenever the value of query signal changes.
    this.userStore.loadByQuery(query);
  }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.userStore.updateQuery('sophiab');
    // }, 5000);
  }
}
