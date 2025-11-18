 

import Link from "next/link";
 
import { LayoutGridIcon, PackageIcon, ShoppingBasketIcon } from "lucide-react";
 
import SideBarButton from "./sidebar-button";

const SideBar = () => {
  

  return (
    <div className="w-64 bg-white p">
      <div className=" px-8 py-6 ">
        <h1 className="font-bold text-2xl "> Stockly</h1>
      </div>

      <div className="flex flex-col gap-2  p-2 ">
        <SideBarButton>
          <Link href="/">
            <LayoutGridIcon size={20}></LayoutGridIcon>
            Dashboard
          </Link>
        </SideBarButton>

         <SideBarButton>

            <Link href="/products">
            <PackageIcon size={20}></PackageIcon>
            Produtos
          </Link>
         </SideBarButton>

        <SideBarButton>
          <Link href="/vendas">
            <ShoppingBasketIcon size={20}></ShoppingBasketIcon>
            Vendas
          </Link>
        </SideBarButton>
      </div>
    </div>
  );
};

export default SideBar;
