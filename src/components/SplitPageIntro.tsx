import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";

export function SplitPageIntro({
  eyebrow,
  title,
  body,
  children,
  media,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  children?: React.ReactNode;
  media: React.ReactNode;
}) {
  return (
    <section className="bg-shell pt-16 pb-12 sm:pt-20 sm:pb-14">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div>
            <SectionHeading eyebrow={eyebrow} title={title} body={body} />
            {children}
          </div>
          {media}
        </div>
      </Container>
    </section>
  );
}
