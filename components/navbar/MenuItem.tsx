"use client";

type Props = {
  onClick: () => void;
  label: string;
};
export const MenuItem = ({onClick, label}: Props) => {
  return (
    <div 
    onClick={onClick}
    className="px-4 py-3 hover:bg-neutral-100 transition text-left font-semibold cursor-pointer"
    >
      {label}
    </div>
  );
};