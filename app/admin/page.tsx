"use client";

import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

type Submission = {
  _id: string;
  businessName: string;
  businessLocation: string;
  contactPerson: string;
  mobileNumber: string;
  emailAddress: string;
  businessCategory: string;
  businessCategoryOther?: string;
  businessAge: string;
  businessGoals: string[];
  primaryCustomers: string;
  targetLocations: string[];
  hasWebsite: string;
  websiteLink?: string;
  usesSocialMedia: string;
  facebookHandle?: string;
  instagramHandle?: string;
  linkedinHandle?: string;
  youtubeHandle?: string;
  marketingActivities: string[];
  marketingManager: string;
  interestedServices: string[];
  monthlyBudget: string;
  biggestChallenge: string[];
  wantsReview: string;
  submittedAt: string;
  ip: string;
  userAgent: string;
};

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/submit")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setSubmissions(data.data);
        else setError("Failed to load submissions");
      })
      .catch(() => setError("Failed to fetch data"))
      .finally(() => setLoading(false));
  }, []);

  const exportToExcel = () => {
    const rows = submissions.map((s) => ({
      "Submitted At": new Date(s.submittedAt).toLocaleString(),
      "Business Name": s.businessName,
      "Business Location": s.businessLocation,
      "Contact Person": s.contactPerson,
      "Mobile Number": s.mobileNumber,
      "Email Address": s.emailAddress,
      "Business Category":
        s.businessCategory === "Other"
          ? `Other: ${s.businessCategoryOther}`
          : s.businessCategory,
      "Business Age": s.businessAge,
      "Business Goals": s.businessGoals?.join(", "),
      "Primary Customers": s.primaryCustomers,
      "Target Locations": s.targetLocations?.join(", "),
      "Has Website": s.hasWebsite,
      "Website Link": s.websiteLink || "",
      "Uses Social Media": s.usesSocialMedia,
      "Facebook": s.facebookHandle || "",
      "Instagram": s.instagramHandle || "",
      "LinkedIn": s.linkedinHandle || "",
      "YouTube": s.youtubeHandle || "",
      "Marketing Activities": s.marketingActivities?.join(", "),
      "Marketing Manager": s.marketingManager,
      "Interested Services": s.interestedServices?.join(", "),
      "Monthly Budget": s.monthlyBudget,
      "Biggest Challenge": Array.isArray(s.biggestChallenge)
        ? s.biggestChallenge.join(", ")
        : s.biggestChallenge,
      "Wants Review": s.wantsReview,
      "IP": s.ip,
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();

    // Auto column widths
    const colWidths = Object.keys(rows[0] || {}).map((key) => ({
      wch: Math.max(
        key.length,
        ...rows.map((r) => String(r[key as keyof typeof r] ?? "").length)
      ),
    }));
    worksheet["!cols"] = colWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");
    XLSX.writeFile(
      workbook,
      `boop-submissions-${new Date().toISOString().slice(0, 10)}.xlsx`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              📋 Form Submissions
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {submissions.length} total submission
              {submissions.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={exportToExcel}
            disabled={submissions.length === 0}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Export to Excel
          </button>
        </div>

        {loading && (
          <div className="text-center py-20 text-gray-400">
            Loading submissions...
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
            {error}
          </div>
        )}

        {!loading && !error && submissions.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No submissions yet.
          </div>
        )}

        {!loading && submissions.length > 0 && (
          <div className="overflow-x-auto rounded-2xl shadow border border-gray-200 bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-orange-500 text-white">
                <tr>
                  {[
                    "#",
                    "Submitted At",
                    "Business Name",
                    "Location",
                    "Contact",
                    "Mobile",
                    "Email",
                    "Category",
                    "Business Age",
                    "Goals",
                    "Customers",
                    "Target Locations",
                    "Has Website",
                    "Website",
                    "Social Media",
                    "Marketing Activities",
                    "Marketing Manager",
                    "Interested Services",
                    "Budget",
                    "Challenges",
                    "Wants Review",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left font-semibold whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {submissions.map((s, i) => (
                  <tr key={s._id} className="hover:bg-orange-50 transition-colors">
                    <td className="px-4 py-3 text-gray-400 font-mono">{i + 1}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                      {new Date(s.submittedAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">
                      {s.businessName}
                    </td>
                    <td className="px-4 py-3 text-gray-600 max-w-[160px] truncate">
                      {s.businessLocation}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{s.contactPerson}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{s.mobileNumber}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{s.emailAddress}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {s.businessCategory === "Other"
                        ? `Other: ${s.businessCategoryOther}`
                        : s.businessCategory}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{s.businessAge}</td>
                    <td className="px-4 py-3 max-w-[180px]">
                      {s.businessGoals?.join(", ")}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{s.primaryCustomers}</td>
                    <td className="px-4 py-3">{s.targetLocations?.join(", ")}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{s.hasWebsite}</td>
                    <td className="px-4 py-3 max-w-[140px] truncate">
                      {s.websiteLink ? (
                        <a
                          href={
                            s.websiteLink.startsWith("http")
                              ? s.websiteLink
                              : `https://${s.websiteLink}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          {s.websiteLink}
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{s.usesSocialMedia}</td>
                    <td className="px-4 py-3 max-w-[180px]">
                      {s.marketingActivities?.join(", ")}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{s.marketingManager}</td>
                    <td className="px-4 py-3 max-w-[180px]">
                      {s.interestedServices?.join(", ")}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{s.monthlyBudget}</td>
                    <td className="px-4 py-3 max-w-[180px]">
                      {Array.isArray(s.biggestChallenge)
                        ? s.biggestChallenge.join(", ")
                        : s.biggestChallenge}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{s.wantsReview}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
