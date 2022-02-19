import { Pane } from "evergreen-ui";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
  return (
    <Pane margin="auto" maxWidth="1080px">
      {children}
    </Pane>
  );
};

export default Container;
