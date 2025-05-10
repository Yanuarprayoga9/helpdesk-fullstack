import { Separator } from "@/components/ui/separator";

type PageHeaderParams = {
  title?: string;
  desc?: string;
  variant?: "header" | "sub"; // "header" untuk utama, "sub" untuk sub-header
  children?: React.ReactNode;
};

export function Header({
  title,
  desc,
  variant = "header",
  children,
}: PageHeaderParams) {
  return (
    <div className={` ${variant === "header" ? "mt-7  space-y-4 md:mt-2" : " space-y-2 "}`}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className={variant === "header" ? "text-2xl md:text-3xl font-bold" : "text-lg md:text-xl font-semibold"}>
            {title}
          </h1>
          {desc && (
            <p className={`text-sm break-words ${variant === "header" ? "md:text-base" : "text-xs md:text-sm"} text-muted-foreground`}>
              {desc}
            </p>
          )}
        </div>
        {children}
      </div>
       <Separator className="my-4" />
    </div>
  );
}
