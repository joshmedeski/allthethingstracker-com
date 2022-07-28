/* This example requires Tailwind CSS v2.0+ */

import { Link } from "@remix-run/react";
import { CheckIcon } from "./icons";

const tiers = [
  {
    name: "Hobbiest",
    to: "/get-started",
    priceMonthly: 0,
    description: "Get all the basics, it's on the house.",
    features: [
      "High level view of areas in your life",
      "Track ongoing activities",
      "Log events when they happen",
    ],
  },
];

const Pricing: React.FC = () => {
  return (
    <div className="bg-neutral-900">
      <div className="pt-12 sm:pt-16 lg:pt-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-2 lg:max-w-none">
            <h2 className="text-lg font-semibold uppercase leading-6 tracking-wider text-gray-300">
              Pricing
            </h2>
            <p className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Free for all.
            </p>
            <p className="text-xl text-gray-300">
              No credit card required. No commitment. No hidden fees. Just a
              helpful app.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-background pb-12 sm:mt-12 sm:pb-16 lg:mt-16 lg:pb-24">
        <div className="relative">
          <div className="absolute inset-0 h-3/4 bg-gray-900" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md space-y-4 lg:grid lg:max-w-5xl lg:grid-cols-1 lg:gap-5 lg:space-y-0">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className="flex flex-col overflow-hidden rounded-lg shadow-lg"
                >
                  <div className="bg-background px-6 py-8 sm:p-10 sm:pb-6">
                    <div>
                      <h3
                        className="inline-flex rounded-full bg-uncommon-subtle px-4 py-1 text-sm font-semibold uppercase tracking-wide text-uncommon"
                        id="tier-standard"
                      >
                        {tier.name}
                      </h3>
                    </div>
                    <div className="mt-4 flex items-baseline text-6xl font-extrabold">
                      ${tier.priceMonthly}
                      <span className="ml-1 text-2xl font-medium text-neutral">
                        /mo
                      </span>
                      {tier.priceAnnually && (
                        <span className="ml-1 text-2xl font-medium text-neutral">
                          paid yearly ${tier.priceAnnually}
                        </span>
                      )}
                    </div>
                    <p className="mt-5 text-lg text-neutral">
                      {tier.description}
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col justify-between space-y-6 bg-gray-50 px-6 pt-6 pb-8 sm:p-10 sm:pt-6">
                    <ul className="space-y-4">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <div className="flex-shrink-0">
                            <CheckIcon aria-hidden="true" />
                          </div>
                          <p className="ml-3 text-base text-gray-700">
                            {feature}
                          </p>
                        </li>
                      ))}
                    </ul>
                    <div className="rounded-md shadow">
                      <Link
                        to={tier.to}
                        className="flex items-center justify-center rounded-md border border-transparent bg-cta px-5 py-3 text-base font-medium text-background transition"
                        aria-describedby="tier-standard"
                      >
                        Get started
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
