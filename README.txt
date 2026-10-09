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

v16: Customizer cleanup. Removed Save/Load slots, Export/Import and Share-my-look. Toggles are now real ON/OFF switches (green = on, with an ON/OFF label); selected options show a tick on an inverted button, selected swatches get a tick + ring, and every click gives a quick pop animation. Changed: script.js (customizer block) and style.css (new block at the end). index.html untouched.

v17: Customizer. "Animated background" replaced by a static Background color row (8 swatches + custom picker; tap a selected swatch again to go back to the theme color). Removed the Blob card shape and Clear palette. New: Gradient overlay (Sunrise / Ocean / Forest / Dusk) behind the page. Card & text color pickers are kept.

v18: Every option button in the customizer (Theme, Layout, fonts, etc.) now fills solid green with a tick when selected, shows a green hover tint and a press effect; Surprise me / Reset flash green when clicked.

v19: Focus color. New customizer row (6 swatches + picker) sets the outline/ring color used when you tab to or click into buttons, links and form fields. Default green.

v20: Bug fix. A script error ('SW is not a function' - the accent-color list shadowed the screensaver wake function) stopped the customizer before it could mark the selected option or save settings. Fixed, so selected options now show green + tick, toggles show ON/OFF, and settings persist after reload.

v21: Offline 404 page. If the connection drops while the site is open, a full-screen themed '404 - you're offline' page appears; when the connection returns it shows 'Back online!' and closes by itself, no refresh. 'Try again' re-checks. (Opening the site while already offline still needs the browser's own offline support, e.g. a service worker.)

v22: The offline 404 page now always uses the default Paper look (graph paper, taped lined sheet, handwritten Caveat headline, coffee ring), whatever theme is selected.

v23: Offline page now matches the site's Paper theme exactly (paper texture, blue graph grid, taped sheet); the round ring stain on the right was removed. Caffeine meter: it now drops one level every 2 minutes (was 18 seconds) and stops at level 2, so visitors never get the sleepy / droopy-eyelid mood on their own. Type 'decaf' to still trigger it.

v24: Offline page 'Try again' button now uses the exact Paper-theme button style (dark pill, 2px border, soft offset shadow, same hover lift).

v25: Offline page motion matches the site: button uses the same 0.2s easing, hover lift and press-down; the sheet rises in like the section cards and straightens with a deeper shadow on hover, like the paper cards.

v26: Offline page button animation now copies the site's Paper buttons exactly: on hover/press only the offset shadow grows (2px 3px -> 3px 5px) with the same 0.2s easing; the button itself does not move.
