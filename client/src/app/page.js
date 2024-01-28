import OngoingWidget from "../Components/OngoingWidget";
import styles from "../styles/Home.module.scss";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ongoings = [{}];

function checkToken() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  console.log(token);
  if (!token) {
    redirect("/login");
  }
}

export default function Home() {
  checkToken();
  return (
    <main id={styles.home}>
      <div className={styles.header}>
        <div className={styles.localTime}>Friday, Sat Jan 27</div>
        <button className={styles.singOutButton}>Sign Out</button>
      </div>
      <div className={styles.ongoingPledges}>
        <div className={styles.title}>Ongoing Pledges</div>
        <div className={styles.wrapper}>
          <OngoingWidget
            content={{
              title: "Zoom Meeting at 2 with Microsoft",
              detail:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
              date: "2024-01-29 at 2:00 PM",
              amount: 10,
              link: "https://google.com",
              priority: 2,
              location: "433 Harlem Ave Toronto, ON",
            }}

            // key={0}
          />
          <OngoingWidget
            content={{
              title: "Zoom Meeting at 2 with Microsof",
              detail:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
              date: "2024-01-29 at 2:00 PM",
              amount: 10,
              link: "https://google.com",
              priority: 0,
              location: "433 Harlem Ave Toronto, ON",
            }}

            // key={0}
          />
          <OngoingWidget
            content={{
              title: "Zoom Meeting at 2 with Microsof",
              detail:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
              date: "2024-01-29 at 2:00 PM",
              amount: 10,
              link: "https://google.com",
              priority: 1,
              location: "433 Harlem Ave Toronto, ON",
            }}

            // key={0}
          />
        </div>
      </div>
    </main>
  );
}
