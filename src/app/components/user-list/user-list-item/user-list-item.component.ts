import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { User } from '../../../store/user.model';

@Component({
  selector: 'app-user-list-item',
  standalone: true,
  imports: [],
  templateUrl: './user-list-item.component.html',
  styleUrl: './user-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListItemComponent {
  item = input.required<User>();
}
