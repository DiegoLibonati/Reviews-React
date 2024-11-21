import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { ReviewCard } from "./ReviewCard";

const REVIEWS_MOCK = [
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
];

jest.mock("../constants/data.ts", () => ({
  get reviews() {
    return REVIEWS_MOCK;
  },
}));

type RenderComponent = { container: HTMLElement };

const renderComponent = (): RenderComponent => {
  const { container } = render(<ReviewCard />);

  return {
    container: container,
  };
};

test("It should render the profile image, name, job, description and the left, right and surprise buttons.", () => {
  const firstReview = REVIEWS_MOCK[0];

  renderComponent();

  const img = screen.getByRole("img");
  const headingName = screen.getByRole("heading", {
    name: firstReview.name.toUpperCase(),
  });
  const jobName = screen.getByText(firstReview.job.toUpperCase());
  const description = screen.getByText(firstReview.text);
  const buttonLeftReview = screen.getByRole("button", {
    name: /left review/i,
  });
  const buttonRightReview = screen.getByRole("button", {
    name: /right review/i,
  });
  const buttonSurpriseMe = screen.getByRole("button", {
    name: /surprise me review/i,
  });

  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute("src", firstReview.image);
  expect(img).toHaveAttribute("alt", firstReview.text);
  expect(headingName).toBeInTheDocument();
  expect(jobName).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(buttonLeftReview).toBeInTheDocument();
  expect(buttonRightReview).toBeInTheDocument();
  expect(buttonSurpriseMe).toBeInTheDocument();
});

test("It should render the next review when you tap the button to advance to the right.", async () => {
  const firstReview = REVIEWS_MOCK[0];
  const nextReview = REVIEWS_MOCK[1];

  renderComponent();

  const firstHeadingName = screen.getByRole("heading", {
    name: firstReview.name.toUpperCase(),
  });
  const secondHeadingName = screen.queryByRole("heading", {
    name: nextReview.name.toUpperCase(),
  });

  expect(firstHeadingName).toBeInTheDocument();
  expect(secondHeadingName).not.toBeInTheDocument();

  const buttonRightReview = screen.getByRole("button", {
    name: /right review/i,
  });

  await user.click(buttonRightReview);

  const img = screen.getByRole("img");
  const headingName = screen.getByRole("heading", {
    name: nextReview.name.toUpperCase(),
  });
  const jobName = screen.getByText(nextReview.job.toUpperCase());
  const description = screen.getByText(nextReview.text);

  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute("src", nextReview.image);
  expect(img).toHaveAttribute("alt", nextReview.text);
  expect(headingName).toBeInTheDocument();
  expect(jobName).toBeInTheDocument();
  expect(description).toBeInTheDocument();
});

test("It should render the previous review when you tap the button to advance to the left.", async () => {
  const firstReview = REVIEWS_MOCK[0];
  const prevReview = REVIEWS_MOCK[2];

  renderComponent();

  const firstHeadingName = screen.getByRole("heading", {
    name: firstReview.name.toUpperCase(),
  });
  const secondHeadingName = screen.queryByRole("heading", {
    name: prevReview.name.toUpperCase(),
  });

  expect(firstHeadingName).toBeInTheDocument();
  expect(secondHeadingName).not.toBeInTheDocument();

  const buttonLeftReview = screen.getByRole("button", {
    name: /left review/i,
  });

  await user.click(buttonLeftReview);

  const img = screen.getByRole("img");
  const headingName = screen.getByRole("heading", {
    name: prevReview.name.toUpperCase(),
  });
  const jobName = screen.getByText(prevReview.job.toUpperCase());
  const description = screen.getByText(prevReview.text);

  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute("src", prevReview.image);
  expect(img).toHaveAttribute("alt", prevReview.text);
  expect(headingName).toBeInTheDocument();
  expect(jobName).toBeInTheDocument();
  expect(description).toBeInTheDocument();
});

test("It should render a random review when the 'Surprise Me' button is tapped.", async () => {
  const firstReview = REVIEWS_MOCK[0];

  renderComponent();

  const firstHeadingName = screen.getByRole("heading", {
    name: firstReview.name.toUpperCase(),
  });
  expect(firstHeadingName).toBeInTheDocument();

  REVIEWS_MOCK.forEach((review) => {
    if (review.id === firstReview.id) return;
    const headingReview = screen.queryByRole("heading", {
      name: review.name.toUpperCase(),
    });

    expect(headingReview).not.toBeInTheDocument();
  });

  const buttonSurpriseMe = screen.getByRole("button", {
    name: /surprise me review/i,
  });

  await user.click(buttonSurpriseMe);

  const reviewName = screen.getByRole("heading");
  const reviewJob = screen
    .getAllByRole("paragraph")
    .find((element) => element.classList.contains("card_container_range"));

  const review = REVIEWS_MOCK.find(
    (r) =>
      r.name.toUpperCase() === reviewName?.textContent!.toUpperCase() &&
      r.job.toUpperCase() === reviewJob?.textContent!.toUpperCase()
  );

  const reviewImg = screen.getByRole("img");
  const reviewDescription = screen.getByText(review!.text);

  expect(reviewImg).toBeInTheDocument();
  expect(reviewImg).toHaveAttribute("src", review!.image);
  expect(reviewImg).toHaveAttribute("alt", review!.text);
  expect(reviewName).toBeInTheDocument();
  expect(reviewJob).toBeInTheDocument();
  expect(reviewDescription).toBeInTheDocument();

  REVIEWS_MOCK.forEach((r) => {
    if (r.id === review!.id) return;

    const img = screen.queryByRole("img");
    const headingName = screen.queryByRole("heading", {
      name: r.name.toUpperCase(),
    });
    const jobName = screen.queryByRole(r.job.toUpperCase());
    const description = screen.queryByRole(r.text);

    expect(img).not.toHaveAttribute("src", r.image);
    expect(img).not.toHaveAttribute("alt", r.text);
    expect(headingName).not.toBeInTheDocument();
    expect(jobName).not.toBeInTheDocument();
    expect(description).not.toBeInTheDocument();
  });
});
