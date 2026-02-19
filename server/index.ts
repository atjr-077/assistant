import express from "express";
import type { Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import * as fs from "fs";
import * as path from "path";
import { loadEnvFile } from "node:process";

// Try to load .env file (local only)
try {
  loadEnvFile(path.resolve(process.cwd(), ".env"));
} catch (e) {
  // .env might not exist on Vercel
}

const app = express();
const log = console.log;

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

/* ================= CORS ================= */

function setupCors(app: express.Application) {
  app.use((req, res, next) => {
    const origin = req.header("origin");

    const isInternal =
      !origin ||
      origin?.startsWith("http://localhost:") ||
      origin?.startsWith("http://127.0.0.1:");

    if (isInternal) {
      res.header("Access-Control-Allow-Origin", origin || "*");
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      res.header("Access-Control-Allow-Headers", "Content-Type");
    }

    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }

    next();
  });
}

/* ================= BODY PARSER ================= */

function setupBodyParsing(app: express.Application) {
  app.use(
    express.json({
      verify: (req, _res, buf) => {
        req.rawBody = buf;
      },
    })
  );

  app.use(express.urlencoded({ extended: false }));
}

/* ================= LOGGING ================= */

function setupRequestLogging(app: express.Application) {
  app.use((req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
      if (!req.path.startsWith("/api")) return;

      const duration = Date.now() - start;
      log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
    });

    next();
  });
}

/* ================= LANDING PAGE ================= */

function getAppName(): string {
  try {
    const appJson = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), "app.json"), "utf-8")
    );
    return appJson.expo?.name || "App Landing Page";
  } catch {
    return "App Landing Page";
  }
}

function serveLandingPage(req: Request, res: Response) {
  const templatePath = path.resolve(
    process.cwd(),
    "server",
    "templates",
    "landing-page.html"
  );

  if (!fs.existsSync(templatePath)) {
    return res.status(404).send("Landing page not found");
  }

  const template = fs.readFileSync(templatePath, "utf-8");
  const appName = getAppName();

  const protocol = req.headers["x-forwarded-proto"] || req.protocol;
  const host = req.headers["x-forwarded-host"] || req.get("host");
  const baseUrl = `${protocol}://${host}`;

  const html = template
    .replace(/BASE_URL_PLACEHOLDER/g, baseUrl as string)
    .replace(/APP_NAME_PLACEHOLDER/g, appName);

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html);
}

function configureLanding(app: express.Application) {
  app.get("/", (req, res) => {
    serveLandingPage(req, res);
  });
}

/* ================= ERROR HANDLER ================= */

function setupErrorHandler(app: express.Application) {
  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    console.error("Internal Server Error:", err);

    if (res.headersSent) {
      return next(err);
    }

    res.status(err.status || 500).json({
      message: err.message || "Internal Server Error",
    });
  });
}

/* ================= INITIALIZE APP ================= */

setupCors(app);
setupBodyParsing(app);
setupRequestLogging(app);
configureLanding(app);

// Register API routes
registerRoutes(app).catch((err) => {
  console.error("Route registration failed:", err);
});

setupErrorHandler(app);

/* ================= EXPORT FOR VERCEL ================= */

export default app;
