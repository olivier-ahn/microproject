import React, { useMemo, useState } from "react";
import { MotionConfig, AnimatePresence, motion } from "framer-motion";
import { Bike, CalendarClock, MapPin, Phone, Mail, Instagram, Settings2, Wrench, CreditCard, Info, CheckCircle2, ChevronRight, ChevronDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

/**
 * TROTTILIFE 229 – PROTOTYPE MONO-FICHIER
 * --------------------------------------
 * ✅ 100% éditable : changez tout dans CONFIG ci-dessous
 * ✅ Formulaire de réservation opérationnel (WhatsApp + mailto)
 * ✅ Section "Activités" pour tenir la communauté au courant
 * ✅ Design responsive, moderne, inspiré de la DA fournie (jaune/charcoal)
 * ✅ Zéro backend : déployable instantanément (Vercel/Netlify/GitHub Pages)
 *
 * ASTUCE PRO :
 * - Remplacez les infos dans CONFIG et exportez ce composant.
 * - Vous pouvez aussi saisir des activités à la volée via le mini-CMS (bouton "Mode édition").
 */

const CONFIG = {
  brand: {
    name: "Trottilife 229",
    tagline: "Réservez. Roulez. Respirez.",
    // Couleurs inspirées du visuel partagé
    primary: "#FFC545", // jaune solaire
    primarySoft: "#FFE39A",
    dark: "#1E1E1E",
    text: "#212121",
    // Remplacez ce chemin quand vous m’enverrez le logo définitif
    logo: "https://dummyimage.com/300x120/ffc545/1e1e1e&text=Trottilife+229",
  },
  contact: {
    whatsapp: "+229 90 00 00 00",
    phone: "+229 90 00 00 00",
    email: "contact@trottilife229.com",
    instagram: "trottilife229",
    baseCity: "Cotonou — Fidjrossè",
  },
  booking: {
    pickupPoints: [
      "Fidjrossè Plage",
      "Ganhi (Place de l'Étoile Rouge)",
      "Akpakpa (St Michel)",
      "Abomey-Calavi (UAC)",
    ],
    plans: [
      { id: "1h", label: "1 heure", price: 1500 },
      { id: "halfday", label: "Demi-journée (4h)", price: 4500 },
      { id: "day", label: "Journée (08h-20h)", price: 9000 },
      { id: "weekend", label: "Weekend (sam→dim)", price: 16000 },
    ],
    addOns: [
      { id: "helmet", label: "Casque", price: 0 },
      { id: "insurance", label: "Assurance jour", price: 1000 },
      { id: "delivery", label: "Livraison à domicile", price: 1500 },
    ],
  },
  activities: [
    {
      title: "Ride communautaire – Fidjrossè Sunset",
      date: "2025-11-10",
      excerpt:
        "Sortie chill au couchant, test des nouveaux modèles et remise de -10% sur toute réservation sur place.",
      link: "#",
    },
    {
      title: "Atelier sécurité urbaine",
      date: "2025-11-24",
      excerpt:
        "Freinage d’urgence, lecture de la chaussée, équipements obligatoires. Formation express 45 min.",
      link: "#",
    },
  ],
  faq: [
    {
      q: "Quels documents pour louer?",
      a: "Une pièce d’identité et un dépôt de garantie mobile money ou cash. Contrat signé sur place en 2 minutes.",
    },
    {
      q: "Comment se passe la caution?",
      a: "Autorisation de prélèvement non débitée sauf dommage. Restituée à la fin de la location.",
    },
    {
      q: "Et en cas de pluie?",
      a: "On roule prudemment ou on décale sans frais si l’averse est forte. Sécurité d’abord.",
    },
  ],
};

function WhatsAppLink({ payload }: { payload: string }) {
  const phone = CONFIG.contact.whatsapp.replace(/\D/g, "");
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(payload)}`;
  return (
    <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 underline">WhatsApp <ExternalLink className="w-4 h-4"/></a>
  );
}

function Header({ onToggleEdit, isEditing }: { onToggleEdit: () => void; isEditing: boolean }) {
  return (
    <header className="w-full sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={CONFIG.brand.logo} alt="Trottilife 229" className="h-10 w-auto"/>
          <div className="text-sm opacity-80">{CONFIG.brand.tagline}</div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="rounded-2xl" onClick={onToggleEdit}>
            <Settings2 className="w-4 h-4 mr-2"/>{isEditing ? "Quitter l’édition" : "Mode édition"}
          </Button>
          <a href="#reserver"><Button className="rounded-2xl" style={{ background: CONFIG.brand.primary, color: CONFIG.brand.dark }}>Réserver</Button></a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="w-full" style={{ background: CONFIG.brand.primary }}>
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-black">
            Mobilité durable au Bénin
            <br/>avec <span className="underline decoration-black/40">{CONFIG.brand.name}</span>
          </h1>
          <p className="mt-4 text-lg text-black/80">
            Réservez une trottinette en quelques clics. Zéro bruit, zéro essence, 100% liberté.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#reserver"><Button size="lg" className="rounded-2xl" style={{ background: CONFIG.brand.dark, color: "#fff" }}>
              <CalendarClock className="w-4 h-4 mr-2"/> Réserver maintenant
            </Button></a>
            <a href="#activites"><Button size="lg" variant="secondary" className="rounded-2xl border-black/20">
              <Info className="w-4 h-4 mr-2"/> Nos activités
            </Button></a>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-black/80">
            <div className="inline-flex items-center gap-2"><MapPin className="w-4 h-4"/>{CONFIG.contact.baseCity}</div>
            <div className="inline-flex items-center gap-2"><Phone className="w-4 h-4"/>{CONFIG.contact.phone}</div>
            <div className="inline-flex items-center gap-2"><Mail className="w-4 h-4"/>{CONFIG.contact.email}</div>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }} className="relative">
          <Card className="rounded-3xl shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bike className="w-5 h-5"/> Nos atouts</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Batteries longue durée (jusqu’à 45 km)</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Casque et antivol inclus</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Assistance en ville 7j/7</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Paiement Mobile Money</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="tarifs" className="max-w-6xl mx-auto px-4 py-14">
      <h2 className="text-3xl font-extrabold">Tarifs clairs, zéro surprise</h2>
      <p className="text-black/70 mt-1">Casque et antivol offerts. Options disponibles à la réservation.</p>
      <div className="grid md:grid-cols-4 gap-4 mt-6">
        {CONFIG.booking.plans.map((p) => (
          <Card key={p.id} className="rounded-3xl">
            <CardHeader>
              <CardTitle>{p.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold">{p.price.toLocaleString()} CFA</div>
              <div className="text-sm text-black/60 mt-1">par {p.label.toLowerCase()}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function BookingForm() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [pickup, setPickup] = useState(CONFIG.booking.pickupPoints[0]);
  const [plan, setPlan] = useState(CONFIG.booking.plans[0].id);
  const [qty, setQty] = useState(1);
  const [addOns, setAddOns] = useState<string[]>([]);
  const [note, setNote] = useState("");

  const planObj = useMemo(() => CONFIG.booking.plans.find((p) => p.id === plan)!, [plan]);
  const addOnTotal = useMemo(
    () => addOns.reduce((sum, id) => sum + (CONFIG.booking.addOns.find((a) => a.id === id)?.price || 0), 0),
    [addOns]
  );
  const total = useMemo(() => qty * planObj.price + addOnTotal, [qty, planObj, addOnTotal]);

  function toggleAddOn(id: string) {
    setAddOns((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  const payload = useMemo(() => {
    const lines = [
      `Bonjour Trottilife 229, je souhaite réserver :`,
      `• Nom: ${name || "—"}`,
      `• Date: ${date || "—"} à ${time || "—"}`,
      `• Forfait: ${planObj.label}`,
      `• Quantité: ${qty}`,
      `• Retrait: ${pickup}`,
      `• Options: ${addOns.map((id) => CONFIG.booking.addOns.find((a) => a.id === id)?.label).join(", ") || "aucune"}`,
      `• Note: ${note || "—"}`,
      `• Total estimé: ${total.toLocaleString()} CFA`,
    ];
    return lines.join("\n");
  }, [name, date, time, planObj, qty, pickup, addOns, note, total]);

  return (
    <section id="reserver" className="max-w-6xl mx-auto px-4 py-14">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <h2 className="text-3xl font-extrabold">Réserver une trottinette</h2>
          <p className="text-black/70 mt-1">Votre message est pré-rempli. Confirmation par WhatsApp ou e-mail.</p>

          <div className="mt-6 grid gap-4">
            <Input placeholder="Votre nom complet" value={name} onChange={(e) => setName(e.target.value)} />

            <div className="grid grid-cols-2 gap-3">
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Select value={plan} onValueChange={setPlan}>
                <SelectTrigger><SelectValue placeholder="Choisir un forfait"/></SelectTrigger>
                <SelectContent>
                  {CONFIG.booking.plans.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.label} — {p.price.toLocaleString()} CFA</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input type="number" min={1} value={qty} onChange={(e) => setQty(parseInt(e.target.value || "1"))} />
            </div>

            <Select value={pickup} onValueChange={setPickup}>
              <SelectTrigger><SelectValue placeholder="Point de retrait"/></SelectTrigger>
              <SelectContent>
                {CONFIG.booking.pickupPoints.map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="grid gap-2">
              <div className="text-sm font-medium">Options</div>
              {CONFIG.booking.addOns.map((a) => (
                <label key={a.id} className="flex items-center justify-between rounded-xl border p-3 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={addOns.includes(a.id)} onChange={() => toggleAddOn(a.id)} />
                    <span>{a.label}</span>
                  </div>
                  <div className="text-sm opacity-70">{a.price.toLocaleString()} CFA</div>
                </label>
              ))}
            </div>

            <Textarea placeholder="Une note pour nous (ex: livrer à 9h au bureau)" value={note} onChange={(e) => setNote(e.target.value)} />

            <div className="flex items-center justify-between">
              <div className="text-sm">Total estimé</div>
              <div className="text-2xl font-extrabold">{total.toLocaleString()} CFA</div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                className="w-full md:w-auto"
                href={`mailto:${CONFIG.contact.email}?subject=Reservation Trottilife 229&body=${encodeURIComponent(payload)}`}
              >
                <Button className="w-full rounded-2xl" variant="secondary"><Mail className="w-4 h-4 mr-2"/>Confirmer par e‑mail</Button>
              </a>

              <a className="w-full md:w-auto" href={`https://wa.me/${CONFIG.contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(payload)}`} target="_blank" rel="noreferrer">
                <Button className="w-full rounded-2xl" style={{ background: CONFIG.brand.dark, color: "#fff" }}>
                  <Instagram className="w-4 h-4 mr-2 rotate-90"/> Confirmer via WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div>
          <Card className="rounded-3xl border-black/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Wrench className="w-5 h-5"/> Conseils & sécurité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>Port du casque recommandé. Respectez le code de la route et les piétons.</p>
              <p>Vitesse adaptée à l’environnement urbain. Attention au sable en bord de plage.</p>
              <p>Stationnez sans gêner, surtout autour des marchés et écoles.</p>
            </CardContent>
          </Card>
          <Pricing />
        </div>
      </div>
    </section>
  );
}

