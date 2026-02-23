/*
 * ============================================================
 *  Portfolio Chatbot — Bala Pramithran R
 *
 *  FIXED EXECUTION ORDER (critical — do not reorder sections):
 *  1. DATA          — raw portfolio content
 *  2. HELPERS       — el(), fmt(), normalize(), rand()
 *  3. RENDERERS     — DOM builders (need el + fmt)
 *  4. HANDLERS      — return typed data objects (need DATA)
 *  5. INTENT MAP    — references handler functions (must come AFTER handlers)
 *  6. INTENT ENGINE — detectIntent() uses INTENT_MAP
 *  7. CHAT ENGINE   — processInput, appendMessage, etc.
 *  8. EVENTS        — listeners
 *  9. BOOT          — fires last
 * ============================================================
 */


/* ============================================================
   1. DATA
   ============================================================ */
const DATA = {
  name: "Bala Pramithran R",
  initials: "BP",
  role: "Software Developer & AI Enthusiast",
  location: "Chennai, India",

  about: `I'm a Pre-final year B.E. Computer Science student with strong fundamentals in core engineering concepts, who delivered a production-grade project solution 
for Ashok Leyland and serves as Lead of the college’s largest technical community, Coders Forum. Adept at rapidly mastering new technologies to design 
and implement robust, high-performance systems.`,

  skills: {
    "Languages": ["Java", "Python", "SQL"],
    "Libraries": ["PyTorch", "Scikit-learn", "OpenCV", "Open3D", "Colmap", "NumPy", "Pandas"],
    "Frameworks": ["FastAPI", "Angular", "Flask"],
    "Tools": ["Git", "GitHub", "Docker", "Linux", "Android Studio", "UiPath", "N8N"]
  },

  projects: [
    {
      title: "Engine Defect Detection System",
      description: "Production-grade 3D defect detection pipeline built for Ashok Leyland. Uses point cloud analysis to identify minute structural anomalies on engine surfaces — the kind traditional 2D vision systems miss entirely.",
      tags: ["Open3D", "PyTorch", "Scikit-learn", "PyQt"],
      url: "#"
    },
    {
      title: "3D Model Reconstruction Pipeline",
      description: "Automated pipeline that reconstructs accurate 3D models from 100+ 2D images. Includes a custom preprocessing stage to handle noise, occlusion, and lighting variance before reconstruction.",
      tags: ["OpenCV", "Colmap", "Open3D", "NumPy"],
      url: "#"
    },
    {
      title: "ParkFlow — Smart Parking SaaS",
      description: "SaaS platform for real-time parking management. Won Runner-Up at Hack-A-Choice. Handles slot booking, dynamic pricing, and analytics for parking operators.",
      tags: ["Full-Stack", "SaaS", "Hackathon"],
      url: "#"
    }
  ],

  experience: [
    {
      title: "Project Intern",
      org: "Infosys Springboard",
      period: "2024",
      desc: "Built a full-stack application using Angular, TypeScript, and Flask. Integrated Cloudinary for media handling. Worked in an agile team with real delivery deadlines."
    },
    {
      title: "Lead — Coders Forum",
      org: "Panimalar Engineering College",
      period: "2023 – Present",
      desc: "Running the largest technical community in college. Organising weekly coding meetups, competitive programming contests, and hands-on workshops."
    }
  ],

  education: [
    {
      title: "B.E. Computer Science and Engineering",
      org: "Panimalar Engineering College, Chennai",
      period: "2023 – 2027",
      desc: "Pre-final year. Focused on artificial intelligence and software engineering. Active in hackathons, open-source, and community leadership."
    },
    {
      title: "Higher Secondary (CBSE)",
      org: "School",
      period: "Completed 2023",
      desc: "Scored 72.6%."
    },
    {
      title: "SSLC (CBSE)",
      org: "School",
      period: "Completed 2021",
      desc: "Scored 92.6%."
    }
  ],

  achievements: [
    {
      title: "🏆 Winner — Hack-A-Bot (UiPath)",
      detail: "1st place out of 50 teams. Built an automation solution using UiPath that impressed both judges and industry mentors."
    },
    {
      title: "🥈 Runner-Up — Hack-A-Choice",
      detail: "Built ParkFlow, a SaaS-based smart parking platform, in under 24 hours. Competed against strong cross-college teams."
    }
  ],

  contact: {
    email: "pramithran2005@gmail.com",
    linkedin: "https://www.linkedin.com/in/bala-pramithran-r-0320b1295/",   // ← Replace with your LinkedIn URL
    github: "https://github.com/BALAPRAMITHRAN?tab=repositories"    // ← Replace with your GitHub URL
  },

  resume: {
    label: "Download Resume (PDF)",
    url: "Assets/Resume_Final1.pdf"              // ← Replace with your actual resume PDF URL
  }
};


