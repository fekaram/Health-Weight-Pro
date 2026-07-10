const LEVELS = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
  silent: 50,
};

const MAX_BUFFERED_ENTRIES = 200;

export class Logger {
  #entries = [];

  constructor({ namespace = 'App', level = 'info' } = {}) {
    this.namespace = namespace;
    this.level = level;
  }

  debug(message, context) {
    this.#write('debug', message, context);
  }

  info(message, context) {
    this.#write('info', message, context);
  }

  warn(message, context) {
    this.#write('warn', message, context);
  }

  error(message, context) {
    this.#write('error', message, context);
  }

  getEntries() {
    return [...this.#entries];
  }

  #write(level, message, context) {
    this.#buffer(level, message, context);

    if (LEVELS[level] < LEVELS[this.level]) {
      return;
    }

    const details = context ? [context] : [];
    const prefix = `[${this.namespace}] ${message}`;

    if (level === 'warn') {
      console.warn(prefix, ...details);
      return;
    }

    if (level === 'error') {
      console.error(prefix, ...details);
      return;
    }

    console[level](prefix, ...details);
  }

  #buffer(level, message, context) {
    this.#entries.push({
      timestamp: new Date().toISOString(),
      level,
      namespace: this.namespace,
      message,
      context: context ?? null,
    });

    if (this.#entries.length > MAX_BUFFERED_ENTRIES) {
      this.#entries.shift();
    }
  }
}
