import {  HomeIcon,
  GlobeNetworkIcon,
  BookIcon,
  CameraIcon,
  CalendarIcon,
  MobilePhoneIcon,
  IconComponent,
} from 'evergreen-ui'

interface routes {
  title: String;
  icon: IconComponent;
  path: string;
}

const navRoutes: routes[] = [
  {
    title: "Home",
    icon: HomeIcon,
    path: "/",
  },
  {
    title: "Network",
    icon: GlobeNetworkIcon,
    path: "/network",
  },
  {
    title: "Blog",
    icon: BookIcon,
    path: "/blog",
  },
  {
    title: "Work",
    icon: CameraIcon,
    path: "/work",
  },
  {
    title: "Meeting",
    icon: CalendarIcon,
    path: "/meeting",
  },
  {
    title: "Call Us",
    icon: MobilePhoneIcon,
    path: "/call",
  },
];

export default navRoutes;