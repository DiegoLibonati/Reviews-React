import React from "react";
import { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { reviews as reviewsArray } from "../constants/data";
import { Review } from "../entities/entities";

export const ReviewCard = (): JSX.Element => {
  const [index, setIndex] = useState<number>(0);
  const [reviews] = useState<Review[]>(reviewsArray)

  const checkIndex: (value: number) => number = (value) => {
    if (value < 0) {
      return reviews.length - 1;
    }

    if (value > reviews.length - 1) {
      return 0;
    }

    return value;
  };

  const handlePrevClick: React.MouseEventHandler<SVGElement> = () => {
    const new_index: number = index - 1;

    return setIndex(checkIndex(new_index));
  };

  const handleNextClick: React.MouseEventHandler<SVGElement> = () => {
    const new_index: number = index + 1;

    return setIndex(checkIndex(new_index));
  };

  const handleSurpriseButton: React.MouseEventHandler<HTMLButtonElement>  = () => {
    return setIndex(Math.floor(Math.random() * reviews.length));
  };

  return (
      <div className="card_container">
        <img className="card_container_img" src={reviews[index].image} alt={reviews[index].text}></img>

        <h2 className="card_container_name">{reviews[index].name.toUpperCase()}</h2>
        <p className="card_container_range">{reviews[index].job.toUpperCase()}</p>

        <p className="card_container_description">{reviews[index].text}</p>

        <div className="card_container_btns">
          <BsChevronLeft
            id="left"
            onClick={(e) => handlePrevClick(e)}
          ></BsChevronLeft>
          <BsChevronRight
            id="right"
            onClick={(e) => handleNextClick(e)}
          ></BsChevronRight>
        </div>

        <button
          className="card_container_suprise"
          onClick={(e) => handleSurpriseButton(e)}
        >
          Surprise Me
        </button>
      </div>
  );
};
