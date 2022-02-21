import React from "react";
import { Pane, Dialog, TextInput } from "evergreen-ui";

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
        <TextInput name="Event Title" placeholder="Event Title" />
      </Dialog>
    </Pane>
  );
};
