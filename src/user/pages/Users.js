import React from "react";

import UsersList from "../components/UsersList";

const img = "../../../public/img/fat_yoshi.jepg";

const Users = () => {
  const USERS = [{ id: "u1", name: "Evan Kim", image: "https://w0.peakpx.com/wallpaper/285/684/HD-wallpaper-fat-yoshi.jpg", places: 3 }];

  return <UsersList items={USERS} />;
};

export default Users;
