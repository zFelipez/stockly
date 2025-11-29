'use client';

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";


interface SideBarButtonProps {
    children: React.ReactNode;
}

const SideBarButton = ({children}:  SideBarButtonProps) => {
    
    const pathname = usePathname();
    return ( 
        <Button
          variant={pathname === "/" ? "secondary" : "ghost"}
          className="justify-start gap-2"
          asChild
        >
         {children}   
        </Button>
     );
}

export default SideBarButton;



