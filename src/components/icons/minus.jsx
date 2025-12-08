import { twMerge } from "tailwind-merge";

const Minus = ({ className, ...props }) => {
  return (
    <svg
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 48 48"
      {...props}
      className={twMerge("icon", className)}
    >
      <rect x={8} y={21} fill="#ffffff" width={36} height={4} />
    </svg>
  );
};

export default Minus;
