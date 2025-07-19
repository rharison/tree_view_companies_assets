type DisplayInfoProps = {
  label: string;
  description: string | React.ReactNode;
};

export const DisplayInfo = ({ label, description }: DisplayInfoProps) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[#24292F] font-semibold">{label}</span>
      {typeof description === "string" ? (
        <span className="text-[#88929C] text-[16px]">{description}</span>
      ) : (
        description
      )}
    </div>
  );
};
