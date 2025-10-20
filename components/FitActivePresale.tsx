import React, { useEffect, useMemo, useState } from "react";

function useCountdown(targetISO: string) {
  const target = useMemo(() => new Date(targetISO).getTime(), [targetISO]);
  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  const s = Math.floor(diff / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return { d, h, m, s: sec, expired: diff === 0 };
}

export default function FitActivePresale() {
  const { d, h, m, s, expired } = useCountdown("2025-10-31T21:00:00+03:00");

  const CHECKOUT_URL = "https://presale.fitactive.ro/checkout";
  const BRAND = { primary: "#ec7c26", dark: "#d46a1a" };

  const scrollToCheckout = () => {
    const el = document.getElementById("checkout");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="min-h-screen bg-neutral-950 text-white overflow-hidden"
      style={{ "--brand": BRAND.primary, "--brand-dark": BRAND.dark } as React.CSSProperties}
    >
      <div className="floating-bg">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </div>

      <div className="content-wrapper">
        {/* Mobile Logo - Above everything */}
        <div className="fixed top-0 left-0 right-0 z-[60] md:hidden bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800 py-4">
          <div className="flex justify-center">
            <img src="/logo.png" alt="FitActive Logo" className="h-14" />
          </div>
        </div>

        <div className="fixed top-0 left-0 right-0 z-50 w-full border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-md transition-all duration-300 mt-[72px] md:mt-0">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-6 md:py-4 text-base flex-col md:flex-row">
            <div className="font-medium text-neutral-100 text-center md:text-left">
              {expired ? (
                <span className="animate-pulse">Oferta de presale s-a încheiat. Verifică disponibilitatea actuală.</span>
              ) : (
                <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                  <span className="block text-lg md:text-base">
                    Oferta de deschidere <span className="font-bold text-[var(--brand)]">−61%</span> se încheie în:
                  </span>
                  <div className="flex flex-col md:flex-row md:items-center md:gap-2 mt-2 md:mt-0">
                    <span className="font-semibold text-[var(--brand)] text-5xl md:text-2xl md:whitespace-nowrap">
                      {d}z {h}h {m}m {s}s
                    </span>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={scrollToCheckout}
              className="flex-shrink-0 rounded-full bg-[var(--brand)] px-6 py-3 text-white font-semibold shadow-lg hover:bg-[var(--brand-dark)] transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 w-full md:w-auto"
            >
              Înscrie-mă acum
            </button>
          </div>
        </div>

        <div className="pt-48 md:pt-16">
          <section className="relative overflow-hidden">
            <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
              {/* Desktop Logo - Above hero image */}
              <div className="hidden md:block md:col-span-2 mb-8">
                <div className="flex justify-center">
                  <img src="/logo.png" alt="FitActive Logo" className="h-32" />
                </div>
              </div>
              <div className="animate-slideInUp">
                <h1 className="text-4xl font-bold tracking-tight md:text-6xl leading-tight">
                  S-a deschis <span className="text-[var(--brand)] drop-shadow-lg">FitActive Vitan</span> —
                  <br className="hidden md:block" /> primul club 24/7 cu abonament All Inclusive la jumătate de preț!
                </h1>
                <p className="mt-6 text-lg text-neutral-300 leading-relaxed">
                  Doar acum, în perioada de presale:
                  <span className="ml-2 font-bold text-[var(--brand)]">99,90 lei/lună (plată anuală)</span> +
                  <span className="ml-2 font-bold text-[var(--brand)]">Pro‑Pack cadou (500 lei)</span>
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    onClick={scrollToCheckout}
                    className="rounded-xl bg-[var(--brand)] px-8 py-4 text-base font-bold text-white shadow-xl hover:bg-[var(--brand-dark)] transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95"
                  >
                    Înscrie-mă acum – prind oferta
                  </button>
                  <div className="flex items-center gap-2 text-sm text-neutral-400">
                    <NetopiaIcon className="h-5 w-5" />
                    <span>Plată sigură prin Netopia</span>
                  </div>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-3 text-sm md:grid-cols-3">
                  <Badge>24/7 Acces</Badge>
                  <Badge>Clase fără rezervare</Badge>
                  <Badge>Băuturi incluse</Badge>
                  <Badge>Masaj & Relaxare</Badge>
                  <Badge>Solar</Badge>
                  <Badge>Pro‑Pack cadou</Badge>
                </div>
              </div>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl ring-1 ring-neutral-700 animate-slideInUp" style={{ animationDelay: "0.1s" }}>
                <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-900" />
                <div className="absolute inset-0 grid place-items-center">
                  <span className="text-sm text-neutral-500 text-center px-4">Video/Fotografie sală — atmosferă luminoasă, oameni zâmbind</span>
                </div>
              </div>
            </div>
          </section>

          <section className="border-t border-neutral-800 bg-neutral-950/50">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
              <div className="animate-slideInUp">
                <h2 className="text-3xl font-bold md:text-4xl">Un singur abonament. Totul inclus.</h2>
                <ul className="mt-8 space-y-4 text-neutral-300">
                  <Feature title="Acces fitness 24/7">vii când vrei, cât vrei</Feature>
                  <Feature title="Clase de grup fără rezervare">zero complicații, vii și intri</Feature>
                  <Feature title="Băuturi izotonice & apă incluse">hidratare la fiecare antrenament</Feature>
                  <Feature title="Fotolii de masaj & zonă de relaxare">recuperare după efort</Feature>
                  <Feature title="Platformă vibratoare">tonifiere inteligentă</Feature>
                  <Feature title="Acces la solar">când vrei tu</Feature>
                </ul>
                <p className="mt-8 text-sm text-neutral-500">Un abonament complet, fără costuri ascunse.</p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 ring-1 ring-neutral-700 hover:ring-[var(--brand)] transition-all duration-300 animate-slideInUp" style={{ animationDelay: "0.1s" }}>
                <h3 className="text-2xl font-bold">Bonus exclusiv în presale: <span className="text-[var(--brand)]">Pro‑Pack gratuit</span></h3>
                <p className="mt-3 text-neutral-400">Primești mai mult decât un abonament – primești un plan.</p>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <Card title="Analiză corporală">Compoziție, masă musculară, procent grăsime.</Card>
                  <Card title="Control postural (osteopat)">Previi dureri și accidentări.</Card>
                  <Card title="Antrenament personalizat">Plan de start 1‑la‑1 inclus.</Card>
                </div>
                <p className="mt-6 text-sm text-neutral-500">Valoare totală: <span className="font-semibold text-[var(--brand)]">500 lei</span> — oferit <span className="font-semibold text-[var(--brand)]">GRATUIT</span> doar în presale. După lansare, disponibil separat, contra cost.</p>
                <div className="mt-8">
                  <button onClick={scrollToCheckout} className="w-full rounded-xl bg-[var(--brand)] px-6 py-3 font-bold text-white shadow-lg hover:bg-[var(--brand-dark)] transition-all duration-300 hover:shadow-xl active:scale-95">Vreau Pro‑Pack‑ul gratuit</button>
                </div>
              </div>
            </div>
          </section>

          <section className="border-t border-neutral-800 bg-neutral-950/50">
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-12 md:grid-cols-4">
              <Stat kpi=">150" label="cluburi în Europa" />
              <Stat kpi="18" label="ani de experiență" />
              <Stat kpi="24/7" label="acces nelimitat" />
              <Stat kpi="0" label="costuri ascunse" />
            </div>
          </section>

          <section className="border-t border-neutral-800 bg-neutral-950/50">
            <div className="mx-auto max-w-6xl px-4 py-12 md:py-20">
              <h2 className="text-3xl font-bold md:text-4xl">Atmosferă prietenoasă, aparate moderne</h2>
              <p className="mt-3 text-neutral-400">Curățenie impecabilă, spații aerisite și personal gata să te ajute.</p>
              <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-[4/3] overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-neutral-700 hover:ring-[var(--brand)] transition-all duration-300 hover:scale-105" />
                ))}
              </div>
              <div className="mt-10 grid gap-4 md:grid-cols-3">
                <Testimonial name="Andreea M.">E prima sală unde chiar vin cu drag. Personal mereu zâmbitor.</Testimonial>
                <Testimonial name="Vlad P.">Super curățenie, super vibe. Nu te simți intimidat.</Testimonial>
                <Testimonial name="Elena S.">Merită fiecare leu – băuturi incluse și aparate noi.</Testimonial>
              </div>
            </div>
          </section>

          <section className="border-t border-neutral-800 bg-neutral-950/50">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-2 md:py-20">
              <div className="animate-slideInUp">
                <h2 className="text-3xl font-bold md:text-4xl">Ne găsești ușor</h2>
                <p className="mt-3 text-neutral-400">📍 Calea Vitan nr. 289, sector 3, București (aproape de Auchan Vitan)</p>
                <a
                  href="https://maps.google.com/?q=Calea+Vitan+289+Bucuresti"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--brand)] px-6 py-3 text-white font-semibold hover:bg-[var(--brand-dark)] transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                >
                  Deschide în Google Maps
                </a>
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-neutral-700 animate-slideInUp" style={{ animationDelay: "0.1s" }}>
                <div className="h-full w-full bg-gradient-to-br from-neutral-900 to-neutral-800" />
              </div>
            </div>
          </section>

          <section className="border-t border-neutral-800 bg-neutral-950/50">
            <div className="mx-auto max-w-3xl px-4 py-12 md:py-20">
              <h2 className="text-3xl font-bold md:text-4xl">Întrebări frecvente</h2>
              <div className="mt-8 divide-y divide-neutral-800">
                <Faq q="Ce include All Inclusive?">
                  Acces 24/7, clase fără rezervare, băuturi izotonice și apă, fotolii de masaj, platformă vibratoare și acces la solar.
                </Faq>
                <Faq q="Cum funcționează Pro‑Pack‑ul?">
                  După înscriere, te programăm pentru analiză corporală, control postural cu un osteopat și un antrenament 1‑la‑1 pentru planul tău de start.
                </Faq>
                <Faq q="Oferta e limitată?">
                  Da, este valabilă doar în perioada de presale și doar pentru primii membri. După deschidere, Pro‑Pack va fi disponibil separat, contra cost.
                </Faq>
                <Faq q="Când pot începe?">
                  <>
                    Poți merge în oricare altă sală FitActive imediat după plată. În Vitan, abonamentul începe la data deschiderii — nu pierzi nimic până atunci.
                  </>
                </Faq>
              </div>
            </div>
          </section>

          <section className="border-t border-neutral-800 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-white">
            <div className="mx-auto max-w-6xl px-4 py-20 text-center">
              <h2 className="text-4xl font-bold md:text-5xl">Ultima șansă la 61% reducere</h2>
              <p className="mx-auto mt-4 max-w-2xl text-neutral-400 text-lg">Ești la un click distanță de cel mai bun preț FitActive + Pro‑Pack cadou (500 lei).</p>
              <button
                onClick={scrollToCheckout}
                className="mt-8 rounded-xl bg-[var(--brand)] px-8 py-4 font-bold text-white shadow-xl hover:bg-[var(--brand-dark)] transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95"
              >
                Înscrie-mă acum – prind oferta
              </button>
              <p className="mt-4 text-xs text-neutral-500">Plată sigură prin Netopia • Fără comisioane ascunse</p>
            </div>
          </section>

          <section id="checkout" className="border-t border-neutral-800 bg-neutral-950/50">
            <div className="mx-auto max-w-3xl px-4 py-16">
              <div className="rounded-2xl border border-neutral-700 bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 md:p-10 hover:border-[var(--brand)] transition-all duration-300">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <h3 className="text-2xl font-bold">Abonament All Inclusive (12 luni)</h3>
                    <p className="mt-2 text-neutral-400">
                      99,90 lei/lună la plata anuală • Preț întreg: 3.098,80 lei/an • Presale:
                      <span className="font-bold text-[var(--brand)]"> 1.198,80 lei/an</span>
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-4xl font-bold text-[var(--brand)]">1.198,80 lei</div>
                    <div className="text-xs text-neutral-500 line-through">3.098,80 lei</div>
                  </div>
                </div>
                <ul className="mt-8 grid gap-3 text-sm text-neutral-300 md:grid-cols-2">
                  <li className="flex items-center gap-2"><span className="text-[var(--brand)] font-bold">✔</span> Acces nelimitat 24/7</li>
                  <li className="flex items-center gap-2"><span className="text-[var(--brand)] font-bold">✔</span> Clase de grup fără rezervare</li>
                  <li className="flex items-center gap-2"><span className="text-[var(--brand)] font-bold">✔</span> Băuturi izotonice și apă incluse</li>
                  <li className="flex items-center gap-2"><span className="text-[var(--brand)] font-bold">✔</span> Fotolii de masaj & platformă vibratoare</li>
                  <li className="flex items-center gap-2"><span className="text-[var(--brand)] font-bold">✔</span> Acces la solar</li>
                  <li className="flex items-center gap-2"><span className="text-[var(--brand)] font-bold">✔</span> Pro‑Pack de start (500 lei) — gratuit în presale</li>
                </ul>
                <div className="mt-10 flex flex-col items-stretch gap-3 md:flex-row md:items-center">
                  <a
                    href={CHECKOUT_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center rounded-xl bg-[var(--brand)] px-6 py-4 text-center font-bold text-white shadow-lg hover:bg-[var(--brand-dark)] transition-all duration-300 hover:shadow-xl active:scale-95"
                  >
                    Înscrie-mă acum
                  </a>
                  <a
                    href={CHECKOUT_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-neutral-600 px-6 py-4 font-bold text-neutral-200 hover:bg-neutral-900 hover:border-[var(--brand)] transition-all duration-300"
                  >
                    Plătesc mai târziu
                  </a>
                </div>
                <div className="mt-5 flex items-center gap-2 text-xs text-neutral-500">
                  <NetopiaIcon className="h-4 w-4" />
                  <span>Procesare plăți securizată • Contract & factură pe email</span>
                </div>
              </div>
            </div>
          </section>

          <footer className="border-t border-neutral-800 bg-neutral-950">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-3">
              <div>
                <div className="text-lg font-bold text-[var(--brand)]">FitActive București Vitan</div>
                <div className="mt-2 text-sm text-neutral-500">Primul brand de fitness din Italia extins în România. Deschis 24/7.</div>
              </div>
              <div className="text-sm text-neutral-400">
                <div className="font-semibold text-neutral-200">Companie</div>
                <div>FITNESS VITAN SRL</div>
                <div>CUI: 49908807</div>
                <div>J40/7487/2024</div>
                <div>Calea Vitan nr. 289, sector 3, București</div>
              </div>
              <div className="text-sm text-neutral-400">
                <div className="font-semibold text-neutral-200">Contact</div>
                <div>
                  Email: <a className="text-[var(--brand)] hover:underline transition-all" href="mailto:vitan@fitactive.ro">vitan@fitactive.ro</a>
                </div>
                <div>
                  Telefon: <a className="text-[var(--brand)] hover:underline transition-all" href="tel:0758987111">0758 987 111</a>
                </div>
                <div className="mt-3 space-x-3">
                  <a href="#" className="text-neutral-500 hover:text-[var(--brand)] transition-all">Termeni & Condiții</a>
                  <a href="#" className="text-neutral-500 hover:text-[var(--brand)] transition-all">Politica de confidențialitate</a>
                  <a href="#" className="text-neutral-500 hover:text-[var(--brand)] transition-all">Politica cookie</a>
                </div>
              </div>
            </div>
            <div className="border-t border-neutral-800 py-5 text-center text-xs text-neutral-600">© 2025 FitActive. Toate drepturile rezervate.</div>
          </footer>
        </div>

      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center justify-center rounded-full border border-neutral-700 bg-neutral-900/50 px-4 py-2 text-xs text-neutral-300 hover:border-[var(--brand)] hover:bg-neutral-900 transition-all duration-300">
      {children}
    </span>
  );
}

