import React from "react";
import { Pane, Dialog, Heading } from "evergreen-ui";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

interface Props {
  isShown: boolean;
  setIsShown: (param: boolean) => void;
}

export const EventDialog: React.FC<Props> = ({ isShown, setIsShown }) => {
  return (
    <Pane>
      <Dialog
        isShown={isShown}
        title="Dialog title"
        onCloseComplete={() => setIsShown(false)}
        confirmLabel="Custom Label"
        hasFooter={false}
      >
        <Heading>Created a dummy event</Heading>
      </Dialog>
    </Pane>
  );
};
