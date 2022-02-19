import { Pane, AirplaneIcon, majorScale, Link, minorScale } from "evergreen-ui";
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import navRoutes from "../constants/navRoutes";

const Header: React.FC = () => {
  const { pathname } = useLocation();
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
        {navRoutes.map((route, index) => {
          return (
            <Link key={index} marginY={8} marginRight={12}>
              <RouterLink to={route.path} className="no-underline">
                <Link color={pathname === route.path ? "" : "neutral"}>
                  <Pane display="flex" gap={minorScale(1)} alignItems="center">
                    <route.icon />
                    {route.title}
                  </Pane>
                </Link>
              </RouterLink>
            </Link>
          );
        })}
      </Pane>
    </Pane>
  );
};

export default Header;
