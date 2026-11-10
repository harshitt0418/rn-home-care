import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import {
  Stethoscope, HeartHandshake, Baby, Syringe, Bandage, Activity, Accessibility, BedDouble,
  Phone, MessageCircle, ShieldCheck, Award, RefreshCw, ClipboardCheck, IndianRupee,
  Clock, Users, BadgeCheck, Wallet, MapPin, Mail, Star, ChevronLeft, ChevronRight,
  CheckCircle2, Menu, X, Heart, Facebook, Instagram, Youtube, Linkedin, PhoneCall,
  UserCheck, Home as HomeIcon, Flower2, Salad, BriefcaseMedical,
} from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import hero from "@/assets/hero.jpg";
import team from "@/assets/team.jpg";
import rnMark from "@/assets/rn-mark.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RN Health Home Care Service – 24×7 Nursing at Home in Gurugram" },
      { name: "description", content: "Trained nurses, elderly care, baby care, injections, wound dressing, physiotherapy, yoga and dietitian services at your doorstep in Gurugram & NCR. Available 24×7." },
      { property: "og:title", content: "RN Health Home Care Service – Gurugram" },
      { property: "og:description", content: "Compassionate, professional home healthcare in Gurugram, available 24×7." },
    ],
  }),
  component: Index,
});

const PHONE = "+91 93554 58926"; // primary
const PHONE_ALT = "+91 75682 83522";
const EMAIL = "rahuliti841266@gmail.com";
const WHATSAPP = "https://wa.me/919355458926?text=Hi%2C%20I%20need%20home%20care%20assistance";
const INSTAGRAM = "https://www.instagram.com/Nursing_student_1001";

const services = [
  { icon: Stethoscope, title: "Nursing Care at Home", short: "GNM/ANM-qualified nurses for medical care at home.", detail: "Medication management, catheter & Ryles tube care, IV fluids, bedside monitoring and doctor coordination by trained nurses — on hourly, 12-hour or 24-hour shifts." },
  { icon: HeartHandshake, title: "Elderly Care", short: "Respectful, patient companionship for seniors.", detail: "Help with daily routines, mobility, meals, hygiene, medicines and emotional companionship so your parents can age safely in their own home." },
  { icon: BedDouble, title: "Patient Care", short: "Bedridden & long-term patient support.", detail: "Positioning, bedsore prevention, feeding, personal hygiene and constant observation for patients recovering from illness or with chronic conditions." },
  { icon: Baby, title: "Baby & Mother Care", short: "Gentle newborn and post-delivery care.", detail: "Trained japa caregivers for newborn bathing, massage, feeding support, and recovery care for new mothers after normal or C-section delivery." },
  { icon: Syringe, title: "Injection Administration", short: "IM, IV & SC injections at your doorstep.", detail: "Safe, hygienic injections as per your doctor's prescription — including insulin, antibiotics and IV drips — with a nurse visit at your preferred time." },
  { icon: Bandage, title: "Wound Dressing", short: "Sterile dressing for surgical & chronic wounds.", detail: "Post-surgical wounds, diabetic foot ulcers, bedsores and burns dressed with sterile technique and progress updates shared with your doctor." },
  { icon: Activity, title: "Vital Signs Monitoring", short: "BP, sugar, SpO₂ & temperature tracking.", detail: "Regular vitals checks with a written log, early-warning alerts to family, and reports you can share with your treating physician." },
  { icon: Accessibility, title: "Physiotherapy & Post-Hospital Care", short: "Recovery support after discharge.", detail: "Certified physiotherapists for post-surgery, stroke, fracture and joint replacement rehab, combined with nursing support during the critical recovery weeks." },
  { icon: Flower2, title: "Yoga & Wellness at Home", short: "Personal yoga sessions for strength & calm.", detail: "Certified yoga instructors design gentle, safe sessions for seniors, post-surgery recovery, pregnancy, back pain and stress relief — one-on-one, at your home and pace." },
  { icon: Salad, title: "Dietician & Nutrition Consultation", short: "Expert diet plans for every condition.", detail: "Qualified dietitians assess your health reports and lifestyle to create practical meal plans for diabetes, BP, weight, pregnancy, child nutrition and post-surgery recovery." },
  { icon: BriefcaseMedical, title: "Doctor Visit at Home", short: "Qualified doctors for check-ups & consultation at home.", detail: "Experienced MBBS & specialist doctors visit your home for thorough physical check-ups, illness diagnosis, prescription review, post-hospital follow-ups and chronic care management." },
];

