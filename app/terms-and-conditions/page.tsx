import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Digital Karvan's terms and conditions of service.",
};

export default function TermsPage() {
  return (
    <article className="pt-24 md:pt-32 pb-14 md:pb-20 bg-bg-primary">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">Terms and Conditions</h1>
        <p className="text-text-muted text-sm mb-8 md:mb-12">Last updated: January 1, 2025</p>

        <div className="space-y-8 md:space-y-10 text-text-secondary text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">1. Agreement to Terms</h2>
            <p className="leading-relaxed">
              By accessing and using the Digital Karvan website, you accept and agree to be
              bound by these Terms and Conditions. If you do not agree to these terms, please
              do not use our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">2. Services</h2>
            <p className="leading-relaxed">
              Digital Karvan provides digital design, development, maintenance, and consultation
              services. The specific terms of any service engagement will be governed by a
              separate service agreement or statement of work agreed between Digital Karvan
              and the client.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">3. Intellectual Property</h2>
            <p className="leading-relaxed">
              All content on this website, including text, graphics, logos, and images, is the
              property of Digital Karvan and is protected by applicable intellectual property
              laws. Upon full payment, clients receive ownership of deliverables as specified
              in the service agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">4. Payment Terms</h2>
            <p className="leading-relaxed">
              Payment terms will be specified in individual project agreements. Typically, we
              require a deposit before work commences, with the remainder due upon project
              completion or as specified in milestone-based agreements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">5. Limitation of Liability</h2>
            <p className="leading-relaxed">
              Digital Karvan&apos;s liability in connection with any services provided shall be
              limited to the fees paid for those specific services. We shall not be liable for
              any indirect, consequential, or incidental damages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">6. Governing Law</h2>
            <p className="leading-relaxed">
              These Terms and Conditions shall be governed by and construed in accordance with
              the laws of England and Wales. Any disputes arising from these terms shall be
              subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">7. Changes to Terms</h2>
            <p className="leading-relaxed">
              We reserve the right to modify these Terms and Conditions at any time. Changes
              will be effective immediately upon posting to the website. Your continued use
              of our website constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">8. Contact</h2>
            <p className="leading-relaxed">
              For questions about these Terms and Conditions, please contact us at{" "}
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
