const footerLinks = {
  Jelajahi: [
    { label: "Beranda", href: "#hero" },
    { label: "Latar Belakang", href: "#problem" },
    { label: "Peta Dampak", href: "#map" },
    { label: "Peringkat", href: "#leaderboard" },
    { label: "Simulasi", href: "#simulation" },
  ],
  Informasi: [
    { label: "Cara Membaca", href: "#how-it-works" },
    { label: "Kalkulator Dampak", href: "#calculator" },
    { label: "Ringkasan", href: "#cta" },
  ],
};

function scrollTo(href) {
  const id = href.replace("#", "");
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-[#eae6df] bg-[#f4f1eb]">
      <div className="page-container py-16">
        <div className="grid gap-12 border-b border-[#eae6df] pb-12 md:grid-cols-[1.5fr_0.75fr_0.75fr]">
          <div>
            <div className="flex items-start gap-4">
              <span className="flex h-9 w-9 items-center justify-center bg-[#e05300] text-[15px] font-bold text-white">
                A
              </span>
              <div>
                <div className="text-[18px] font-medium text-[#111111] font-serif">
                  Atlas Jelantah Indonesia
                </div>
                <div className="text-[14px] text-[#444444] mt-2 max-w-[400px] leading-relaxed">
                  Sebuah narasi visual interaktif tentang sirkularitas minyak jelantah menjadi biodiesel ramah lingkungan di Indonesia.
                </div>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#666666]">
                {title}
              </div>
              <div className="mt-6 flex flex-col gap-3">
                {links.map((link) => (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    className="w-fit text-[14px] text-[#444444] transition-colors hover:text-[#e05300] text-left"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 pt-8 text-[13px] text-[#666666] md:flex-row md:items-center md:justify-between">
          <p>Referensi formulasi & data: Susenas BPS, RED II EU, IPCC, WHO.</p>
          <p className="md:text-right">&copy; {new Date().getFullYear()} Atlas Jelantah Indonesia.</p>
        </div>
      </div>
    </footer>
  );
}
