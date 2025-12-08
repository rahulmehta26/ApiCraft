import { twMerge } from "tailwind-merge";

export const TrafficLight = ({className}) => {
  return (
    <div className="flex items-center gap-2">
      <div className={twMerge("threeDot", "bg-red", className)} />

      <div className={twMerge("threeDot", "bg-yellow", className)} />

      <div className={twMerge("threeDot", "bg-green", className)} />
    </div>
  );
};
