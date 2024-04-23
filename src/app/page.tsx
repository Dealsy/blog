import { Suspense } from "react";

import Section from "@/components/ui/section";
import AllBlogs from "@/components/blog/blog";
import Container from "@/components/ui/container";
import HomeSkeleton from "@/components/ui/skeletons/homeSkeleton";
import { getPosts } from "@/api/endpoints";

export default async function Page() {
  const { posts, error } = await getPosts();

  const data = posts ? posts : [];

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Section description="Blog Posts" className="flex flex-col gap-4 ">
      <Container width="1350px" className="flex flex-col gap-4 p-20">
        <Suspense fallback={<HomeSkeleton />}>
          <AllBlogs data={data} />
        </Suspense>
      </Container>
    </Section>
  );
}
