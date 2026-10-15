"use client";

import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import posthog from "posthog-js";
import { createInquiryId, inquiryServices, inquiryServiceLabels } from "@/lib/inquiry";

const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export function InquiryForm({ initialService = "New business website" }: { initialService?: string }) {
  // Keep the server-rendered form inert until its submit handler is attached.
  const ready = useSyncExternalStore(subscribe, clientReady, serverReady);
  const [interest, setInterest] = useState(initialService);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const submissionId = useRef("");
  const sending = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    sending.current = true;
    setStatus("sending");
    setError("");
    try {
      submissionId.current ||= createInquiryId();
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, requestId: submissionId.current }),
        signal: AbortSignal.timeout(20_000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error("Send failed");
      setStatus("success");
      form.reset();
      submissionId.current = "";
      if (process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) {
        // Analytics failure must not turn an accepted inquiry into a send error.
        try {
          posthog.capture("inquiry_submitted", { service: fields.service });
        } catch {
          /* Delivery already succeeded. */
        }
      }
    } catch {
      setStatus("error");
      setError(
        "Your inquiry could not be sent. Your details are still here - please try again, or email jeremy@mean-weasel.com directly.",
      );
    } finally {
      sending.current = false;
    }
  }
  return (
          <form
            onSubmit={submit}
            onInvalidCapture={(event) => {
              const details = (event.target as HTMLElement).closest("details");
              if (details) details.open = true;
            }}
            onChange={() => {
              if (!sending.current) {
                setStatus("idle");
                submissionId.current = "";
              }
            }}
            className="service-form ph-no-capture ph-mask"
            aria-busy={status === "sending"}
            data-ph-no-capture
          >
            <p className="service-form-helper">Start with a few sentences. No technical knowledge needed.</p>
            {!ready && <p className="service-form-helper">Loading the inquiry form. If it does not load, email <a href="mailto:jeremy@mean-weasel.com">jeremy@mean-weasel.com</a>.</p>}
            <fieldset disabled={!ready || status === "sending"}>
              <legend className="sr-only">Project inquiry</legend>
              <div className="service-honeypot" aria-hidden="true">
                <label>
                  Leave this field empty
                  <input name="companyFax" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <div className="service-form-row">
                <label>
                  Your name
                  <input
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={120}
                  />
                </label>
                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                  />
                </label>
              </div>
              <label>
                What would you like help with?
                <select
                  name="service"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                >
                  {inquiryServices.map((option) => (
                    <option key={option} value={option}>{inquiryServiceLabels[option]}</option>
                  ))}
                </select>
              </label>
              <label>
                What would you like to improve?
                <textarea
                  name="description"
                  required
                  rows={4}
                  aria-describedby="project-description-help"
                  placeholder="For example: We need a website where customers can see our work and request a quote."
                  maxLength={5000}
                />
              </label>
              <p id="project-description-help" className="service-form-helper">What does your business do, and what would make things easier? Add a deadline if you have one.</p>
              <details className="inquiry-optional">
                <summary>Add business details <span>(optional)</span></summary>
              <label>
                Business name <span>(optional)</span>
                <input
                  name="business"
                  autoComplete="organization"
                  maxLength={200}
                />
              </label>
              <label>
                Current website <span>(optional)</span>
                <input
                  name="website"
                  type="url"
                  placeholder="https://"
                  maxLength={2000}
                />
              </label>
              </details>
              <button
                className="service-button"
                type="submit"
                disabled={status === "sending" || status === "success"}
              >
                {status === "sending"
                  ? "Sending…"
                  : status === "success" ? "Request sent" : "Request a consultation"}{" "}
                <span aria-hidden="true">↗</span>
              </button>
            </fieldset>
            <p className="service-fineprint">
              We’ll use your details to respond to this inquiry. Sending a request doesn’t commit you to a project.
            </p>
            <p role="status" aria-live="polite">
              {status === "success"
                ? "Thanks - your inquiry has been sent. Jeremy will reply by email to discuss your needs and next steps."
                : status === "sending"
                  ? "Sending your inquiry…"
                  : ""}
            </p>
            {status === "error" && <p role="alert">{error}</p>}
          </form>
  );
}
