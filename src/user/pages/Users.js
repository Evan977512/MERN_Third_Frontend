import React, { useEffect, useState } from "react";

import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import UsersList from "../components/UsersList";
import { useHttpClient } from "../../shared/hooks/http-hook";
// https://w0.peakpx.com/wallpaper/285/684/HD-wallpaper-fat-yoshi.jpg
const img = "../../img/fat_yoshi.jpeg";

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5001/api/users`);

        setLoadedUsers(responseData.users);
      } catch (error) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
