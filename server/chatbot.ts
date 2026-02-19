import Groq from "groq-sdk";

interface KnowledgeEntry {
  keywords: string[];
  question: string;
  answer: string;
  category: string;
}

const knowledgeBase: KnowledgeEntry[] = [
  {
    keywords: ["what", "elevate", "about", "event", "conclave", "startup"],
    question: "What is ELEVATE'26?",
    answer:
      "ELEVATE'26 is a Startup Conclave organized by the PSIT Startup & Incubation Foundation. It's a two-day event on February 24-25, 2026, at PSIT Kanpur, bringing together entrepreneurs, investors, and innovators for an exciting experience of learning, networking, and showcasing groundbreaking ideas.",
    category: "general",
  },
  {
    keywords: ["when", "date", "dates", "time", "schedule", "day"],
    question: "When is ELEVATE'26?",
    answer:
      "ELEVATE'26 takes place on February 24-25, 2026 (Tuesday-Wednesday). The event spans two full days packed with guest lectures, networking sessions, and the Innovation Showcase Competition.",
    category: "schedule",
  },
  {
    keywords: ["where", "location", "venue", "place", "address", "psit", "kanpur"],
    question: "Where is the event held?",
    answer:
      "ELEVATE'26 is held at PSIT Kanpur. The event utilizes three key venues:\n\n- Main Auditorium - For keynote speeches and guest lectures\n- Innovation Hub - For workshops and interactive sessions\n- Startup Showcase Arena - For the Innovation Showcase Competition",
    category: "venue",
  },
  {
    keywords: ["speaker", "speakers", "who", "keynote", "talk", "guest"],
    question: "Who are the speakers?",
    answer:
      "ELEVATE'26 features distinguished speakers:\n\n- Ashish Kanaujia - Technology Innovation Consultant at iCreate (Govt of Gujarat TBI). He brings expertise in technology innovation and startup incubation.\n\n- Neha Malhotra - Founder & Managing Partner at MeritX Ventures, TiE Delhi. She offers deep insights into venture capital and startup ecosystem building.",
    category: "speakers",
  },
  {
    keywords: ["register", "registration", "sign", "join", "participate", "how", "enroll"],
    question: "How do I register?",
    answer:
      "You can register for ELEVATE'26 through:\n\n- Scan the QR code on the official event poster\n- Visit: linktr.ee/srajanecellpsit2004\n- Contact directly: 88082 23952 or 76449 05477\n\nSpots are limited, so register early!",
    category: "registration",
  },
  {
    keywords: ["session", "sessions", "program", "activities", "agenda", "what", "happen"],
    question: "What sessions are planned?",
    answer:
      "ELEVATE'26 features three main types of sessions:\n\n- Guest Lectures - Insightful talks from industry leaders and startup experts\n- Networking Sessions - Connect with fellow entrepreneurs, investors, and mentors\n- Innovation Showcase Competition - Present your startup idea and compete for recognition\n\nAll sessions are designed to inspire, educate, and foster collaboration.",
    category: "sessions",
  },
  {
    keywords: ["organizer", "organized", "who", "psit", "foundation", "incubation", "srajan"],
    question: "Who is organizing the event?",
    answer:
      "ELEVATE'26 is organized by the PSIT Startup & Incubation Foundation at PSIT Kanpur. The foundation is dedicated to fostering innovation and entrepreneurship among students and aspiring entrepreneurs.",
    category: "organizer",
  },
  {
    keywords: ["auditorium", "main", "hall", "keynote", "lecture"],
    question: "What happens at the Main Auditorium?",
    answer:
      "The Main Auditorium at PSIT hosts the keynote speeches and guest lectures during ELEVATE'26. This is where you'll hear from our distinguished speakers, Ashish Kanaujia and Neha Malhotra, sharing their insights on innovation and entrepreneurship.",
    category: "venue",
  },
  {
    keywords: ["innovation", "hub", "workshop", "interactive"],
    question: "What is the Innovation Hub?",
    answer:
      "The Innovation Hub is one of the three main venues at ELEVATE'26. It hosts workshops and interactive sessions where participants can engage in hands-on activities, learn new skills, and collaborate with peers and mentors.",
    category: "venue",
  },
  {
    keywords: ["showcase", "arena", "competition", "startup", "pitch", "present"],
    question: "What is the Startup Showcase Arena?",
    answer:
      "The Startup Showcase Arena is where the Innovation Showcase Competition takes place. Participants can present their startup ideas, get feedback from experts, and compete for recognition. It's a fantastic opportunity to get your idea noticed!",
    category: "venue",
  },
  {
    keywords: ["contact", "phone", "call", "number", "reach", "help"],
    question: "How can I contact the organizers?",
    answer:
      "You can reach the ELEVATE'26 organizers at:\n\n- Phone: 88082 23952\n- Phone: 76449 05477\n- Online: linktr.ee/srajanecellpsit2004\n\nFeel free to reach out for any queries about the event!",
    category: "contact",
  },
  {
    keywords: ["ashish", "kanaujia", "icreate", "gujarat", "tbi"],
    question: "Tell me about Ashish Kanaujia",
    answer:
      "Ashish Kanaujia is a Technology Innovation Consultant at iCreate, which is the Government of Gujarat's Technology Business Incubator (TBI). He specializes in helping startups leverage technology for innovation and growth. He'll be speaking at ELEVATE'26 on February 24-25, 2026.",
    category: "speakers",
  },
  {
    keywords: ["neha", "malhotra", "meritx", "ventures", "tie", "delhi"],
    question: "Tell me about Neha Malhotra",
    answer:
      "Neha Malhotra is the Founder & Managing Partner at MeritX Ventures and is associated with TiE Delhi. She has extensive experience in venture capital and building the startup ecosystem. She'll be sharing her insights at ELEVATE'26.",
    category: "speakers",
  },
  {
    keywords: ["free", "cost", "fee", "price", "ticket", "paid", "charge"],
    question: "Is the event free?",
    answer:
      "For details about event fees and tickets, please check the registration link at linktr.ee/srajanecellpsit2004 or contact the organizers at 88082 23952 or 76449 05477 for the latest information.",
    category: "registration",
  },
  {
    keywords: ["network", "networking", "connect", "meet", "people", "investor", "mentor"],
    question: "Are there networking opportunities?",
    answer:
      "Absolutely! ELEVATE'26 includes dedicated Networking Sessions where you can connect with:\n\n- Fellow entrepreneurs and innovators\n- Industry experts and mentors\n- Potential investors\n- Like-minded students and professionals\n\nIt's a great opportunity to build valuable connections in the startup ecosystem!",
    category: "sessions",
  },
  {
    keywords: ["hello", "hi", "hey", "greetings", "good", "morning", "afternoon", "evening"],
    question: "Greeting",
    answer:
      "Hello! Welcome to ELEVATE'26 - the Startup Conclave at PSIT Kanpur! I'm here to help you with any questions about the event happening on February 24-25, 2026. Feel free to ask about speakers, schedule, registration, or venues!",
    category: "greeting",
  },
  {
    keywords: ["thank", "thanks", "bye", "goodbye", "see", "later"],
    question: "Farewell",
    answer:
      "Thank you for your interest in ELEVATE'26! We look forward to seeing you at PSIT Kanpur on February 24-25, 2026. If you have more questions later, feel free to come back anytime!",
    category: "farewell",
  },
];

