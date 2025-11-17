export const getImage = (data) => {
  const key = Object.keys(data).find((k) =>
    /(image|avatar|url|photo|thumbnail|pic|cloudinaryImage)/i.test(k)
  );
  return key ? data[key] : null;
};

export const getTitle = (data) => {
  const key = Object.keys(data).find(
    (k) =>
      /(title|name|heading|firstName)/i.test(k) && typeof data[k] === "string"
  );
  return key ? data[key] : "Untitled";
};

export const getDescription = (data) => {
  const key = Object.keys(data).find(
    (k) =>
      /(desc|description|bio|summary|info)/i.test(k) &&
      typeof data[k] === "string"
  );

  if (key) return data[key];
};

export const getPrice = (data) => {
  const key = Object.keys(data).find(
    (k) =>
      /(price|amount|cost|value|salary)/i.test(k) &&
      (typeof data[k] === "number" || typeof data[k] === "string")
  );
  return key ? data[key] : null;
};

export const getCategory = (data) => {
  const key = Object.keys(data).find(
    (k) =>
      /(category|type|tag|role|kind)/i.test(k) && typeof data[k] === "string"
  );
  return key ? data[key] : null;
};
