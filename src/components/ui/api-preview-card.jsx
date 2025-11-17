import { twMerge } from "tailwind-merge";
import { getCategory, getDescription, getImage, getPrice, getTitle } from "../../utils/getData";
import NoImage from "../../assets/noImage.jpg"

const PreviewCard = ({ data }) => {

  console.log(data)

  if (!data) return null;

  const imageSrc = getImage(data);
  const title = getTitle(data);
  const description = getDescription(data);
  const price = getPrice(data);
  const category = getCategory(data);

  return (
    <div
      className={twMerge(
        "w-[15rem] h-auto",
        "border-4 border-foreground ",
        "overflow-hidden neo-shadow neo-shadow-dark",
        "space-y-6 group"
      )}
    >
      {imageSrc && <Image image={imageSrc} />}

      <div className=" space-y-3 px-4 pb-4 ">
      
        {title && <Title title={title} />}
      
        {description && <Description description={description} />}
      
        {price && <Price price={price} />}
      
         {category && <Category category={category} />}
      </div>
    </div>
  );
};

const Image = ({ image }) => {
  return (
    <img
      src={image || NoImage}
      className=" w-full h-fit object-cover group-hover:scale-105 transition-all duration-300 "
    />
  );
};

const Title = ({ title }) => {
  return (
    <h3 className=" text-lg text-foreground font-bold font-mono ">{title}</h3>
  );
};

const Description = ({ description }) => {
  return (
    <p className=" text-sm text-muted-foreground font-medium ">{description}</p>
  );
};

const Price = ({ price }) => (
  <span className="px-2 py-1 text-xs font-semibold bg-primary/10 border border-primary/20 text-primary rounded-md">
    ₹ {price}
  </span>
);

const Category = ({ category }) => (
  <span className="px-2 py-1 text-xs font-medium bg-foreground/10 text-foreground rounded-md">
    {category}
  </span>
);

export default PreviewCard;