/* ============================================================
   2. HELPERS
   ============================================================ */

/** Create a DOM element with optional class and innerHTML */
function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

/** Convert **bold** and newlines to HTML */
function fmt(str) {
  if (!str) return "";
  return String(str)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br>");
}

/** Lowercase + strip punctuation */
function normalize(str) {
  return String(str)
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .trim();
}

/** Pick a random item from an array */
function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}


/* ============================================================
   3. RENDERERS  (depend on el + fmt — defined above)
   ============================================================ */

function renderText(data) {
  const wrap = document.createElement("div");
  if (data.label) wrap.appendChild(el("span", "content-label", data.label));
  const p = el("p");
  p.innerHTML = fmt(data.content || "");
  wrap.appendChild(p);
  return wrap;
}

function renderProjects(data) {
  const wrap = document.createElement("div");
  if (data.label) wrap.appendChild(el("span", "content-label", data.label));
  if (data.intro) {
    const p = el("p");
    p.innerHTML = fmt(data.intro);
    wrap.appendChild(p);
  }

  const grid = el("div", "projects-grid");
  data.items.forEach(proj => {
    const card = el("div", "project-card");
    const header = el("div", "pc-header");
    header.appendChild(el("span", "pc-title", proj.title));

    if (proj.url && proj.url !== "#") {
      const link = el("a", "pc-link", "View ↗");
      link.href = proj.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      header.appendChild(link);
    }

    card.appendChild(header);
    card.appendChild(el("p", "pc-desc", proj.description));

    const tags = el("div", "pc-tags");
    proj.tags.forEach(t => tags.appendChild(el("span", "tag", t)));
    card.appendChild(tags);
    grid.appendChild(card);
  });

  wrap.appendChild(grid);
  return wrap;
}

function renderSkills(data) {
  const wrap = document.createElement("div");
  if (data.label) wrap.appendChild(el("span", "content-label", data.label));
  if (data.intro) {
    const p = el("p");
    p.textContent = data.intro;
    wrap.appendChild(p);
  }

  const list = el("div", "skills-list");
  for (const [group, skills] of Object.entries(data.items)) {
    const grp = el("div", "skill-group");
    grp.appendChild(el("div", "skill-group-name", group));
    const pills = el("div", "skill-pills");
    skills.forEach(s => pills.appendChild(el("span", "skill-pill", s)));
    grp.appendChild(pills);
    list.appendChild(grp);
  }

  wrap.appendChild(list);
  return wrap;
}

function renderTimeline(data) {
  const wrap = document.createElement("div");
  if (data.label) wrap.appendChild(el("span", "content-label", data.label));
  if (data.intro) {
    const p = el("p");
    p.textContent = data.intro;
    wrap.appendChild(p);
  }

  const tl = el("div", "timeline");
  data.items.forEach(item => {
    const div = el("div", "tl-item");
    const meta = el("div", "tl-meta");
    meta.appendChild(el("span", "tl-title", item.title));
    if (item.period) meta.appendChild(el("span", "tl-period", item.period));
    div.appendChild(meta);
    if (item.org) div.appendChild(el("div", "tl-org", item.org));
    div.appendChild(el("div", "tl-desc", item.desc));
    tl.appendChild(div);
  });

  wrap.appendChild(tl);
  return wrap;
}

function renderAchievements(data) {
  const wrap = document.createElement("div");
  if (data.label) wrap.appendChild(el("span", "content-label", data.label));
  if (data.intro) {
    const p = el("p");
    p.innerHTML = fmt(data.intro);
    wrap.appendChild(p);
  }

  const list = el("div", "achievements-list");
  data.items.forEach(item => {
    const card = el("div", "achievement-card");
    card.appendChild(el("div", "ach-title", item.title));
    card.appendChild(el("div", "ach-detail", item.detail));
    list.appendChild(card);
  });

  wrap.appendChild(list);
  return wrap;
}

