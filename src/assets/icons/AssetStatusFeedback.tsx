import { AssetStatus } from "@src/commons/types/assets";

type AssetStatusFeedbackProps = {
  status: AssetStatus;
};

const AssetStatusFeedback = ({ status }: AssetStatusFeedbackProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="8"
      fill="none"
      viewBox="0 0 8 8"
    >
      <circle
        cx="4"
        cy="4"
        r="4"
        fill={status === AssetStatus.OPERATING ? "#52C41A" : "#ED3833"}
      ></circle>
    </svg>
  );
};

export default AssetStatusFeedback;
