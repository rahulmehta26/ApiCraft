import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import {
  getCategory,
  getDescription,
  getImage,
  getPrice,
  getTitle,
} from "../../utils/formatters";
import NoImage from "../../assets/noImage.png";
import { parentAnimations } from "../../animations/parent-animation";
import { useEffect, useRef, useState } from "react";

const PreviewCard = ({ data }) => {
  const imageSrc = getImage(data);
  const title = getTitle(data);
  const description = getDescription(data);
  const price = getPrice(data);
  const category = getCategory(data);

  return (
    <motion.div
      {...parentAnimations?.staggerItem}
      className={twMerge(
        "w-[15rem] h-auto",
        "border-4 border-foreground ",
        "overflow-hidden neo-shadow neo-shadow-dark",
        "space-y-6 group"
      )}
    >
      {imageSrc && <Image image={imageSrc} />}

      <div className=" space-y-3 px-4 pb-4 flex flex-col flex-wrap ">
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px",
      }
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  const imageSrc =
    typeof image === "string" && image.trim() !== "" ? image : null;

  return (
    <div ref={imgRef} className="relative w-full h-48 bg-muted">
      {isInView && (
        <img
          src={imageSrc || NoImage}
          alt={imageSrc ? "Preview" : "No Image"}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={(e) => (e.currentTarget.src = NoImage)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
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
    <p className=" text-sm w-[100%] text-muted-foreground line-clamp-4 font-medium ">
      {description}
    </p>
  );
};

const Email = ({ email }) => {
  return (
    <p className=" text-xs mt-2 text-muted-foreground font-medium ">{email}</p>
  );
};

const Price = ({ price }) => (
  <span className="px-2 w-fit py-1 text-xs font-semibold bg-primary/10 border border-primary/20 text-primary rounded-md">
    ₹ {price}
  </span>
);

const Category = ({ category }) => (
  <span className="px-2 w-fit py-1 text-xs font-medium bg-foreground/10 text-foreground rounded-md">
    {category}{" "}
  </span>
);

export default PreviewCard;
