// Vercel's catch-all function adapts the existing Express application to the
// same-origin /api/* routes used by the frontend.
import app from "../../api-server/src/app";

export default app;