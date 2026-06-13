# FULCRUM OS — COMPLETE BUILD PROMPT WITH UI/UX
## Copy this ENTIRE content into Pravin Agent

═══════════════════════════════════════════════════════

Build Fulcrum OS — The Operating System for Community Entrepreneurship.

## TECH STACK

Frontend: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
Backend: FastAPI, Python 3.12, SQLAlchemy 2.0, Pydantic
Database: PostgreSQL (Pravin managed)
Cache: Redis (Upstash free tier)
Auth: JWT + OTP via SMS
Storage: Cloudflare R2 (S3-compatible)
Real-time: Socket.io WebSockets
i18n: next-intl (Tamil, Hindi, English)
Search: PostgreSQL full-text search

IMPORTANT: NO AI. NO ML. NO LLMs. Everything is rule-based, deterministic, statistical.

═══════════════════════════════════════════════════════
## DESIGN SYSTEM (Read this FIRST before building any UI)
═══════════════════════════════════════════════════════

### Colors:
- Primary: #6366F1 (Indigo 500)
- Secondary: #8B5CF6 (Violet 500)
- Accent: #F59E0B (Amber 500)
- Success: #10B981 (Emerald 500)
- Warning: #F59E0B (Amber 500)
- Error: #EF4444 (Red 500)
- Info: #3B82F6 (Blue 500)

### Journey State Colors:
- Idea: #8B5CF6 (Violet)
- Builder Assigned: #3B82F6 (Blue)
- Documents: #F59E0B (Amber)
- Applied: #0EA5E9 (Sky)
- Under Review: #F97316 (Orange)
- Approved: #10B981 (Emerald)
- Rejected: #EF4444 (Red)
- Revenue: #22C55E (Green)
- Employer: #F59E0B (Gold)

### Typography:
- Font: Inter (primary), JetBrains Mono (monospace)
- Display: 48px / 700 weight
- H1: 36px / 700
- H2: 30px / 600
- H3: 24px / 600
- Body: 16px / 400 / 24px line-height
- Caption: 12px / 500

### Spacing: 8px grid system
- space-1: 4px, space-2: 8px, space-3: 12px, space-4: 16px
- space-6: 24px, space-8: 32px, space-12: 48px, space-16: 64px

### Border Radius:
- sm: 4px, md: 8px, lg: 12px, xl: 16px, 2xl: 24px, full: 9999px

### Shadows:
- sm: 0 1px 2px rgba(0,0,0,0.05)
- md: 0 4px 6px rgba(0,0,0,0.07)
- lg: 0 10px 15px rgba(0,0,0,0.1)
- glow: 0 0 20px rgba(99,102,241,0.3) (for active states)

### Motion:
- duration-fast: 100ms, duration-normal: 200ms, duration-slow: 300ms
- ease: cubic-bezier(0.4, 0, 0.2, 1)
- Page transition: fade + slide up (200ms)
- Card hover: scale(1.02) + shadow increase (150ms)
- Button press: scale(0.98) (100ms)
- Celebration: confetti + scale bounce (500ms)
- Loading: skeleton pulse (1000ms loop)

### Responsive Breakpoints:
- Mobile: 375px (primary target — design mobile-first)
- Tablet: 768px
- Desktop: 1024px
- Wide: 1440px

### Design Philosophy:
- 50% Apple (simplicity, delight, human-first)
- 20% Stripe (trust, clarity, elegance)
- 10% Linear (speed, keyboard-first)
- 10% GitHub (transparency, version control)
- 10% Palantir (pattern detection, live ops for admin)
- 0% Government Portal

### Micro-Copy Tone:
- Warm, encouraging, never condescending
- Direct, never vague
- Specific, never generic
- Action-oriented, never passive
- Use Tamil/Hindi where possible

═══════════════════════════════════════════════════════
## PAGE 1: LANDING PAGE
═══════════════════════════════════════════════════════

