---
name: global-logic-media-builder
description: Comprehensive skill and knowledge base for building Awwwards-quality digital agency websites, including 3D tilt physics (Rabto FX engine), GSAP typographic choreography, WebGL topology, Firebase Realtime Database schemas, modular vanilla JS architecture, and responsive mobile patterns.
---

# Global Logic Media Architecture, Models & Animation Engineering Guide

This skill documents the complete technical stack, reference models, website links, data models, animation systems, and interactive architectures implemented in the **Global Logic Media** platform.

---

## 🌐 1. Reference Models & Key Website Links

### Reference Models & Inspiration
- **Original Template Model**: [Priyanshu Framer Media](https://priyanshuf1.framer.media/#projects) — Source layout inspiration with dynamic project cards and Framer interaction models.
- **Production Reference & Canonical**: [Global Logic Media](https://globallogicmedia.com) and [www.globallogicmedia.com](https://www.globallogicmedia.com) — Modern 360° digital agency platform located in Lucknow, India.
- **Repository**: [GitHub Priyanshuf1/portfolio-for-sale](https://github.com/Priyanshuf1/portfolio-for-sale.git) (Master branch).
- **Vercel Edge Host**: `https://portfolio-for-sale.vercel.app` (Vercel Project: `portfolio-for-sale`).

### Key Website Destinations & Endpoints
| Destination | URL / Identifier | Function |
| :--- | :--- | :--- |
| **Homepage** | `https://globallogicmedia.com/` | Single-page landing with hero, about, services, recent works, reviews, and FAQ. |
| **Blog Portal** | `https://globallogicmedia.com/blog.html` | Dynamic blog listing powered by Firebase RTDB `/blogs`. |
| **Instagram Feed** | `https://globallogicmedia.com/instagram.html` | Client-side Instagram Graph API grid with token management. |
| **Direct WhatsApp** | `https://wa.me/message/CDN2NPVITSRHH1` | Floating action trigger for instant WhatsApp chat & bookings. |
| **Google Review Portal**| `https://g.page/r/CX4AGQkNUj-zECE/review` | Direct link to submit 5-star Google reviews (Place ID `ChIJtwLx_IXWdg8RfgAZCQ1SP7M`). |
| **Elfsight Widget** | `dash.elfsight.com` (Widget: `1114eac3-3c77-4bd5-945e-3667c3537f46`) | Embeds and caches Google Reviews with 24-72h sync. |
| **Review Hash Trigger**| `https://globallogicmedia.com/#review` | Automatically pops up the on-site "Write a Review" modal on page load. |

---

## 🗄️ 2. Core Data Models & Schemas

### 1. Consultation Booking Model (`/bookings`)
Stored in **Firebase Realtime Database** when clients request a discovery call:
```json
{
  "name": "string (Customer Full Name)",
  "email": "string (Customer Email)",
  "phone": "string (Customer Phone / WhatsApp)",
  "businessDetails": "string (Project Scope / Requirements)",
  "status": "string ('pending' | 'contacted' | 'archived')",
  "createdAt": "timestamp (firebase.database.ServerValue.TIMESTAMP)"
}
```

### 2. Customer Review Model (`/reviews`)
Submitted on-site via the "Write a Review" modal:
```json
{
  "author": "string (Client Name)",
  "text": "string (Written Feedback)",
  "rating": "number (Integer 1-5)",
  "status": "string ('pending' until admin approves)",
  "createdAt": "timestamp (firebase.database.ServerValue.TIMESTAMP)"
}
```

### 3. Cookie Consent Model (`localStorage: glb_cookie_consent_v2`)
Client-side GDPR compliance state:
```json
{
  "status": "'accepted' | 'declined' | 'dismissed'",
  "reopenFunction": "window.showCookieConsent()"
}
```

### 4. Team Personnel Models
- **Durgesh** (`images/team/durgesh.jpg`): Video Editing & Cinematography (6+ yrs), UI/UX Design (2+ yrs). Specializes in visual storytelling and user-centric digital experiences.
- **Ankur** (`images/team/ankur.jpg`): Digital Marketing Professional (3+ yrs, 70+ businesses scaled). Specializes in organic growth, performance marketing, and brand strategy.
- **Agrima** (`images/team/agrima.jpg`): Creative & Strategy Specialist.
- *(Aman removed from active roster per client request)*.

---

## ⚡ 3. Animation & VFX Engineering

### 1. Rabto FX Engine (60fps Mouse-Tethered 3D Card Tilt)
Provides perspective depth to cards and badges via `requestAnimationFrame` lerp interpolation:
```javascript
let mouseX = 0, mouseY = 0;
let currentRotationX = 0, currentRotationY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

function animate() {
  currentRotationX += (mouseY * 10 - currentRotationX) * 0.12;
  currentRotationY += (mouseX * 10 - currentRotationY) * 0.12;

  document.querySelectorAll('.tilt-card').forEach(card => {
    card.style.transform = `perspective(1000px) rotateX(${-currentRotationX}deg) rotateY(${currentRotationY}deg)`;
  });

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
```

### 2. Radial Glare Spotlight Follower
A cursor-tethered radial shine overlay that illuminates cards on hover:
```css
.tilt-card {
  position: relative;
  overflow: hidden;
}
.tilt-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(550px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(226, 0, 1, 0.18), transparent 45%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.tilt-card:hover::after {
  opacity: 1;
}
```

### 3. Word-Split Typographic Scroll Entry (GSAP)
Headings animate upward through hidden overflows without shifting surrounding layout:
```javascript
function initHeadingWordReveals() {
  document.querySelectorAll('.reveal-heading').forEach(heading => {
    const words = heading.textContent.split(' ').map(w => 
      `<span style="display:inline-block; overflow:hidden;"><span class="reveal-word" style="display:inline-block;">${w}&nbsp;</span></span>`
    ).join('');
    heading.innerHTML = words;

    gsap.from(heading.querySelectorAll('.reveal-word'), {
      y: '110%',
      duration: 0.95,
      ease: 'power4.out',
      stagger: 0.05,
      scrollTrigger: {
        trigger: heading,
        start: 'top 85%'
      }
    });
  });
}
```

### 4. Monochrome-to-Color Marquee Loop
Partner logos scroll infinitely in grayscale and transition smoothly to vibrant full color upon hover:
```css
.marquee-track {
  display: flex;
  gap: 48px;
  animation: marquee-scroll 32s linear infinite;
}
.marquee-logo {
  filter: grayscale(1) opacity(0.45);
  transition: filter 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, transform 0.35s ease;
}
.marquee-logo:hover {
  filter: grayscale(0) opacity(1);
  transform: scale(1.06);
}
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
```

### 5. High-Performance Canvas Particles (Zero ShadowBlur)
Particle systems avoid expensive GPU `ctx.shadowBlur` operations for a 10x performance boost, adding dynamic mouse repulsion vectors that create magnetic fluid ripples.

---

## 🛠️ 4. Functional Systems & Security Patterns

### 1. Auto-Trigger Booking Modal (1.2s + First Tap)
Maximizes lead generation conversion by opening the consultation form 1.2s after landing, or immediately upon the user's first touch/pointerdown interaction, with single-session suppression.

### 2. Anti-Spam Bot Honeypot with Explicit Element ID Binding
- Form includes a hidden trap: `<input type="text" id="glbFormTrap" style="display:none;" tabindex="-1">`.
- **Critical Rule**: Never use generic `form.querySelector('input[type="text"]')` because it will target the honeypot first. Always bind explicit IDs (`glbBookName`, `glbBookEmail`, `glbBookPhone`, `glbBookDetails`).

### 3. Stored XSS Defense in Admin Dashboards
All user-submitted content rendered in dashboards or reviews MUST pass through `escapeHtml()`:
```javascript
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
```

### 4. Elfsight Review Sync Protocol
- Elfsight caches Google Reviews for 24-72 hours on free tier.
- To force an immediate sync after a review is posted: Log into `dash.elfsight.com`, open widget `1114eac3-3c77-4bd5-945e-3667c3537f46`, and click **Save Changes** or **Refresh / Sync**.