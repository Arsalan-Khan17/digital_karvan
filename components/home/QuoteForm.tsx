"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useState } from "react";

interface QuoteFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  companyUrl: string;
  budget: string;
  region: string;
  services: string[];
  projectDetails: string;
}

const serviceOptions = [
  "Website Design & Development",
  "Branding & Identity Design",
  "Website Maintenance & Support",
  "Consultation & Technical Guidance",
];

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>();

  const onSubmit = async (_data: QuoteFormData) => {
    await new Promise((res) => setTimeout(res, 800));
    setSubmitted(true);
  };

  const inputClasses =
    "w-full px-4 py-3 bg-bg-elevated border border-border-default rounded-xl text-white placeholder-text-muted focus:outline-none focus:border-white/40 transition-colors text-sm";
  const labelClasses = "block text-sm font-medium text-text-secondary mb-2";
  const errorClasses = "text-xs text-red-400 mt-1";

  if (submitted) {
    return (
      <section className="py-24 bg-bg-secondary">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <CheckCircle size={56} className="text-accent mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
            <p className="text-text-secondary text-lg">
              We have received your enquiry and will get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-bg-secondary">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-3">
            Start Your Project
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Get a Quote</h2>
          <p className="mt-4 text-text-secondary">
            Tell us about your project and we will get back to you within 24 hours.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 p-8 md:p-12 rounded-2xl bg-bg-card border border-border-subtle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* First + Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>First Name *</label>
              <input
                {...register("firstName", { required: "First name is required" })}
                className={inputClasses}
                placeholder="John"
              />
              {errors.firstName && (
                <p className={errorClasses}>{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label className={labelClasses}>Last Name *</label>
              <input
                {...register("lastName", { required: "Last name is required" })}
                className={inputClasses}
                placeholder="Smith"
              />
              {errors.lastName && (
                <p className={errorClasses}>{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Email *</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
                })}
                type="email"
                className={inputClasses}
                placeholder="john@company.com"
              />
              {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
            </div>
            <div>
              <label className={labelClasses}>Phone</label>
              <input
                {...register("phone")}
                type="tel"
                className={inputClasses}
                placeholder="+44 7XX XXX XXXX"
              />
            </div>
          </div>

          {/* Company + URL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Company Name</label>
              <input
                {...register("companyName")}
                className={inputClasses}
                placeholder="Acme Ltd"
              />
            </div>
            <div>
              <label className={labelClasses}>Company URL</label>
              <input
                {...register("companyUrl")}
                type="url"
                className={inputClasses}
                placeholder="https://yourcompany.com"
              />
            </div>
          </div>

          {/* Budget + Region */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Budget</label>
              <select {...register("budget")} className={inputClasses}>
                <option value="">Select budget range</option>
                <option value="under-5k">Under £5,000</option>
                <option value="5k-15k">£5,000 – £15,000</option>
                <option value="15k-30k">£15,000 – £30,000</option>
                <option value="30k-plus">£30,000+</option>
              </select>
            </div>
            <div>
              <label className={labelClasses}>Region</label>
              <select {...register("region")} className={inputClasses}>
                <option value="">Select region</option>
                <option value="uk">United Kingdom</option>
                <option value="uae">UAE / Middle East</option>
                <option value="eu">Europe</option>
                <option value="us">United States</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Services */}
          <div>
            <label className={labelClasses}>Services Required</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {serviceOptions.map((svc) => (
                <label key={svc} className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    value={svc}
                    {...register("services")}
                    className="mt-0.5 rounded border-border-default bg-bg-elevated text-white focus:ring-0 focus:ring-offset-0"
                  />
                  <span className="text-sm text-text-secondary group-hover:text-white transition-colors">
                    {svc}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div>
            <label className={labelClasses}>Project Details *</label>
            <textarea
              {...register("projectDetails", { required: "Please describe your project" })}
              rows={5}
              className={`${inputClasses} resize-none`}
              placeholder="Tell us about your project, goals, and any specific requirements..."
            />
            {errors.projectDetails && (
              <p className={errorClasses}>{errors.projectDetails.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-accent text-white font-semibold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Submit Enquiry"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