The landing page should feel like Stripe + Airbnb combined.
Beautiful, trustworthy, action-oriented. NOT like a government portal.

### Layout (top to bottom):

**NAVIGATION BAR (sticky, white background, subtle shadow):**
- Left: Fulcrum Logo + "Fulcrum OS"
- Center: [For Entrepreneurs] [For Builders] [For Government] [Knowledge Base]
- Right: [Login] [Get Started →] (primary button, indigo)

**HERO SECTION (full width, gradient background indigo→violet):**
- Large heading (white, 48px): "Every Entrepreneur Deserves a Guide"
- Subheading (white/80%, 20px): "Fulcrum OS: The Operating System for Community Entrepreneurship in India. From Idea → Business → Employer. Without getting lost in bureaucracy."
- Two CTAs: [Start Your Journey →] (primary, white) [Watch 2-Min Story] (secondary, white/80%)
- Below: Animated journey demo (auto-playing, 15-second loop showing Idea → Builder → Documents → Funding → Business)
- Trust bar (white/60%): "Trusted by DPIIT · Partnered with StartupTN · Aligned with SCSP/TSP · Built on India Stack"

**PROBLEM SECTION (white background, centered):**
- Heading: "₹12,437 Cr of PMEGP budget went unspent last year. Not because entrepreneurs didn't apply. Because the system didn't guide them."
- Three stat cards (side by side on desktop, stacked on mobile):
  - ₹12,437 Cr — PMEGP unspent
  - ₹54,282 Cr — Unverified utilization certificates
  - 1 of 12 — SC/ST is just 1 of 12 PSL categories

**SOLUTION SECTION (light gray background):**
- Heading: "Fulcrum matches you with a Community Builder, guides you through every document, finds your perfect scheme, and tracks your application — all in Tamil."
- Interactive journey builder: Select business category → See animated journey → "Your expected timeline: 90 days" → "Expected funding: ₹18,00,000"

**HOW IT WORKS (white background, 3 steps):**
- ① Tell us your idea — "I want to start a food processing unit in Madurai" → 5 quick questions
- ② Get matched with a Builder — Murugan, retired bank officer, will guide you → Call within 24 hours
- ③ We handle the rest — Documents → Schemes → Banks → Tracking → You focus on your business
- CTA: [Start Your Journey →]

**SOCIAL PROOF (light gray background):**
- Heading: "42 Businesses. ₹4.8 Cr. 121 Jobs. One Builder."
- Builder spotlight card: Photo, name, title, rating (⭐ 4.9), stats (42 Businesses · 89% Success Rate), quote
- Success stories carousel (3 cards): Photo, name, business, quote, "Read Full Story →"

**LIVE COMMUNITY PULSE (white background):**
- Heading: "Today on Fulcrum"
- Live feed: "🟢 Lakshmi uploaded her PAN card" "🟢 Murugan completed his 50th mentorship" "🟢 Rahul received GST approval"
- Live counters: Businesses: 42 · Funding: ₹4.8Cr · Jobs: 121

**SCHEME SHOWCASE (light gray background):**
- Heading: "50+ schemes. One platform. Your perfect match."
- 3 scheme cards: PMEGP (Up to ₹1Cr, 25-35% subsidy), Stand-Up India (₹10L-₹1Cr, SC/ST/Women), MUDRA (Up to ₹10L, Shishu/Kishore/Tarun)
- [View All 50+ Schemes →]

**FOR BUILDERS (white background):**
- Heading: "Use your experience to change lives."
- Benefits: ✓ Help entrepreneurs navigate the system ✓ Build your reputation ✓ Earn badges ✓ Join a network
- [Apply to Become a Builder →]

**FOR GOVERNMENT (dark background):**
- Heading: "Track every rupee. Measure every outcome."
- Benefits: ✓ Real-time fund utilization ✓ Scheme performance analytics ✓ Fraud detection ✓ District-wise impact
- [Request Demo →]

