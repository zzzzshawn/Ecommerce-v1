import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

export const ProductCard = ({ icon, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative w-[400px] mx-3 h-[250px] cursor-pointer overflow-hidden rounded-md border p-10 border-dark-4 bg-dark-1 flex justify-center items-center hover:border-blue-500"
      )}
    >
      <img
        src="/images/t2.png"
        className=" w-[70%] object-contain hover:scale-110 transition-all duration-300"
      />
      <div className="z-10 absolute bottom-5 left-3 mx-2 flex gap-2 border border-light-2/30 pl-3 pr-1 py-1 rounded-full bg-dark-1">
        <p>shirt</p>
        <p className="bg-blue-500 rounded-full px-2">10.99</p>
      </div>
    </figure>
  );
};