function renderResume(data) {
  const wrap = document.createElement("div");
  if (data.label) wrap.appendChild(el("span", "content-label", data.label));
  const p = el("p");
  p.textContent = data.content;
  wrap.appendChild(p);

  const btn = el("a", "resume-btn");
  btn.href = DATA.resume.url;
  btn.download = "";
  btn.target = "_blank";
  btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>${DATA.resume.label}`;
  wrap.appendChild(btn);
  return wrap;
}

function renderContact(data) {
  const wrap = document.createElement("div");
  if (data.label) wrap.appendChild(el("span", "content-label", data.label));
  if (data.intro) {
    const p = el("p");
    p.textContent = data.intro;
    wrap.appendChild(p);
  }

  const rows = el("div", "contact-links");
  const entries = [
    { key: "Email", val: data.items.email, href: `mailto:${data.items.email}` },
    { key: "LinkedIn", val: data.items.linkedin !== "ADD_LINK" ? data.items.linkedin : "Update your LinkedIn link", href: data.items.linkedin !== "ADD_LINK" ? data.items.linkedin : null },
    { key: "GitHub", val: data.items.github !== "ADD_LINK" ? data.items.github : "Update your GitHub link", href: data.items.github !== "ADD_LINK" ? data.items.github : null }
  ];

  entries.forEach(e => {
    const row = el("div", "contact-row");
    row.appendChild(el("span", "contact-key", e.key));
    if (e.href) {
      const a = el("a", null, e.val);
      a.href = e.href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      row.appendChild(a);
    } else {
      row.appendChild(el("span", "contact-placeholder", e.val));
    }
    rows.appendChild(row);
  });

  wrap.appendChild(rows);
  return wrap;
}

/** Route a typed data object → the right renderer */
function buildContent(data) {
  try {
    switch (data.type) {
      case "projects": return renderProjects(data);
      case "skills": return renderSkills(data);
      case "timeline": return renderTimeline(data);
      case "achievements": return renderAchievements(data);
      case "resume": return renderResume(data);
      case "contact": return renderContact(data);
      default: return renderText(data);
    }
  } catch (err) {
    console.error("[buildContent] Render error:", err);
    return renderText({ content: "Something went wrong rendering that response. Try asking again." });
  }
}


/* ============================================================
   4. HANDLERS  (depend on DATA — defined above)
      Each returns a typed data object consumed by buildContent
   ============================================================ */

function onGreeting() {
  return {
    type: "text",
    content: rand([
      `Hey! Good to have you here.\n\nI'm a digital version of **Bala Pramithran** — AI Enthusiast and CS student. Ask me about his **projects**, **skills**, or **experience**, and I'll give you the real story.`,
      `Hello! I'm Bala's AI stand-in — faster at responding, equally proud of the work. Ask me anything.`,
      `Hey 👋 Think of me as Bala, but available 24/7. What do you want to know?`
    ])
  };
}

function onAbout() {
  return { type: "text", label: "About Bala", content: DATA.about };
}

function onProjects() {
  return {
    type: "projects",
    label: "Projects",
    intro: "Here's what I've been building: real systems, real impact 👇",
    items: DATA.projects
  };
}

function onSkills() {
  return {
    type: "skills",
    label: "Skills & Stack",
    intro: "Here's what I work with across AI, backend, and tooling 👇",
    items: DATA.skills
  };
}

function onExperience() {
  return {
    type: "timeline",
    label: "Experience",
    intro: "I've worked in industry and led communities. Here's the breakdown:",
    items: DATA.experience
  };
}

function onEducation() {
  return {
    type: "timeline",
    label: "Education",
    intro: "Currently a pre-final year CS student. Here's the full picture:",
    items: DATA.education
  };
}

function onAchievements() {
  return {
    type: "achievements",
    label: "Achievements",
    intro: "Competed, shipped, and won. Here are the highlights 🏆",
    items: DATA.achievements
  };
}

function onResume() {
  return {
    type: "resume",
    label: "Resume",
    content: "My resume covers the full picture — AI projects, internship, community leadership, and hackathon wins."
  };
}

function onContact() {
  return {
    type: "contact",
    label: "Get In Touch",
    intro: "I'm open to internships, research collaborations, and interesting projects. Here's where to find me:",
    items: DATA.contact
  };
}

function onThanks() {
  return {
    type: "text",
    content: rand([
      "Glad I could help! Ask anything else — projects, skills, experience, I've got it all.",
      "Of course. Keep the questions coming 🙌",
      "Happy to. What else do you want to know?",
      "Anytime — that's what I'm here for."
    ])
  };
}

function onFallback() {
  return {
    type: "text",
    content: rand([
      `I'm not sure I got that. Try asking about my **projects**, **skills**, **experience**, **achievements**, or how to **contact** me.`,
      `Didn't quite catch that — but I know a lot! Ask about my **AI projects**, **tech stack**, **internship at Infosys**, or **hackathon wins**.`,
      `That one's outside my knowledge base. Ask about the **Ashok Leyland defect detection project**, **skills**, or **experience** — those I can answer well.`
    ])
  };
}


