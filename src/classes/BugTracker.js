const Sentry = require('@sentry/node');

class BugTracker {
  setOptions({ enabled, url }) {
    this.enabled = enabled;
    this.url = url;

    if (this.enabled) {
      Sentry.init({ dsn: this.url });
    }
  }

  captureException(err) {
    if (!this.enabled) return;

    Sentry.captureException(err);
  }

  captureMessage(message) {
    if (!this.enabled) return;

    Sentry.captureMessage(message);
  }

  getClient() {
    return Sentry;
  }
}

module.exports = new BugTracker();
