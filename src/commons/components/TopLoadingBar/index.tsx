export default function TopLoadingBar() {
  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-50 overflow-hidden">
      <div className="w-[100%] h-full bg-[#2188FF] animate-pulse" />
    </div>
  );
}
