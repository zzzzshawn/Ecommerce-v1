import { cn } from "@/lib/utils";

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({ className, name, price, _id, imageUrl }) => {
  return (
    <div
      className={cn(
        "row-span-1 h-[500px] max-sm:h-[400px] md:h-full  relative rounded-md group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-dark-1 border hover:border-blue-500 border-dark-4  flex items-end space-y-4 overflow-hidden ",
        className
      )}
    >
      <img
        src={imageUrl}
        className="absolute top-0 left-0 right-0 bottom-0 m-auto max-h-[70%] max-w-[70%] object-contain hover:scale-110 transition-all duration-300"
      />
      <div className="z-10 mx-2 flex gap-2 border border-light-2/30 pl-3 pr-1 py-1 rounded-full bg-dark-1">
        <p className="px-2">{name}</p>
        <p className="bg-blue-500 rounded-full px-2">₹{price}</p>
      </div>
    </div>
  );
};
