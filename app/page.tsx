"use client";

import { useState } from "react";

const BUSINESS_CATEGORIES = [
  "Retail Store",
  "Real Estate",
  "Education / Coaching",
  "Healthcare / Clinic",
  "Restaurant / Hospitality",
  "Manufacturing / Industry",
  "E-commerce",
  "Professional Services",
  "Other",
];

const BUSINESS_GOALS = [
  "Increase sales",
  "Generate more leads",
  "Increase brand awareness",
  "Build strong online presence",
  "Launch new product/service",
  "Expand to new locations",
];

const MARKETING_ACTIVITIES = [
  "Social Media Marketing",
  "Google Ads",
  "SEO",
  "WhatsApp Marketing",
  "Email Marketing",
  "Influencer Marketing",
  "Offline Marketing only",
  "Not doing marketing yet",
];

const DIGITAL_SERVICES = [
  "Social Media Management",
  "Website Development",
  "Performance Ads (Google / Meta Ads)",
  "SEO (Search Engine Optimization)",
  "WhatsApp Marketing",
  "Content Creation (Photos / Videos / Reels)",
  "Complete Digital Marketing Solution",
];

type FormData = {
  businessName: string;
  businessLocation: string;
  contactPerson: string;
  mobileNumber: string;
  emailAddress: string;
  businessCategory: string;
  businessCategoryOther: string;
  businessAge: string;
  businessGoals: string[];
  primaryCustomers: string;
  targetLocations: string[];
  hasWebsite: string;
  websiteLink: string;
  usesSocialMedia: string;
  facebookHandle: string;
  instagramHandle: string;
  linkedinHandle: string;
  youtubeHandle: string;
  marketingActivities: string[];
  marketingManager: string;
  interestedServices: string[];
  monthlyBudget: string;
  biggestChallenge: string;
  wantsReview: string;
};

const initialForm: FormData = {
  businessName: "",
  businessLocation: "",
  contactPerson: "",
  mobileNumber: "",
  emailAddress: "",
  businessCategory: "",
  businessCategoryOther: "",
  businessAge: "",
  businessGoals: [],
  primaryCustomers: "",
  targetLocations: [],
  hasWebsite: "",
  websiteLink: "",
  usesSocialMedia: "",
  facebookHandle: "",
  instagramHandle: "",
  linkedinHandle: "",
  youtubeHandle: "",
  marketingActivities: [],
  marketingManager: "",
  interestedServices: [],
  monthlyBudget: "",
  biggestChallenge: "",
  wantsReview: "",
};

