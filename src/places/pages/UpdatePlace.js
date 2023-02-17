import React from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators";

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

const UpdatePlace = () => {
  const placeId = useParams().placeId;

  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );
  }

  return (
    <form>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE]}
        errorText="Place enter a valid title!"
        onInput={() => {}}
        value={identifiedPlace.title}
        valid={true}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Place enter a valid description! (min 5 characters)"
        onInput={() => {}}
        value={identifiedPlace.description}
        valid={true}
      />
      <Button type="submit" disabled={true}>
        Update Place
      </Button>
    </form>
  );
};

export default UpdatePlace;
