import { twMerge } from "tailwind-merge"
import Database from "../icons/database";

const Button = ({ className, title, onClick, leftIcon:LeftIcon, icon }) => {
  
  const handleClick = (e) => {

    e.preventDefault();
    onClick();
  }
  return (
    <button
      className={twMerge(
        "px-6 py-3",
        "bg-foreground text-background font-bold",
        "cursor-pointer",
        "hover:bg-foreground/90  neo-shadow-hover transition-all",
        " flex items-center justify-center gap-4 ",
        className
      )}
      onClick={handleClick}
    >
      {
        LeftIcon && <LeftIcon className={twMerge(icon,"icon")} />
      }
      {title}
    </button>
  )
}

export default Button