import React from "react";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroHeader}>
              OUR MISSION IS TO
            </h1>
            <h1 className={styles.heroHeader}>
              MAKE TRADING EASY
            </h1>
            <p className={styles.heroSubheader}>
              Invest with confidence with our AI-powered automated trading
              platform.
            </p>
            <button className={styles.heroButton}>Get Started</button>
          </div>
          <div className={styles.right}>
            <div className={styles.sell}><p>Sell</p></div>
            <div className={styles.heroImage}>
              <img
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Hero image"
              />
            </div>
            <div className={styles.buy}><p>Buy</p></div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomWrapper}>
          <h3>Truested by over 10,000 Traders</h3>
        </div> 
      </div>
    </>
  );
};

export default HeroSection;
