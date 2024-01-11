// components/Navbar.tsx

import React from "react";
import styles from "../styles/Navbar.module.scss";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <Link className={styles.navLinks} href="/">Home</Link>
      <Link className={styles.navLinks} href="/about">About</Link>
    </nav>
  );
};

export default Navbar;