const queryCache = new Map<string, { response: string; confidence: number; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000;

const sessionHistory = new Map<string, { role: string; content: string }[]>();
const rateLimits = new Map<string, { count: number; resetTime: number }>();

const STOP_WORDS = new Set(["what", "where", "how", "is", "the", "about", "at", "on", "of", "to", "for", "in", "with", "me", "tell", "show", "can", "you", "are"]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

function computeSimilarity(query: string, entry: KnowledgeEntry): number {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return 0;

  let matchCount = 0;
  let weightedScore = 0;

  for (const token of queryTokens) {
    for (const keyword of entry.keywords) {
      if (token === keyword) {
        matchCount++;
        weightedScore += 1.0;
      }
    }
  }

  const questionTokens = tokenize(entry.question);
  for (const token of queryTokens) {
    for (const qToken of questionTokens) {
      if (token === qToken) {
        weightedScore += 0.8;
      }
    }
  }

  if (matchCount === 0) return 0;

  const coverage = matchCount / Math.max(entry.keywords.length, 1);
  const queryMatch = matchCount / Math.max(queryTokens.length, 1);
  const normalizedWeight = weightedScore / Math.max(queryTokens.length + entry.keywords.length, 1);

  // Stricter scoring: must match more than just one word if query is long
  let finalScore = (coverage * 0.2 + queryMatch * 0.5 + normalizedWeight * 0.3) * 1.5;

  if (queryTokens.length > 2 && matchCount < 2) {
    finalScore *= 0.5; // Penalize weak matches in long queries
  }

  return Math.min(finalScore, 1.0);
}

function findBestMatch(query: string): { answer: string; confidence: number } | null {
  let bestScore = 0;
  let bestEntry: KnowledgeEntry | null = null;

  for (const entry of knowledgeBase) {
    const score = computeSimilarity(query, entry);
    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  // Increased threshold from 0.35 to 0.6 for higher precision
  if (bestEntry && bestScore >= 0.6) {
    return { answer: bestEntry.answer, confidence: bestScore };
  }

  return null;
}

async function queryGroq(
  query: string,
  history: { role: string; content: string }[]
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  console.log("Groq API Key present:", !!apiKey);

  if (!apiKey) {
    console.warn("GROQ_API_KEY is missing in process.env");
    return "I don't currently have that information. You can ask about schedule, speakers, registration, or venues for ELEVATE'26!";
  }

  try {
    console.log("Calling Groq API with query:", query);
    const groq = new Groq({ apiKey });

    const systemPrompt = `You are the official AI assistant for ELEVATE'26, a Startup Conclave organized by PSIT Startup & Incubation Foundation at PSIT Kanpur on February 24-25, 2026.

Event Details:
- Event: ELEVATE'26 Startup Conclave
- Dates: February 24-25, 2026
- Location: PSIT Kanpur
- Organizer: PSIT Startup & Incubation Foundation

Speakers:
- Ashish Kanaujia - Technology Innovation Consultant at iCreate (Govt of Gujarat TBI)
- Neha Malhotra - Founder & Managing Partner at MeritX Ventures, TiE Delhi

Sessions: Guest lectures, Networking sessions, Innovation Showcase Competition
Venues: Main Auditorium, Innovation Hub, Startup Showcase Arena
Registration: QR code on poster, linktr.ee/srajanecellpsit2004, Contact: 88082 23952, 76449 05477

Rules:
- Be friendly, enthusiastic, professional, and concise
- Use bullet points for lists
- Only answer questions related to ELEVATE'26
- If asked something unrelated, politely redirect to the event
- Keep responses under 150 words`;

    const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
      { role: "system", content: systemPrompt },
      ...history.slice(-5).map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user", content: query },
    ];

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      max_tokens: 300,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || "I couldn't generate a response. Please try again!";
  } catch (error) {
    console.error("Groq API error:", error);
    return "I don't currently have that information. You can ask about schedule, speakers, registration, or venues for ELEVATE'26!";
  }
}

export function checkRateLimit(sessionId: string): boolean {
  const now = Date.now();
  const limit = rateLimits.get(sessionId);

  if (!limit || now > limit.resetTime) {
    rateLimits.set(sessionId, { count: 1, resetTime: now + 20000 });
    return true;
  }

  if (limit.count >= 5) {
    return false;
  }

  limit.count++;
  return true;
}

export async function processChat(
  query: string,
  sessionId: string
): Promise<{ response: string; confidence: number; used_groq: boolean }> {
  const cacheKey = query.toLowerCase().trim();
  const cached = queryCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return { response: cached.response, confidence: cached.confidence, used_groq: false };
  }

  const history = sessionHistory.get(sessionId) || [];

  const match = findBestMatch(query);

  if (match) {
    history.push({ role: "user", content: query });
    history.push({ role: "assistant", content: match.answer });
    if (history.length > 6) history.splice(0, history.length - 6);
    sessionHistory.set(sessionId, history);

    queryCache.set(cacheKey, {
      response: match.answer,
      confidence: match.confidence,
      timestamp: Date.now(),
    });

    return { response: match.answer, confidence: match.confidence, used_groq: false };
  }

  const groqResponse = await queryGroq(query, history);

  history.push({ role: "user", content: query });
  history.push({ role: "assistant", content: groqResponse });
  if (history.length > 6) history.splice(0, history.length - 6);
  sessionHistory.set(sessionId, history);

  const result = { response: groqResponse, confidence: 0.6, used_groq: true };

  queryCache.set(cacheKey, {
    response: groqResponse,
    confidence: 0.6,
    timestamp: Date.now(),
  });

  return result;
}

const detailedEvents = [
  {
    id: "e1",
    title: "Startup Conclave: The Beginning",
    time: "09:00 AM - 11:30 AM",
    date: "Feb 24, 2026",
    venue: "Main Auditorium",
    description: "Inauguration and keynote speech by Ashish Kanaujia about the future of tech startups.",
    category: "Guest Lecture",
  },
  {
    id: "e2",
    title: "Innovation Workshop",
    time: "12:00 PM - 02:00 PM",
    date: "Feb 24, 2026",
    venue: "Innovation Hub",
    description: "Hands-on session on prototyping and lean startup methodology.",
    category: "Workshop",
  },
  {
    id: "e3",
    title: "Networking Lunch",
    time: "02:00 PM - 03:30 PM",
    date: "Feb 24, 2026",
    venue: "Startup Showcase Arena",
    description: "Connect with fellow innovators and mentors over lunch.",
    category: "Networking",
  },
  {
    id: "e4",
    title: "Venture Capital Insights",
    time: "10:00 AM - 12:00 PM",
    date: "Feb 25, 2026",
    venue: "Main Auditorium",
    description: "Neha Malhotra shares secrets on how to pitch and secure venture capital.",
    category: "Guest Lecture",
  },
  {
    id: "e5",
    title: "Innovation Showcase (Finals)",
    time: "01:00 PM - 04:00 PM",
    date: "Feb 25, 2026",
    venue: "Startup Showcase Arena",
    description: "Top startup ideas compete for glory and recognition.",
    category: "Competition",
  },
];

export function getEventInfo() {
  return {
    name: "ELEVATE'26 - Startup Conclave",
    summary: "A two-day event bringing together innovators and entrepreneurs.",
    events: detailedEvents,
  };
}

export function getVenues() {
  return [
    {
      name: "Main Auditorium",
      purpose: "Keynote speeches and guest lectures",
    },
    {
      name: "Innovation Hub",
      purpose: "Workshops and interactive sessions",
    },
    {
      name: "Startup Showcase Arena",
      purpose: "Innovation Showcase Competition",
    },
  ];
}

export function getFAQs() {
  return knowledgeBase
    .filter((e) => !["greeting", "farewell"].includes(e.category))
    .map((e) => ({
      question: e.question,
      answer: e.answer,
      category: e.category,
    }));
}
