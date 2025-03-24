import { Separator } from "@/components/ui/separator"

type PageHeaderParams = {
  title: string;
  desc: string;
  children?: React.ReactNode
}
export function PageHeader(props: PageHeaderParams) {
  return (
    <div className="mt-7 md:mt-2 space-y-2 min-w-96">
      <div className="flex justify-between">
        <div className="">
          <h1 className="text-xl md:text-2xl font-semibold">{props.title}</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            {props.desc}
          </p>
        </div>
        {props.children}
      </div>
      <Separator className="my-4 max-w-screen" />
    </div>
  )
}

