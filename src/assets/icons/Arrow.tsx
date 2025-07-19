type ArrowDownProps = {
  up?: boolean;
};

const Arrow = ({ up }: ArrowDownProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="10"
    fill="none"
    viewBox="0 0 10 10"
    className={`transform transition-transform duration-200 ${
      up ? "rotate-180" : ""
    }`}
  >
    <path
      fill="#17192D"
      d="M9.152 2.143h-.837a.18.18 0 0 0-.144.074L5 6.587l-3.17-4.37a.18.18 0 0 0-.145-.074H.848a.09.09 0 0 0-.072.142L4.71 7.71a.356.356 0 0 0 .577 0l3.935-5.425a.089.089 0 0 0-.071-.142"
    ></path>
  </svg>
);

export default Arrow;