const steps = [
  { icon: Phone, title: "Enquiry", text: "Call, WhatsApp or fill the form. We respond within 15 minutes." },
  { icon: ClipboardCheck, title: "Free Assessment", text: "Our care coordinator understands the patient's needs — free of cost." },
  { icon: UserCheck, title: "Nurse Assigned", text: "A verified, matched caregiver reaches your home, often the same day." },
  { icon: HeartHandshake, title: "Ongoing Care", text: "Regular supervision visits and feedback calls keep care on track." },
];

type PlanTone = "orange" | "purple" | "green";
const plans: { name: string; tone: PlanTone; price: string; unit: string; alt?: string; points: string[]; featured?: boolean }[] = [
  { name: "Hourly Visit", tone: "orange", price: "₹499", unit: "/ visit onwards", points: ["Injections & IV drips", "Wound dressing", "Vitals check & report", "Catheter / Ryles tube care"] },
  { name: "Daily Care", tone: "purple", price: "₹1,199", unit: "/ 12 hr shift onwards", alt: "₹1,999 / 24 hr live-in", points: ["Trained nurse or attendant", "Medication & feeding", "Hygiene & mobility help", "Daily care log for family"], featured: true },
  { name: "Monthly Package", tone: "green", price: "₹28,000", unit: "/ month onwards", points: ["Dedicated caregiver", "Free replacement guarantee", "Weekly supervisor visit", "Priority 24×7 support"] },
];

const reasons = [
  { icon: ShieldCheck, title: "Police-verified staff", text: "Every caregiver undergoes ID, address and police background checks." },
  { icon: Award, title: "Certified nurses", text: "GNM, ANM & B.Sc nursing professionals with hospital experience." },
  { icon: RefreshCw, title: "Replacement guarantee", text: "Not satisfied? We arrange a replacement within 24–48 hours." },
  { icon: ClipboardCheck, title: "Regular supervision", text: "Senior nurse supervisors visit and review care quality." },
  { icon: IndianRupee, title: "Transparent pricing", text: "Clear quotes upfront. No hidden charges, ever." },
];

const testimonials = [
  { name: "Ritu Malhotra", place: "DLF Phase 3", text: "The nurse who cared for my father after his bypass surgery was patient, skilled and so kind. We felt completely at ease leaving him in her hands." },
  { name: "Ankit Sharma", place: "Sector 56", text: "Quick response at 11 PM when my mother needed an IV drip. The nurse arrived within an hour. Truly 24×7 service." },
  { name: "Meenakshi Rao", place: "Sohna Road", text: "Our japa caregiver made the first month with our newborn so much easier. Professional, clean and very caring." },
  { name: "Col. R. S. Yadav (Retd.)", place: "Sushant Lok", text: "Physiotherapy at home after my knee replacement helped me walk again in six weeks. Highly recommended." },
];

const faqs = [
  ["How quickly can a nurse be arranged?", "In most cases within 4–6 hours in Gurugram. For urgent needs like injections or dressing, we can often send someone within 1–2 hours."],
  ["Are your nurses qualified and verified?", "Yes. All nurses hold GNM/ANM or B.Sc Nursing qualifications and every caregiver is police-verified with ID and address checks."],
  ["What is the difference between a nurse and an attendant?", "A nurse handles medical tasks like injections, IVs and wound care. An attendant helps with daily living — hygiene, feeding, mobility and companionship."],
  ["Do you provide 24-hour live-in caregivers?", "Yes. We offer 12-hour day/night shifts as well as 24-hour live-in caregivers on daily or monthly packages."],
  ["Can I replace the caregiver if I'm not satisfied?", "Absolutely. We offer a free replacement within 24–48 hours on all daily and monthly packages."],
  ["Is the first assessment really free?", "Yes. Our coordinator understands the patient's condition over a call or visit and recommends the right care at no charge."],
  ["How do I pay?", "You can pay via UPI, bank transfer, card or cash. Monthly packages are billed in advance with a clear invoice."],
  ["Do you serve areas outside Gurugram?", "Yes, we also serve Delhi, Faridabad, Noida, Ghaziabad and nearby NCR areas."],
];

