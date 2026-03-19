export function Privacy() {
  return (
    <div className="max-w-3xl mx-auto py-12 sm:py-16">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="space-y-6 text-[var(--text-secondary)]">
        <p className="text-sm text-[var(--text-secondary)]/80">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            1. Information We Collect
          </h2>
          <p>
            Social Feed is a frontend-only application. User data such as profile
            information and posts are stored locally in your browser. We do not
            transmit or store your data on external servers.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            2. Local Storage & Cookies
          </h2>
          <p>
            We use localStorage to persist your feed data and theme preference. A
            session cookie may store a non-sensitive session reference (e.g., username)
            for authentication. We do not store passwords or sensitive tokens in
            cookies or localStorage.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            3. Data Security
          </h2>
          <p>
            We implement input sanitization and follow frontend security best
            practices. All user-generated content is validated before display to
            prevent injection attacks.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            4. Contact
          </h2>
          <p>
            For questions about this Privacy Policy, please contact us through the
            application support channels.
          </p>
        </section>
      </div>
    </div>
  );
}
