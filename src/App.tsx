import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  Binoculars,
  CalendarDays,
  Car,
  Compass,
  Heart,
  Landmark,
  MapPin,
  Menu,
  Mountain,
  Plane,
  Search,
  Sparkles,
  Star,
  TrainFront,
  UtensilsCrossed,
  Waves,
  X,
  Clock,
  ArrowRight,
  SlidersHorizontal,
  Navigation,
  Leaf,
  Globe2,
  Camera,
  ChevronRight,
} from "lucide-react";

type Category = "Spiritual" | "Beaches" | "Mountains" | "Heritage" | "Wildlife";
type SortKey = "featured" | "rating" | "az";

interface Destination {
  id: string;
  name: string;
  city: string;
  state: string;
  category: Category;
  rating: number;
  reviews: number;
  image: string;
  shortDescription: string;
  description: string;
  bestTime: string;
  duration: string;
  howToReach: {
    flight: string;
    train: string;
    road: string;
  };
  dishes: string[];
  tags: string[];
  highlights: string[];
  featured?: boolean;
}

const CATEGORIES: { id: "All" | Category; label: string; icon: typeof Waves }[] = [
  { id: "All", label: "All Journeys", icon: Compass },
  { id: "Spiritual", label: "Spiritual", icon: Sparkles },
  { id: "Beaches", label: "Beaches", icon: Waves },
  { id: "Mountains", label: "Mountains", icon: Mountain },
  { id: "Heritage", label: "Heritage", icon: Landmark },
  { id: "Wildlife", label: "Wildlife", icon: Binoculars },
];

