import { assetPath } from "@/lib/utils";

/**
 * Central content + data source for the Acharya Dental website.
 * Keeping content here keeps section components clean and consistent.
 *
 * NOTE: Per the design brief, where real Acharya Dental assets are not
 * available we use clearly-worded placeholder copy that does NOT invent
 * factual claims (qualifications, patient counts, awards, certifications).
 */

export const BRAND = {
  name: "Acharya Dental",
  city: "Chennai",
  country: "India",
  phone: "+91 44 0000 0000",
  phoneHref: "tel:+914400000000",
  whatsapp: "+91 98765 43210",
  whatsappHref: "https://wa.me/919876543210",
  email: "care@acharyadental.example",
  addressLine1: "No. 1, Sterling Road",
  addressLine2: "Nungambakkam, Chennai",
  addressLine3: "Tamil Nadu 600034, India",
  mapQuery: "Nungambakkam, Chennai, Tamil Nadu, India",
  hours: [
    { day: "Monday — Friday", time: "9:00 AM — 8:00 PM" },
    { day: "Saturday", time: "9:00 AM — 6:00 PM" },
    { day: "Sunday", time: "By appointment only" },
  ],
  emergency: "+91 98765 00000",
  emergencyHref: "tel:+919876500000",
  rating: "4.8",
  ratingPlatform: "Google Rating",
} as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Specialists", href: "#specialists" },
  { label: "Treatments", href: "#treatments" },
  { label: "Gallery", href: "#gallery" },
  { label: "International Patients", href: "#international" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
] as const;

export const HERO_METRICS = [
  { value: 50, suffix: "+", label: "Years Legacy", decimals: 0 },
  { value: 5000, suffix: "+", label: "Smiles Restored", decimals: 0 },
  { value: 1000, suffix: "+", label: "International Patients", decimals: 0 },
  { value: 4.8, suffix: "", label: "Google Rating", decimals: 1 },
] as const;

export const SPECIALISTS = [
  {
    name: "Dr. Arjun Acharya",
    qualification: "BDS, MDS — Oral & Maxillofacial Surgery",
    experience: "25+ years",
    specialization: "Implantology & Full Mouth Rehabilitation",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=85",
    bio: "Leads complex implant and full-arch rehabilitation cases with a focus on long-term structural integrity.",
  },
  {
    name: "Dr. Lakshmi Acharya",
    qualification: "BDS, MDS — Conservative Dentistry & Endodontics",
    experience: "18+ years",
    specialization: "Cosmetic & Smile Design",
    image: "https://images.unsplash.com/photo-1594824813566-78853b49fcf9?auto=format&fit=crop&w=800&q=85",
    bio: "Specialises in smile makeovers, veneers, and conservative aesthetic restorations.",
  },
  {
    name: "Dr. Vikram Iyer",
    qualification: "BDS, MDS — Orthodontics & Dentofacial Orthopaedics",
    experience: "15+ years",
    specialization: "Orthodontics & Aligners",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=85",
    bio: "Designs aligner and fixed-appliance treatment plans for adults and adolescents.",
  },
  {
    name: "Dr. Meera Krishnan",
    qualification: "BDS, MDS — Prosthodontics & Crown & Bridge",
    experience: "22+ years",
    specialization: "Prosthodontics & Full Mouth Restoration",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=85",
    bio: "Focuses on complex prosthodontic rehabilitation and occlusal stability.",
  },
];

export const TREATMENTS = [
  {
    name: "Dental Implants",
    description:
      "Single-tooth, multiple, and full-arch implant solutions planned with digital imaging for predictable, long-lasting outcomes.",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Smile Makeover",
    description:
      "A considered combination of veneers, whitening and contouring designed around your facial proportions.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Full Mouth Rehabilitation",
    description:
      "Comprehensive restoration of function and aesthetics for complex, worn or compromised dentitions.",
    image: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Orthodontics",
    description:
      "Clear aligners and modern fixed appliances for children, teens and adults — planned digitally.",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=85",
  },
];

