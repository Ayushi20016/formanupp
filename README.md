# FORMANUPP 🕶️

> **“I am safe. I am offline. I am becoming.”**
>
> *“Let your social media life die for a while. Let your real life come alive.”*

FORMANUPP is a digital detox, productivity, self-care, and personal growth mobile companion designed for people feeling overwhelmed by endless scrolling, social media noise, and digital burnout.

---

## 🌟 Core Features

1. **Brand Personality**: Gen-Z, witty, slightly dramatic, mysterious, motivating, comforting, playful, and zero judgment or body shame.
2. **Onboarding Experience**: 5-step questionnaire including the interactive **Mystery Slider (0% → 100%)** that calibrates your digital-detox intensity.
3. **Daily Mind Check-In**: Non-clinical interactive check-in (*"Your brain feels like 47 browser tabs"* / *"What do you secretly need today?"*) that synthesizes a personalized daily action plan.
4. **Home Dashboard**: Real Life vs Social Life status cards (*"SOCIAL LIFE: ☠️ Currently deceased"* / *"REAL LIFE: ✨ Loading beautifully..."*), live screen time metrics, today's mission, and real-life productivity score.
5. **The Signature Experience**:
   > *“Welcome back. We checked your screen time. ...girl. Go live your life.”*
   > Displays your deceased social life status and launches your 15-minute quick physical reset.
6. **Social Media Funeral (RIP: My Social Life)**: Virtual 3D tombstone with interactive candle lighting, flower tributes, and detox session timers (15m, 30m, 1h, 3h, 6h, 24h).
7. **Mystery Mode (🕶️)**: Live stopwatch tracking how long you remain digitally quiet, accompanied by procedural Web Audio ambient soundscapes (rain, lo-fi vinyl, white noise).
8. **Deep Focus Timer**: Single-tasking mode (*"ONE THING. Not twelve things. One."*) with 25m, 50m, 90m, or custom timers and streaks.
9. **Reset Room**: Realistic, non-toxic self-care checklists across 11 categories (Quick reset, Hygiene, Skin care, Movement, Room reset, Digital reset, Sleep, Journaling, Cooking).
10. **Real-Life Glow Up**: 7-Day quest rewarding consistency, offline hobbies, and presence.
11. **"Go Cook Something" Recipe Corner**: Quick 10-minute recipes, student meals, and comfort food with step-by-step interactive cooking mode and timer.
12. **My Collections ("Offline Me")**: Private local vault for offline photos (*"Proof that you existed outside the internet"*), reflections, and quotes. 100% private to device.
13. **Productivity Analysis**: Visual time allocation charts and positive, compassionate insights.
14. **Eye Break System**: 20-20-20 rule guided ocular relaxation (*"Your eyes called. They want a meeting."*).
15. **Achievements & XP**: Rank up from Level 1 *"Screen Zombie"* to Level 10 *"Transcendent Offline Being"* with badges like `🪦 SOCIAL LIFE DECEASED`, `🕶️ MYSTERIOUS`, `📵 TOUCH GRASS`, and `🍳 CHEF ERA`.

---

## 🚀 How to Run

### Option 1: Python Server (Recommended)
From this directory, run:
```powershell
python serve.py
```
Open **[http://localhost:8080](http://localhost:8080)** in any browser.

### Option 2: Mobile Browser / PWA
Open the URL on your mobile phone and tap **"Add to Home Screen"** in Safari (iOS) or Chrome (Android) to use FORMANUPP as a standalone fullscreen native app!

---

## ⚡ Rabto AI Skills Integration

All **67 creative-web skills** from [Priyanshuf1/rabto](https://github.com/Priyanshuf1/rabto) have been copied into this project under:
- `.agents/skills/`
- `.agent/skills/`
- `skills/`

### Copy Skills to Any Other Project
To install all 67 skills into any new or existing project on your machine, run:
```powershell
.\copy_skills_to_project.ps1 -TargetProject "C:\path\to\your\other\project"
```
This will automatically place all skills in `.agents/skills`, `.agent/skills`, and `skills` inside the target directory for Antigravity to discover.
