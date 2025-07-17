type AlertProps = {
  active: boolean;
};

const Alert = ({ active }: AlertProps) => {
  const fill = active ? "#fff" : "#2188FF";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        fill={fill}
        d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1m0 12.813A5.813 5.813 0 0 1 8 2.188a5.813 5.813 0 0 1 0 11.625"
      ></path>
      <path
        fill={fill}
        d="M7.25 10.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0M7.625 9h.75a.125.125 0 0 0 .125-.125v-4.25a.125.125 0 0 0-.125-.125h-.75a.125.125 0 0 0-.125.125v4.25c0 .069.056.125.125.125"
      ></path>
    </svg>
  );
};

export default Alert;
