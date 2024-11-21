import { screen, render } from "@testing-library/react";

import { Main } from "./Main";

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
];

jest.mock("../constants/data.ts", () => ({
  get reviews() {
    return REVIEWS_MOCK;
  },
}));

type RenderComponent = { container: HTMLElement };

const renderComponent = (): RenderComponent => {
  const { container } = render(<Main />);

  return {
    container: container,
  };
};

test("You must render the title of the application.", () => {
  renderComponent();

  const titleApp = screen.getByRole("heading", {
    name: /our reviews/i,
  });

  expect(titleApp).toBeInTheDocument();
});

test("It should render the first review only.", () => {
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

  REVIEWS_MOCK.forEach((review) => {
    if (review.id === firstReview.id) return;

    const img = screen.queryByRole("img");
    const headingName = screen.queryByRole("heading", {
      name: review.name.toUpperCase(),
    });
    const jobName = screen.queryByRole(review.job.toUpperCase());
    const description = screen.queryByRole(review.text);

    expect(img).not.toHaveAttribute("src", review!.image);
    expect(img).not.toHaveAttribute("alt", review!.text);
    expect(headingName).not.toBeInTheDocument();
    expect(jobName).not.toBeInTheDocument();
    expect(description).not.toBeInTheDocument();
  });
});