export const WHY_ACHARYA = [
  {
    number: "01",
    title: "50+ Years Legacy",
    description:
      "Three generations of patient trust, built on consistent clinical standards and lasting relationships.",
    icon: "Award",
  },
  {
    number: "02",
    title: "International Patients",
    description:
      "Concierge support for patients travelling from abroad — airport, accommodation and treatment coordination.",
    icon: "Globe2",
  },
  {
    number: "03",
    title: "Digital Treatment Planning",
    description:
      "Intraoral scanning, CBCT imaging and digital smile design guide every major treatment decision.",
    icon: "ScanLine",
  },
  {
    number: "04",
    title: "World-Class Sterilization",
    description:
      "Hospital-grade protocols and single-use barriers protect every patient at every appointment.",
    icon: "ShieldCheck",
  },
] as const;

export const SMILE_CASES = [
  {
    id: "case-1",
    title: "Smile Makeover with Veneers",
    before: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=1000&q=85",
    after: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=85",
    story:
      "A patient with worn and uneven enamel sought a natural, brighter smile without a noticeably artificial result.",
    treatment: "Porcelain veneers and minor contouring",
    outcome:
      "A balanced, brighter smile that preserved the patient's natural tooth character.",
  },
  {
    id: "case-2",
    title: "Anterior Space Closure",
    before: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=85",
    after: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85",
    story:
      "A young adult wanted to address visible gaps and discoloration conservatively, without orthodontics.",
    treatment: "Minimally invasive ceramic veneers and whitening",
    outcome:
      "Closed anterior spaces with a natural, proportionate smile line.",
  },
];

export const INTERNATIONAL_FEATURES = [
  {
    title: "Airport Pickup",
    description:
      "Assistance with airport arrival and ground transportation to your accommodation.",
    icon: "Plane",
  },
  {
    title: "Accommodation Assistance",
    description:
      "Support with accommodation arrangements near the clinic for the duration of treatment.",
    icon: "Hotel",
  },
  {
    title: "Fast-track Treatment",
    description:
      "Efficient, pre-planned treatment scheduling for international visitors with limited time.",
    icon: "CalendarClock",
  },
  {
    title: "Virtual Consultation",
    description:
      "A remote consultation before you travel, so you arrive with a clear treatment plan.",
    icon: "Video",
  },
] as const;

export const CLINIC_GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85",
    alt: "Reception area of Acharya Dental clinic with warm wood and marble finishes",
    label: "Reception",
  },
  {
    src: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1200&q=85",
    alt: "Modern dental operatory with advanced chair and clean minimalist design",
    label: "Operatories",
  },
];

export const TESTIMONIALS = [
  {
    name: "Anitha R.",
    context: "Family patient, Chennai",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=85",
    quote:
      "From the first consultation to the final result, the team treated my family with genuine patience and care. The clinic feels more like a quiet retreat than a hospital.",
    rating: 5,
    hasVideo: false,
  },
  {
    name: "Rahul S.",
    context: "International patient, Dubai",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=85",
    quote:
      "Travelling from Dubai for treatment felt daunting. The concierge team handled everything — airport pickup, accommodation, and a clear treatment plan before I arrived.",
    rating: 5,
    hasVideo: true,
  },
  {
    name: "Mr. Krishnan",
    context: "Full mouth rehabilitation, Singapore",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=85",
    quote:
      "I had been told my case was too complex. The specialists here planned it digitally and explained every step. I left with confidence — and a working smile.",
    rating: 5,
    hasVideo: false,
  },
];

export const TECHNOLOGY = [
  {
    name: "Digital Scanners",
    description:
      "Intraoral scanners replace uncomfortable impressions with a precise digital model in minutes.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "CBCT Imaging",
    description:
      "3D cone-beam imaging reveals bone, nerve and sinus anatomy for safer surgical planning.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Implant Planning",
    description:
      "Digital implant placement guides translate the plan directly to the surgical procedure.",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Smile Design Software",
    description:
      "Preview a proposed smile design before any treatment begins, then refine it together.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=85",
  },
];