/* ============================================================
   5. INTENT MAP  (must come AFTER handlers — all functions
                   now exist when this array is created)
   ============================================================ */
const INTENT_MAP = [
  {
    name: "greeting",
    phrases: ["hi", "hello", "hey", "howdy", "sup", "yo", "good morning", "hiya", "whats up"],
    handler: onGreeting
  },
  {
    name: "about",
    phrases: ["about", "who are you", "tell me about", "introduce", "yourself", "background", "bio", "who is bala"],
    handler: onAbout
  },
  {
    name: "projects",
    phrases: ["project", "built", "build", "made", "portfolio", "demo", "ashok leyland", "defect", "parkflow", "reconstruction", "what have you"],
    handler: onProjects
  },
  {
    name: "skills",
    phrases: ["skill", "tech", "stack", "technologies", "tools", "language", "framework", "expertise", "pytorch", "opencv", "python", "java"],
    handler: onSkills
  },
  {
    name: "experience",
    phrases: ["experience", "internship", "intern", "job", "career", "worked", "infosys", "coders forum", "community", "work"],
    handler: onExperience
  },
  {
    name: "education",
    phrases: ["education", "study", "studied", "university", "college", "degree", "panimalar", "school", "academic"],
    handler: onEducation
  },
  {
    name: "achievements",
    phrases: ["achievement", "award", "win", "won", "hackathon", "prize", "uipath", "hack a bot", "hack a choice", "runner"],
    handler: onAchievements
  },
  {
    name: "resume",
    phrases: ["resume", "cv", "download", "pdf", "curriculum"],
    handler: onResume
  },
  {
    name: "contact",
    phrases: ["contact", "reach", "email", "linkedin", "github", "hire", "connect", "get in touch", "message"],
    handler: onContact
  },
  {
    name: "thanks",
    phrases: ["thank", "thanks", "thx", "appreciate", "cheers", "helpful", "great", "nice", "cool", "perfect", "awesome"],
    handler: onThanks
  }
];


/* ============================================================
   6. INTENT ENGINE
   ============================================================ */

/**
 * isSimilar(a, b)
 * Lightweight fuzzy match — returns true if two strings differ
 * by at most 2 characters (covers common typos like "skils",
 * "projcts", "experiance").
 * Uses Levenshtein distance capped at 2 for speed.
 */
