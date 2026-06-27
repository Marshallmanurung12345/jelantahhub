const footerLinks = {
  Jelajahi: [
    { label: "Beranda", href: "#hero" },
    { label: "Peta Dampak", href: "#map" },
    { label: "Peringkat", href: "#leaderboard" },
    { label: "Simulasi", href: "#simulation" },
  ],
  Informasi: [
    { label: "Cara Membaca", href: "#how-it-works" },
    { label: "Potensi Energi", href: "#journey" },
    { label: "Ringkasan", href: "#cta" },
  ],
};

function scrollTo(href) {
  const id = href.replace("#", "");
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-[#E8E8E8] bg-white">
      <div className="page-container py-10">
        <div className="grid gap-10 border-b border-[#E8E8E8] pb-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center bg-[#FF6900] text-[14px] font-bold text-white">
                A
              </span>
              <div>
                <div className="text-[16px] font-bold text-[#191919]">
                  Atlas Jelantah Indonesia
                </div>
                <div className="text-[14px] text-[#303030]">
                  Visualisasi konsumsi minyak goreng, potensi minyak jelantah,
                  dan estimasi dampaknya di Indonesia
                </div>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <div className="text-[12px] uppercase tracking-[0.16em] text-[#AEAEAE]">
                {title}
              </div>
              <div className="mt-4 flex flex-col gap-3">
                {links.map((link) => (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    className="w-fit text-[14px] text-[#191919] transition-colors hover:text-[#FF6900]"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 pt-6 text-[14px] text-[#303030] md:flex-row md:items-center md:justify-between">
          <p>Referensi data: Susenas BPS, RED II EU, IPCC, WHO.</p>
        </div>
      </div>
    </footer>
  );
}
