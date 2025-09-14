import { ReactNode, useState } from "react";
import { Layout } from "./Layout";
import { CustomerSupportChat } from "../CustomerSupportChat";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Layout>{children}</Layout>
      <CustomerSupportChat 
        isOpen={isChatOpen} 
        onToggle={() => setIsChatOpen(!isChatOpen)} 
      />
    </>
  );
}