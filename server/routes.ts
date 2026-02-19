import type { Express, Request, Response } from "express";
import { createServer, type Server } from "node:http";
import { processChat, checkRateLimit, getEventInfo, getVenues, getFAQs } from "./chatbot";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", service: "ELEVATE'26 Chatbot", timestamp: new Date().toISOString() });
  });

  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      console.log("Chat request received:", req.body);
      const { message, session_id } = req.body;

      if (!message || typeof message !== "string") {
        console.warn("Invalid message in body:", req.body);
        return res.status(400).json({ error: "Message is required" });
      }

      const sessionId = session_id || "default-" + Date.now().toString(36);

      if (!checkRateLimit(sessionId)) {
        console.warn("Rate limit triggered for session:", sessionId);
        return res.status(429).json({
          error: "Rate limit exceeded. Please wait a moment before sending another message.",
          response: "You're sending messages too quickly! Please wait a few seconds and try again.",
          confidence: 1.0,
          used_groq: false,
        });
      }

      const result = await processChat(message.trim(), sessionId);
      console.log("Chat result:", result);
      res.json(result);
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({
        error: "Internal server error",
        response: "Sorry, something went wrong. Please try again!",
        confidence: 0,
        used_groq: false,
      });
    }
  });

  app.get("/api/events", (_req: Request, res: Response) => {
    res.json(getEventInfo());
  });

  app.get("/api/venues", (_req: Request, res: Response) => {
    res.json(getVenues());
  });

  app.get("/api/faqs", (_req: Request, res: Response) => {
    res.json(getFAQs());
  });

  // Admin & Notification System
  const pushTokens = new Set<string>();
  const notificationHistory: any[] = [
    {
      id: "1",
      title: "Welcome to ELEVATE'26",
      body: "Thank you for joining! The Startup Conclave starts on Feb 24th.",
      time: "2h ago",
      unread: true,
    }
  ];

  app.get("/api/notifications", (_req: Request, res: Response) => {
    res.json(notificationHistory);
  });

  app.post("/api/admin/login", (req: Request, res: Response) => {
    const { password } = req.body;
    if (password === process.env.ADMIN_PASSWORD) {
      res.json({ success: true, token: "admin-session-" + Date.now() });
    } else {
      res.status(401).json({ success: false, error: "Invalid password" });
    }
  });

  app.post("/api/notifications/register-token", (req: Request, res: Response) => {
    const { token } = req.body;
    if (token && typeof token === "string") {
      pushTokens.add(token);
      console.log(`Registered token. Total: ${pushTokens.size}`);
      res.json({ success: true });
    } else {
      res.status(400).json({ error: "Invalid token" });
    }
  });

  app.post("/api/admin/broadcast", async (req: Request, res: Response) => {
    const { title, body, adminToken } = req.body;

    // Simple admin check
    if (!adminToken?.startsWith("admin-session-")) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    if (!title || !body) {
      return res.status(400).json({ error: "Title and body are required" });
    }

    console.log(`Broadcasting to ${pushTokens.size} devices: ${title}`);

    // In a real app, we'd use expo-server-sdk here. 
    // For now, we'll simulate it by calling the Expo Push API directly
    const messages = Array.from(pushTokens).map(token => ({
      to: token,
      sound: 'default',
      title,
      body,
      data: { withSome: 'data' },
    }));

    try {
      const expoRes = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messages),
      });

      const data = await expoRes.json();

      // Save to history
      notificationHistory.unshift({
        id: Date.now().toString(),
        title,
        body,
        time: "Just now",
        unread: true,
      });

      res.json({ success: true, data });
    } catch (error) {
      console.error("Push broadcast error:", error);
      res.status(500).json({ error: "Failed to send notifications" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
