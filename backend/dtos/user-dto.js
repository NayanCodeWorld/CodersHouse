class UserDto {
  id;
  name;
  avatar;
  phoneNumber;
  activated;
  createdAt;

  constructor(user) {
    this.id = user.id;
    this.phoneNumber = user.phoneNumber;
    this.activated = user.activated;
    this.createdAt = user.createdAt;
    this.name = user.name;
    this.avatar = user.avatar ? `${process.env.BASE_URL}${user.avatar}` : null;
  }
}

module.exports = UserDto;
