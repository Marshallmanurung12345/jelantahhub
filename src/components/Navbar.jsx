import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { label: "Latar Belakang", href: "#problem" },
  { label: "Metodologi", href: "#how-it-works" },
  { label: "Peta Dampak", href: "#map" },
  { label: "Kesenjangan", href: "#leaderboard" },
  { label: "Kalkulator", href: "#calculator" },
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
      className={`fixed inset-x-0 top-0 z-50 border-b border-[#eae6df] transition-all duration-200 ${
        scrolled ? "bg-[#fcfbf9]/95 backdrop-blur-md" : "bg-[#fcfbf9]"
      }`}
    >
      <nav className="page-container flex h-16 items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 text-left"
          aria-label="Atlas Jelantah Indonesia"
        >
          <span className="flex h-8 w-8 items-center justify-center bg-[#e05300] text-[15px] font-bold text-white">
            A
          </span>
          <div>
            <div className="text-[16px] font-medium leading-none text-[#111111] font-serif">
              Atlas Jelantah Indonesia
            </div>
            <div className="hidden text-[11px] leading-none text-[#666666] md:block mt-1 font-sans">
              Storytelling sirkularitas minyak jelantah nasional
            </div>
          </div>
        </button>

        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                type="button"
                onClick={() => scrollTo(link.href)}
                className="button-secondary h-16 px-1 text-[13px] uppercase tracking-wider font-bold"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center border border-[#eae6df] bg-transparent lg:hidden"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 block h-px w-5 bg-[#111111] transition ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] block h-px w-5 bg-[#111111] transition ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] block h-px w-5 bg-[#111111] transition ${
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
            className="border-t border-[#eae6df] bg-[#fcfbf9] lg:hidden"
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
                      className="button-ghost w-full justify-start border-b border-[#f4f1eb] px-0 text-left"
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
