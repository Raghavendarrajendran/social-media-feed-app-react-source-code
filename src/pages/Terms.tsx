export function Terms() {
  return (
    <div className="max-w-3xl mx-auto py-12 sm:py-16">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
      <div className="space-y-6 text-[var(--text-secondary)]">
        <p className="text-sm text-[var(--text-secondary)]/80">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using Social Feed, you accept and agree to be bound by
            these Terms and Conditions. If you do not agree, please do not use the
            application.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            2. Use of Service
          </h2>
          <p>
            You agree to use Social Feed only for lawful purposes. You must not post
            content that is offensive, defamatory, or infringes on the rights of
            others. You are responsible for all content you create and share.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            3. Account Responsibility
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your account
            credentials. Usernames must be unique. You may not impersonate others or
            create misleading accounts.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            4. Limitation of Liability
          </h2>
          <p>
            Social Feed is provided as-is. We do not guarantee uninterrupted access
            or error-free operation. We are not liable for any indirect or
            consequential damages arising from your use of the service.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            5. Changes
          </h2>
          <p>
            We may update these Terms from time to time. Continued use of the
            application after changes constitutes acceptance of the updated Terms.
          </p>
        </section>
      </div>
    </div>
  );
}
