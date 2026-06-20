import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  return (
    <footer className="brand-bg relative overflow-hidden px-4 py-10 text-sm text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[rgba(7,8,39,0.52)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-extrabold">Innersolv.</p>
          <p className="mt-2 max-w-lg text-white/68">
            Innovating minds and brands for global relevance and positive impact.
          </p>
        </div>
        <SocialLinks className="text-white/82" />
      </div>
    </footer>
  );
}