function isSimilar(a, b) {
  if (Math.abs(a.length - b.length) > 2) return false;
  if (a === b) return true;

  // Build a small DP matrix
  const la = a.length, lb = b.length;
  const dp = Array.from({ length: la + 1 }, (_, i) =>
    Array.from({ length: lb + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );

  for (let i = 1; i <= la; i++) {
    for (let j = 1; j <= lb; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }

  return dp[la][lb] <= 2;
}

/**
 * Keyword-pair combos that strongly signal an intent.
 * If BOTH words are present in the input → award a bonus +3.
 * Handles "what are your skills", "show me projects", etc.
 */
const COMBOS = [
  { words: ["what", "skill"], intent: "skills" },
  { words: ["what", "tech"], intent: "skills" },
  { words: ["what", "stack"], intent: "skills" },
  { words: ["what", "know"], intent: "skills" },
  { words: ["what", "can"], intent: "skills" },
  { words: ["tell", "skill"], intent: "skills" },
  { words: ["your", "skill"], intent: "skills" },
  { words: ["show", "skill"], intent: "skills" },

  { words: ["show", "project"], intent: "projects" },
  { words: ["what", "built"], intent: "projects" },
  { words: ["what", "build"], intent: "projects" },
  { words: ["what", "made"], intent: "projects" },
  { words: ["your", "project"], intent: "projects" },
  { words: ["tell", "project"], intent: "projects" },

  { words: ["where", "work"], intent: "experience" },
  { words: ["where", "worked"], intent: "experience" },
  { words: ["your", "experience"], intent: "experience" },
  { words: ["tell", "experience"], intent: "experience" },
  { words: ["work", "history"], intent: "experience" },

  { words: ["where", "study"], intent: "education" },
  { words: ["where", "studied"], intent: "education" },
  { words: ["your", "education"], intent: "education" },
  { words: ["your", "degree"], intent: "education" },

  { words: ["who", "you"], intent: "about" },
  { words: ["tell", "yourself"], intent: "about" },
  { words: ["tell", "about"], intent: "about" },
  { words: ["introduce", "yourself"], intent: "about" },

  { words: ["get", "touch"], intent: "contact" },
  { words: ["how", "contact"], intent: "contact" },
  { words: ["how", "reach"], intent: "contact" },

  { words: ["show", "achievement"], intent: "achievements" },
  { words: ["your", "award"], intent: "achievements" },
  { words: ["what", "won"], intent: "achievements" },
  { words: ["what", "win"], intent: "achievements" },

  { words: ["get", "resume"], intent: "resume" },
  { words: ["download", "cv"], intent: "resume" },
];

/**
 * detectIntent(raw)
 *
 * Scoring rules (higher = more confident):
 *   +3  exact phrase match in INTENT_MAP
 *   +2  individual keyword match (word-boundary aware)
 *   +2  fuzzy match on individual word (≤2 char difference)
 *   +3  keyword COMBO match (two words both present)
 *
 * Returns the INTENT_MAP entry with the highest score,
 * or null if nothing scores above 0.
 */
function detectIntent(raw) {
  const text = normalize(raw);
  const words = text.split(/\s+/).filter(Boolean);

  console.log("[Bot] User input :", raw);
  console.log("[Bot] Normalized  :", text);
  console.log("[Bot] Tokens      :", words);

  // Build a score map keyed by intent name
  const scores = {};
  for (const intent of INTENT_MAP) scores[intent.name] = 0;

  // ── Pass 1: phrase & keyword matching ──────────────────────
  for (const intent of INTENT_MAP) {
    for (const phrase of intent.phrases) {
      const normPhrase = normalize(phrase);
      const phraseWords = normPhrase.split(/\s+/);

      if (phraseWords.length > 1) {
        // Multi-word phrase: exact substring match → +3
        if (text.includes(normPhrase)) scores[intent.name] += 3;
      } else {
        // Single keyword: exact match → +2
        if (words.includes(normPhrase)) {
          scores[intent.name] += 2;
        } else if (text.includes(normPhrase)) {
          // Partial substring match → +1 (catches "skills" in "skillset")
          scores[intent.name] += 1;
        }
      }
    }
  }

  // ── Pass 2: fuzzy matching on individual tokens ─────────────
  for (const intent of INTENT_MAP) {
    for (const phrase of intent.phrases) {
      const normPhrase = normalize(phrase);
      if (normPhrase.split(/\s+/).length > 1) continue; // skip multi-word

      for (const word of words) {
        if (word.length < 3) continue; // skip tiny words ("a", "i")
        if (scores[intent.name] >= 2) continue; // already matched cleanly
        if (isSimilar(word, normPhrase)) {
          scores[intent.name] += 2;
          console.log(`[Bot] Fuzzy: "${word}" ≈ "${normPhrase}" → ${intent.name}`);
          break;
        }
      }
    }
  }

  // ── Pass 3: keyword combo bonuses ───────────────────────────
  for (const combo of COMBOS) {
    const allPresent = combo.words.every(w =>
      words.some(token => token.includes(w) || isSimilar(token, w))
    );
    if (allPresent) {
      scores[combo.intent] = (scores[combo.intent] || 0) + 3;
      console.log(`[Bot] Combo matched: [${combo.words}] → ${combo.intent}`);
    }
  }

  // ── Pick the winner ─────────────────────────────────────────
  let best = null, bestScore = 0;
  for (const intent of INTENT_MAP) {
    if (scores[intent.name] > bestScore) {
      bestScore = scores[intent.name];
      best = intent;
    }
  }

  console.log("[Bot] Scores      :", scores);
  console.log("[Bot] Winner      :", best ? best.name : "fallback", `(score: ${bestScore})`);

  return best; // null → caller uses onFallback
}


/* ============================================================
   7. CHAT ENGINE
   ============================================================ */
const chatWindow = document.getElementById("chatWindow");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function appendMessage(role, contentOrNode, time) {
  const row = el("div", `message-row ${role}`);
  const col = el("div", "msg-col");
  const bubble = el("div", "bubble");

  if (role === "bot") {
    row.appendChild(el("div", "msg-avatar", DATA.initials));
  }

  if (typeof contentOrNode === "string") {
    const p = el("p");
    p.innerHTML = fmt(contentOrNode);
    bubble.appendChild(p);
  } else {
    bubble.appendChild(contentOrNode);
  }

  col.appendChild(bubble);
  col.appendChild(el("div", "msg-time", time || getTime()));
  row.appendChild(col);
  chatWindow.appendChild(row);
  scrollBottom();
}

function showTyping() {
  // Guard: never duplicate the typing indicator
  if (document.getElementById("typingRow")) return;
  const row = el("div", "typing-row");
  row.id = "typingRow";
  const bubble = el("div", "typing-bubble");
  bubble.innerHTML = `<div class="dot"></div><div class="dot"></div><div class="dot"></div>`;
  row.appendChild(el("div", "msg-avatar", DATA.initials));
  row.appendChild(bubble);
  chatWindow.appendChild(row);
  scrollBottom();
}

function removeTyping() {
  const r = document.getElementById("typingRow");
  if (r) r.remove();
}

function scrollBottom() {
  chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: "smooth" });
}

function processInput(raw) {
  const text = raw.trim();
  if (!text) return;

  // Clear input immediately
  userInput.value = "";
  sendBtn.disabled = true;

  appendMessage("user", text);

  const thinkMs = 400 + Math.random() * 400;    // 0.4–0.8 s before indicator
  const respondMs = thinkMs + 700 + Math.random() * 400; // 0.7–1.1 s "thinking"

  setTimeout(showTyping, thinkMs);

  setTimeout(() => {
    try {
      removeTyping();
      const intent = detectIntent(text);
      const data = intent ? intent.handler() : onFallback();
      const node = buildContent(data);
      appendMessage("bot", node);
    } catch (err) {
      console.error("[Bot] processInput error:", err);
      removeTyping();
      appendMessage("bot", "Something went wrong on my end. Try asking about my projects, skills, or experience.");
    } finally {
      sendBtn.disabled = false;
      userInput.focus();
    }
  }, respondMs);
}


/* ============================================================
   8. EVENTS
   ============================================================ */
sendBtn.addEventListener("click", () => {
  processInput(userInput.value);
});

userInput.addEventListener("keydown", e => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    processInput(userInput.value);
  }
});