const areas = ["DLF Phase 1–5", "Sushant Lok", "Golf Course Road", "Sohna Road", "MG Road", "Sector 14 & 15", "South City", "Palam Vihar", "Nirvana Country", "New Gurgaon", "Manesar", "Udyog Vihar", "Delhi", "Faridabad", "Noida", "Ghaziabad"];

const nav = [
  ["Home", "#home"], ["Services", "#services"], ["How It Works", "#how"], ["Pricing", "#pricing"], ["Careers", "#careers"], ["Contact", "#contact"],
];

const tileCls = ["bg-accent/15 text-accent", "bg-primary/15 text-primary", "bg-green/15 text-green", "bg-pink/15 text-pink"];
const pinCls = ["text-accent", "text-primary", "text-green", "text-pink", "text-sky", "text-sun"];
const heroChips = [
  { icon: ShieldCheck, label: "Verified", sub: "Professionals", tone: "pink" },
  { icon: Clock, label: "24×7", sub: "Availability", tone: "green" },
  { icon: HeartHandshake, label: "Personalized", sub: "Care Plans", tone: "orange" },
  { icon: MapPin, label: "Service Across", sub: "Major Cities", tone: "sky" },
];
const chipTone: Record<string, string> = {
  pink: "bg-pink/15 text-pink", green: "bg-green/15 text-green", orange: "bg-accent/15 text-accent", sky: "bg-sky/15 text-sky", purple: "bg-primary/15 text-primary",
};

const inputCls = "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/20";

function Logo() {
  return (
    <a href="#home" className="flex min-w-0 items-center gap-2.5">
      <img src={rnMark} alt="RN Healthcare logo" width={44} height={44} className="h-11 w-11 shrink-0 drop-shadow-soft" />
      <span className="min-w-0 leading-tight">
        <span className="block truncate text-lg font-extrabold text-primary">RN <span className="text-green">Health</span></span>
        <span className="block truncate text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Home Care Service</span>
      </span>
    </a>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p className="font-script text-2xl text-green">{eyebrow}</p>
      <h2 className="mt-1 text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Success({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 py-8 text-center">
      <CheckCircle2 className="h-14 w-14 text-accent" />
      <p className="text-lg font-semibold text-foreground">Thank you, we will call you back shortly.</p>
      <button onClick={onReset} className="text-sm font-medium text-primary underline-offset-4 hover:underline">Submit another request</button>
    </div>
  );
}

const phoneRule = z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number");
const nameRule = z.string().trim().min(2, "Please enter your name").max(80);

function useDummyForm(schema: z.ZodTypeAny) {
  const [errors, setErrors] = useState<{ [k: string]: string | undefined; name?: string; phone?: string; city?: string; service?: string; qualification?: string; experience?: string; message?: string }>({});
  const [done, setDone] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[String(i.path[0])] ??= i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setDone(true);
  };
  return { errors, done, onSubmit, reset: () => setDone(false) };
}

