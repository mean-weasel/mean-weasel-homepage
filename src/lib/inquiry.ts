export const inquiryServices = [
  "New business website",
  "Website redesign",
  "Business Website",
  "Website + Content",
  "SEO Foundation Project",
  "Custom app or integration",
  "AI automation",
  "Not sure yet",
] as const;

export const inquiryServiceLabels: Record<(typeof inquiryServices)[number], string> = {
  "New business website": "A new business website",
  "Website redesign": "Improve an existing website",
  "Business Website": "Business website - I have the content",
  "Website + Content": "Business website - help with content",
  "SEO Foundation Project": "Help customers find us on Google and AI search",
  "Custom app or integration": "An app or custom business tool",
  "AI automation": "Save time with AI automation",
  "Not sure yet": "Not sure yet - help me decide",
};

export type Inquiry = {
  name: string;
  email: string;
  business: string;
  website: string;
  service: string;
  description: string;
  requestId: string;
  companyFax: string;
};

export function parseInquiry(input: unknown): Inquiry | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const fields = input as Record<string, unknown>;
  const limits = {
    name: 120,
    email: 254,
    business: 200,
    website: 2000,
    service: 80,
    description: 5000,
    requestId: 36,
    companyFax: 200,
  };
  const cleaned: Record<string, string> = {};
  for (const [key, max] of Object.entries(limits)) {
    const value = fields[key] ?? "";
    if (typeof value !== "string" || value.length > max) return null;
    cleaned[key] = value.trim();
  }
  if (
    !cleaned.name ||
    !cleaned.description ||
    /[\r\n]/.test(cleaned.name) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned.email)
  )
    return null;
  if (!inquiryServices.some((service) => service === cleaned.service))
    return null;
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      cleaned.requestId,
    )
  )
    return null;
  if (cleaned.website) {
    try {
      if (!["http:", "https:"].includes(new URL(cleaned.website).protocol))
        return null;
    } catch {
      return null;
    }
  }
  return cleaned as Inquiry;
}

// getRandomValues also works on the HTTP project subdomain used for local previews.
export function createInquiryId() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 15) | 64;
  bytes[8] = (bytes[8] & 63) | 128;
  const hex = Array.from(bytes, (value) =>
    value.toString(16).padStart(2, "0"),
  ).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}


export function inquiryHref(service: string) {
  return `/contact?service=${encodeURIComponent(service)}`;
}
