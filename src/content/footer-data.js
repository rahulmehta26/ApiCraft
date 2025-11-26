import Email from "../components/icons/email";
import Github from "../components/icons/github";
import LinkedIn from "../components/icons/linkedIn";

const GITHUb = import.meta.env.VITE_GITHUB;
const LINKEDIN = import.meta.env.VITE_LINKED;
const MAIL = import.meta.env.VITE_MAIL_TO;

export const SocialData = [
  {
    id: 1,
    Icon: Github,
    style: "hover:bg-primary",
    href: GITHUb,
  },

  {
    id: 2,
    Icon: LinkedIn,
    style: "hover:bg-info",
    href: LINKEDIN,
  },

  {
    id: 3,
    Icon: Email,
    style: "hover:bg-destructive",
    href: `mailto:${MAIL}`,
  },
];

export const Product = [
  {
    id: 1,
    title: "Features",
    href: "features",
  },
  {
    id: 2,
    title: "Preview",
    href: "preview",
  },
  {
    id: 3,
    title: "Code",
    href: "code",
  },
];
