import Section from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Section description="Posts" className="p-24">
      <div className="mx-auto flex max-w-4xl flex-col gap-5 px-3">
        <Skeleton className="h-10 w-[400px]" />
        <Skeleton className="h-5 w-[600px]" />
        <Skeleton className="h-2 w-[100px]" />
        <Skeleton className="h-2 w-[200px]" />
      </div>
    </Section>
  );
}