const POPULAR_STATES = [
  {
    name: "Rajasthan",
    tagline: "Palaces & deserts",
    image:
      "https://images.pexels.com/photos/19149607/pexels-photo-19149607.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    name: "Kerala",
    tagline: "God's own country",
    image:
      "https://images.pexels.com/photos/37633371/pexels-photo-37633371.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    name: "Goa",
    tagline: "Sun, sand & sea",
    image:
      "https://images.pexels.com/photos/4428274/pexels-photo-4428274.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    name: "Himachal Pradesh",
    tagline: "Land of snow",
    image:
      "https://images.pexels.com/photos/16889248/pexels-photo-16889248.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    name: "Ladakh",
    tagline: "Moonland Himalayas",
    image:
      "https://images.pexels.com/photos/5015219/pexels-photo-5015219.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
];

const DESTINATIONS: Destination[] = [
  {
    id: "jaipur",
    name: "Jaipur",
    city: "Jaipur",
    state: "Rajasthan",
    category: "Heritage",
    rating: 4.8,
    reviews: 12840,
    image:
      "https://images.pexels.com/photos/19149607/pexels-photo-19149607.jpeg?auto=compress&cs=tinysrgb&w=1600",
    shortDescription:
      "The Pink City of palaces, bazaars and honeyed sandstone — India's most regal urban stage.",
    description:
      "Jaipur is Rajasthan distilled: rose-washed façades, lattice jharokhas of Hawa Mahal, the hilltop grandeur of Amber Fort and markets that still trade in gems, block prints and kachoris. Wander City Palace courtyards at golden hour, then lose an evening in Johari Bazaar. It is a living museum that never feels frozen — processions, rooftop cafés and folk music spill into the streets after dusk.",
    bestTime: "October to March",
    duration: "3–4 days",
    howToReach: {
      flight: "Jaipur International Airport (JAI) is 13 km from the old city, with daily links to Delhi, Mumbai and Bengaluru.",
      train: "Jaipur Junction sits on major trunk routes — Rajdhani, Shatabdi and double-decker services from Delhi (~4.5 hrs).",
      road: "NH48 from Delhi is a comfortable 5–6 hour drive. Private cabs and Volvo coaches run round the clock.",
    },
    dishes: ["Dal Baati Churma", "Laal Maas", "Pyaaz Kachori", "Ghewar"],
    tags: ["Best in Winter", "Family Friendly", "UNESCO Nearby"],
    highlights: ["Hawa Mahal façade at sunrise", "Amber Fort & elephant village views", "Bazaars of Pink City"],
    featured: true,
  },
  {
    id: "agra",
    name: "Agra",
    city: "Agra",
    state: "Uttar Pradesh",
    category: "Heritage",
    rating: 4.9,
    reviews: 24110,
    image:
      "https://images.pexels.com/photos/11948442/pexels-photo-11948442.jpeg?auto=compress&cs=tinysrgb&w=1600",
    shortDescription:
      "Home of the Taj Mahal — a marble love letter that still stops the world in its tracks.",
    description:
      "Agra is more than a postcard. Arrive before dawn to watch the Taj Mahal blush from dove-grey to rose, then spend the afternoon in the red sandstone of Agra Fort and the ghostly symmetry of Fatehpur Sikri. Mughal gardens, marble inlay workshops and a famously sweet tooth (petha!) make the city a full-day feast rather than a fly-in photo stop.",
    bestTime: "October to March",
    duration: "1–2 days",
    howToReach: {
      flight: "Kheria Airport (AGR) has limited flights; Delhi IGI is the usual gateway (3.5 hrs by road).",
      train: "Agra Cantt is superbly connected — Gatimaan Express from Delhi Nizamuddin takes about 1 hour 40 minutes.",
      road: "The Yamuna Expressway is a smooth 3.5-hour drive from Delhi. Sunrise Taj visits are easiest with a pre-dawn departure.",
    },
    dishes: ["Petha", "Bedai & Jalebi", "Mughlai Kebabs", "Dal Moth"],
    tags: ["UNESCO World Heritage", "Best at Sunrise", "Weekend Getaway"],
    highlights: ["Taj Mahal at first light", "Agra Fort riverside views", "Fatehpur Sikri day trip"],
    featured: true,
  },
  {
    id: "munnar",
    name: "Munnar",
    city: "Munnar",
    state: "Kerala",
    category: "Mountains",
    rating: 4.7,
    reviews: 9320,
    image:
      "https://images.pexels.com/photos/37633371/pexels-photo-37633371.jpeg?auto=compress&cs=tinysrgb&w=1600",
    shortDescription:
      "Rolling tea carpets, misty Anamudi ridges and the quiet luxury of Western Ghats air.",
    description:
      "Munnar is Kerala at altitude — emerald tea estates stitched across the hills, cardamom-scented forests and waterfalls that appear after a night of rain. Walk the Kolukkumalai estate at dawn, sip single-estate tea at a bungalow, and watch Nilgiri tahr graze Eravikulam's grasslands. Cool nights, cottage stays and slow roads make it a balm after the coast.",
    bestTime: "September to May",
    duration: "3–4 days",
    howToReach: {
      flight: "Cochin International Airport (COK) is ~110 km / 4 hours through winding ghats.",
      train: "Aluva or Ernakulam Junction, then a scenic taxi or bus ride into the hills.",
      road: "The drive from Kochi via Adimali is one of South India's prettiest — allow extra time for tea-stop photographs.",
    },
    dishes: ["Appam & Stew", "Puttu Kadala", "Kerala Sadya", "Banana Chips"],
    tags: ["Couple Friendly", "Nature Escape", "Tea Trails"],
    highlights: ["Kolukkumalai sunrise estate", "Eravikulam National Park", "Mattupetty Dam boat ride"],
  },
  {
    id: "varanasi",
    name: "Varanasi",
    city: "Varanasi",
    state: "Uttar Pradesh",
    category: "Spiritual",
    rating: 4.8,
    reviews: 15670,
    image:
      "https://images.pexels.com/photos/35301239/pexels-photo-35301239.jpeg?auto=compress&cs=tinysrgb&w=1600",
    shortDescription:
      "The eternal city on the Ganga — aarti fire, silk looms and a dawn that feels ancient.",
    description:
      "Varanasi is India at its most intense and tender. Boats drift past centuries of stone ghats at first light; by evening the Dashashwamedh Ganga Aarti turns the river into a theatre of lamps. Lose yourself in galis of Banarasi silk, sit with a cup of cutting chai, and let the city's rhythm — prayer, commerce, music — rewrite what you thought a pilgrimage could be.",
    bestTime: "October to March",
    duration: "2–3 days",
    howToReach: {
      flight: "Lal Bahadur Shastri Airport (VNS) is 25 km from the ghats, with frequent flights from major metros.",
      train: "Varanasi Junction and Banaras station link the city to Delhi, Kolkata and Mumbai overnight.",
      road: "Well connected via NH19; a private cab from Lucknow takes about 4.5 hours.",
    },
    dishes: ["Kachori Sabzi", "Malaiyyo", "Tamatar Chaat", "Banarasi Paan"],
    tags: ["Spiritual", "Best at Dawn", "Cultural Immersion"],
    highlights: ["Sunrise boat on the Ganga", "Dashashwamedh evening aarti", "Sarnath stupa circuit"],
    featured: true,
  },
  {
    id: "goa",
    name: "Goa",
    city: "Panaji",
    state: "Goa",
    category: "Beaches",
    rating: 4.6,
    reviews: 18990,
    image:
      "https://images.pexels.com/photos/4428274/pexels-photo-4428274.jpeg?auto=compress&cs=tinysrgb&w=1600",
    shortDescription:
      "Palm-fringed coves, Portuguese churches and a coastline that invented the Indian holiday.",
    description:
      "Goa still knows how to exhale. North beaches hum with shacks and sunset sets; the south keeps quieter coves, spice farms and ferry-paced villages. Between swims, wander Fontainhas' Latin quarter, eat fish curry rice with your hands, and let church bells mix with Konkani pop. It is both a party and a pause — you choose the tempo.",
    bestTime: "November to February",
    duration: "4–6 days",
    howToReach: {
      flight: "Dabolim (GOI) and Manohar International (GOX) serve the south and north coasts respectively.",
      train: "Madgaon and Thivim are the main railheads on the Konkan Railway from Mumbai and Mangaluru.",
      road: "NH66 traces the coast. Overnight buses from Mumbai (~12 hrs) and Pune are plentiful in season.",
    },
    dishes: ["Fish Curry Rice", "Prawn Balchão", "Bebinca", "Goan Vindaloo"],
    tags: ["Best in Winter", "Nightlife", "Family Friendly"],
    highlights: ["Old Goa churches", "Palolem & Agonda sunsets", "Spice plantation lunch"],
  },
  {
    id: "ladakh",
    name: "Leh Ladakh",
    city: "Leh",
    state: "Ladakh",
    category: "Mountains",
    rating: 4.9,
    reviews: 11205,
    image:
      "https://images.pexels.com/photos/5015219/pexels-photo-5015219.jpeg?auto=compress&cs=tinysrgb&w=1600",
    shortDescription:
      "High-altitude moonscapes, ochre monasteries and roads that feel like the edge of the world.",
    description:
      "Ladakh is a lesson in scale. Prayer flags snap above indigo lakes, double-humped camels wander Nubra's dunes, and 500-year-old gompas cling to cliffs. Acclimatise in Leh, then loop Pangong, Nubra and the magnetic hill. The light is cinematic, the air thin, the hospitality buttery with salt tea. Go slow — the landscape rewards those who pause.",
    bestTime: "May to September",
    duration: "6–8 days",
    howToReach: {
      flight: "Kushok Bakula Rimpochee Airport (IXL) has daily flights from Delhi; book early in peak season.",
      train: "No railway. The nearest major railheads are Jammu Tawi and Chandigarh, followed by a long road journey.",
      road: "The Manali–Leh and Srinagar–Leh highways open in summer. Both are bucket-list drives — carry permits and patience.",
    },
    dishes: ["Thukpa", "Momos", "Skyu", "Butter Tea"],
    tags: ["Best in Summer", "Adventure", "High Altitude"],
    highlights: ["Pangong Tso blue hour", "Nubra Valley dunes", "Thiksey & Hemis monasteries"],
    featured: true,
  },
  {
    id: "udaipur",
    name: "Udaipur",
    city: "Udaipur",
    state: "Rajasthan",
    category: "Heritage",
    rating: 4.8,
    reviews: 10440,
    image:
      "https://images.pexels.com/photos/21382502/pexels-photo-21382502.jpeg?auto=compress&cs=tinysrgb&w=1600",
    shortDescription:
      "The City of Lakes — marble palaces mirrored in Pichola, and sunsets made for slow boats.",
    description:
      "Udaipur is Rajasthan's romantic register. City Palace unfurls above Lake Pichola, while Jag Mandir and the Lake Palace seem to float. Amble through old-town havelis, catch a sunset from a rooftop, and let a boatman tell you Mewar stories. It is opulent without being hurried — the perfect counterpoint to Jaipur's bazaar energy.",
    bestTime: "October to March",
    duration: "2–3 days",
    howToReach: {
      flight: "Maharana Pratap Airport (UDR) is 22 km from the lake belt, with connections via Delhi and Mumbai.",
      train: "Udaipur City station is linked to Jaipur, Delhi and Ahmedabad by overnight trains.",
      road: "A scenic 6-hour drive from Jaipur via the Aravallis, or 4 hours from Ahmedabad.",
    },
    dishes: ["Gatte ki Sabzi", "Mawa Kachori", "Dal Baati", "Ker Sangri"],
    tags: ["Romantic", "Best in Winter", "Heritage"],
    highlights: ["Lake Pichola boat at dusk", "City Palace museums", "Saheliyon ki Bari gardens"],
  },
  {
    id: "ranthambore",
    name: "Ranthambore",
    city: "Sawai Madhopur",
    state: "Rajasthan",
    category: "Wildlife",
    rating: 4.7,
    reviews: 6880,
    image:
      "https://images.pexels.com/photos/27960753/pexels-photo-27960753.jpeg?auto=compress&cs=tinysrgb&w=1600",
    shortDescription:
      "Crumbling fort walls, golden grass and the chance of a tiger stepping into the frame.",
    description:
      "Ranthambore is where wilderness and ruin share a skyline. Gypsy safaris thread lakes where crocodiles sun themselves and chital freeze at a warning call. The 10th-century fort watches over it all. Dawn and dusk drives in Zones 1–10 are the ritual; even without a tiger, the birdlife and banyan-shaded trails justify the 4 a.m. alarm.",
    bestTime: "October to April",
    duration: "2–3 days",
    howToReach: {
      flight: "Jaipur (JAI) is the nearest airport, about 180 km / 3.5 hours by road.",
      train: "Sawai Madhopur Junction is on the Delhi–Mumbai line; many Rajdhani trains halt here.",
      road: "Drive from Jaipur via Tonk, or from Agra in about 5 hours. Safari gates are a short hop from town.",
    },
    dishes: ["Bajra Roti", "Ker Sangri", "Laal Maas", "Malpua"],
    tags: ["Tiger Safari", "Family Friendly", "Best at Dawn"],
    highlights: ["Zone safari at first light", "Ranthambore Fort views", "Padam Talao wildlife"],
  },
  {
    id: "manali",
    name: "Manali",
    city: "Manali",
    state: "Himachal Pradesh",
    category: "Mountains",
    rating: 4.6,
    reviews: 14120,
    image:
      "https://images.pexels.com/photos/16889248/pexels-photo-16889248.jpeg?auto=compress&cs=tinysrgb&w=1600",
    shortDescription:
      "Apple orchards, snow passes and a Beas river town that still feels like a hill-station holiday.",
    description:
      "Manali is the Himalaya's friendly front door. Old Manali cafés, pine forests of Solang, and the high drama of Rohtang (when open) sit within a short drive. In winter the valley turns white; in spring apple blossom takes over. It is equally good for a honeymoon fireplace and a backpacker bonfire — just pick your neighbourhood.",
    bestTime: "October to June",
    duration: "4–5 days",
    howToReach: {
      flight: "Kullu–Manali Airport at Bhuntar (KUU) is 50 km south; otherwise fly to Chandigarh and drive 8 hours.",
      train: "Joginder Nagar is the nearest railhead; most travellers take the train to Chandigarh and continue by road.",
      road: "NH3 from Delhi via Chandigarh and Mandi is a classic overnight Volvo or self-drive (~12–14 hrs).",
    },
    dishes: ["Siddu", "Trout Fish", "Himachali Dham", "Momos"],
    tags: ["Best in Winter", "Adventure", "Snow"],
    highlights: ["Solang Valley adventure", "Old Manali cafés", "Atal Tunnel & Sissu"],
  },
  {
    id: "havelock",
    name: "Havelock Island",
    city: "Swaraj Dweep",
    state: "Andaman and Nicobar",
    category: "Beaches",
    rating: 4.8,
    reviews: 5410,
    image:
      "https://images.pexels.com/photos/36928174/pexels-photo-36928174.jpeg?auto=compress&cs=tinysrgb&w=1600",
    shortDescription:
      "Powder sand, bioluminescent nights and a Radhanagar sunset that belongs on a stamp.",
    description:
      "Swaraj Dweep (Havelock) is India's tropical secret that is no longer secret — and still worth every ferry. Radhanagar Beach (Beach No. 7) unfurls a kilometre of pale sand; Elephant Beach offers easy snorkelling; and after dark, plankton light up the shallows. Stay in a beach hut, eat grilled catch of the day, and let island time reset your clock.",
    bestTime: "November to April",
    duration: "4–5 days",
    howToReach: {
      flight: "Fly into Port Blair (IXZ), then take a 1.5–2.5 hour government or private ferry to Havelock.",
      train: "No railways in the Andamans. The journey is air + sea only.",
      road: "Scooters and cabs cover the island's short roads. Pre-book ferries in peak season.",
    },
    dishes: ["Grilled Seafood", "Coconut Fish Curry", "Fish Tikka", "Tropical Fruit Platters"],
    tags: ["Scuba Diving", "Honeymoon", "Best in Winter"],
    highlights: ["Radhanagar Beach sunset", "Elephant Beach snorkel", "Kalapathar sunrise"],
  },
  {
    id: "alleppey",
    name: "Alleppey",
    city: "Alappuzha",
    state: "Kerala",
    category: "Beaches",
    rating: 4.7,
    reviews: 8760,
    image:
      "https://images.pexels.com/photos/31746465/pexels-photo-31746465.jpeg?auto=compress&cs=tinysrgb&w=1600",
    shortDescription:
      "Houseboats sliding through palm canals — Kerala's backwaters at their most cinematic.",
    description:
      "Alappuzha is the Venice of the East without the cliché fatigue. A kettuvallam houseboat becomes your hotel: crab curry at lunch, a dip in the lake, then coir villages drifting past the rail. Pair a night on the water with a morning on Alleppey Beach and a toddy-shop meal inland. Slow travel was invented here.",
    bestTime: "November to February",
    duration: "2–3 days",
    howToReach: {
      flight: "Cochin International (COK) is ~85 km. Taxis take about 1.5–2 hours.",
      train: "Alappuzha station sits on the Ernakulam–Trivandrum line with frequent expresses.",
      road: "NH66 from Kochi or Kollam. Local ferries and shikaras handle the last mile into the canals.",
    },
    dishes: ["Karimeen Pollichathu", "Appam & Stew", "Kerala Fish Curry", "Ada Pradhaman"],
    tags: ["Houseboats", "Couple Friendly", "Best in Winter"],
    highlights: ["Overnight kettuvallam cruise", "Alleppey Beach lighthouse", "Village canoe trails"],
  },
  {
    id: "amritsar",
    name: "Amritsar",
    city: "Amritsar",
    state: "Punjab",
    category: "Spiritual",
    rating: 4.9,
    reviews: 13350,
    image:
      "https://images.pexels.com/photos/28892129/pexels-photo-28892129.jpeg?auto=compress&cs=tinysrgb&w=1600",
    shortDescription:
      "The Golden Temple glowing on still water — faith, langar and the warmest hospitality in India.",
    description:
      "Amritsar greets you with the smell of ghee and the glimmer of Harmandir Sahib. Walk the marble parikrama at dawn, share langar with thousands, then stand at the Wagah border for the evening ceremony. Between the sacred and the spectacular sit the city's true religion: kulchas, lassi and late-night sarson da saag. Few places make belonging feel so immediate.",
    bestTime: "October to March",
    duration: "2 days",
    howToReach: {
      flight: "Sri Guru Ram Dass Jee International (ATQ) is 11 km from the Golden Temple.",
      train: "Amritsar Junction is a major terminus — Shatabdi and Vande Bharat from Delhi take ~6–8 hours.",
      road: "GT Road / NH3 from Delhi is ~8 hours. Plenty of Volvo coaches overnight.",
    },
    dishes: ["Amritsari Kulcha", "Langar Dal", "Butter Chicken", "Lassi & Chole Bhature"],
    tags: ["Spiritual", "Family Friendly", "Culinary Capital"],
    highlights: ["Golden Temple at twilight", "Wagah Border ceremony", "Partition Museum"],
    featured: true,
  },
];

const HERO_IMAGE =
  "https://images.pexels.com/photos/19149616/pexels-photo-19149616.jpeg?auto=compress&cs=tinysrgb&w=1920";

const FAVORITES_KEY = "bharatexplore-favorites";

function formatReviews(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

function categoryTone(category: Category) {
  switch (category) {
    case "Spiritual":
      return "bg-amber-100 text-amber-900";
    case "Beaches":
      return "bg-sky-100 text-sky-900";
    case "Mountains":
      return "bg-emerald-100 text-emerald-900";
    case "Heritage":
      return "bg-orange-100 text-orange-900";
    case "Wildlife":
      return "bg-lime-100 text-lime-950";
  }
}

export default function App() {
  const [query, setQuery] = useState("");
  const [heroQuery, setHeroQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState<"All" | Category>("All");
  const [sortKey, setSortKey] = useState<SortKey>("featured");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY);
      if (raw) setFavorites(JSON.parse(raw) as string[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const locked = Boolean(selectedId) || showFavorites || mobileOpen;
    document.body.classList.toggle("modal-open", locked);
    return () => document.body.classList.remove("modal-open");
  }, [selectedId, showFavorites, mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedId(null);
        setShowFavorites(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const selected = DESTINATIONS.find((d) => d.id === selectedId) ?? null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = DESTINATIONS.filter((d) => {
      const stateOk = selectedState === "All" || d.state === selectedState;
      const catOk = selectedCategory === "All" || d.category === selectedCategory;
      const hay = `${d.name} ${d.city} ${d.state} ${d.category} ${d.tags.join(" ")} ${d.shortDescription} ${d.dishes.join(" ")}`.toLowerCase();
      const queryOk = !q || hay.includes(q);
      return stateOk && catOk && queryOk;
    });

    const sorted = [...list];
    if (sortKey === "rating") sorted.sort((a, b) => b.rating - a.rating);
    else if (sortKey === "az") sorted.sort((a, b) => a.name.localeCompare(b.name));
    else sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating);
    return sorted;
  }, [query, selectedState, selectedCategory, sortKey]);

  const favoritePlaces = useMemo(
    () => DESTINATIONS.filter((d) => favorites.includes(d.id)),
    [favorites],
  );

  const similar = useMemo(() => {
    if (!selected) return [];
    return DESTINATIONS.filter((d) => d.category === selected.category && d.id !== selected.id).slice(0, 3);
  }, [selected]);

  const filtersActive = selectedState !== "All" || selectedCategory !== "All" || query.trim().length > 0;

  function toggleFavorite(id: string) {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function submitHeroSearch(e: FormEvent) {
    e.preventDefault();
    setQuery(heroQuery);
    document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" });
  }

  function clearFilters() {
    setQuery("");
    setHeroQuery("");
    setSelectedState("All");
    setSelectedCategory("All");
    setSortKey("featured");
  }

  function openDetails(id: string) {
    setSelectedId(id);
    setShowFavorites(false);
    setMobileOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] text-stone-900">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-stone-200/80 bg-[#faf7f2]/90 shadow-sm backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg shadow-orange-500/30">
              <Compass className="h-5 w-5 text-white" strokeWidth={2.2} />
            </span>
            <span className="leading-tight">
              <span className={`block font-serif text-xl font-semibold tracking-tight sm:text-2xl ${scrolled ? "text-stone-900" : "text-white"}`}>
                BharatExplore
              </span>
              <span className={`hidden text-[10px] font-medium uppercase tracking-[0.22em] sm:block ${scrolled ? "text-orange-700" : "text-orange-200"}`}>
                Incredible India
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#explore" className={`transition hover:text-orange-600 ${scrolled ? "text-stone-700" : "text-white/90"}`}>
              Destinations
            </a>
            <a href="#filters" className={`transition hover:text-orange-600 ${scrolled ? "text-stone-700" : "text-white/90"}`}>
              States
            </a>
            <a href="#about" className={`transition hover:text-orange-600 ${scrolled ? "text-stone-700" : "text-white/90"}`}>
              About
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowFavorites(true)}
              className={`relative inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition ${
                scrolled
                  ? "bg-white text-stone-800 shadow-sm ring-1 ring-stone-200 hover:ring-orange-300"
                  : "bg-white/15 text-white ring-1 ring-white/25 hover:bg-white/25"
              }`}
            >
              <Heart className={`h-4 w-4 ${favorites.length ? "fill-rose-500 text-rose-500" : ""}`} />
              <span className="hidden sm:inline">Saved</span>
              <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-orange-600 px-1.5 text-[11px] font-semibold text-white">
                {favorites.length}
              </span>
            </button>
            <button
              type="button"
              className={`rounded-full p-2 md:hidden ${scrolled ? "text-stone-800" : "text-white"}`}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
        <div className="india-stripe h-0.5 w-full opacity-90" />
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-stone-950/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-72 flex-col bg-[#faf7f2] p-6 shadow-2xl animate-slide-in-right">
            <div className="mb-8 flex items-center justify-between">
              <span className="font-serif text-2xl">Menu</span>
              <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <a href="#explore" onClick={() => setMobileOpen(false)} className="border-b border-stone-200 py-4 text-lg">
              Destinations
            </a>
            <a href="#filters" onClick={() => setMobileOpen(false)} className="border-b border-stone-200 py-4 text-lg">
              States
            </a>
            <a href="#about" onClick={() => setMobileOpen(false)} className="border-b border-stone-200 py-4 text-lg">
              About
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setShowFavorites(true);
              }}
              className="mt-4 flex items-center gap-2 rounded-2xl bg-orange-600 px-4 py-3 text-white"
            >
              <Heart className="h-4 w-4" /> Saved places ({favorites.length})
            </button>
          </div>
        </div>
      )}

      <section id="top" className="relative isolate min-h-[100svh] overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Taj Mahal framed by a Mughal archway at sunrise"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="grain pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
          <div className="max-w-3xl">
            <p className="animate-fade-up inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-orange-100 ring-1 ring-white/20 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Discover Incredible India
            </p>
            <h1 className="animate-fade-up delay-1 mt-5 font-serif text-5xl leading-[1.05] text-white sm:text-6xl lg:text-7xl">
              Where will India
              <span className="italic text-orange-300"> take you?</span>
            </h1>
            <p className="animate-fade-up delay-2 mt-5 max-w-xl text-base leading-relaxed text-stone-200 sm:text-lg">
              Search palaces, peaks, temples and tide-washed shores. Curated journeys across every mood of the subcontinent — with local plates, routes and the best season to go.
            </p>
          </div>

          <form
            onSubmit={submitHeroSearch}
            className="animate-fade-up delay-3 mt-8 flex w-full max-w-3xl flex-col gap-3 rounded-3xl bg-white p-2 shadow-2xl shadow-stone-950/30 sm:flex-row sm:items-center"
          >
            <div className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3">
              <Search className="h-5 w-5 shrink-0 text-orange-600" />
              <input
                value={heroQuery}
                onChange={(e) => setHeroQuery(e.target.value)}
                placeholder="Search places, states or categories — Kerala, forts, beaches…"
                className="w-full bg-transparent text-sm text-stone-800 outline-none placeholder:text-stone-400 sm:text-base"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-600/30 transition hover:brightness-110"
            >
              Explore now <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="animate-fade-up delay-4 mt-10 grid grid-cols-3 gap-4 max-w-xl text-white/90">
            {[
              { n: "12+", l: "Handpicked places" },
              { n: "28", l: "States to wander" },
              { n: "5", l: "Ways to travel" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-serif text-3xl text-orange-300 sm:text-4xl">{s.n}</p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-stone-300 sm:text-xs">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="filters" className="relative z-10 -mt-6 sm:-mt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white p-4 shadow-xl shadow-stone-900/5 ring-1 ring-stone-200/70 sm:p-6">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-700">Popular states</p>
                <h2 className="font-serif text-2xl text-stone-900 sm:text-3xl">Pick a region</h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedState("All")}
                className={`hidden text-sm font-medium sm:inline ${selectedState === "All" ? "text-orange-700" : "text-stone-500 hover:text-orange-700"}`}
              >
                All India
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1 hide-scrollbar">
              <button
                type="button"
                onClick={() => setSelectedState("All")}
                className={`flex h-[7.5rem] w-36 shrink-0 flex-col items-start justify-end rounded-2xl p-3 text-left ring-2 transition sm:w-40 ${
                  selectedState === "All"
                    ? "bg-stone-900 text-white ring-orange-500"
                    : "bg-stone-100 text-stone-800 ring-transparent hover:bg-stone-200"
                }`}
              >
                <Globe2 className="mb-auto h-5 w-5 opacity-80" />
                <span className="text-sm font-semibold">All India</span>
                <span className="text-[11px] opacity-70">Every mood</span>
              </button>
              {POPULAR_STATES.map((st) => (
                <button
                  key={st.name}
                  type="button"
                  onClick={() => setSelectedState(st.name)}
                  className={`relative h-[7.5rem] w-44 shrink-0 overflow-hidden rounded-2xl text-left ring-2 transition sm:w-48 ${
                    selectedState === st.name ? "ring-orange-500" : "ring-transparent hover:ring-orange-200"
                  }`}
                >
                  <img src={st.image} alt={st.name} className="absolute inset-0 h-full w-full object-cover" />
                  <span className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
                  <span className="absolute inset-x-3 bottom-3 text-white">
                    <span className="block text-sm font-semibold">{st.name}</span>
                    <span className="text-[11px] text-stone-200">{st.tagline}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">Travel by mood</p>
            <h2 className="font-serif text-2xl sm:text-3xl">Filter by category</h2>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
            {CATEGORIES.map((c) => {
              const Icon = c.icon;
              const active = selectedCategory === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCategory(c.id)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ring-1 transition ${
                    active
                      ? "bg-emerald-800 text-white ring-emerald-800 shadow-md shadow-emerald-900/20"
                      : "bg-white text-stone-700 ring-stone-200 hover:ring-emerald-400"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="explore" className="mx-auto mt-12 max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-3xl text-stone-900 sm:text-4xl">Handpicked destinations</h2>
            <p className="mt-1 text-sm text-stone-500">
              Showing <span className="font-semibold text-stone-800">{filtered.length}</span> of {DESTINATIONS.length} journeys
              {selectedState !== "All" && (
                <>
                  {" "}
                  in <span className="font-semibold text-orange-700">{selectedState}</span>
                </>
              )}
              {selectedCategory !== "All" && (
                <>
                  {" "}
                  · <span className="font-semibold text-emerald-800">{selectedCategory}</span>
                </>
              )}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm ring-1 ring-stone-200">
              <Search className="h-4 w-4 text-stone-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Refine search…"
                className="w-40 bg-transparent outline-none sm:w-52"
              />
            </div>
            <label className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm ring-1 ring-stone-200">
              <SlidersHorizontal className="h-4 w-4 text-stone-400" />
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
                className="bg-transparent outline-none"
              >
                <option value="featured">Featured</option>
                <option value="rating">Highest rated</option>
                <option value="az">A – Z</option>
              </select>
            </label>
            {filtersActive && (
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-full px-3 py-2 text-sm font-medium text-orange-800 hover:bg-orange-50"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center rounded-3xl border border-dashed border-stone-300 bg-white/70 px-6 py-20 text-center">
            <MapPin className="h-10 w-10 text-orange-500" />
            <h3 className="mt-4 font-serif text-2xl">No places match that trail</h3>
            <p className="mt-2 max-w-md text-sm text-stone-500">
              Try another state, category or keyword. India is large — your next favourite corner is still out there.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-full bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((place) => {
              const saved = favorites.includes(place.id);
              return (
                <article
                  key={place.id}
                  className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-stone-200/80 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-900/5"
                >
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-stone-950/10" />
                    <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${categoryTone(place.category)}`}>
                      {place.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleFavorite(place.id)}
                      aria-label={saved ? "Remove from saved" : "Save destination"}
                      className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-sm backdrop-blur transition hover:scale-105"
                    >
                      <Heart className={`h-5 w-5 ${saved ? "fill-rose-500 text-rose-500" : ""}`} />
                    </button>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-stone-950/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {place.rating}
                      <span className="text-stone-300">({formatReviews(place.reviews)})</span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-serif text-2xl leading-tight text-stone-900">{place.name}</h3>
                        <p className="mt-1 flex items-center gap-1 text-sm text-stone-500">
                          <MapPin className="h-3.5 w-3.5 text-orange-600" />
                          {place.city}, {place.state}
                        </p>
                      </div>
                      <span className="hidden items-center gap-1 rounded-full bg-stone-50 px-2 py-1 text-[11px] text-stone-500 ring-1 ring-stone-100 sm:inline-flex">
                        <Clock className="h-3 w-3" /> {place.duration}
                      </span>
                    </div>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-stone-600">{place.shortDescription}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {place.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-medium text-orange-800">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => openDetails(place.id)}
                      className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
                    >
                      View details <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section id="about" className="mx-auto mt-8 max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] bg-stone-900 text-white">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 sm:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-400">Why BharatExplore</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
                A compass for the curious traveller.
              </h2>
              <p className="mt-4 text-stone-300 leading-relaxed">
                India is not one holiday — it is a thousand climates, kitchens and centuries stacked together. We gather the places worth crossing a continent for, then add the practical poetry: when to go, how to arrive, and what to eat first.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: Camera, t: "Visual first", d: "Landscapes that sell the ticket" },
                  { icon: UtensilsCrossed, t: "Eat like a local", d: "Dishes tied to each region" },
                  { icon: Navigation, t: "Routes that work", d: "Flight, rail and road, honestly" },
                ].map((f) => (
                  <div key={f.t} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                    <f.icon className="h-5 w-5 text-orange-400" />
                    <p className="mt-3 font-medium">{f.t}</p>
                    <p className="mt-1 text-xs text-stone-400">{f.d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative min-h-[280px]">
              <img
                src="https://images.pexels.com/photos/19149591/pexels-photo-19149591.jpeg?auto=compress&cs=tinysrgb&w=1400"
                alt="Hawa Mahal architecture in Jaipur"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/20 to-transparent lg:bg-gradient-to-l" />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-[#f3eee6]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-600 text-white">
                <Compass className="h-4 w-4" />
              </span>
              <span className="font-serif text-2xl">BharatExplore</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-stone-600">
              A tourist place finder tailored for India — palaces, peaks, temples, beaches and wildlife, mapped with heart.
            </p>
          </div>
          <div className="flex gap-12 text-sm">
            <div>
              <p className="font-semibold text-stone-800">Explore</p>
              <a href="#filters" className="mt-2 block text-stone-600 hover:text-orange-700">
                States
              </a>
              <a href="#explore" className="mt-2 block text-stone-600 hover:text-orange-700">
                Destinations
              </a>
            </div>
            <div>
              <p className="font-semibold text-stone-800">Travel tips</p>
              <p className="mt-2 text-stone-600">Best season first</p>
              <p className="mt-2 text-stone-600">Taste before you leave</p>
            </div>
          </div>
        </div>
        <div className="india-stripe h-1 w-full" />
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-xs text-stone-500 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} BharatExplore. Crafted for wanderers of India.</p>
          <p className="hidden sm:block">Saffron · White · Green</p>
        </div>
      </footer>

      {showFavorites && (
        <div className="fixed inset-0 z-[70]">
          <div className="absolute inset-0 bg-stone-950/50 backdrop-blur-[2px]" onClick={() => setShowFavorites(false)} />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#faf7f2] shadow-2xl animate-slide-in-right">
            <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-orange-700">Your list</p>
                <h3 className="font-serif text-2xl">Saved places ({favoritePlaces.length})</h3>
              </div>
              <button type="button" onClick={() => setShowFavorites(false)} className="rounded-full p-2 hover:bg-stone-200" aria-label="Close saved">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {favoritePlaces.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <Heart className="h-10 w-10 text-stone-300" />
                  <p className="mt-3 font-serif text-xl">Nothing saved yet</p>
                  <p className="mt-1 text-sm text-stone-500">Tap the heart on any destination to pin it here.</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {favoritePlaces.map((p) => (
                    <li key={p.id} className="flex gap-3 rounded-2xl bg-white p-2 ring-1 ring-stone-200">
                      <img src={p.image} alt="" className="h-20 w-24 rounded-xl object-cover" />
                      <div className="min-w-0 flex-1 py-1">
                        <p className="truncate font-semibold">{p.name}</p>
                        <p className="text-xs text-stone-500">
                          {p.state} · {p.category}
                        </p>
                        <button
                          type="button"
                          onClick={() => openDetails(p.id)}
                          className="mt-1 text-xs font-semibold text-orange-700"
                        >
                          View details
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleFavorite(p.id)}
                        className="self-start p-2 text-rose-500"
                        aria-label="Remove"
                      >
                        <Heart className="h-4 w-4 fill-rose-500" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
          <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm" onClick={() => setSelectedId(null)} />
          <div className="relative max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-[#faf7f2] shadow-2xl animate-scale-in sm:rounded-3xl">
            <div className="relative h-64 sm:h-80">
              <img src={selected.image} alt={selected.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-stone-800"
                aria-label="Close details"
              >
                <X className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => toggleFavorite(selected.id)}
                className="absolute right-16 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90"
                aria-label="Toggle saved"
              >
                <Heart className={`h-5 w-5 ${favorites.includes(selected.id) ? "fill-rose-500 text-rose-500" : "text-stone-700"}`} />
              </button>
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${categoryTone(selected.category)}`}>
                  {selected.category}
                </span>
                <h3 className="mt-2 font-serif text-4xl sm:text-5xl">{selected.name}</h3>
                <p className="mt-1 flex flex-wrap items-center gap-3 text-sm text-stone-200">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-orange-400" />
                    {selected.city}, {selected.state}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {selected.rating} · {formatReviews(selected.reviews)} reviews
                  </span>
                </p>
              </div>
            </div>

            <div className="space-y-8 p-5 sm:p-8">
              <p className="text-[15px] leading-relaxed text-stone-700">{selected.description}</p>

              <div className="flex flex-wrap gap-2">
                {selected.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-stone-700 ring-1 ring-stone-200">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-orange-50 p-5 ring-1 ring-orange-100">
                  <div className="flex items-center gap-2 text-orange-900">
                    <CalendarDays className="h-5 w-5" />
                    <h4 className="font-semibold">Best time to visit</h4>
                  </div>
                  <p className="mt-2 text-lg font-serif text-stone-900">{selected.bestTime}</p>
                  <p className="mt-1 text-sm text-stone-600">Ideal stay {selected.duration}</p>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-5 ring-1 ring-emerald-100">
                  <div className="flex items-center gap-2 text-emerald-900">
                    <Leaf className="h-5 w-5" />
                    <h4 className="font-semibold">Don’t miss</h4>
                  </div>
                  <ul className="mt-2 space-y-1 text-sm text-stone-700">
                    {selected.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-700" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="flex items-center gap-2 font-serif text-2xl">
                  <Navigation className="h-5 w-5 text-blue-800" /> How to reach
                </h4>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {[
                    { icon: Plane, title: "Flight", body: selected.howToReach.flight, tone: "bg-sky-50 text-sky-900" },
                    { icon: TrainFront, title: "Train", body: selected.howToReach.train, tone: "bg-indigo-50 text-indigo-950" },
                    { icon: Car, title: "Road", body: selected.howToReach.road, tone: "bg-amber-50 text-amber-950" },
                  ].map((m) => (
                    <div key={m.title} className={`rounded-2xl p-4 ${m.tone}`}>
                      <m.icon className="h-5 w-5" />
                      <p className="mt-2 text-sm font-semibold">{m.title}</p>
                      <p className="mt-1 text-xs leading-relaxed opacity-80">{m.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="flex items-center gap-2 font-serif text-2xl">
                  <UtensilsCrossed className="h-5 w-5 text-orange-700" /> Top local dishes to try
                </h4>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selected.dishes.map((dish) => (
                    <span
                      key={dish}
                      className="rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-800 ring-1 ring-orange-200"
                    >
                      {dish}
                    </span>
                  ))}
                </div>
              </div>

              {similar.length > 0 && (
                <div>
                  <h4 className="font-serif text-2xl">More {selected.category.toLowerCase()} escapes</h4>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {similar.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelectedId(s.id)}
                        className="overflow-hidden rounded-2xl bg-white text-left ring-1 ring-stone-200 transition hover:ring-orange-300"
                      >
                        <img src={s.image} alt="" className="h-24 w-full object-cover" />
                        <span className="block px-3 py-2 text-sm font-semibold">{s.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
