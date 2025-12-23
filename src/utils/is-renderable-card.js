import {
  getCategory,
  getDescription,
  getImage,
  getPrice,
  getTitle,
} from "./formatters";

export const isRenderableCard = (item) => {
  if (!item || typeof item !== "object") return false;

  return Boolean(
    getTitle(item) ||
      getDescription(item) ||
      getImage(item) ||
      getPrice(item) ||
      getCategory(item) ||
      item?.email
  );
};
