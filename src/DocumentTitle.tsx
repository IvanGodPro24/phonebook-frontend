import { Helmet } from "react-helmet-async";
import { DocumentTitleProps } from "./DocumentTitle.types";

const DocumentTitle = ({ children }: DocumentTitleProps) => {
  return (
    <Helmet>
      <title>{children}</title>
    </Helmet>
  );
};

export default DocumentTitle;
