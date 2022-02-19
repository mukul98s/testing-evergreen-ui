import {
  Pane,
  Link,
  Card,
  Heading,
  majorScale,
  Button,
  Text,
  Paragraph,
} from "evergreen-ui";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      marginY={majorScale(10)}
      gap={majorScale(3)}
    >
      <Card>
        <Heading
          size="900"
          fontSize="2.5rem"
          textTransform="uppercase"
          color="#101840"
        >
          Australian Airlines
        </Heading>
        <Paragraph fontWeight="500" fontSize="1.2rem" marginY={majorScale(2)}>
          Plan your travel with confidence
        </Paragraph>
        <RouterLink className="no-underline" to="/meeting">
          <Button appearance="primary" marginY={majorScale(3)}>
            <Link>
              <Text color="#fff">Plan Your Journey</Text>
            </Link>
          </Button>
        </RouterLink>
      </Card>
      <Card>
        <img
          src="https://media.istockphoto.com/photos/passenger-airplane-flying-above-clouds-during-sunset-picture-id155439315?k=20&m=155439315&s=612x612&w=0&h=BvXCpRLaP5h1NnvyYI_2iRtSM0Xsz2jQhAmZ7nA7abA="
          alt="Images"
        />
      </Card>
    </Pane>
  );
};

export default Home;
