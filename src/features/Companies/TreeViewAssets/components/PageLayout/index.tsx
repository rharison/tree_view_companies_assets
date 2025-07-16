type PageLayoutProps = {
  children: React.ReactNode;
};

export const PageLayout = ({ children }: PageLayoutProps) => {
  return <div className="flex flex-col w-full">{children}</div>;
};
