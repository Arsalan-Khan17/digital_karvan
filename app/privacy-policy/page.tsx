import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Digital Karvan's privacy policy — how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <article className="pt-24 md:pt-32 pb-14 md:pb-20 bg-bg-primary">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">Privacy Policy</h1>
        <p className="text-text-muted text-sm mb-8 md:mb-12">Last updated: January 1, 2025</p>

        <div className="space-y-8 md:space-y-10 text-text-secondary text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">1. Introduction</h2>
            <p className="leading-relaxed">
              Digital Karvan (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your personal
              information and your right to privacy. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you visit our
              website or engage our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">2. Information We Collect</h2>
            <p className="leading-relaxed mb-4">
              We may collect information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Submit an enquiry or contact form</li>
              <li>Request a quote for our services</li>
              <li>Subscribe to our newsletter</li>
              <li>Engage us for services</li>
            </ul>
            <p className="leading-relaxed mt-4">
              This information may include your name, email address, phone number, company
              name, and any other information you choose to provide.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">3. How We Use Your Information</h2>
            <p className="leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to your enquiries and provide customer support</li>
              <li>Send you project-related communications</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">4. Data Sharing</h2>
            <p className="leading-relaxed">
              We do not sell, trade, or otherwise transfer your personally identifiable
              information to third parties. We may share information with trusted service
              providers who assist us in operating our website or conducting our business,
              subject to appropriate data protection agreements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">5. Data Retention</h2>
            <p className="leading-relaxed">
              We retain your personal data only for as long as necessary to fulfil the
              purposes outlined in this Privacy Policy, unless a longer retention period
              is required or permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">6. Your Rights</h2>
            <p className="leading-relaxed mb-4">Under applicable data protection law, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">7. Contact Us</h2>
            <p className="leading-relaxed">
              If you have questions about this Privacy Policy or our data practices, please
              contact us at{" "}
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
