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
