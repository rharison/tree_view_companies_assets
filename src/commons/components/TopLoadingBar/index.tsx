export default function TopLoadingBar() {
  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-50 overflow-hidden">
      <div className="bg-[#2188FF] h-full animate-loading-bar" />
    </div>
  );
}
