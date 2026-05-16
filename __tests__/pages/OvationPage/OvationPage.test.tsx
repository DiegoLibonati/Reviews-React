import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import OvationPage from "@/pages/OvationPage/OvationPage";

import { mockReviews } from "@tests/__mocks__/reviews.mock";

jest.mock("@/constants/reviews", () => {
  const mockData = jest.requireActual("@tests/__mocks__/reviews.mock");
  const { mockReviews } = mockData;

  return {
    __esModule: true,
    default: mockReviews,
  };
});

const renderPage = (): RenderResult => render(<OvationPage />);

describe("OvationPage", () => {
  describe("rendering", () => {
    it("should render the page title", () => {
      renderPage();
      expect(screen.getByRole("heading", { level: 1, name: "Our Reviews" })).toBeInTheDocument();
    });

    it("should render the main landmark", () => {
      renderPage();
      expect(screen.getByRole("main")).toBeInTheDocument();
    });

    it("should render the first review name", () => {
      renderPage();
      expect(
        screen.getByRole("heading", { level: 2, name: mockReviews[0]!.name.toUpperCase() })
      ).toBeInTheDocument();
    });

    it("should render the first review image", () => {
      renderPage();
      expect(screen.getByAltText(`Photo of ${mockReviews[0]!.name}`)).toBeInTheDocument();
    });

    it("should render the previous review button", () => {
      renderPage();
      expect(screen.getByRole("button", { name: "Previous review" })).toBeInTheDocument();
    });

    it("should render the next review button", () => {
      renderPage();
      expect(screen.getByRole("button", { name: "Next review" })).toBeInTheDocument();
    });

    it("should render the surprise me button", () => {
      renderPage();
      expect(screen.getByRole("button", { name: "Show a random review" })).toBeInTheDocument();
    });
  });
});
