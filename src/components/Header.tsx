import {
  Pane,
  AirplaneIcon,
  majorScale,
  Link,
  minorScale,
  HomeIcon,
  GlobeNetworkIcon,
  BookIcon,
  CameraIcon,
  CalendarIcon,
  MobilePhoneIcon,
} from "evergreen-ui";
import React from "react";

const Header: React.FC = () => {
  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      paddingX={majorScale(3)}
      paddingTop={majorScale(5)}
      paddingBottom={majorScale(2)}
      borderBottom="1px solid rgba(0,0,0,0.2)"
    >
      <Pane>
        <Link href="/">
          <AirplaneIcon color="warning" size={30} />
        </Link>
      </Pane>
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
        gap={majorScale(2)}
      >
        <Link href="#" marginY={8} marginRight={12}>
          <Pane display="flex" gap={minorScale(1)} alignItems="center">
            <HomeIcon />
            Home
          </Pane>
        </Link>
        <Link href="#" marginY={8} marginRight={12} color="neutral">
          <Pane display="flex" gap={minorScale(1)} alignItems="center">
            <GlobeNetworkIcon />
            Network{" "}
          </Pane>
        </Link>
        <Link href="#" marginY={8} marginRight={12} color="neutral">
          <Pane display="flex" gap={minorScale(1)} alignItems="center">
            <BookIcon />
            Blog
          </Pane>
        </Link>
        <Link href="#" marginY={8} marginRight={12} color="neutral">
          <Pane display="flex" gap={minorScale(1)} alignItems="center">
            <CameraIcon />
            Work
          </Pane>
        </Link>
        <Link href="#" marginY={8} marginRight={12} color="neutral">
          <Pane display="flex" gap={minorScale(1)} alignItems="center">
            <CalendarIcon />
            Metting
          </Pane>
        </Link>
        <Link href="#" marginY={8} marginRight={12} color="neutral">
          <Pane display="flex" gap={minorScale(1)} alignItems="center">
            <MobilePhoneIcon />
            Call Us
          </Pane>
        </Link>
      </Pane>
    </Pane>
  );
};

export default Header;
