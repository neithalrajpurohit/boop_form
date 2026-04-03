# 🐾 Boop Org — Digital Marketing Discovery Form

A production-ready Next.js form that saves responses to MongoDB. Multiple users can fill it simultaneously — each submission is stored as a separate document.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up MongoDB

**Option A — MongoDB Atlas (Recommended, free tier available)**
1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) and create a free account
2. Create a new **Cluster** (free M0 tier is fine)
3. Under **Database Access**, create a user with read/write permissions
4. Under **Network Access**, add your IP (or `0.0.0.0/0` for all IPs)
5. Click **Connect → Drivers** and copy your connection string

**Option B — Local MongoDB**
```bash
# Install MongoDB locally, then use:
MONGODB_URI=mongodb://localhost:27017
```

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=boop_forms
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the form is live!

---

## 📋 Form Sections

| # | Section | Fields |
|---|---------|--------|
| 1 | Basic Business Details | Name, Location, Contact, Mobile, Email |
| 2 | Business Overview | Category, Age, Goals |
| 3 | Target Customers | Customer type, Target locations |
| 4 | Current Digital Presence | Website, Social media handles |
| 5 | Marketing Efforts | Activities, Manager |
| 6 | Interested Services | Services selection |
| 7 | Investment Range | Monthly budget |
| 8 | Business Challenges | Biggest challenge |
| Final | Growth Strategy | Wants review? |

---

## 🗄️ MongoDB Data Structure

Each form submission is stored in `boop_forms.discovery_forms` as:

```json
{
  "_id": "ObjectId(...)",
  "businessName": "Hope Scanning Centre",
  "businessLocation": "Station Road, Gonda",
  "contactPerson": "Roshani Singh",
  "mobileNumber": "8009902909",
  "emailAddress": "example@gmail.com",
  "businessCategory": "Healthcare / Clinic",
  "businessAge": "5–10 years",
  "businessGoals": ["Build strong online presence", "Expand to new locations"],
  "primaryCustomers": "Both",
  "targetLocations": ["Local city"],
  "hasWebsite": "Yes",
  "websiteLink": "https://example.com",
  "usesSocialMedia": "Yes actively",
  "facebookHandle": "...",
  "instagramHandle": "...",
  "marketingActivities": ["Social Media Marketing"],
  "marketingManager": "In-house team",
  "interestedServices": ["Complete Digital Marketing Solution"],
  "monthlyBudget": "₹25,000 – ₹50,000",
  "biggestChallenge": "No clear marketing strategy",
  "wantsReview": "Yes, definitely",
  "submittedAt": "2025-07-22T10:30:00.000Z",
  "ip": "103.x.x.x",
  "userAgent": "Mozilla/5.0..."
}
```

---

## 🔍 Viewing Submissions

**Via MongoDB Atlas UI:** Go to your cluster → Browse Collections → `boop_forms` → `discovery_forms`

**Via API (dev only):**
```bash
curl http://localhost:3000/api/submit
```
Returns the last 100 submissions as JSON.

> ⚠️ Protect the GET endpoint with auth before going to production!

---

## 🌐 Deploying to Production

### Vercel (Easiest)
```bash
npm install -g vercel
vercel
```
Set `MONGODB_URI` and `MONGODB_DB` in the Vercel dashboard under **Settings → Environment Variables**.

### Railway / Render / Any Node host
```bash
npm run build
npm start
```
Set the environment variables on your hosting platform.

---

## 📁 Project Structure

```
boop-form/
├── app/
│   ├── page.tsx          # Main form UI
│   ├── layout.tsx        # App layout + metadata
│   ├── globals.css       # Tailwind base styles
│   └── api/
│       └── submit/
│           └── route.ts  # POST: save to MongoDB, GET: view submissions
├── .env.local.example    # Environment variable template
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```
