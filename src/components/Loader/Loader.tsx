import css from './Loader.module.css'

const Loader = () => {
  return (
    <>
      <div className={css["three-body"]}>
        <div className={css["three-body__dot"]}></div>
        <div className={css["three-body__dot"]}></div>
        <div className={css["three-body__dot"]}></div>
      </div>
    </>
  );
};

export default Loader;