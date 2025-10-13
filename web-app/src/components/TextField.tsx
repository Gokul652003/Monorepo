import React from "react";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  description?: string;
  leftIcon?: string;
  rightIcon?: string;
  className?: string;
  containerClass?: string;
  rightIconOnClick?: () => void;
}

const TextField = ({
  label,
  description,
  leftIcon,
  rightIcon,
  rightIconOnClick,
  className,
  containerClass,
  ...props
}: TextFieldProps) => {
  return (
    <div className={` flex flex-col gap-1 grow ${containerClass}`}>
      {label && <label className="text-xs px-1 font-medium">{label}</label>}
      <div className="ring ring-chat-border flex items-center py-2 px-1 rounded-sm outline-none focus-within:ring-blue-400 focus-within:ring-1">
        {leftIcon && <img src={leftIcon} className="size-5 mx-2" alt="icon" />}
        <input
          className={`rounded-sm outline-none text-sm grow ${className}`}
          {...props} // Spread all other props (type, placeholder, value, onChange, etc.)
        />
        {rightIcon && (
          <div className="">
            <img
              src={rightIcon}
              className={`size-5 mx-2 ${
                rightIconOnClick ? "cursor-pointer" : ""
              }`}
              alt="icon"
              onClick={rightIconOnClick}
            />
          </div>
        )}
      </div>
      <div className="text-xs text-error min-h-4 w-full">{description}</div>
    </div>
  );
};

export default TextField;
