import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import {
  getCategory,
  getDescription,
  getImage,
  getPrice,
  getTitle,
} from "../../utils/get-data";
import NoImage from "../../assets/noImage.jpg";

const PreviewCard = ({ data }) => {

  const imageSrc = getImage(data);
  const title = getTitle(data);
  const description = getDescription(data);
  const price = getPrice(data);
  const category = getCategory(data);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: false,
        amount: 0.2,
      }}
      transition={{
        duration: 0.8,
      }}
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

        {data?.email && <Email email={data?.email} />}
      </div>
    </motion.div>
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
    <h3 className=" md:text-lg text-md text-foreground font-bold font-mono ">
      {title}
    </h3>
  );
};

const Description = ({ description }) => {
  return (
    <p className=" text-sm text-muted-foreground font-medium ">{description}</p>
  );
};

const Email = ({ email }) => {
  return (
    <p className=" text-xs mt-2 text-muted-foreground font-medium ">{email}</p>
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
