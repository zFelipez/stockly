'use client';

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";


interface SideBarButtonProps {
    children: React.ReactNode;
    url?: string;
}

const SideBarButton = ({children, url}:  SideBarButtonProps) => {
    
    const pathname = usePathname();
    return ( 
        <Button
          variant={pathname === url ? "secondary" : "ghost"}
          className="justify-start gap-2"
          asChild
        >
         {children}   
        </Button>
     );
}

export default SideBarButton;