function Activities({ editable }: { editable: boolean }) {
  const [items, setItems] = useState(CONFIG.activities);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({ title: "", date: "", excerpt: "", link: "" });

  function addItem() {
    if (!draft.title) return;
    setItems((prev) => [{ ...draft }, ...prev]);
    setDraft({ title: "", date: "", excerpt: "", link: "" });
    setOpen(false);
  }

  return (
    <section id="activites" className="max-w-6xl mx-auto px-4 py-14">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold">Activités & actu</h2>
        {editable && (
          <Button className="rounded-2xl" variant="secondary" onClick={() => setOpen(true)}>
            Ajouter une activité
          </Button>
        )}
      </div>
      <p className="text-black/70 mt-1">Balades, promos, ateliers sécurité — restez branchés.</p>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {items.map((a, i) => (
          <Card key={i} className="rounded-3xl">
            <CardHeader>
              <CardTitle className="text-lg">{a.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm uppercase tracking-wide opacity-60">{a.date}</div>
              <p className="mt-2 text-sm">{a.excerpt}</p>
              {a.link && (
                <a href={a.link} className="inline-flex items-center gap-1 mt-3 text-sm underline">
                  En savoir plus <ChevronRight className="w-4 h-4"/>
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 backdrop-blur flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-lg p-6 space-y-3">
              <div className="text-xl font-bold">Nouvelle activité</div>
              <Input placeholder="Titre" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <Input type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
                <Input placeholder="Lien (optionnel)" value={draft.link} onChange={(e) => setDraft({ ...draft, link: e.target.value })} />
              </div>
              <Textarea placeholder="Résumé" value={draft.excerpt} onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })} />
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setOpen(false)}>Annuler</Button>
                <Button onClick={addItem} className="rounded-2xl" style={{ background: CONFIG.brand.dark, color: "#fff" }}>Ajouter</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="max-w-6xl mx-auto px-4 py-14">
      <h2 className="text-3xl font-extrabold">FAQ</h2>
      <div className="mt-4 divide-y rounded-2xl border">
        {CONFIG.faq.map((it, idx) => (
          <button key={idx} className="w-full text-left p-4 focus:outline-none" onClick={() => setOpen(open === idx ? null : idx)}>
            <div className="flex items-center justify-between">
              <div className="font-medium">{it.q}</div>
              <ChevronDown className={`w-4 h-4 transition ${open === idx ? "rotate-180" : ""}`} />
            </div>
            <AnimatePresence>
              {open === idx && (
                <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="text-sm text-black/70 pt-2">
                  {it.a}
                </motion.p>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-10 border-t">
      <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
        <div>
          <img src={CONFIG.brand.logo} alt="logo" className="h-8 w-auto"/>
          <p className="text-sm mt-2 opacity-70">{CONFIG.brand.tagline}</p>
        </div>
        <div className="text-sm space-y-2">
          <div className="flex items-center gap-2"><MapPin className="w-4 h-4"/>{CONFIG.contact.baseCity}</div>
          <div className="flex items-center gap-2"><Phone className="w-4 h-4"/>{CONFIG.contact.phone}</div>
          <div className="flex items-center gap-2"><Mail className="w-4 h-4"/>{CONFIG.contact.email}</div>
          <a className="flex items-center gap-2 underline" href={`https://instagram.com/${CONFIG.contact.instagram}`} target="_blank" rel="noreferrer"><Instagram className="w-4 h-4"/> @{CONFIG.contact.instagram}</a>
        </div>
        <div className="text-sm opacity-70">© {new Date().getFullYear()} {CONFIG.brand.name}. Tous droits réservés.</div>
      </div>
    </footer>
  );
}

export default function App() {
  const [editing, setEditing] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen font-sans text-[15px]" style={{ color: CONFIG.brand.text }}>
        <Header onToggleEdit={() => setEditing((v) => !v)} isEditing={editing} />
        <Hero />
        <BookingForm />
        <Activities editable={editing} />
        <FAQ />
        <Footer />
        <style>{`
          :root { --brand: ${CONFIG.brand.primary}; }
          .btn-brand { background: ${CONFIG.brand.primary}; color: ${CONFIG.brand.dark}; }
          .hero-grad { background: radial-gradient(1200px 600px at 10% 0%, ${CONFIG.brand.primarySoft}, transparent); }
        `}</style>
      </div>
    </MotionConfig>
  );
}
