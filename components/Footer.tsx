'use client';

import Link from 'next/link';

const footerLinks = [
  { id: 1, link: '/', title: 'Home' },
  { id: 2, link: '/allrecipes', title: 'Recipes' },
  { id: 3, link: '/about', title: 'About' },
  { id: 4, link: '/contact', title: 'Contact' },
];

const Footer = () => {
  return (
    <footer className='bg-gray-100 dark:bg-gray-900 rounded-t-lg shadow mt-10 max-w-6xl mx-auto px-4'>
      <div className='max-w-6xl mx-auto px-4 py-8'>
        {/* Top Section */}
        <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
          {/* Logo */}
          <div className='flex items-center gap-3'>
            <span className='text-2xl font-extrabold text-gray-900 dark:text-white'>
              TastyBite
            </span>
          </div>

          {/* Links */}
          <ul className='flex flex-wrap items-center gap-6 text-base font-medium text-gray-600 dark:text-gray-400'>
            {footerLinks.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.link}
                  className='hover:text-secondary hover:underline transition-all'
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <hr className='my-6 border-gray-300 dark:border-gray-700' />

        {/* Bottom Section */}
        <div className='text-center'>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            © {new Date().getFullYear()}{' '}
            <span className='font-bold text-gray-800 dark:text-white'>
              TastyBite
            </span>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