function Field({ label, error, children }: { label: string; error?: string | undefined; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function ServiceSelect({ name = "service" }: { name?: string }) {
  return (
    <select name={name} defaultValue="" className={inputCls}>
      <option value="" disabled>Select a service</option>
      {services.map((s) => <option key={s.title}>{s.title}</option>)}
    </select>
  );
}

function EnquiryForm() {
  const f = useDummyForm(z.object({ name: nameRule, phone: phoneRule, city: z.string().trim().min(2, "Enter your area / city").max(60), service: z.string({ message: "Choose a service" }).min(1, "Choose a service") }));
  if (f.done) return <Success onReset={f.reset} />;
  return (
    <form onSubmit={f.onSubmit} noValidate className="space-y-3">
      <Field label="Full name" error={f.errors.name}><input name="name" maxLength={80} placeholder="Your name" className={inputCls} /></Field>
      <Field label="Mobile number" error={f.errors.phone}><input name="phone" inputMode="numeric" maxLength={10} placeholder="10-digit mobile" className={inputCls} /></Field>
      <Field label="Area / City" error={f.errors.city}><input name="city" maxLength={60} placeholder="e.g. Sector 56, Gurugram" className={inputCls} /></Field>
      <Field label="Service needed" error={f.errors.service}><ServiceSelect /></Field>
      <Button type="submit" variant="brand" size="xl" className="w-full">Get a Free Call Back</Button>
    </form>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on(); window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`sticky top-0 z-40 border-b transition-all ${scrolled ? "border-border bg-card/95 shadow-soft backdrop-blur" : "border-transparent bg-card/70 backdrop-blur"}`}>
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 lg:flex lg:justify-between">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map(([l, h]) => <a key={h} href={h} className="text-sm font-medium text-foreground/80 transition hover:text-primary">{l}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="cta" size="lg" className="hidden sm:inline-flex"><a href="#home">Book a Nurse</a></Button>
          <button aria-label="Menu" onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-xl border border-border lg:hidden">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-card px-4 py-3 lg:hidden">
          {nav.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 font-medium text-foreground hover:bg-secondary">{l}</a>)}
          <Button asChild variant="cta" size="xl" className="mt-2 w-full"><a href="#home" onClick={() => setOpen(false)}>Book a Nurse</a></Button>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-hero">
      <span aria-hidden className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-pink/20 blur-3xl" />
      <span aria-hidden className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      <span aria-hidden className="pointer-events-none absolute left-1/2 top-44 h-64 w-64 rounded-full bg-green/15 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:py-20">
        <div className="reveal">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" /> Available 24×7 in Gurugram & NCR
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-foreground sm:text-5xl xl:text-[3.4rem]">
            Professional <span className="text-accent">Nursing & Care,</span>
            <br />
            <span className="text-primary">At Your Home</span>
          </h1>
          <p className="mt-3 font-script text-3xl text-accent">Ghar par behtar care, har pal saath ♡</p>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Trained nurses, caregivers, physiotherapists, yoga instructors and dietitians who treat your loved ones with comfort, safety and dignity — right at your doorstep.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild variant="cta" size="xl"><a href="#enquiry">Book a Nurse</a></Button>
            <Button asChild variant="soft" size="xl"><a href={`tel:${PHONE.replace(/\s/g, "")}`}><Phone /> Call Now</a></Button>
          </div>
          <div className="mt-8 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
            {heroChips.map((c) => (
              <div key={c.label} className="flex items-center gap-2.5 rounded-2xl bg-card/80 px-3 py-2.5 shadow-soft">
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${chipTone[c.tone]}`}><c.icon className="h-4 w-4" /></span>
                <span className="min-w-0 text-xs font-semibold leading-tight text-foreground">{c.label}<span className="block font-medium text-muted-foreground">{c.sub}</span></span>
              </div>
            ))}
          </div>
          <div className="relative mt-10 overflow-hidden rounded-3xl shadow-lift lg:hidden">
            <img src={hero} alt="Nurse caring for an elderly woman at home" width={1280} height={1024} className="h-64 w-full object-cover" />
          </div>
        </div>
        <div className="relative reveal" id="enquiry">
          <span className="absolute left-2 -top-2 z-10 hidden -rotate-6 font-script text-2xl text-heart lg:block">Care like family ♡</span>
          <img src={hero} alt="Nurse caring for an elderly woman at home" width={1280} height={1024} className="absolute -right-24 -top-10 hidden h-[115%] w-[130%] max-w-none rounded-[3rem] object-cover opacity-95 lg:block" />
          <div className="relative rounded-3xl border border-border bg-card/95 p-6 shadow-lift backdrop-blur lg:ml-auto lg:mt-40 lg:max-w-sm">
            <h3 className="text-lg font-bold text-foreground">Quick Enquiry</h3>
            <p className="mb-4 text-sm text-muted-foreground">Free assessment · Call back in 15 mins</p>
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    { icon: Users, t: "500+", s: "Families Served" },
    { icon: BadgeCheck, t: "Verified", s: "& Trained Nurses" },
    { icon: Clock, t: "24/7", s: "Support" },
    { icon: Wallet, t: "Affordable", s: "Packages" },
  ];
  return (
    <section className="bg-brand">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 text-primary-foreground lg:grid-cols-4">
        {items.map(({ icon: I, t, s }) => (
          <div key={s} className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-foreground/15"><I className="h-6 w-6" /></span>
            <div className="min-w-0"><p className="text-xl font-bold">{t}</p><p className="text-sm opacity-85">{s}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  const [active, setActive] = useState<number | null>(null);
  const s = active === null ? null : services[active];
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-14 sm:py-20">
      <SectionHead eyebrow="What we do" title="Home Healthcare Services" sub="Every service is delivered by trained, verified professionals and tailored to your family's needs." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <button key={s.title} onClick={() => setActive(i)} className="group rounded-3xl border border-border bg-card p-6 text-left transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift">
            <span className={`grid h-14 w-14 place-items-center rounded-2xl transition ${tileCls[i % 4]} group-hover:scale-110`}><s.icon className="h-7 w-7" /></span>
            <h3 className="mt-5 font-semibold text-foreground">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-primary">Learn more →</span>
          </button>
        ))}
      </div>
      <Dialog open={s !== null} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="rounded-3xl">
          {s && (
            <>
              <DialogHeader>
                <span className={`mb-2 grid h-14 w-14 place-items-center rounded-2xl ${tileCls[(active ?? 0) % 4]}`}><s.icon className="h-7 w-7" /></span>
                <DialogTitle className="text-xl">{s.title}</DialogTitle>
                <DialogDescription className="text-base leading-relaxed">{s.detail}</DialogDescription>
              </DialogHeader>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild variant="cta" size="lg"><a href="#enquiry" onClick={() => setActive(null)}>Book this service</a></Button>
                <Button asChild variant="soft" size="lg"><a href={`tel:${PHONE.replace(/\s/g, "")}`}>Call us</a></Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="bg-muted py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHead eyebrow="Simple & quick" title="How It Works" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="relative rounded-3xl bg-card p-7 shadow-soft">
              <span className={`absolute right-6 top-5 text-5xl font-extrabold ${["text-accent/30", "text-primary/30", "text-green/30", "text-pink/30"][i % 4]}`}>0{i + 1}</span>
              <span className={`grid h-12 w-12 place-items-center rounded-full ${tileCls[i % 4]}`}><s.icon className="h-5 w-5" /></span>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const planTones: Record<PlanTone, { card: string; name: string; check: string; btn: "cta" | "brand" | "green" }> = {
  orange: { card: "border-accent/30 bg-accent/[0.07]", name: "text-accent", check: "text-accent", btn: "cta" },
  purple: { card: "border-primary/30 bg-primary/[0.07]", name: "text-primary", check: "text-primary", btn: "brand" },
  green: { card: "border-green/30 bg-green/[0.07]", name: "text-green", check: "text-green", btn: "green" },
};

function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 py-14 sm:py-20">
      <SectionHead eyebrow="Honest pricing" title="Care Plans for Every Need" sub="Indicative starting prices. Final quote depends on patient condition and caregiver type." />
      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((p) => {
          const t = planTones[p.tone];
          return (
            <div key={p.name} className={`relative flex flex-col rounded-3xl border p-8 shadow-soft transition hover:-translate-y-1 hover:shadow-lift ${t.card}`}>
              {p.featured && <span className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">Most popular</span>}
              <h3 className={`text-lg font-semibold ${t.name}`}>{p.name}</h3>
              <p className="mt-4"><span className="text-4xl font-extrabold text-foreground">{p.price}</span> <span className="text-sm opacity-80">{p.unit}</span></p>
              {p.alt && <p className="mt-1 text-sm opacity-85">{p.alt}</p>}
              <ul className="mt-6 flex-1 space-y-3 text-sm text-foreground">
                {p.points.map((pt) => <li key={pt} className="flex gap-2"><CheckCircle2 className={`h-5 w-5 shrink-0 ${t.check}`} />{pt}</li>)}
              </ul>
              <Button asChild variant={t.btn} size="xl" className="mt-8 w-full"><a href="#enquiry">Get Quote</a></Button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="bg-muted py-14 sm:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2">
        <img src={team} alt="RN Health nursing team" width={1024} height={768} loading="lazy" className="rounded-3xl object-cover shadow-lift" />
        <div>
          <p className="font-script text-2xl text-accent">Because you matter</p>
          <h2 className="mt-1 text-3xl font-bold text-foreground sm:text-4xl">Why Families Choose RN Health</h2>
          <div className="mt-8 space-y-5">
            {reasons.map((r, i) => (
              <div key={r.title} className="flex gap-4">
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl shadow-soft ${tileCls[i % 4]}`}><r.icon className="h-5 w-5" /></span>
                <div className="min-w-0"><h3 className="font-semibold text-foreground">{r.title}</h3><p className="text-sm text-muted-foreground">{r.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % testimonials.length), 6000); return () => clearInterval(t); }, []);
  const t = testimonials[i] ?? testimonials[0]!;
  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:py-20">
      <SectionHead eyebrow="Kind words" title="What Families Say" />
      <div className="relative rounded-3xl border border-border bg-card p-6 text-center shadow-soft sm:p-12">
        <div className="flex justify-center gap-1">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-5 w-5 fill-chart-4 text-chart-4" />)}</div>
        <p key={i} className="reveal mt-6 text-lg leading-relaxed text-foreground sm:text-xl">“{t.text}”</p>
        <p className="mt-6 font-semibold text-primary">{t.name}</p>
        <p className="text-sm text-muted-foreground">{t.place}, Gurugram</p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <button aria-label="Previous" onClick={() => setI((i - 1 + testimonials.length) % testimonials.length)} className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-secondary"><ChevronLeft className="h-5 w-5" /></button>
          <div className="flex gap-2">{testimonials.map((_, k) => <span key={k} className={`h-2 rounded-full transition-all ${k === i ? "w-6 bg-primary" : "w-2 bg-border"}`} />)}</div>
          <button aria-label="Next" onClick={() => setI((i + 1) % testimonials.length)} className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-secondary"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>
    </section>
  );
}

function Careers() {
  const f = useDummyForm(z.object({
    name: nameRule, phone: phoneRule,
    qualification: z.string({ message: "Select qualification" }).min(1),
    experience: z.string({ message: "Select experience" }).min(1),
    city: z.string().trim().min(2, "Enter your city").max(60),
  }));
  return (
    <section id="careers" className="bg-brand py-14 sm:py-20 text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2">
        <div>
          <p className="font-script text-2xl">Grow with us</p>
          <h2 className="mt-1 text-3xl font-bold sm:text-4xl">Join Our Team</h2>
          <p className="mt-4 max-w-lg opacity-90">We're hiring GNM/ANM nurses, patient attendants, japa caregivers, physiotherapists, yoga instructors and dietitians across Gurugram. Get timely salary, flexible shifts, training and respect for the work you do.</p>
          <ul className="mt-6 space-y-3">
            {["Salary on time, every month", "Free skill-upgrade training", "Day, night & live-in shifts", "Supportive supervisor team"].map((x) => <li key={x} className="flex gap-2"><CheckCircle2 className="h-5 w-5 shrink-0" />{x}</li>)}
          </ul>
        </div>
        <div className="rounded-3xl bg-card p-6 text-card-foreground shadow-lift sm:p-8">
          {f.done ? <Success onReset={f.reset} /> : (
            <form onSubmit={f.onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" error={f.errors.name}><input name="name" maxLength={80} className={inputCls} placeholder="Your name" /></Field>
              <Field label="Mobile number" error={f.errors.phone}><input name="phone" inputMode="numeric" maxLength={10} className={inputCls} placeholder="10-digit mobile" /></Field>
              <Field label="Qualification" error={f.errors.qualification}>
                <select name="qualification" defaultValue="" className={inputCls}><option value="" disabled>Select</option>{["GNM", "ANM", "B.Sc Nursing", "Physiotherapist (BPT/MPT)", "Yoga Instructor (Certified)", "Dietitian / Nutritionist", "Patient Attendant", "Japa / Baby Care"].map((q) => <option key={q}>{q}</option>)}</select>
              </Field>
              <Field label="Experience" error={f.errors.experience}>
                <select name="experience" defaultValue="" className={inputCls}><option value="" disabled>Select</option>{["Fresher", "1–2 years", "3–5 years", "5+ years"].map((q) => <option key={q}>{q}</option>)}</select>
              </Field>
              <Field label="City" error={f.errors.city}><input name="city" maxLength={60} className={inputCls} placeholder="e.g. Gurugram" /></Field>
              <Field label="Upload CV (optional)"><input name="cv" type="file" accept=".pdf,.doc,.docx" className={`${inputCls} file:mr-3 file:rounded-full file:border-0 file:bg-secondary file:px-3 file:py-1 file:text-xs file:font-semibold file:text-primary`} /></Field>
              <Button type="submit" variant="cta" size="xl" className="w-full sm:col-span-2">Apply Now</Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <SectionHead eyebrow="Got questions?" title="Frequently Asked Questions" />
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map(([q, a], i) => (
          <AccordionItem key={q} value={`f${i}`} className="rounded-2xl border border-border bg-card px-5">
            <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">{q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

function Areas() {
  return (
    <section className="bg-muted py-10 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <SectionHead eyebrow="Near you" title="Areas We Serve" sub="Gurugram and nearby NCR localities — with caregivers living close by for faster response." />
        <div className="flex flex-wrap justify-center gap-3">
          {areas.map((a, i) => <span key={a} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-soft"><MapPin className={`h-4 w-4 ${pinCls[i % 6]}`} />{a}</span>)}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const f = useDummyForm(z.object({ name: nameRule, phone: phoneRule, service: z.string({ message: "Choose a service" }).min(1, "Choose a service"), message: z.string().trim().max(500).optional() }));
  const info = [
    { icon: PhoneCall, l: "Call us 24×7", v: PHONE, href: `tel:${PHONE.replace(/\s/g, "")}` },
    { icon: MessageCircle, l: "WhatsApp / Alternate number", v: PHONE_ALT, href: WHATSAPP },
    { icon: Mail, l: "Email", v: EMAIL, href: `mailto:${EMAIL}` },
    { icon: MapPin, l: "Office", v: "Sector 45, Gurugram, Haryana 122003" },
  ];
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-14 sm:py-20">
      <SectionHead eyebrow="We're here for you" title="Contact Us" />
      <div className="grid min-w-0 gap-8 lg:grid-cols-2">
        <div className="min-w-0 space-y-4">
          {info.map((x, i) => (
            <a key={x.l} href={x.href} className="flex min-w-0 items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
              <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${tileCls[i % 4]}`}><x.icon className="h-5 w-5" /></span>
              <div className="min-w-0"><p className="text-xs text-muted-foreground">{x.l}</p><p className="break-words font-semibold text-foreground">{x.v}</p></div>
            </a>
          ))}
          <div className="relative grid h-56 place-items-center overflow-hidden rounded-2xl border border-border bg-secondary">
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
            <div className="relative text-center"><MapPin className="mx-auto h-10 w-10 fill-heart/20 text-heart" /><p className="mt-2 font-semibold text-primary">RN Health Home Care, Gurugram</p><p className="text-xs text-muted-foreground">Map preview</p></div>
          </div>
        </div>
        <div className="min-w-0 rounded-3xl border border-border bg-card p-6 shadow-lift sm:p-8">
          {f.done ? <Success onReset={f.reset} /> : (
            <form onSubmit={f.onSubmit} noValidate className="space-y-4">
              <Field label="Full name" error={f.errors.name}><input name="name" maxLength={80} className={inputCls} placeholder="Your name" /></Field>
              <Field label="Mobile number" error={f.errors.phone}><input name="phone" inputMode="numeric" maxLength={10} className={inputCls} placeholder="10-digit mobile" /></Field>
              <Field label="Service needed" error={f.errors.service}><ServiceSelect /></Field>
              <Field label="Message (optional)" error={f.errors.message}><textarea name="message" maxLength={500} rows={4} className={inputCls} placeholder="Tell us about the patient's needs" /></Field>
              <Button type="submit" variant="brand" size="xl" className="w-full">Send Message</Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:py-14 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground">Your health, our priority. Compassionate home healthcare in Gurugram, 24×7.</p>
          <div className="mt-4 flex gap-2">
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-primary transition hover:bg-primary hover:text-primary-foreground"><Instagram className="h-4 w-4" /></a>
            {[Facebook, Youtube, Linkedin].map((I, k) => <a key={k} href="#" aria-label="Social link" className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-primary transition hover:bg-primary hover:text-primary-foreground"><I className="h-4 w-4" /></a>)}
          </div>
        </div>
        <div><h4 className="font-semibold text-foreground">Quick Links</h4><ul className="mt-4 space-y-2 text-sm text-muted-foreground">{nav.map(([l, h]) => <li key={h}><a href={h} className="hover:text-primary">{l}</a></li>)}</ul></div>
        <div><h4 className="font-semibold text-foreground">Services</h4><ul className="mt-4 space-y-2 text-sm text-muted-foreground">{services.slice(0, 6).map((s) => <li key={s.title}><a href="#services" className="hover:text-primary">{s.title}</a></li>)}</ul></div>
        <div><h4 className="font-semibold text-foreground">Contact</h4><ul className="mt-4 space-y-2 text-sm text-muted-foreground"><li><a href={`tel:${PHONE.replace(/\s/g, "")}`} className="hover:text-primary">{PHONE} (primary)</a></li><li><a href={`tel:${PHONE_ALT.replace(/\s/g, "")}`} className="hover:text-primary">{PHONE_ALT}</a></li><li><a href={`mailto:${EMAIL}`} className="hover:text-primary">{EMAIL}</a></li><li>Sector 45, Gurugram, Haryana</li><li>Open 24 hours, 7 days</li></ul></div>
      </div>
      <p className="border-t border-border px-4 pb-44 pt-5 text-center text-xs text-muted-foreground sm:pb-5">© 2026 RN Health Home Care Service. All rights reserved.</p>
    </footer>
  );
}

function Floating() {
  const tel = `tel:${PHONE.replace(/\s/g, "")}`;
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2.5 sm:bottom-5 sm:right-5 sm:gap-3">
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        className="animate-cta flex items-center gap-2 rounded-full bg-green py-3 pl-3.5 pr-4 text-sm font-bold text-green-foreground shadow-lift transition hover:scale-105 sm:gap-2.5 sm:py-3.5 sm:pl-4 sm:pr-5 sm:text-base"
        style={{ "--pulse-color": "oklch(0.62 0.15 152 / 0.55)" } as CSSProperties}
      >
        <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
        <span className="leading-none">WhatsApp<span className="mt-1 hidden text-[11px] font-semibold opacity-90 sm:block">Chat with a nurse</span></span>
      </a>
      <a
        href={tel}
        className="animate-cta flex items-center gap-2 rounded-full bg-heart py-3 pl-3.5 pr-4 text-sm font-bold text-primary-foreground shadow-lift transition hover:scale-105 sm:gap-2.5 sm:py-3.5 sm:pl-4 sm:pr-5 sm:text-base"
        style={{ "--pulse-color": "oklch(0.58 0.21 22 / 0.55)" } as CSSProperties}
      >
        <Phone className="h-6 w-6 sm:h-7 sm:w-7" />
        <span className="leading-none">Call 24×7<span className="mt-1 hidden text-[11px] font-semibold opacity-90 sm:block">{PHONE}</span></span>
      </a>
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />
      <main>
        <Hero /><TrustBar /><Services /><HowItWorks /><Pricing /><WhyUs /><Testimonials /><Careers /><Faq /><Areas /><Contact />
      </main>
      <Footer />
      <Floating />
    </div>
  );
}
