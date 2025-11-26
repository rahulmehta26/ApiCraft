export const scrollToView = (href) => {
  const element = document.getElementById(href);

  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};
