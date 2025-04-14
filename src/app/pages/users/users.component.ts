import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserListComponent } from '../../components/user-list/user-list.component';

@Component({
    selector: 'app-users',
    imports: [UserListComponent],
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {}