**KNOWLEDGE BASE (white background):**
- Sample knowledge card: "PMEGP · Tamil Nadu · Food Manufacturing · Avg Processing Time: 18 days · Success Rate: 82% · Builder Tip: Apply through Regional Branch"
- [Explore Knowledge Base →]

**FINAL CTA (gradient background indigo→violet):**
- Heading: "Your business journey starts with one step."
- [Start Your Journey →] (large, white)
- Subtext: "Free forever for entrepreneurs."

**FOOTER (dark background):**
- Logo + tagline
- Columns: Product (Journey, Schemes, Documents, Builder) | Community (Builders, Knowledge, Stories) | Company (About, Blog, Careers, Contact) | Legal (Terms, Privacy, RTI, Accessibility)
- Bottom: "🇮🇳 Made with love in India · Built on India Stack · Aligned with DPIIT"

═══════════════════════════════════════════════════════
## PAGE 2: LOGIN / REGISTER
═══════════════════════════════════════════════════════

**Layout:** Centered card on gradient background (indigo→violet)

**Login Card (white, rounded-xl, shadow-lg, max-w-md):**
- Logo at top
- Heading: "Welcome back"
- Subtext: "Enter your phone number to continue"
- Input: Phone number (+91 prefix, 10 digits)
- Button: [Send OTP →] (full width, indigo)
- Divider: "or"
- Button: [Continue with DigiLocker] (outlined)
- Link: "New to Fulcrum? Create account"
- Language selector: [தமிழ்] [हिंदी] [English]

**OTP Verification Card:**
- Heading: "Enter OTP"
- Subtext: "We sent a code to +91 ••••••7890"
- 6-digit OTP input (auto-focus, auto-advance)
- Button: [Verify & Continue →]
- Link: "Resend OTP (45s)" (countdown timer)
- Link: "Change phone number"

**Register Card:**
- Heading: "Start your journey"
- Subtext: "Create your free account"
- Inputs: Full Name, Phone Number, Preferred Language (dropdown: Tamil/Hindi/English), District (dropdown), State (dropdown)
- Checkbox: "I agree to Terms of Service and Privacy Policy"
- Button: [Create Account →]
- Link: "Already have an account? Login"

═══════════════════════════════════════════════════════
## PAGE 3: JOURNEY PAGE (PRIMARY VIEW — this is the MAIN screen after login)
═══════════════════════════════════════════════════════

This is the most important page. It should feel like Amazon Tracking + LinkedIn Timeline + Duolingo Progress combined.

**Layout:** Single column, max-w-3xl, centered

**TOP BAR (sticky):**
- Left: "Lakshmi's Journey" (bold, 20px)
- Right: Status badge (e.g., "Under Review" — orange pill)

**NARRATIVE CARD (indigo border-left, light indigo background):**
- Icon: 💡
- Text: "Your application is with Indian Bank. Most food processing applications in Madurai take 18 days. You're on day 12. Similar applications have an 82% approval rate. Your builder has uploaded the missing collateral document."
- Small text: "Why am I seeing this?" (expandable: shows data sources)

**CURRENT ACTION CARD (white, shadow-md, prominent):**
- Heading: "Current Step: Bank Application"
- Subheading: "Indian Bank — PMEGP"
- Progress bar: "Day 12 of 30 expected" (indigo fill)
- Status: "Under Review" (orange badge)
- Details: Applied: June 1, 2026 · Expected: June 30, 2026
- AI-free explanation: "Based on 47 similar applications in Madurai, average processing time is 18 days. Approval rate: 82%."
- Next step: "Bank may call for verification"
- Who can help: Murugan (Builder) · Priya (CA)
- Button: [Message Builder]

**BUILDER CARD (white, shadow-sm):**
- Avatar (photo or initials in indigo circle)
- Name: Murugan S.
- Title: Retired Bank Officer · Madurai
- Stats: ⭐ 4.9 · 42 Businesses · 89% Success
- Languages: தமிழ் · English
- Response time: "< 2 hours"
- Buttons: [Message] [Call]

