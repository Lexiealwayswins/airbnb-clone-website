"use client";

type Props = {
  children: React.ReactNode;
};

export const Container = ({ children }: Props ) => {
  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      { children }
    </div>
  );
};