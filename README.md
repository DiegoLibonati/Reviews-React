# Reviews-App-Page

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install node_modules with `npm install`
4. Use `npm start` to execute

## Description

I made a web application that allows you to see different reviews, this web application allowed me to learn how to make this kind of reviews/slides with next, prev and with a `Surprise Me` button that basically looks for a random review to show. In this case you see an image, the name, the role and a brief description.

## Technologies used

1. React JS
2. CSS3

## Galery

![Reviews-app-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/React/Imagenes/reactreviews-0.jpg)

![Reviews-app-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/React/Imagenes/reactreviews-1.jpg)

![Reviews-app-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/React/Imagenes/reactreviews-2.jpg)

## Portfolio Link

`https://diegolibonati.github.io/DiegoLibonatiWeb/#/projects?q=Reviews%20App%20Page`

## Video

https://user-images.githubusercontent.com/99032604/198900166-c35c7979-9859-4537-ae7f-3af2bd0bc712.mp4

## Documentation

The `app.js` file will render the `Main` component:

```
import "./App.css";
import { Main } from "./components/Main";

function App() {
  return (
    <>
      <Main></Main>
    </>
  );
}

export default App;

```

The `Main.jsx` file will render the `ReviewCard.jsx` component but it will also contain all the elements that make up the application:

```
import React from "react";
import { ReviewCard } from "./ReviewCard";

export const Main = () => {
  return (
    <>
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
    </>
  );
};
```

The `ReviewCard.jsx` component will get the reviews through `helpers/data.js`, this last js file contains:

```
export const reviews = [
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

Inside the `ReviewCard.jsx` component we have the logic of the application, as it is an old project the logic is not inside a CustomHook as it should be:

```
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

```

Basically we set a state in that it will be called index that will be by default in 0. We use the array that we obtain of helpers to obtain the information of the element with the index of the state, that is to say, `reviews[index]`. With the functions `handlePrevClick`, `handleNextClick` and `handleSurpriseButton` will be in charge of modifying that index depending on which button is touched. Then in the function `checkIndex` it will be checked in which position is the index so that the application does not break, although this can be done in a useEffect checking every time that the state changes:

```
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
```