**JOURNEY TIMELINE (vertical, interactive):**
- Vertical line connecting milestones
- Each milestone: circle (color-coded) + card
- Completed milestones: green check + collapsed
- Current milestone: indigo glow + expanded
- Future milestones: gray + collapsed

Milestones shown:
✅ Idea Created (June 1) — "Organic Millet Foods"
✅ Builder Assigned (June 3) — Murugan joined your journey
✅ Documents Completed (June 7) — 5/5 documents uploaded
✅ Scheme Matched (June 8) — PMEGP recommended
✅ Application Submitted (June 10) — Indian Bank
⏳ Under Review (June 11-TBD) — Current step
⬜ Approval Expected (June 30)
⬜ Funding Disbursed
⬜ GST Registration
⬜ First Sale
⬜ First Employee

**RECENT EVENTS FEED (white, shadow-sm):**
- Heading: "Recent Activity"
- Events (newest first):
  - "Jun 12: Builder uploaded collateral document" (📄 icon)
  - "Jun 10: Bank requested additional document" (🏦 icon)
  - "Jun 01: Application submitted to Indian Bank" (📋 icon)
  - "May 28: All documents verified" (✅ icon)
- Link: [View Full Timeline →]

**FLOATING ACTION BUTTON (bottom-right, indigo circle, shadow-lg):**
- Context-aware: Shows next action
- Examples: "Upload Document" / "Message Builder" / "View Application"

═══════════════════════════════════════════════════════
## PAGE 4: SCHEME MATCHING
═══════════════════════════════════════════════════════

**Layout:** Two-column (filters left, results right) on desktop; single column on mobile

**TOP BAR:**
- Heading: "Scheme Matches for Your Journey"
- Subtext: "Found 8 matching schemes based on your profile"
- Button: [Compare Selected]

**FILTERS (sidebar on desktop, collapsible on mobile):**
- Community: [SC] [ST] [OBC] [Women] [All]
- Sector: [Food Processing] [Retail] [Services] [Manufacturing] [All]
- Stage: [Idea] [Planning] [Documents] [Applied] [Funded]
- Funding Range: ₹0 — ₹1Cr (slider)
- Location: [Tamil Nadu] [All India]
- Sort by: [Best Match] [Highest Funding] [Fastest Approval] [Highest Success Rate]

**SCHEME CARDS (grid, 2 columns on desktop):**

Each card shows:
- Scheme name (bold, 18px)
- Ministry name (small, gray)
- Funding range: "₹5L — ₹1Cr" (indigo)
- Subsidy: "25-35% subsidy" (green)
- Match score: Circular progress (e.g., 92%) with "92% Match" label
- Match reasons (chips): "✓ Targets food processing" "✓ For SC community" "✓ 82% approval in Madurai"
- Stats: "47 applications · 82% approved · 18 days avg"
- Community notes: "💡 Apply through Regional Branch for faster processing — Murugan, Madurai"
- Buttons: [View Details] [Apply →]

**SCHEME DETAIL PAGE (modal or separate page):**
- Full scheme name + ministry
- Description (vernacular)
- Eligibility criteria (checklist)
- Documents required (checklist)
- Funding details (table)
- Bank performance (bar chart)
- Community notes (list)
- Similar success stories (carousel)
- [Apply Now →] (primary CTA)

═══════════════════════════════════════════════════════
## PAGE 5: BUILDER DIRECTORY
═══════════════════════════════════════════════════════

**Layout:** Grid of cards (3 columns desktop, 2 tablet, 1 mobile)

**TOP BAR:**
- Heading: "Community Builders"
- Subtext: "Experienced guides who will walk with you"
- Search: [Search by name, expertise, location...]
- Filters: [Expertise] [Language] [District] [Availability]

