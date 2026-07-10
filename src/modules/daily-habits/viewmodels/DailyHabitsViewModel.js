import { createDailyHabits } from '../entities/DailyHabits.js';

export class DailyHabitsViewModel {
  constructor({ repository, eventBus }) {
    this.repository = repository;
    this.eventBus = eventBus;
    this.today = null;
  }

  async initialize() {
    this.today = (await this.repository.getToday()) ?? null;
  }

  getState() {
    return {
      today: this.today,
    };
  }

  async handleAction(action, payload = {}) {
    if (action === 'addWater') {
      const amount = Number(payload.amount) || 0;

      if (amount !== 0) {
        const nextWaterMl = Math.max(0, (this.today?.waterMl ?? 0) + amount);

        await this.#mutateToday({ waterMl: nextWaterMl });
      }

      return;
    }

    if (action === 'setSleep') {
      const hours = Number(payload.hours) || 0;
      const minutes = Number(payload.minutes) || 0;

      await this.#mutateToday({ sleepMinutes: hours * 60 + minutes });
      return;
    }

    if (action === 'setSteps') {
      await this.#mutateToday({ steps: Number(payload.steps) || 0 });
    }
  }

  async #mutateToday(patch) {
    const updated = createDailyHabits({ ...this.today, ...patch }, this.today);

    await this.repository.save(updated);
    this.today = updated;
    this.eventBus.publish('daily-habits:changed');
    this.eventBus.publish('core-mvp:data-changed');
  }
}
