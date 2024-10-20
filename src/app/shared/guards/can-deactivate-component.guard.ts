import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

interface ComponentCanDeactivate {
  canDeactivate(): boolean | Promise<boolean> | Observable<boolean>;
}

export const canDeactivateComponentGuard: CanDeactivateFn<
  ComponentCanDeactivate
> = (component, currentRoute, currentState, nextState) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
