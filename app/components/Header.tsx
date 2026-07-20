"use client";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ background: "var(--paper)", borderColor: "var(--rule)" }}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="w-fit h-fit">
          <Image
            src={"/Debsphere_Logo.png"}
            alt="Debsphere Academy"
            className="w-[72px] h-[72px] object-contain"
            width={72}
            height={72}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 mono text-xs tracking-widest uppercase">
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About" },
            { href: "/courses", label: "Courses" },
            { href: "#contact", label: "Contact" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative py-6 transition-colors"
              style={{ color: "var(--ink)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--green)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink)")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* mobile menu placeholder - wire up to your existing mobile nav */}
        <button
          className="md:hidden mono text-xs tracking-widest uppercase"
          style={{ color: "var(--ink)" }}
        >
          Menu
        </button>
      </div>
    </header>
  );
};

export default Header;
