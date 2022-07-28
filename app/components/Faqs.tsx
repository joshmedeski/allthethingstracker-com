/* This example requires Tailwind CSS v2.0+ */
const faqs = [
  {
    question: "Why is it free?",
    answer:
      "This is a side-project built by one person (hi, I'm Josh). I'm a software developer and indie entrepreneur, I have low overhead costs and want to help make the world a more productive and stress-free place with good software. I hope the free plan offers you just enough to worry less about the thigns that often fall through the cracks.",
  },
  {
    question: "How is this different from a task manager?",
    answer:
      "Think of All The Things Tracker as a high level view on the areas of life that aren't explicit tasks or things done regularly. A task manager is good for the day-to-day, this app is good for week-to-week, month-to-month, and year-to-year.",
  },
  {
    question: "How do I get started?",
    answer:
      "When you sign-up, I'll offer common areas and activities that other users have already tracked. You can add your own, the goal is to start tracking those things that are often missed.",
  },
  {
    question: "Is my data secure?",
    answer:
      "I realize some of the things that could be tracked are sensative. I will never sell your data to a third party, however, I will use the data internally to improve the product.",
  },
];

const Faqs: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Frequently asked questions
            </h2>
          </div>
          <div className="mt-12 lg:col-span-2 lg:mt-0">
            <dl className="space-y-12">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="text-lg font-medium leading-6 text-gray-900">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
