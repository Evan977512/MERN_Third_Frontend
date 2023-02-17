import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Seoul",
    description: "Seoul is the capital city of the South Korea",
    imageUrl:
      "https://www.travelandleisure.com/thmb/r97Wg-kYlXwdQC_GhLrrQZgvE_U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-seoul-city-skyline-south-korea-SEOULRN0123-edcf7ba4a54d4026ab679bca83fab972.jpg",
    address: "대한민국 서울특별시 용산구 청파로 378",
    location: {
      lat: 37.5535284,
      lng: 126.9652125,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Seoul",
    description: "Seoul is the capital city of the South Korea",
    imageUrl:
      "https://www.travelandleisure.com/thmb/r97Wg-kYlXwdQC_GhLrrQZgvE_U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-seoul-city-skyline-south-korea-SEOULRN0123-edcf7ba4a54d4026ab679bca83fab972.jpg",
    address: "대한민국 서울특별시 용산구 청파로 378",
    location: {
      lat: 37.5535284,
      lng: 126.9652125,
    },
    creator: "u2",
  },
];

/**
 * @returns user places
 */
const UserPlaces = () => {
  /**
   * useParams & filter allows to filter user id and show corresponding places
   */
  const userId = useParams().userId;
  const loadedPlace = DUMMY_PLACES.filter((place) => place.creator === userId);
  // console.log(loadedPlace);

  return <PlaceList items={loadedPlace} />;
};

export default UserPlaces;
