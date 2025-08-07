import ShapeBlur from "../../components/ShapeBlur/ShapeBlur";
import ShinyText from "../../components/ShinyText/ShinyText";
import DocumentTitle from "../../DocumentTitle";
import useDevice from "../../hooks/useDevice";

const HomePage = () => {
  const { isMinMobile } = useDevice();

  return (
    <>
      <DocumentTitle>Home</DocumentTitle>

      <div className="relative flex justify-center items-center min-h-[90vh] p-8">
        <div className="w-full h-[700px]">
          <ShapeBlur
            variation={0}
            pixelRatioProp={window.devicePixelRatio || 1}
            shapeSize={isMinMobile ? 2 : 1.6}
            roundness={0.5}
            borderSize={0.05}
            circleSize={0.2}
            circleEdge={1}
          />

          <ShinyText
            text="The Best App for your Contacts"
            disabled={false}
            speed={3}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-[90%] max-w-[1000px] px-12 z-10 font-black text-[clamp(2.5rem,8vw,6rem)]"
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
