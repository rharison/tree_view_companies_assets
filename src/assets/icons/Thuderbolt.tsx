type ThuderboltProps = {
  active: boolean;
};

const Thuderbolt = ({ active }: ThuderboltProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 16 16"
  >
    <path
      fill={active ? "#fff" : "#2188FF"}
      d="M14 5.272h-3.934l3.537-4.47a.143.143 0 0 0-.112-.232H6.643a.14.14 0 0 0-.123.072l-4.627 7.99a.142.142 0 0 0 .123.215H5.13l-1.596 6.386c-.034.14.134.237.237.137l10.327-9.853A.142.142 0 0 0 14 5.272m-8.39 6.664 1.077-4.303h-2.81l3.385-5.847h4.011l-3.72 4.702h3.768z"
    ></path>
  </svg>
);

export default Thuderbolt;