**BUILDER CARDS:**

Each card shows:
- Avatar (photo or initials)
- Name + verification badge (✓)
- Title (e.g., "Retired Bank Officer")
- Location (district, state)
- Rating: ⭐ 4.9 (127 reviews)
- Stats: "42 Businesses · ₹4.8Cr Funding · 89% Success"
- Expertise tags: [Banking] [PMEGP] [Food Processing]
- Languages: தமிழ் · English
- Response time: "< 2 hours"
- Availability: "Accepting new cases" (green dot)
- Buttons: [View Profile] [Message]

**BUILDER PROFILE PAGE:**
- Large avatar + name + verification badge
- Bio (2-3 lines)
- Stats bar: Businesses · Funding · Jobs · Success Rate
- Expertise tags
- Languages
- District experience
- Reviews section (list of reviews from entrepreneurs)
- Success stories (carousel)
- [Message Builder] [Schedule Call] [View Cases]

═══════════════════════════════════════════════════════
## PAGE 6: DOCUMENTS
═══════════════════════════════════════════════════════

**Layout:** Single column, checklist style

**TOP BAR:**
- Heading: "Your Documents"
- Progress: "3/5 completed" (progress bar, indigo)

**DOCUMENT CHECKLIST:**

Each item shows:
- Status icon: ✅ (complete) / ⏳ (in progress) / ❌ (missing)
- Document name (e.g., "Aadhaar Card")
- Description: "Front and back of Aadhaar card"
- Upload button: [Upload Photo/PDF]
- Validation status: "✓ Validated" (green) / "⚠ Needs clearer photo" (amber)
- Builder note (if any): "Please ensure the address is clearly visible"

Items:
✅ Aadhaar Card — Uploaded Jun 5 — Validated
✅ PAN Card — Uploaded Jun 5 — Validated
✅ Address Proof — Uploaded Jun 6 — Validated
⏳ Bank Statement — Uploaded Jun 7 — "Needs clearer photo" [Re-upload]
❌ Passport Photo — Not uploaded [Upload]

**UPLOAD MODAL:**
- Drag and drop area
- Or: [Take Photo] [Choose File]
- Preview
- Validation feedback (real-time)
- [Confirm Upload]

═══════════════════════════════════════════════════════
## PAGE 7: APPLICATIONS
═══════════════════════════════════════════════════════

**Layout:** List of applications, each expandable

**TOP BAR:**
- Heading: "Your Applications"
- Stats: "3 Active · 1 Approved · 1 Rejected"

**APPLICATION CARDS:**

Each card shows:
- Bank logo + name
- Scheme name
- Amount requested
- Status badge (color-coded)
- Applied date
- Expected decision date
- Timeline (mini progress bar)

Expanded view:
- Full timeline (submitted → under review → additional docs requested → approved/rejected)
- Documents submitted
- Bank contact info
- Builder notes
- Next steps

═══════════════════════════════════════════════════════
## PAGE 8: MESSAGES
═══════════════════════════════════════════════════════

**Layout:** Chat interface (like WhatsApp)

**LEFT SIDEBAR (conversation list):**
- Search: [Search messages...]
- Conversation items: Avatar + Name + Last message + Time + Unread count

**RIGHT PANEL (chat area):**
- Top: Builder name + status (online/offline) + [Call] button
- Messages (bubbles, indigo for sent, gray for received)
- Input: [Type message...] [Send] [Attach]

═══════════════════════════════════════════════════════
## PAGE 9: ADMIN COMMAND CENTER (ANGEL)
═══════════════════════════════════════════════════════

This should feel like Palantir Gotham — dark, dense, data-rich.

