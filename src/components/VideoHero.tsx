import { ChevronDown } from "lucide-react";
import { Container } from "@/components/Container";

type VideoHeroProps = {
  video: string;
  poster: string;
  eyebrow?: string;
  title: string;
  showScrollHint?: boolean;
};

export function VideoHero({ video, poster, eyebrow, title, showScrollHint = true }: VideoHeroProps) {
  return (
    <section className="relative h-svh min-h-svh overflow-hidden bg-ink text-shell">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={poster}
        className="absolute inset-0 h-full w-full object-cover object-center"
        aria-hidden="true"
      >
        <source src={video} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/28 via-ink/8 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-ink/18 to-transparent" />
      <Container className="relative flex h-full items-center pb-16 pt-28 sm:pb-24 sm:pt-32">
        <div className="max-w-4xl">
          {eyebrow ? (
            <p className="eyebrow-light mb-5 sm:text-sm">
              <span className="h-px w-10 bg-tide/70" />
              {eyebrow}
            </p>
          ) : null}
          <h1 className="display-hero max-w-4xl text-4xl sm:text-6xl md:text-7xl lg:text-8xl">{title}</h1>
        </div>
      </Container>
      {showScrollHint ? (
        <div className="absolute bottom-5 right-6 hidden text-shell/40 md:block" aria-hidden="true">
          <ChevronDown className="h-6 w-6 animate-pulse" />
        </div>
      ) : null}
    </section>
  );
}
