import { useEffect } from "react";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Split the text nodes of an element into masked, per-word spans. */
function splitWords(node) {
  if (node.dataset.split === "done") return;
  const source = Array.from(node.childNodes);
  const frag = document.createDocumentFragment();
  let index = 0;
  source.forEach((child) => {
    if (child.nodeType !== Node.TEXT_NODE) {
      frag.appendChild(child.cloneNode(true));
      return;
    }
    child.textContent.split(/(\s+)/).forEach((chunk) => {
      if (!chunk.trim()) {
        if (chunk) frag.appendChild(document.createTextNode(" "));
        return;
      }
      const word = document.createElement("span");
      word.className = "w";
      const inner = document.createElement("i");
      inner.textContent = chunk;
      inner.style.setProperty("--i", index++);
      word.appendChild(inner);
      frag.appendChild(word);
    });
  });
  node.textContent = "";
  node.appendChild(frag);
  node.dataset.split = "done";
}

/**
 * One engine for the whole site.
 *
 * Entrance reveals  -> [data-animate], [data-split], [data-stagger]
 * Scroll-linked     -> [data-progress] exposes a 0..1 `--p` custom property
 * Header / progress -> body-level state classes
 *
 * Re-scans whenever `key` changes so every route gets identical treatment.
 */
export function useScrollMotion(key) {
  useEffect(() => {
    const root = document.documentElement;

    if (prefersReduced()) {
      root.classList.add("motion-reduced");
      return undefined;
    }

    /* ---------- entrance reveals ---------- */
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.001, rootMargin: "0px 0px -12% 0px" },
    );

    const scan = () => {
      document.querySelectorAll("[data-stagger]").forEach((group) => {
        const mode = group.dataset.stagger || "rise";
        const step = Number(group.dataset.step || 95);
        Array.from(group.children).forEach((child, i) => {
          if (!child.hasAttribute("data-animate")) {
            child.setAttribute("data-animate", mode);
          }
          child.style.setProperty("--delay", `${i * step}ms`);
        });
      });

      document.querySelectorAll("[data-split]").forEach(splitWords);

      document
        .querySelectorAll("[data-animate], [data-split]")
        .forEach((node) => {
          if (node.dataset.motion === "on") return;
          node.dataset.motion = "on";
          if (node.dataset.duration) {
            node.style.setProperty("--d", `${node.dataset.duration}ms`);
          }
          observer.observe(node);
        });
    };

    scan();
    const mutation = new MutationObserver(scan);
    mutation.observe(document.body, { childList: true, subtree: true });

    /* ---------- scroll-linked progress ---------- */
    let frame = null;
    const tick = () => {
      frame = null;
      const viewport = window.innerHeight;

      document.querySelectorAll("[data-progress]").forEach((node) => {
        const rect = node.getBoundingClientRect();
        const span = viewport + rect.height;
        const raw = (viewport - rect.top) / (span || 1);
        const clamped = Math.min(Math.max(raw, 0), 1);
        node.style.setProperty("--p", clamped.toFixed(4));
      });

      document.querySelectorAll("[data-pin-progress]").forEach((node) => {
        const rect = node.getBoundingClientRect();
        const distance = Math.max(rect.height - viewport, 1);
        const progress = Math.min(Math.max(-rect.top / distance, 0), 1);
        node.style.setProperty("--pin-p", progress.toFixed(4));

        const ease = (value) => 1 - Math.pow(1 - value, 3);
        const range = (start, end) =>
          ease(Math.min(Math.max((progress - start) / (end - start), 0), 1));

        if (node.dataset.pinProgress === "symmetric") {
          node.querySelectorAll("[data-pin-card]").forEach((card) => {
            const index = Number(card.dataset.pinCard);
            const distanceFromCenter = Math.abs(index - 2);
            const start = distanceFromCenter === 0 ? 0 : distanceFromCenter === 1 ? 0.14 : 0.3;
            const end = distanceFromCenter === 0 ? 0.34 : distanceFromCenter === 1 ? 0.53 : 0.72;
            const phase = range(start, end);
            const y = (1 - phase) * 900;
            const rotation = (2 - index) * 3 * (1 - phase);
            card.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) rotate(${rotation.toFixed(3)}deg)`;
          });
          node.querySelectorAll("[data-pin-caption]").forEach((caption) => {
            const index = Number(caption.dataset.pinCaption);
            const phase = range(0.16 + index * 0.13, 0.42 + index * 0.13);
            caption.style.opacity = phase.toFixed(4);
            caption.style.transform = `translate3d(0, ${((1 - phase) * 80).toFixed(2)}px, 0)`;
          });
        }

        if (node.dataset.pinProgress === "mosaic") {
          node.querySelectorAll("[data-pin-card]").forEach((card) => {
            const index = Number(card.dataset.pinCard);
            const phase = range(index * 0.025, 0.62 + index * 0.025);
            const x = Number(card.dataset.startX || 0) * (1 - phase);
            const y = Number(card.dataset.startY || 0) * (1 - phase);
            const rotation = Number(card.dataset.rotate || 0) * (1 - phase);
            const scale = 1 + (1 - phase) * Number(card.dataset.scale || 0.7);
            card.style.opacity = Math.min(phase * 1.8, 1).toFixed(4);
            card.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rotation.toFixed(3)}deg) scale(${scale.toFixed(4)})`;
          });
        }
      });

      const scrolled = window.scrollY;
      const max =
        document.documentElement.scrollHeight - viewport || 1;
      root.style.setProperty(
        "--scroll-progress",
        Math.min(Math.max(scrolled / max, 0), 1).toFixed(4),
      );
      root.classList.toggle("is-scrolled", scrolled > 80);
    };

    const request = () => {
      if (frame === null) frame = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request, { passive: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [key]);
}

export { prefersReduced };
