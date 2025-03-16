import { Separator } from "@/components/ui/separator"

type PageHeaderParams = {
  title: string;
  desc: string;
}
export function PageHeader(props: PageHeaderParams) {
  return (
    <div className="space-y-2">
      <h1 className="text-xl md:text-2xl font-semibold">{props.title}</h1>
      <p className="text-sm md:text-base text-muted-foreground">
        {props.desc}
      </p>
      <Separator className="my-4 max-w-screen" />
    </div>
  )
}

