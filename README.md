# Reviews React

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install node_modules with yarn install
4. Use yarn dev or start (depends package.json) to run the app page

## Description

I made a web application that allows you to see different reviews, this web application allowed me to learn how to make this kind of reviews/slides with next, prev and with a `Surprise Me` button that basically looks for a random review to show. In this case you see an image, the name, the role and a brief description.

## Technologies used

1. React JS
2. Typescript
3. CSS3

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/Reviews-React`](https://www.diegolibonati.com.ar/#/project/Reviews-React)

## Video

https://user-images.githubusercontent.com/99032604/198900166-c35c7979-9859-4537-ae7f-3af2bd0bc712.mp4

## Documentation

The `App.tsx` file will render the `Main` component:

```
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement
);
root.render(
  <React.StrictMode>
   <App></App>
  </React.StrictMode>
);
```

The `Main.tsx` file will render the `ReviewCard.tsx` component but it will also contain all the elements that make up the application:

```
import React from "react";
import { ReviewCard } from "./ReviewCard";

export const Main = (): JSX.Element => {
  return (
      <main>
        <section className="cards_container">
          <article className="cards_container_title">
            <h1>Our Reviews</h1>
            <div></div>
          </article>

          <article className="cards_container_card">
            <ReviewCard></ReviewCard>
          </article>
        </section>
      </main>
  );
};
```

The `ReviewCard.tsx` component will get the reviews through `constants/data.ts`, this last ts file contains:

```
import { Review } from "../entities/entities";

export const reviews: Review[] = [
  {
    id: 1,
    name: "susan smith",
    job: "web developer",
    image:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg",
    text: "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",
  },
  {
    id: 2,
    name: "anna johnson",
    job: "web designer",
    image:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883409/person-2_np9x5l.jpg",
    text: "Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.",
  },
  {
    id: 3,
    name: "peter jones",
    job: "intern",
    image:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg",
    text: "Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag.",
  },
  {
    id: 4,
    name: "bill anderson",
    job: "the boss",
    image:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883423/person-4_t9nxjt.jpg",
    text: "Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ",
  },
];
```

Inside the `ReviewCard.tsx` component we have the logic of the application, as it is an old project the logic is not inside a CustomHook as it should be:

```
import React from "react";
import { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { reviews as reviewsArray } from "../constants/data";
import { Review } from "../entities/entities";
import { handleIndex } from "../helpers/handleIndex";

export const ReviewCard = (): JSX.Element => {
  const [index, setIndex] = useState<number>(0);
  const [reviews] = useState<Review[]>(reviewsArray)

  const handlePrevClick: React.MouseEventHandler<SVGElement> = () => {
    const new_index: number = index - 1;

    return setIndex(handleIndex(new_index));
  };

  const handleNextClick: React.MouseEventHandler<SVGElement> = () => {
    const new_index: number = index + 1;

    return setIndex(handleIndex(new_index));
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
```
