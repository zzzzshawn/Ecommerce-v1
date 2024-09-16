import { categories } from "@/lib/constants";
import GlobalSearch from "./GlobalSearch";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

const RootNavbar = () => {
  return (
    <nav className="bg-dark-6 animate-in duration-1000 py-1 pt-3 w-full flex items-center justify-between max-sm:px-3 px-6">
      <div className="flex w-full items-center  gap-7">
        <Link to={`/`} className="flex  items-center gap-3">
          <img src="/icons/navbar.svg" className="w-11" />
          <h2 className="font-bold line-clamp-1">ZIN STORE</h2>
        </Link>
        <div className=" flex items-center gap-3">
          {categories.slice(0, 3).map((item) => (
            <Link
              key={item.value}
              className="text-zinc-300 max-sm:hidden hover:underline underline-offset-2 text-[15px]"
              to={
                item.value === ""
                  ? "/allproducts"
                  : `/allproducts/?filter=${item.value}`
              }
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex w-full h-7  gap-2 justify-end ">
        <GlobalSearch />
        <Menubar>
          <MenubarMenu className="bg-dark-6">
            <MenubarTrigger className="bg-dark-6 px-2 py-1 h-full border border-dark-4">
              <img src="/icons/sign-up.svg" className="max-w-4" />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Link to="/signup" className="w-full px-2 py-1" >Sign-up</Link>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <Link to="/login" className="w-full px-2 py-1" >Log-in</Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <Sheet>
          <SheetTrigger className="h-full" asChild>
            <Button className="border hover:bg-transparent group h-full border-dark-4 bg-dark-6 px-2 ">
              <img
                src="/icons/cart.svg"
                alt=""
                className="w-4 invert group-hover:scale-105 "
              />
            </Button>
          </SheetTrigger>
          <SheetContent className="text-white">
            <h4 className="font-bold text-xl">My Cart</h4>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default RootNavbar;
