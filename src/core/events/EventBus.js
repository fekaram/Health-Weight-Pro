export class EventBus {
  #subscribers = new Map();

  subscribe(eventName, handler) {
    if (!this.#subscribers.has(eventName)) {
      this.#subscribers.set(eventName, new Set());
    }

    this.#subscribers.get(eventName).add(handler);

    return () => this.unsubscribe(eventName, handler);
  }

  unsubscribe(eventName, handler) {
    const handlers = this.#subscribers.get(eventName);

    if (!handlers) {
      return;
    }

    handlers.delete(handler);

    if (handlers.size === 0) {
      this.#subscribers.delete(eventName);
    }
  }

  publish(eventName, payload = {}) {
    const handlers = this.#subscribers.get(eventName);

    if (!handlers) {
      return;
    }

    handlers.forEach((handler) => handler(payload));
  }

  clear() {
    this.#subscribers.clear();
  }
}
