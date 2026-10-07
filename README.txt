Sankar - Portfolio (neo-brutalist bento)
========================================
Files (keep them in the same folder):
  index.html  - page structure + all your content
  style.css   - styling, light/dark themes, responsive rules
  script.js   - interactions, hidden terminal, snake game, easter eggs

No frameworks, no 3D libraries: ~41 KB total before gzip.
Run:    open index.html in a browser
Deploy: drag this folder onto vercel.com/new or app.netlify.com/drop

Nav: vertical side rail with scroll-progress thumb on laptop; radial fan menu (corner button) on phones. Desktop hover: cursor ring, sparkle trail, tilt cards, magnetic buttons.
Soft light effects: cursor spotlight, glow that follows your pointer/finger on cards, hero light beam, pulsing avatar ring, shiny skill bars, neon contact title, glowing footer. Per-section effects (rising emoji, talking avatar, skill zaps, project sheen, paper plane, bouncy footer letters).
Easter eggs: type matrix / disco / rocket / roll / snake / party anywhere; triple-click the S avatar; click the giant SANKAR in the footer.
Secrets: press ` (backtick) or tap the logo 5x for the terminal; type "snake" anywhere.

v5 extras: coffee loading screen, crawling bugs to squash (type 'bugs' for an invasion), rubber duck button (quack + dev jokes, type 'quack'), emoji pops on tap, dark/light mode jokes, bottom-of-page celebration.

v7: Caffeine-o-meter in the hero. The whole site has a mood: brew coffee (tap the meter or the coffee tile) and it gets hyper/jittery; let it wear off and the page desaturates, slows down and its eyelids droop. Type espresso / decaf to jump to the extremes.

v8: PAPER THEME is now the default (graph-paper notebook background, taped / pinned sticky sheets, handwritten Caveat headings, squiggle underlines, coffee ring stain). The round theme button cycles Paper -> Light -> Dark. Also fixed the hero name letters layout.

v9: Paper is the default theme for everyone (old saved theme choices are reset). Removed: cursor sparkles, rising hero emoji, tap emoji pops, auto-crawling bugs, floating duck button. Still available as secrets: type bugs / quack / joke.

v10: Paper is the only theme and now covers everything: header logo (tape label), side rail / phone menu (paper strip + highlighter), loader, toasts (sticky notes), terminal + snake windows, speech bubbles, skill bars, ticker. The theme button is hidden.

v11: Responsive pass. Only style.css changed (new block at the very end, marked "v11") - index.html and script.js are untouched.
Tested at 280px foldables -> 2560px monitors, portrait + landscape: phones, iPad / tablets, laptops, desktops.
 - Stat numbers and the hero name now size to their own card, so they can't overflow (was clipping on every screen size).
 - Tablets (621-980px): cards sit in clean pairs, no half-empty rows.
 - Header lines up with the content on wide screens; notch / safe-area aware.
 - Landscape phones: compact side rail, shorter terminal / snake windows (uses dvh).
 - Ticker no longer stretches the page sideways on iPhone Safari.

v12: Lite & smooth. Removed the cursor light effects (page spotlight, card glow that follows the pointer, cursor ring, tilt cards).
Removed non-stop glow/shine/pulse animations (hero beam, cube halo, shiny skill bars, neon title, footer glow, avatar ring, menu-button pulse).
Loading screen now closes as soon as the page is ready (was a fixed ~3s wait). Magnetic buttons, hover lift, marquee, cube and scroll reveals are kept.

v13: Smoother easing on reveals/buttons/skills. New easter eggs: type confetti / flip / gravity / zen / hello / coffee / hire / sankar / python / django / chess / volleyball; terminal: fortune, hack, about, gravity, flip, zen, confetti. Press 1-5 to jump sections, ? for shortcuts. Click a skill (joke), click the cube (roll), double-click the name (confetti). Back-to-top button, Copy-email button, tab-title when you switch away, idle nudge, console greeting, social/SEO meta. No pointer-tracking or looping JS added.

v14: Interactive layer. Command palette (Ctrl/Cmd+K, / or the header ⌘ button): jump to sections, brew coffee, snake, terminal, effects, copy email, accent colors. Sticky-note wall (saved on the visitor's device), project Like buttons, clickable stat tiles, contact form with character counter + shake validation + confetti. All event-driven; no pointer tracking or loops.
