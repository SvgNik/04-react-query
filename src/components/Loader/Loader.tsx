import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <p>Loading movies, please wait...</p>
    </div>
  );
};

export default Loader;
