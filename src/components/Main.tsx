import { ReviewCard } from "./ReviewCard";

export const Main = (): JSX.Element => {
  return (
    <main className="main-app">
      <section className="reviews-page">
        <article className="reviews-page__header">
          <h1 className="reviews-page__header-title">Our Reviews</h1>
          <div className="reviews-page__header-separator"></div>
        </article>

        <article className="review-wrapper">
          <ReviewCard></ReviewCard>
        </article>
      </section>
    </main>
  );
};
