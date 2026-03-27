import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Digital Karvan's cookie policy — how we use cookies on our website.",
};

export default function CookiePolicyPage() {
  return (
    <article className="pt-24 md:pt-32 pb-14 md:pb-20 bg-bg-primary">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">Cookie Policy</h1>
        <p className="text-text-muted text-sm mb-8 md:mb-12">Last updated: January 1, 2025</p>

        <div className="space-y-8 md:space-y-10 text-text-secondary text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">1. What Are Cookies?</h2>
            <p className="leading-relaxed">
              Cookies are small text files that are placed on your device when you visit a
              website. They are widely used to make websites work more efficiently and to
              provide information to website owners about how visitors use their sites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">2. How We Use Cookies</h2>
            <p className="leading-relaxed mb-4">
              Digital Karvan uses cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-text-primary">Essential cookies:</strong> These are necessary for the
                website to function properly and cannot be disabled.
              </li>
              <li>
                <strong className="text-text-primary">Analytics cookies:</strong> These help us understand how
                visitors interact with our website so we can improve the user experience.
              </li>
              <li>
                <strong className="text-text-primary">Preference cookies:</strong> These remember your settings
                and preferences to provide a more personalised experience.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">3. Types of Cookies We Use</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border-default">
                    <th className="text-left py-3 pr-4 text-text-primary font-medium">Cookie</th>
                    <th className="text-left py-3 pr-4 text-text-primary font-medium">Type</th>
                    <th className="text-left py-3 text-text-primary font-medium">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  <tr>
                    <td className="py-3 pr-4 text-text-secondary">session_id</td>
                    <td className="py-3 pr-4 text-text-secondary">Essential</td>
                    <td className="py-3 text-text-secondary">Maintains user session</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-text-secondary">_ga</td>
                    <td className="py-3 pr-4 text-text-secondary">Analytics</td>
                    <td className="py-3 text-text-secondary">Google Analytics tracking</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-text-secondary">preferences</td>
                    <td className="py-3 pr-4 text-text-secondary">Preference</td>
                    <td className="py-3 text-text-secondary">Stores user preferences</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">4. Managing Cookies</h2>
            <p className="leading-relaxed">
              You can control and manage cookies in your browser settings. Please be aware
              that removing or blocking cookies may impact your user experience and parts of
              our website may no longer be fully accessible. Most browsers allow you to:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>View what cookies are stored on your device</li>
              <li>Allow, block, or delete specific cookies</li>
              <li>Set preferences for certain websites</li>
              <li>Block all cookies from being set</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">5. Third-Party Cookies</h2>
            <p className="leading-relaxed">
              We may use third-party services that also set cookies. These third parties have
              their own privacy policies and we recommend reviewing them. We do not control
              these cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">6. Contact Us</h2>
            <p className="leading-relaxed">
              If you have questions about our use of cookies, please contact us at{" "}
              <a href="mailto:contact@digitalkarvan.com" className="text-text-primary hover:underline">
                contact@digitalkarvan.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
