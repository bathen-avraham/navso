/// <reference types="vite/client" />

interface UmamiTracker {
  track(eventName: string, data?: Record<string, unknown>): void;
  identify(userId: string, data?: Record<string, unknown>): void;
}

interface Window {
  umami?: UmamiTracker;
}
