import { Pipe, PipeTransform } from '@angular/core';
import { Role } from './models/User.model'

@Pipe({
  name: 'roleToString'
})
export class RoleToStringPipe implements PipeTransform {
  transform(value: Role ): string {
    switch (value) {
      case Role.ADMIN:
        return 'Admin';
      case Role.USER:
        return 'User';
      case Role.PARTICIPANT:
        return 'Participant';
      case Role.SPECTATOR:
        return 'Spectator';
      case Role.JURY:
        return 'Jury';
      case Role.DIRECTOR:
        return 'Director';
      default:
        return '';
    }
  }
}
