import type { Investigation } from "@/lib/network-types";

// Sourced from NIST's official FERET program history, Wikipedia, and NIST's
// public testimony on facial recognition technology. See `sources` below.
const feretOrigins: Investigation = {
  slug: "feret-institutional-network",
  title: "Who Built FERET",
  status: "in-progress",
  dek: "A Pentagon counterdrug office, an Army lab, and five university labs built the dataset that face-recognition benchmarking still runs on.",
  summary:
    "The FERET program (1993–1998) produced the facial-recognition benchmark dataset — the same ColorFERET data analyzed elsewhere on this site. It was funded through a Department of Defense counterdrug office, run out of the Army Research Laboratory and George Mason University, and built by five university and contractor labs. When the program ended, NIST inherited the dataset and turned its evaluation protocol into the Face Recognition Vendor Test (FRVT) — the benchmark series the FBI and DHS now use to guide facial-recognition deployment.",
  nodes: [
    {
      id: "feret-program",
      label: "FERET Program",
      type: "event",
      subtitle: "1993–1998",
      notes:
        "DoD-funded initiative to advance automatic face-recognition algorithms and build a benchmark dataset to test them against.",
    },
    {
      id: "dod-counterdrug",
      label: "DoD Counterdrug Technology Development Program Office",
      type: "organization",
      subtitle: "Primary sponsor",
      notes: "Sponsored the program from 1993 through its completion in 1998; total funding exceeded $6.5 million.",
      sourceUrl: "https://www.nist.gov/programs-projects/face-recognition-technology-feret",
    },
    {
      id: "darpa",
      label: "DARPA",
      type: "organization",
      subtitle: "Defense Advanced Research Projects Agency",
      notes: "Administered the Counterdrug office's funding for the program.",
    },
    {
      id: "arl",
      label: "Army Research Laboratory",
      type: "organization",
      subtitle: "Adelphi, Maryland",
      notes: "Served as technical agent for the program.",
    },
    {
      id: "phillips",
      label: "Dr. P. Jonathon Phillips",
      type: "person",
      subtitle: "Army Research Laboratory → NIST",
      notes:
        "Technical lead for FERET at ARL; later moved to NIST and led the successor Face Recognition Vendor Test program.",
    },
    {
      id: "wechsler",
      label: "Dr. Harry Wechsler",
      type: "person",
      subtitle: "George Mason University",
      notes: "Co-founded the program with Phillips in 1993; directed image collection.",
    },
    {
      id: "gmu",
      label: "George Mason University",
      type: "organization",
      subtitle: "Fairfax, Virginia",
      notes: "Site of the original FERET image-collection sessions, 1993–1996.",
    },
    {
      id: "pentland",
      label: "Alex Pentland",
      type: "person",
      subtitle: "MIT",
      notes: "Led Phase I/II algorithm evaluation.",
    },
    {
      id: "wilder",
      label: "Joseph Wilder",
      type: "person",
      subtitle: "Rutgers University",
      notes: "Led Phase I algorithm evaluation.",
    },
    {
      id: "malsburg",
      label: "Christoph von der Malsburg",
      type: "person",
      subtitle: "USC",
      notes: "Led Phase I/II algorithm evaluation.",
    },
    {
      id: "tasc",
      label: "TASC",
      type: "organization",
      subtitle: "The Analytic Sciences Corporation",
      notes: "Gale Gordon led Phase I/II algorithm evaluation as a contractor.",
    },
    {
      id: "colorferet-db",
      label: "Color FERET Database",
      type: "account",
      subtitle: "994 subjects, 11,338 images",
      notes:
        "Released 2003. The dataset analyzed in this site's demographic breakdown of the collection's gender, race, and age composition.",
    },
    {
      id: "nist",
      label: "NIST",
      type: "organization",
      subtitle: "National Institute of Standards and Technology",
      notes: "Assumed stewardship of the FERET data and reports in 1998; distributes Color FERET to researchers today.",
      sourceUrl: "https://www.nist.gov/programs-projects/face-recognition-technology-feret",
    },
    {
      id: "frvt",
      label: "Face Recognition Vendor Test (FRVT)",
      type: "event",
      subtitle: "2000–present",
      notes: "NIST's successor benchmark series, evaluating commercial and research face-recognition systems.",
      sourceUrl: "https://en.wikipedia.org/wiki/Face_Recognition_Vendor_Test",
    },
    {
      id: "fbi",
      label: "FBI",
      type: "organization",
      notes: "Receives NIST technical guidance on facial-recognition deployment.",
      sourceUrl: "https://www.nist.gov/speech-testimony/facial-recognition-technology-frt-0",
    },
    {
      id: "dhs-obim",
      label: "DHS Office of Biometric Identity Management",
      type: "organization",
      notes: "Receives NIST technical guidance on facial-recognition deployment.",
      sourceUrl: "https://www.nist.gov/speech-testimony/facial-recognition-technology-frt-0",
    },
    {
      id: "dhs-cbp",
      label: "DHS Customs & Border Protection",
      type: "organization",
      notes: "Receives NIST technical guidance on facial-recognition deployment.",
      sourceUrl: "https://www.nist.gov/speech-testimony/facial-recognition-technology-frt-0",
    },
  ],
  edges: [
    { source: "dod-counterdrug", target: "feret-program", label: "sponsored, $6.5M+", confidence: "confirmed" },
    { source: "darpa", target: "feret-program", label: "administered funding", confidence: "confirmed" },
    { source: "arl", target: "feret-program", label: "technical agent", confidence: "confirmed" },
    { source: "phillips", target: "arl", label: "based at", confidence: "confirmed" },
    { source: "phillips", target: "feret-program", label: "co-founded / led", confidence: "confirmed" },
    { source: "wechsler", target: "gmu", label: "based at", confidence: "confirmed" },
    { source: "wechsler", target: "feret-program", label: "co-founded, directed collection", confidence: "confirmed" },
    { source: "gmu", target: "colorferet-db", label: "collection site", confidence: "confirmed" },
    { source: "pentland", target: "feret-program", label: "evaluation lead (MIT)", confidence: "confirmed" },
    { source: "wilder", target: "feret-program", label: "evaluation lead (Rutgers)", confidence: "confirmed" },
    { source: "malsburg", target: "feret-program", label: "evaluation lead (USC)", confidence: "confirmed" },
    { source: "tasc", target: "feret-program", label: "evaluation contractor", confidence: "confirmed" },
    { source: "feret-program", target: "colorferet-db", label: "produced", confidence: "confirmed" },
    { source: "nist", target: "colorferet-db", label: "stewards & distributes", confidence: "confirmed" },
    { source: "feret-program", target: "frvt", label: "protocol succeeded by", confidence: "confirmed" },
    { source: "nist", target: "frvt", label: "runs", confidence: "confirmed" },
    { source: "phillips", target: "frvt", label: "led at NIST", confidence: "confirmed" },
    { source: "frvt", target: "fbi", label: "informs deployment guidance", confidence: "confirmed" },
    { source: "frvt", target: "dhs-obim", label: "informs deployment guidance", confidence: "confirmed" },
    { source: "frvt", target: "dhs-cbp", label: "informs deployment guidance", confidence: "confirmed" },
  ],
  sources: [
    {
      label: "NIST — Face Recognition Technology (FERET) program history",
      url: "https://www.nist.gov/programs-projects/face-recognition-technology-feret",
    },
    {
      label: "Wikipedia — FERET (facial recognition technology)",
      url: "https://en.wikipedia.org/wiki/FERET_(facial_recognition_technology)",
    },
    {
      label: "Wikipedia — Face Recognition Vendor Test",
      url: "https://en.wikipedia.org/wiki/Face_Recognition_Vendor_Test",
    },
    {
      label: "NIST — Facial Recognition Technology (FRT) testimony",
      url: "https://www.nist.gov/speech-testimony/facial-recognition-technology-frt-0",
    },
  ],
};

export const investigations: Investigation[] = [feretOrigins];

export function getInvestigation(slug: string) {
  return investigations.find((investigation) => investigation.slug === slug);
}