// Chip clicks — delegated to parent so chips added later also work
document.getElementById("suggestions").addEventListener("click", e => {
  const chip = e.target.closest(".chip");
  if (chip && chip.dataset.msg) {
    processInput(chip.dataset.msg);
  }
});


/* ============================================================
   9. BOOT  (fires last — all functions guaranteed defined)
   ============================================================ */
function boot() {
  // Guard: make sure the DOM nodes actually exist before we touch them
  if (!chatWindow || !userInput || !sendBtn) {
    console.error("[Bot] Critical DOM elements missing. Check IDs: chatWindow, userInput, sendBtn.");
    return;
  }

  userInput.focus();

  setTimeout(() => {
    try {
      const greet = buildContent({
        type: "text",
        content: `Hey, I'm **Bala Pramithran** 👋\nI build AI systems and real-world applications.\n\nI've shipped a **3D defect detection system** for **Ashok Leylands**, built a **3D reconstruction pipeline**, won a **UiPath hackathon**, and currently lead **Coders Forum** at my college.\n\nAsk me about my **projects**, **skills**, **experience**, or **achievements** — I'll give you the real story.`
      });
      appendMessage("bot", greet, getTime());
    } catch (err) {
      console.error("[Bot] Boot error:", err);
    }
  }, 500);
}

boot();
