import { ReviewCard } from "./ReviewCard";

export const Main = (): JSX.Element => {
  return (
    <main className="main">
      <section className="container">
        <article className="container__title">
          <h1>Our Reviews</h1>
          <div></div>
        </article>

        <article className="container__review">
          <ReviewCard></ReviewCard>
        </article>
      </section>
    </main>
  );
};
