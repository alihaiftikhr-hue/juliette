"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  // Local-only for now — wire to an email service / backend before launch.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="text-center py-10" role="status">
        <p className="font-tagline text-4xl text-espresso">Thank you, truly.</p>
        <p className="mt-3 text-espresso/75">
          Your note has been received — we&rsquo;ll write back within a day or two.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className="label-caps block mb-2">
            Name
          </label>
          <input id="contact-name" name="name" type="text" required className="field" />
        </div>
        <div>
          <label htmlFor="contact-email" className="label-caps block mb-2">
            Email
          </label>
          <input id="contact-email" name="email" type="email" required className="field" />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="label-caps block mb-2">
          Regarding
        </label>
        <select id="contact-subject" name="subject" className="field">
          <option>Reserving a piece</option>
          <option>A custom request</option>
          <option>Stockists &amp; wholesale</option>
          <option>Something else lovely</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="label-caps block mb-2">
          Your Note
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          className="field resize-y"
          placeholder="Tell us which piece caught your eye, or what you're dreaming of…"
        />
      </div>

      <div className="text-center pt-2">
        <button type="submit" className="btn">
          Send the Note
        </button>
      </div>
    </form>
  );
}
