import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { User } from '../../../store/user.model';
import { RouterModule } from '@angular/router';
import { GenderTitlePipe } from '../../../shared/pipes/gender-title.pipe';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-user-list-item',
  imports: [RouterModule, NgOptimizedImage, GenderTitlePipe],
  templateUrl: './user-list-item.component.html',
  styleUrl: './user-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListItemComponent {
  item = input.required<User>();
}
