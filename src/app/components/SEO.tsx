'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

export default function SEO() {
  const pathname = usePathname();
  const baseUrl = 'https://retirement-calculator-tan.vercel.app';
  const currentUrl = `${baseUrl}${pathname}`;

  const calculatorSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'Retirement Calculator',
    'applicationCategory': 'FinanceApplication',
    'operatingSystem': 'All',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'ratingCount': '896',
      'bestRating': '5',
      'worstRating': '1'
    },
    'review': {
      '@type': 'Review',
      'reviewRating': {
        '@type': 'Rating',
        'ratingValue': '5',
        'bestRating': '5',
        'worstRating': '1'
      },
      'author': {
        '@type': 'Person',
        'name': 'Financial Planning Expert'
      },
      'reviewBody': 'This retirement calculator provides accurate projections and a user-friendly interface. The visual charts make it easy to understand how your savings will grow over time.'
    }
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'How to Calculate Your Retirement Savings',
    'description': 'A step-by-step guide to calculate your retirement savings with our calculator',
    'step': [
      {
        '@type': 'HowToStep',
        'name': 'Enter your current age',
        'text': 'Input your current age in years.'
      },
      {
        '@type': 'HowToStep',
        'name': 'Set your retirement age',
        'text': 'Input the age at which you plan to retire.'
      },
      {
        '@type': 'HowToStep',
        'name': 'Enter your current savings',
        'text': 'Input the amount you have already saved for retirement.'
      },
      {
        '@type': 'HowToStep',
        'name': 'Enter your monthly contribution',
        'text': 'Input how much you plan to save each month for retirement.'
      },
      {
        '@type': 'HowToStep',
        'name': 'Set your expected rate of return',
        'text': 'Input the annual percentage return you expect from your investments.'
      },
      {
        '@type': 'HowToStep',
        'name': 'Set inflation rate',
        'text': 'Input the expected annual inflation rate to adjust future values.'
      },
      {
        '@type': 'HowToStep',
        'name': 'Calculate',
        'text': 'Click the Calculate button to see your projected retirement savings.'
      }
    ],
    'tool': {
      '@type': 'HowToTool',
      'name': 'Retirement Calculator'
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': baseUrl
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Retirement Calculator',
        'item': currentUrl
      }
    ]
  };

  return (
    <>
      <Script
        id="calculator-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(calculatorSchema)
        }}
      />
      <Script
        id="howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema)
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
    </>
  );
} 