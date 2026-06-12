import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";

export function PolicyPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: Array<{ title: string; body: string }>;
}) {
  return (
    <section className="bg-paper py-16">
      <Container className="max-w-4xl">
        <SectionHeading title={title} body={intro} />
        <div className="mt-10 space-y-4">
          {sections.map((section) => (
            <article key={section.title} className="rounded-lg border border-ink/10 bg-shell p-5">
              <h2 className="font-display text-2xl font-bold">{section.title}</h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-ink/72">{section.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
