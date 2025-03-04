import React from "react";
import styles from "../styles/_layout/_grid.module.scss"; // Import the SCSS as CSS Modules

const ResponsiveGridExample = () => {
  return (
    <section className={styles.grid_test}>
      <div className={styles.row}>
        <div className={styles.col_1_of_2}>Col 1 of 2</div>
        <div className={styles.col_1_of_2}>Col 1 of 2</div>
      </div>
      <div className={styles.row}>
        <div className={styles.col_1_of_3}>Col 1 of 3</div>
        <div className={styles.col_1_of_3}>Col 1 of 3</div>
        <div className={styles.col_1_of_3}>Col 1 of 3</div>
      </div>
      <div className={styles.row}>
        <div className={styles.col_1_of_3}>Col 1 of 3</div>
        <div className={styles.col_2_of_3}>Col 2 of 3</div>
      </div>
      <div className={styles.row}>
        <div className={styles.col_1_of_4}>Col 1 of 4</div>
        <div className={styles.col_1_of_4}>Col 1 of 4</div>
        <div className={styles.col_1_of_4}>Col 1 of 4</div>
        <div className={styles.col_1_of_4}>Col 1 of 4</div>
      </div>
      <div className={styles.row}>
        <div className={styles.col_1_of_4}>Col 1 of 4</div>
        <div className={styles.col_1_of_4}>Col 1 of 4</div>
        <div className={styles.col_2_of_4}>Col 2 of 4</div>
      </div>
      <div className={styles.row}>
        <div className={styles.col_1_of_4}>Col 1 of 4</div>
        <div className={styles.col_3_of_4}>Col 3 of 4</div>
      </div>
    </section>
  );
};

export default ResponsiveGridExample;
