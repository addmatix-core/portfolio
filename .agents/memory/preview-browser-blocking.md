---
name: Preview browser blocking
description: Browser security software can block the Replit preview iframe independently of the app.
---

McAfee WebAdvisor may block the temporary Replit preview URL and display a prohibited-content page while the local preview server is healthy and the app responds normally.

**Why:** The browser extension evaluates the temporary preview domain before the page reaches the app, so restarting workflows or changing application code does not resolve the visible blank pane.

**How to apply:** Check browser security/extension blocking first when the app preview is blank but workflow logs show the web service running and an internal preview capture renders successfully. Allow the Replit preview domain or temporarily disable WebAdvisor for the preview, then reload.