import React from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/About.module.scss"

const About: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.aboutContainer}>
      <h1>About Page</h1>
      <section className={styles["created-by-section"]}>
        <div className={styles["container"]}>
          <p>Created by Arvind Chauhan using:</p>
          <ul>
            <li>NextJS</li>
            <li>Contentful</li>
            <li>Algolia</li>
            <li>SCSS</li>
          </ul>
        </div>
      </section>
      </div>
    </div>
  );
};

export default About;
