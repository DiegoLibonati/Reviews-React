import { useState } from "react";

import { Review } from "../entities/entities";

import { handleIndex } from "../helpers/handleIndex";

import { reviews as reviewsArray } from "../constants/data";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export const ReviewCard = (): JSX.Element => {
  const [reviews] = useState<Review[]>(reviewsArray);
  const [index, setIndex] = useState<number>(0);

  const review = reviews[index];

  const handlePrevClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    const new_index: number = index - 1;

    return setIndex(handleIndex(new_index, reviews.length));
  };

  const handleNextClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    const new_index: number = index + 1;

    return setIndex(handleIndex(new_index, reviews.length));
  };

  const handleSurpriseButton: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    return setIndex(Math.floor(Math.random() * reviews.length));
  };

  return (
    <div className="card_container">
      <img
        className="card_container_img"
        src={review.image}
        alt={review.text}
      ></img>

      <h2 className="card_container_name">{review.name.toUpperCase()}</h2>
      <p className="card_container_range">{review.job.toUpperCase()}</p>

      <p className="card_container_description">{review.text}</p>

      <div className="card_container_btns">
        <button
          onClick={(e) => handlePrevClick(e)}
          type="button"
          aria-label="left review"
          className="card_container_btns_btn"
        >
          <BsChevronLeft id="left"></BsChevronLeft>
        </button>
        <button
          type="button"
          onClick={(e) => handleNextClick(e)}
          aria-label="right review"
          className="card_container_btns_btn"
        >
          <BsChevronRight id="right"></BsChevronRight>
        </button>
      </div>

      <button
        className="card_container_suprise"
        onClick={(e) => handleSurpriseButton(e)}
        aria-label="surprise me review"
      >
        Surprise Me
      </button>
    </div>
  );
};
