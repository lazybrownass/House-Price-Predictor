import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  {
    category: 'Using the Predictor',
    questions: [
      {
        question: 'How accurate are the price predictions?',
        answer: 'Our model has been trained on extensive real estate data from the Seattle area and typically achieves predictions within 10-15% of actual sale prices. However, unique property features or market conditions may affect accuracy.'
      },
      {
        question: 'What information do I need to get a prediction?',
        answer: 'You\'ll need basic property details like square footage, number of bedrooms/bathrooms, location (zipcode and latitude), property condition, and year built. The more accurate your input data, the better the prediction will be.'
      },
      {
        question: 'Can I save or compare multiple predictions?',
        answer: 'Currently, predictions are generated on-demand and not saved. We recommend taking screenshots or notes if you want to compare different scenarios.'
      }
    ]
  },
  {
    category: 'Property Features',
    questions: [
      {
        question: 'What is the "grade" of a house?',
        answer: 'Grade represents the construction quality of the house, ranging from 1 to 13. Higher grades indicate better quality materials and workmanship. Most houses fall between 7 (average) and 10 (good quality).'
      },
      {
        question: 'How is "condition" different from "grade"?',
        answer: 'While grade refers to construction quality, condition (1-5) reflects the current state of maintenance and repairs. A high-grade house might have a low condition if it hasn\'t been well-maintained.'
      },
      {
        question: 'What counts as a "view"?',
        answer: 'The view rating (0-4) considers scenic views like water, mountains, or cityscape. 0 means no view, while 4 indicates excellent views that significantly impact property value.'
      }
    ]
  },
  {
    category: 'Technical Details',
    questions: [
      {
        question: 'What type of model is used for predictions?',
        answer: 'We use a Random Forest Regression model, which combines multiple decision trees to make accurate predictions while capturing complex relationships between features.'
      },
      {
        question: 'How often is the model updated?',
        answer: 'The model is regularly retrained with new market data to ensure it reflects current trends and prices in the Seattle area real estate market.'
      },
      {
        question: 'Why do you need latitude coordinates?',
        answer: 'Latitude helps our model precisely locate the property within a zipcode area, as location can significantly impact property values even within the same zipcode.'
      }
    ]
  },
  {
    category: 'Data & Privacy',
    questions: [
      {
        question: 'Is my property data saved?',
        answer: 'No, we don\'t store any property data you enter. Each prediction is processed in real-time and then discarded.'
      },
      {
        question: 'Where does the training data come from?',
        answer: 'Our model is trained on public real estate transaction records from King County, Washington, ensuring relevant and accurate predictions for the Seattle area.'
      }
    ]
  }
];

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        className="flex justify-between items-center w-full py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-900 dark:text-white">
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 pr-4">
          <p className="text-gray-600 dark:text-gray-300">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQPage: React.FC = () => {
  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <HelpCircle className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about our house price prediction tool
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-12">
          {faqs.map((section, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {section.category}
              </h2>
              <div className="space-y-4">
                {section.questions.map((faq, faqIndex) => (
                  <FAQItem
                    key={faqIndex}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Still have questions? We're here to help!
          </p>
          <a
            href="/contact"
            className="mt-4 inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage; 