function toggleArray(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

export default function Home() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof FormData, value: string | string[]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white p-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Thank you!</h2>
          <p className="text-gray-500 mb-6">
            Your form has been submitted successfully. Our team will review your
            information and get back to you with a tailored digital marketing
            strategy.
          </p>
          <div className="bg-orange-50 rounded-xl p-4 text-sm text-orange-700">
            📞 For immediate queries: <strong>7417437174</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-8 px-4 shadow-lg">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center mb-3">
            <img
              src="/BoopLogo.png"
              alt="Boop Org"
              className="h-24 w-48 object-contain bg-white rounded-xl px-4 py-2"
            />
          </div>
          <p className="text-orange-100 text-sm">
            Digital Marketing Discovery Form
          </p>
          <p className="mt-3 text-orange-50 text-sm max-w-lg mx-auto">
            Please fill out this short form so our team can understand your
            business and recommend the best digital marketing strategy for you.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto px-4 py-8 space-y-6"
      >
        {/* Section 1 */}
        <Section
          title="Section 1"
          subtitle="Basic Business Details"
          color="orange"
        >
          <Field label="Business / Brand Name" required>
            <Input
              value={form.businessName}
              onChange={(v) => set("businessName", v)}
              placeholder="e.g. Hope Scanning Centre"
              required
            />
          </Field>
          <Field label="Business Location (City & State)" required>
            <Textarea
              value={form.businessLocation}
              onChange={(v) => set("businessLocation", v)}
              placeholder="e.g. Station Road, Gonda, UP - 271001"
              required
            />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Contact Person Name" required>
              <Input
                value={form.contactPerson}
                onChange={(v) => set("contactPerson", v)}
                placeholder="Full name"
                required
              />
            </Field>
            <Field label="Mobile Number" required>
              <Input
                value={form.mobileNumber}
                onChange={(v) => set("mobileNumber", v)}
                placeholder="10-digit number"
                required
                type="tel"
              />
            </Field>
          </div>
          <Field label="Email Address" required>
            <Input
              value={form.emailAddress}
              onChange={(v) => set("emailAddress", v)}
              placeholder="you@example.com"
              type="email"
              required
            />
          </Field>
        </Section>

        {/* Section 2 */}
        <Section title="Section 2" subtitle="Business Overview" color="blue">
          <Field label="Which category best describes your business?" required>
            <RadioGrid
              options={BUSINESS_CATEGORIES}
              value={form.businessCategory}
              onChange={(v) => set("businessCategory", v)}
              showOtherInput={form.businessCategory === "Other"}
              otherValue={form.businessCategoryOther}
              onOtherChange={(v) => set("businessCategoryOther", v)}
            />
          </Field>
          <Field label="How long have you been running this business?" required>
            <RadioGroup
              options={[
                "Less than 1 year",
                "1–3 years",
                "3–5 years",
                "5–10 years",
                "More than 10 years",
              ]}
              value={form.businessAge}
              onChange={(v) => set("businessAge", v)}
            />
          </Field>
          <Field
            label="What is your primary business goal right now?"
            hint="Select up to 2"
          >
            <CheckboxGrid
              options={BUSINESS_GOALS}
              values={form.businessGoals}
              onChange={(v) => {
                if (form.businessGoals.includes(v))
                  set("businessGoals", toggleArray(form.businessGoals, v));
                else if (form.businessGoals.length < 2)
                  set("businessGoals", toggleArray(form.businessGoals, v));
              }}
            />
          </Field>
        </Section>

        {/* Section 3 */}
        <Section
          title="Section 3"
          subtitle="Your Target Customers"
          color="purple"
        >
          <Field label="Your primary customers are:" required>
            <RadioGroup
              options={[
                "Individual consumers (B2C)",
                "Businesses (B2B)",
                "Both",
              ]}
              value={form.primaryCustomers}
              onChange={(v) => set("primaryCustomers", v)}
            />
          </Field>
          <Field label="Which locations do you want to target?">
            <CheckboxGrid
              options={[
                "Local city",
                "Entire state",
                "Pan India",
                "International",
              ]}
              values={form.targetLocations}
              onChange={(v) =>
                set("targetLocations", toggleArray(form.targetLocations, v))
              }
            />
          </Field>
        </Section>

        {/* Section 4 */}
        <Section
          title="Section 4"
          subtitle="Current Digital Presence"
          color="teal"
        >
          <Field label="Do you currently have a website?" required>
            <RadioGroup
              options={["Yes", "No", "Under development"]}
              value={form.hasWebsite}
              onChange={(v) => set("hasWebsite", v)}
            />
          </Field>
          {form.hasWebsite === "Yes" && (
            <Field label="Please share your website link:">
              <Input
                value={form.websiteLink}
                onChange={(v) => set("websiteLink", v)}
                placeholder="https://yourwebsite.com"
                type="url"
              />
            </Field>
          )}
          <Field
            label="Do you currently use social media for your business?"
            required
          >
            <RadioGroup
              options={["Yes actively", "Occasionally", "Not yet"]}
              value={form.usesSocialMedia}
              onChange={(v) => set("usesSocialMedia", v)}
            />
          </Field>
          {form.usesSocialMedia !== "Not yet" &&
            form.usesSocialMedia !== "" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: "facebookHandle", label: "Facebook", icon: "📘" },
                  { key: "instagramHandle", label: "Instagram", icon: "📸" },
                  { key: "linkedinHandle", label: "LinkedIn", icon: "💼" },
                  { key: "youtubeHandle", label: "YouTube", icon: "📺" },
                ].map(({ key, label, icon }) => (
                  <Field key={key} label={`${icon} ${label}`}>
                    <Input
                      value={form[key as keyof FormData] as string}
                      onChange={(v) => set(key as keyof FormData, v)}
                      placeholder={`${label} URL or handle`}
                    />
                  </Field>
                ))}
              </div>
            )}
        </Section>

        {/* Section 5 */}
        <Section
          title="Section 5"
          subtitle="Current Marketing Efforts"
          color="rose"
        >
          <Field label="Which marketing activities are you currently doing?">
            <CheckboxGrid
              options={MARKETING_ACTIVITIES}
              values={form.marketingActivities}
              onChange={(v) =>
                set(
                  "marketingActivities",
                  toggleArray(form.marketingActivities, v),
                )
              }
            />
          </Field>
          <Field label="Who currently manages your marketing?" required>
            <RadioGroup
              options={[
                "In-house team",
                "Freelancer",
                "Marketing agency",
                "No one",
              ]}
              value={form.marketingManager}
              onChange={(v) => set("marketingManager", v)}
            />
          </Field>
        </Section>

        {/* Section 6 */}
        <Section
          title="Section 6"
          subtitle="Digital Services You Are Interested In"
          color="indigo"
        >
          <Field
            label="Which services would you like help with?"
            hint="Select multiple"
          >
            <CheckboxGrid
              options={DIGITAL_SERVICES}
              values={form.interestedServices}
              onChange={(v) =>
                set(
                  "interestedServices",
                  toggleArray(form.interestedServices, v),
                )
              }
            />
          </Field>
        </Section>

        {/* Section 7 */}
        <Section title="Section 7" subtitle="Investment Range" color="amber">
          <Field
            label="What is your approximate monthly digital marketing budget?"
            required
          >
            <RadioGroup
              options={[
                "Less than ₹25,000",
                "₹25,000 – ₹50,000",
                "₹50,000 – ₹1,00,000",
                "₹1,00,000+",
              ]}
              value={form.monthlyBudget}
              onChange={(v) => set("monthlyBudget", v)}
            />
          </Field>
        </Section>

        {/* Section 8 */}
        <Section title="Section 8" subtitle="Business Challenges" color="green">
          <Field
            label="What is your biggest marketing challenge today?"
            required
          >
            <RadioGroup
              options={[
                "Low online visibility",
                "Not getting enough leads",
                "Low sales",
                "Poor social media engagement",
                "No clear marketing strategy",
              ]}
              value={form.biggestChallenge}
              onChange={(v) => set("biggestChallenge", v)}
            />
          </Field>
        </Section>

        {/* Final Section */}
        <Section title="Final" subtitle="Growth Strategy Review" color="orange">
          <Field
            label="Would you like our team to review your digital presence and suggest a growth strategy?"
            required
          >
            <RadioGroup
              options={[
                "Yes, definitely",
                "Maybe, I'd like to learn more",
                "Not right now",
              ]}
              value={form.wantsReview}
              onChange={(v) => set("wantsReview", v)}
            />
          </Field>
        </Section>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 rounded-2xl text-lg shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "⏳ Submitting..." : "🚀 Submit Form"}
        </button>

        <p className="text-center text-xs text-gray-400 pb-4">
          Boop Org Pvt. Ltd. · Bhutani Alphathum, Sector 90, Noida ·{" "}
          <a href="tel:7417437174" className="text-orange-500">
            7417437174
          </a>
        </p>
      </form>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

