import ShapeBlur from "../../components/ShapeBlur/ShapeBlur";
import ShinyText from "../../components/ShinyText/ShinyText";
import DocumentTitle from "../../DocumentTitle";
import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <>
      <DocumentTitle>Home</DocumentTitle>

      <div className={css.container}>
        <div className={css.titleContainer}>
          <ShapeBlur
            variation={0}
            pixelRatioProp={window.devicePixelRatio || 1}
            shapeSize={1.6}
            roundness={0.5}
            borderSize={0.05}
            circleSize={0.2}
            circleEdge={1}
          />

          <ShinyText
            text="The Best App for your Contacts"
            disabled={false}
            speed={3}
            className={css.title}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
