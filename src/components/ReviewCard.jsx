import React from "react";
import { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { reviews } from "../helpers/data";

export const ReviewCard = () => {
  const [index, setIndex] = useState(0);

  const { name, image, job, text } = reviews[index];

  const checkIndex = (value) => {
    if (value < 0) {
      return reviews.length - 1;
    }

    if (value > reviews.length - 1) {
      return 0;
    }

    return value;
  };

  const handlePrevClick = () => {
    const new_index = index - 1;

    return setIndex(checkIndex(new_index));
  };

  const handleNextClick = () => {
    const new_index = index + 1;

    return setIndex(checkIndex(new_index));
  };

  const handleSurpriseButton = () => {
    return setIndex(Math.floor(Math.random() * reviews.length));
  };

  return (
    <>
      <div className="card_container">
        <img className="card_container_img" src={image} alt={name}></img>

        <h2 className="card_container_name">{name.toUpperCase()}</h2>
        <p className="card_container_range">{job.toUpperCase()}</p>

        <p className="card_container_description">{text}</p>

        <div className="card_container_btns">
          <BsChevronLeft
            id="left"
            onClick={() => handlePrevClick()}
          ></BsChevronLeft>
          <BsChevronRight
            id="right"
            onClick={() => handleNextClick()}
          ></BsChevronRight>
        </div>

        <button
          className="card_container_suprise"
          onClick={() => handleSurpriseButton()}
        >
          Surprise Me
        </button>
      </div>
    </>
  );
};
