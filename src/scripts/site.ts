const root = document.documentElement;
const themeButtons = document.querySelectorAll<HTMLButtonElement>(
  "[data-theme-toggle]",
);
function updateThemeLabel() {
  themeButtons.forEach((button) =>
    button.setAttribute(
      "aria-label",
      root.dataset.theme === "dark"
        ? "Switch to light mode"
        : "Switch to dark mode",
    ),
  );
}
updateThemeLabel();
themeButtons.forEach((button) =>
  button.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("circadian-theme", root.dataset.theme);
    } catch {
      /* Preference remains usable for this page. */
    }
    updateThemeLabel();
  }),
);
const media = matchMedia("(prefers-color-scheme: dark)");
media.addEventListener("change", (event) => {
  let saved: string | null = null;
  try {
    saved = localStorage.getItem("circadian-theme");
  } catch {
    /* Use system preference. */
  }
  if (!saved) {
    root.dataset.theme = event.matches ? "dark" : "light";
    updateThemeLabel();
  }
});

const menuButton =
  document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
const nav = document.querySelector<HTMLElement>("#main-nav");
function closeMenu(returnFocus = false) {
  nav?.classList.remove("is-open");
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "Open navigation");
  if (returnFocus) menuButton?.focus();
}
menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  nav?.classList.toggle("is-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
});
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton?.getAttribute("aria-expanded") === "true"
  )
    closeMenu(true);
});
document.addEventListener("click", (event) => {
  if (
    event.target instanceof Node &&
    !nav?.contains(event.target) &&
    !menuButton?.contains(event.target)
  )
    closeMenu();
});
matchMedia("(min-width: 951px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

const form = document.querySelector<HTMLFormElement>("[data-enquiry-form]");
if (form) {
  const status = form.querySelector<HTMLElement>("[data-form-status]")!;
  const button = form.querySelector<HTMLButtonElement>(
    'button[type="submit"]',
  )!;
  const label = form.querySelector<HTMLElement>("[data-submit-label]")!;
  const resultLink = form.querySelector<HTMLAnchorElement>(
    "[data-whatsapp-result]",
  )!;
  const originalLabel = label.textContent || "";
  function newRequestId(): string {
    if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    bytes[6] = (bytes[6] & 15) | 64;
    bytes[8] = (bytes[8] & 63) | 128;
    const hex = Array.from(bytes, (byte) =>
      byte.toString(16).padStart(2, "0"),
    ).join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }
  let requestId = newRequestId();
  let pending = false;
  form.addEventListener("input", () => {
    resultLink.hidden = true;
  });
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (pending || !form.reportValidity()) return;
    form
      .querySelectorAll<HTMLElement>("[data-error-for]")
      .forEach((el) => (el.textContent = ""));
    form
      .querySelectorAll("[aria-invalid]")
      .forEach((el) => el.removeAttribute("aria-invalid"));
    status.textContent = "";
    resultLink.hidden = true;
    const fields = new FormData(form);
    const rawPhone = String(fields.get("phone") || "")
      .replace(/[\s()-]/g, "")
      .replace(/^\+91/, "");
    if (!/^[6-9]\d{9}$/.test(rawPhone)) {
      const input = form.elements.namedItem("phone") as HTMLInputElement;
      form.querySelector<HTMLElement>('[data-error-for="phone"]')!.textContent =
        "Enter a valid 10-digit Indian mobile number.";
      input.setAttribute("aria-invalid", "true");
      input.focus();
      return;
    }
    const payload = {
      request_id: requestId,
      name: String(fields.get("name") || "").trim(),
      phone: "+91" + rawPhone,
      topic: String(fields.get("topic") || ""),
      consent: fields.get("consent") === "on",
      website: String(fields.get("website") || ""),
    };
    if (payload.website) {
      status.textContent =
        "Unable to prepare this request. Please call reception.";
      return;
    }
    const api = form.dataset.api;
    if (!api) {
      const message = `Hello The Circadian Hospital,\nMy name is ${payload.name}.\nMobile: ${payload.phone}\nEnquiry: ${payload.topic}\nPlease help me with the next steps. I agree to be contacted about this enquiry.`;
      resultLink.href = `https://wa.me/918512040000?text=${encodeURIComponent(message)}`;
      resultLink.hidden = false;
      status.textContent =
        "Your message is ready. Open WhatsApp below, review it and press Send. No appointment is confirmed yet.";
      resultLink.focus();
      return;
    }
    pending = true;
    button.disabled = true;
    form.setAttribute("aria-busy", "true");
    label.textContent = "Sending request…";
    let accepted = false;
    try {
      const endpoint = new URL(api.replace(/\/$/, "") + "/", location.origin);
      if (endpoint.origin !== location.origin)
        throw new Error(
          "Reception requests are unavailable on this address. Please call or use WhatsApp.",
        );
      const csrf = await fetch(new URL("csrf/", endpoint), {
        credentials: "same-origin",
        cache: "no-store",
        signal: AbortSignal.timeout(15000),
      });
      if (!csrf.ok)
        throw new Error(
          "Reception requests are temporarily unavailable. Please call or use WhatsApp.",
        );
      const { token } = await csrf.json();
      const response = await fetch(new URL("enquiries/", endpoint), {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json", "X-CSRFToken": token },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000),
      });
      let data: {
        reference?: string;
        error?: string;
        fields?: Record<string, (string | { message: string })[]>;
      };
      try {
        data = await response.json();
      } catch {
        throw new Error(
          "We could not read the response. Please retry or call reception.",
        );
      }
      if (!response.ok) {
        if (data.fields)
          Object.entries(data.fields).forEach(([key, errors]) => {
            const target = form.querySelector<HTMLElement>(
              `[data-error-for="${CSS.escape(key)}"]`,
            );
            if (target)
              target.textContent = errors
                .map((e) => (typeof e === "string" ? e : e.message))
                .join(" ");
            const input = form.elements.namedItem(key);
            if (
              input instanceof HTMLInputElement ||
              input instanceof HTMLSelectElement
            )
              input.setAttribute("aria-invalid", "true");
          });
        throw new Error(
          data.error ||
            "Your request could not be sent. Please call reception.",
        );
      }
      if (!data.reference)
        throw new Error(
          "We could not verify receipt. Retry with the same details or call reception.",
        );
      accepted = true;
      status.textContent = `Request received. Reference: ${data.reference}. Reception will need to confirm availability; this is not a confirmed appointment.`;
      form.reset();
      requestId = newRequestId();
      label.textContent = "Request received";
      status.focus();
    } catch (error) {
      status.textContent =
        error instanceof Error &&
        error.name !== "TimeoutError" &&
        error.name !== "TypeError"
          ? error.message
          : "Connection interrupted. Retry with the same details, or call reception. Your request may already have arrived.";
      status.focus();
    } finally {
      pending = false;
      form.removeAttribute("aria-busy");
      if (!accepted) {
        button.disabled = false;
        label.textContent = originalLabel;
      }
    }
  });
}
