import React from 'react';

const FAQ = () => {
  const faqData = [
    {
      id: 1,
      question: 'How do I track my expenses?',
      answer:
        'You can track your expenses by adding each transaction under the "My Transactions" section. Categorize them as Income or Expense to get an accurate overview.',
    },
    {
      id: 2,
      question: 'Can I link multiple bank accounts?',
      answer:
        'Currently, you can manage multiple accounts manually by creating separate transactions for each account. Automatic bank linking may be added in future updates.',
    },
    {
      id: 3,
      question: 'Is my financial data secure?',
      answer:
        'Yes! We prioritize your security. All your data is stored safely, and sensitive information is never shared without your consent.',
    },
    {
      id: 4,
      question: 'Can I export my financial reports?',
      answer:
        'Yes, you can export your transactions and financial summaries to CSV or PDF for your records.',
    },
  ];

  return (
    <section id='faq' className="bg-base-200">
      <div className="max-w-4xl mx-auto">
        <h2 className="title text-center mb-10">
          Frequently Asked <span className="text-accent">Questions</span>
        </h2>

        <div className="space-y-4">
          {faqData.map(({ id, question, answer }) => (
            <div key={id} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-xl">
              <input type="checkbox" className="peer" />
              <div className="collapse-title text-lg font-semibold text-accent">
                {question}
              </div>
              <div className="collapse-content text-secondary">
                <p>{answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;