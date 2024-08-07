import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Price Tracking App</h1>
      <p>
        This is the initial stage for the creation of the Price Comparison App.
        An app meant to log in user inserted prices for user given items. This
        app will keep track and show historical prices through various charts.
        Click the button below to be taken to your list of items.
      </p>
      <Link href={"/tracking"}>
        <button>Get Started Here</button>
      </Link>
    </main>
  );
}