function Feature({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 group">
      <span className="mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[var(--brand)] text-xs font-bold text-white group-hover:scale-110 transition-transform duration-300">✓</span>
      <p>
        <span className="font-semibold text-neutral-100">{title}</span> — <span className="text-neutral-400">{children}</span>
      </p>
    </li>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-neutral-900/50 p-5 ring-1 ring-neutral-700 hover:ring-[var(--brand)] hover:bg-neutral-900 transition-all duration-300 group">
      <div className="text-sm font-bold text-neutral-100 group-hover:text-[var(--brand)] transition-colors">{title}</div>
      <div className="mt-2 text-sm text-neutral-400">{children}</div>
    </div>
  );
}

function Stat({ kpi, label }: { kpi: string; label: string }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 text-center ring-1 ring-neutral-700 hover:ring-[var(--brand)] hover:scale-105 transition-all duration-300">
      <div className="text-3xl font-bold text-[var(--brand)]">{kpi}</div>
      <div className="mt-2 text-sm text-neutral-400">{label}</div>
    </div>
  );
}

function Testimonial({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 ring-1 ring-neutral-700 hover:ring-[var(--brand)] transition-all duration-300 hover:scale-105">
      <div className="text-lg text-[var(--brand)]">★★★★★</div>
      <p className="mt-3 text-neutral-300">"{children}"</p>
      <div className="mt-3 text-sm font-semibold text-neutral-400">— {name}</div>
    </div>
  );
}

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <details
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
      className="group py-5 transition-all duration-300"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-base font-semibold text-neutral-100 hover:text-[var(--brand)] transition-colors duration-300">
        <span>{q}</span>
        <span className="ml-4 inline-flex h-6 w-6 items-center justify-center rounded-full border border-neutral-600 text-sm text-neutral-400 group-open:border-[var(--brand)] group-open:text-[var(--brand)] transition-all duration-300">
          {open ? "–" : "+"}
        </span>
      </summary>
      <div className="mt-3 text-neutral-400 animate-slideInUp">{children}</div>
    </details>
  );
}

function NetopiaIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v9A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9zM6 8h12v8H6V8z" />
      <rect x="7.5" y="9.5" width="3" height="3" rx="0.5" />
      <rect x="12.5" y="9.5" width="4" height="1.5" rx="0.5" />
    </svg>
  );
}
