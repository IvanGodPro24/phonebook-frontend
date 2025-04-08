import { RotatingTriangles } from "react-loader-spinner";

const Loader = () => {
  return (
    <RotatingTriangles
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="rotating-triangles-loading"
      wrapperStyle={{
        margin: "0 auto",
      }}
      wrapperClass=""
    />
  );
};

export default Loader;
