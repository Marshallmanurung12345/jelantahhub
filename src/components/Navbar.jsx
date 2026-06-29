import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { label: "Latar Belakang", href: "#problem" },
  { label: "Cara Membaca", href: "#how-it-works" },
  { label: "Peta Dampak", href: "#map" },
  { label: "Peringkat", href: "#leaderboard" },
  { label: "Simulasi", href: "#simulation" },
];

function scrollTo(href) {
  const id = href.replace("#", "");
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-[#E8E8E8] transition-all duration-200 ${
        scrolled ? "bg-white/95 backdrop-blur-md" : "bg-white"
      }`}
      style={{ boxShadow: "rgba(25, 25, 25, 0.06) 0px 6px 16px 0px" }}
    >
      <nav className="page-container flex h-12 items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 text-left"
          aria-label="Atlas Jelantah Indonesia"
        >
          <span className="flex h-7 w-7 items-center justify-center bg-[#FF6900] text-[14px] font-bold text-white">
            A
          </span>
          <div>
            <div className="text-[16px] font-bold leading-5 text-[#191919]">
              Atlas Jelantah Indonesia
            </div>
            <div className="hidden text-[12px] leading-4 text-[#303030] md:block">
              Visualisasi konsumsi, potensi jelantah, dan estimasi dampak
            </div>
          </div>
        </button>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                type="button"
                onClick={() => scrollTo(link.href)}
                className="button-secondary h-12 px-1 text-[14px]"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center border border-[#E8E8E8] bg-white md:hidden"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 block h-px w-5 bg-[#191919] transition ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] block h-px w-5 bg-[#191919] transition ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] block h-px w-5 bg-[#191919] transition ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-[#E8E8E8] bg-white md:hidden"
          >
            <div className="page-container py-4">
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      type="button"
                      onClick={() => {
                        scrollTo(link.href);
                        setMenuOpen(false);
                      }}
                      className="button-ghost w-full justify-start border-b border-[#F7F7F7] px-0 text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
