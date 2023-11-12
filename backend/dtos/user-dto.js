class UserDto {
  id;
  phoneNumber;
  activated;
  createdAt;

  constructor(user) {
    this.id = user.id;
    this.phoneNumber = user.phoneNumber;
    this.activated = user.activated;
    this.createdAt = user.createdAt;
  }
}

module.exports = UserDto;
