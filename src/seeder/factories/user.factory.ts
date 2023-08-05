import { define } from 'typeorm-seeding';
import { User } from '../../../src/user/entities/user.entity';
import { EMAIL, EMPLYEE_ID, LASTNAME, ROLE, USERNAME, USER_ID, PASSWORD } from '../../../constants';

define(User, () => {
  const user = new User();
  (user.username = USERNAME),
    (user.employeeId = EMPLYEE_ID),
    (user.userId = USER_ID),
    (user.email = EMAIL),
    (user.lastName = LASTNAME),
    (user.role = ROLE),
    (user.password = PASSWORD);
  return user;
});
