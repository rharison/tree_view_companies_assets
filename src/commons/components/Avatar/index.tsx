type AvatarProps = {
  letter: string;
};

export const Avatar = ({ letter }: AvatarProps) => {
  return (
    <span className="rounded-full bg-[#2188FF] text-white h-6 w-6 text-center">
      {letter}
    </span>
  );
};
