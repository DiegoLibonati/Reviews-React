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
    <div className="review">
      <img
        className="review__img"
        src={review.image}
        alt={review.text}
      ></img>

      <h2 className="review__name">{review.name.toUpperCase()}</h2>
      <p className="review__range">{review.job.toUpperCase()}</p>

      <p className="review__description">{review.text}</p>

      <div className="review__btns">
        <button
          onClick={(e) => handlePrevClick(e)}
          type="button"
          aria-label="left review"
          className="review__btns__btn"
        >
          <BsChevronLeft id="left"></BsChevronLeft>
        </button>
        <button
          type="button"
          onClick={(e) => handleNextClick(e)}
          aria-label="right review"
          className="review__btns__btn"
        >
          <BsChevronRight id="right"></BsChevronRight>
        </button>
      </div>

      <button
        className="review__surprise"
        onClick={(e) => handleSurpriseButton(e)}
        aria-label="surprise me review"
      >
        Surprise Me
      </button>
    </div>
  );
};
