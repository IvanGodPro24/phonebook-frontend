import css from "./CustomLoader.module.css";

const CustomLoader = () => {
  return (
    <div className={css["dot-spinner"]}>
      <div className={css["dot-spinner__dot"]}></div>
      <div className={css["dot-spinner__dot"]}></div>
      <div className={css["dot-spinner__dot"]}></div>
      <div className={css["dot-spinner__dot"]}></div>
      <div className={css["dot-spinner__dot"]}></div>
      <div className={css["dot-spinner__dot"]}></div>
      <div className={css["dot-spinner__dot"]}></div>
      <div className={css["dot-spinner__dot"]}></div>
    </div>
  );
};

export default CustomLoader;