**Theme:** Dark mode (background: #0F172A, surface: #1E293B)

**TOP BAR:**
- Left: "Fulcrum Command Center" (white, bold)
- Right: [Search] [Alerts (3)] [Profile]

**LIVE METRICS BAR (dark, 4-6 cards):**
- Businesses Started: 1,247 (↑ 12%)
- Funding Enabled: ₹42.8 Cr (↑ 8%)
- Jobs Created: 3,842 (↑ 15%)
- Active Builders: 89 (↑ 5%)
- Applications Pending: 156 (↓ 3%)
- Avg Processing Time: 18 days (↓ 2 days)

**INDIA HEATMAP (main visualization):**
- SVG map of India
- States colored by journey density (indigo intensity)
- Click state → District view → Block view → Individual journey
- Tooltip on hover: district name, journeys, funding, success rate

**ALERTS PANEL (right sidebar):**
- Heading: "Alerts (12)"
- Alert items (color-coded by severity):
  - 🔴 3 applications stuck >21 days
  - 🟡 12 journeys dormant >30 days
  - 🟡 2 builders overloaded (>15 cases)
  - 🔵 Indian Bank approval rate dropped 15%
- [View All Alerts →]

**AI-FREE INSIGHTS PANEL:**
- Heading: "Data Insights"
- Items:
  - "Applications from Madurai are taking 40% longer than average"
  - "Indian Bank approval rate dropped 15% this month"
  - "3 builders in Chennai are overloaded"
  - "New scheme X matches 200 entrepreneurs"
- Each item: [Investigate] [Dismiss]

**QUICK ACTIONS (bottom bar):**
- [Assign Builder] [Escalate Case] [Send Message] [Generate Report] [Create Alert Rule]

═══════════════════════════════════════════════════════
## PAGE 10: SETTINGS
═══════════════════════════════════════════════════════

**Layout:** Sections with form fields

**SECTIONS:**
- Profile (name, phone, email, photo)
- Location (district, state, pincode)
- Language (Tamil/Hindi/English)
- Notifications (push, SMS, WhatsApp, email)
- Privacy (profile visibility, data sharing)
- Security (change password, active sessions)
- Danger Zone (delete account)

═══════════════════════════════════════════════════════
## BACKEND (FastAPI)
═══════════════════════════════════════════════════════

Create a FastAPI backend with this structure:

```
fulcrum-api/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── config.py
│   ├── dependencies.py
│   ├── api/v1/
│   │   ├── router.py
│   │   ├── auth.py
│   │   ├── entrepreneurs.py
│   │   ├── builders.py
│   │   ├── journeys.py
│   │   ├── schemes.py
│   │   ├── documents.py
│   │   ├── applications.py
│   │   ├── events.py
│   │   ├── search.py
│   │   ├── notifications.py
│   │   ├── analytics.py
│   │   └── admin.py
│   ├── domain/
│   │   ├── shared/
│   │   ├── user/
│   │   ├── journey/
│   │   ├── scheme/
│   │   ├── application/
│   │   ├── document/
│   │   └── event_store/
│   ├── application/
│   │   ├── commands/
│   │   ├── queries/
│   │   ├── handlers/
│   │   └── dto/
│   └── infrastructure/
│       ├── database/
│       ├── repositories/
│       ├── auth/
│       └── storage/
├── tests/
│   └── conftest.py
├── requirements.txt
└── .env.example
```

### Database Models (SQLAlchemy) — 22 tables:

1. **users** — id, email, phone, password_hash, full_name, role, status, district, state, preferred_lang, created_at
2. **user_profiles** — id, user_id, gender, community, education, bio
3. **user_addresses** — id, user_id, district, state, pincode, lat, lng
4. **user_documents** — id, user_id, doc_type, file_url, is_verified, validation_result
5. **builders** — id, user_id, expertise[], languages[], max_cases, current_cases, success_rate, rating, badges[]
6. **builder_reviews** — id, builder_id, reviewer_id, rating, review_text
7. **journeys** — id, entrepreneur_id, builder_id, title, business_category, status, current_milestone, funding_target, district, state
8. **journey_milestones** — id, journey_id, milestone_type, title, status, order_index, completed_at
9. **domain_events** — id, journey_id, event_type, actor_id, payload (JSONB), narrative, created_at (APPEND-ONLY)
10. **schemes** — id, name, name_ta, description, ministry, funding_min, funding_max, subsidy_pct, target_community[], target_sector[], is_active
11. **scheme_stats** — id, scheme_id, district, total_applications, approved_count, approval_rate, avg_processing_days
12. **scheme_community_notes** — id, scheme_id, author_id, note_text, helpful_count
13. **banks** — id, name, code, type
14. **bank_branches** — id, bank_id, branch_name, district, state
15. **bank_scheme_performance** — id, bank_id, scheme_id, branch_id, approval_rate, avg_processing_days
16. **applications** — id, journey_id, scheme_id, bank_id, status, amount_requested, amount_approved, submitted_at, decided_at
17. **application_timeline** — id, application_id, status, notes, actor_id, created_at
18. **knowledge_entries** — id, title, content, category, tags[], author_id, helpful_count
19. **messages** — id, sender_id, receiver_id, journey_id, message_text, is_read, created_at
20. **user_notifications** — id, user_id, type, title, message, is_read, created_at
21. **impact_metrics** — id, journey_id, metric_type, value, recorded_at
22. **audit_log** — id, user_id, action, entity_type, entity_id, old_value, new_value, created_at

### API Endpoints:

**Auth:** POST /register, POST /login, POST /verify-otp, POST /refresh, GET /me
**Journeys:** POST /, GET /{id}, GET /{id}/timeline, POST /{id}/events, PATCH /{id}/milestone/{mid}, GET /{id}/narrative
**Schemes:** GET /, GET /{id}, POST /match, GET /{id}/stats, POST /{id}/note
**Builders:** GET /, GET /{id}, GET /{id}/cases, POST /{id}/review
**Applications:** POST /, GET /{id}, PATCH /{id}/status, GET /{id}/tracking
**Documents:** POST /upload, GET /{id}, GET /{id}/validate
**Analytics:** GET /community-health, GET /impact, GET /funnels
**Admin:** GET /dashboard, GET /map, GET /alerts, POST /builder-assign

### Matching Algorithm (Deterministic, NO AI):

**Builder-Founder Matching (weighted scoring):**
- industry_expertise: 25 pts
- location_proximity: 20 pts
- language_match: 15 pts
- availability: 15 pts
- success_rate: 10 pts
- response_time: 5 pts
- trust_score: 5 pts
- impact_score: 5 pts
Return top 5 matches with explanation.

**Scheme Matching (weighted scoring):**
- eligibility_match: 30 pts
- industry_fit: 20 pts
- community_fit: 15 pts
- stage_fit: 10 pts
- location_fit: 10 pts
- funding_fit: 10 pts
- success_rate: 5 pts
Return top 10 matches with explanation.

### Event Sourcing:
All state changes go to domain_events (append-only). Never update status directly. Current state = latest event. Support journey replay.

### Auth & RBAC:
- JWT access token (1 hour) + refresh token (30 days)
- Roles: entrepreneur, builder, district_coordinator, admin, super_admin
- Permission-based access control
- Audit log for all admin actions

### Seed Data:
Seed 20+ schemes (PMEGP, MUDRA, Stand-Up India, NSFDC, TANSEED, TANFUND, etc.)
Seed 10+ banks (SBI, Indian Bank, Canara, etc.)
Seed 5 sample builders, 3 sample journeys with events

═══════════════════════════════════════════════════════
## BUILD ORDER
═══════════════════════════════════════════════════════

Phase 1: Backend Foundation (models, auth, CRUD, seed data)
Phase 2: Frontend Foundation (design system, pages, components)
Phase 3: Integration (API connection, WebSockets, search)
Phase 4: Polish (animations, i18n, PWA, testing)

Make it beautiful. Make it fast. Make it work.