const colorMap: Record<string, string> = {
  orange: "border-orange-400 bg-orange-50",
  blue: "border-blue-400 bg-blue-50",
  purple: "border-purple-400 bg-purple-50",
  teal: "border-teal-400 bg-teal-50",
  rose: "border-rose-400 bg-rose-50",
  indigo: "border-indigo-400 bg-indigo-50",
  amber: "border-amber-400 bg-amber-50",
  green: "border-green-400 bg-green-50",
};

const titleColorMap: Record<string, string> = {
  orange: "text-orange-600",
  blue: "text-blue-600",
  purple: "text-purple-600",
  teal: "text-teal-600",
  rose: "text-rose-600",
  indigo: "text-indigo-600",
  amber: "text-amber-600",
  green: "text-green-600",
};

function Section({
  title,
  subtitle,
  color,
  children,
}: {
  title: string;
  subtitle: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-2xl border-l-4 ${colorMap[color]} p-6 shadow-sm`}>
      <div className="mb-5">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          {title}
        </span>
        <h2 className={`text-lg font-bold ${titleColorMap[color]}`}>
          {subtitle}
        </h2>
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
        {hint && (
          <span className="text-gray-400 font-normal ml-1">({hint})</span>
        )}
      </label>
      {children}
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white placeholder-gray-300"
    />
  );
}

function Textarea({
  value,
  onChange,
  placeholder,
  required,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      rows={2}
      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white placeholder-gray-300 resize-none"
    />
  );
}

function RadioGroup({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => (
        <label
          key={opt}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${value === opt ? "border-orange-500 bg-orange-500" : "border-gray-300 bg-white group-hover:border-orange-300"}`}
            onClick={() => onChange(opt)}
          >
            {value === opt && <div className="w-2 h-2 rounded-full bg-white" />}
          </div>
          <span className="text-sm text-gray-700">{opt}</span>
        </label>
      ))}
    </div>
  );
}

function RadioGrid({
  options,
  value,
  onChange,
  showOtherInput,
  otherValue,
  onOtherChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  showOtherInput?: boolean;
  otherValue?: string;
  onOtherChange?: (v: string) => void;
}) {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {options.map((opt) => (
          <label
            key={opt}
            onClick={() => onChange(opt)}
            className={`cursor-pointer rounded-xl px-3 py-2 text-sm border-2 text-center transition-all ${value === opt ? "border-orange-500 bg-orange-50 text-orange-700 font-semibold" : "border-gray-200 bg-white text-gray-600 hover:border-orange-300"}`}
          >
            {opt}
          </label>
        ))}
      </div>
      {showOtherInput && onOtherChange && (
        <input
          className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
          placeholder="Please specify..."
          value={otherValue}
          onChange={(e) => onOtherChange(e.target.value)}
        />
      )}
    </div>
  );
}

function CheckboxGrid({
  options,
  values,
  onChange,
}: {
  options: string[];
  values: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {options.map((opt) => {
        const checked = values.includes(opt);
        return (
          <label
            key={opt}
            onClick={() => onChange(opt)}
            className={`cursor-pointer flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm border-2 transition-all ${checked ? "border-orange-500 bg-orange-50 text-orange-700 font-semibold" : "border-gray-200 bg-white text-gray-600 hover:border-orange-300"}`}
          >
            <div
              className={`w-4.5 h-4.5 rounded border-2 flex items-center justify-center flex-shrink-0 ${checked ? "border-orange-500 bg-orange-500" : "border-gray-300"}`}
            >
              {checked && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            {opt}
          </label>
        );
      })}
    </div>
  );
}
