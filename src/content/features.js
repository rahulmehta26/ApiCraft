import Code from "../components/icons/code";
import Copy from "../components/icons/copy";
import Link from "../components/icons/link";
import Preview from "../components/icons/preview";

export const features = [
  {
    icon: Link,
    title: "Paste Your API",
    description:
      "Drop any REST API URL and let API Craft instantly fetch and format the response. Supports all HTTP methods.",
    color: "primary",
  },
  {
    icon: Code,
    title: "Choose Fetch or Axios",
    description:
      "Pick your favorite HTTP client. Instantly generate clean, production-ready code with Fetch or Axios.",
    color: "green",
  },
  {
    icon: Preview,
    title: "Visual Data Preview",
    description:
      "See your API response beautifully structured — clean cards, collapsible views, and smooth animations.",
    color: "primary",
  },
  {
    icon: Copy,
    title: "Copy and Go",
    description:
      "Grab your optimized code in one click — includes error handling, async/await support.",
    color: "green",
  },
];
