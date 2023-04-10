import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

/**
 * @returns user places
 */
const UserPlaces = () => {
  const [loadedPlace, setLoadedPlace] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  /**
   * useParams & filter allows to filter user id and show corresponding places
   */
  const userId = useParams().userId;

  const PlaceDeletedHandler = (deletedPlaceId) => {
    setLoadedPlace((prevPlace) => prevPlace.filter((place) => place.id !== deletedPlaceId));
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5001/api/places/user/${userId}`);
        setLoadedPlace(responseData.places);
      } catch (error) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlace && <PlaceList items={loadedPlace} onDeletePlace={PlaceDeletedHandler} />}
    </React.Fragment>
  );
};

export default UserPlaces;
