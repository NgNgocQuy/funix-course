"use strict";
class User {
  constructor(firstName, lastName, username, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
  }
}

class SettingUser {
  constructor(username, pageSize, category) {
    this.category = category;
    this.pageSize = pageSize;
    this.username = username;
  }
}
