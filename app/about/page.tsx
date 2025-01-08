'use client';

import React from 'react';
import { CheckCircle, Heart, Coffee } from 'lucide-react'; // Import icons from lucide-react

const About: React.FC = () => {
  // Data for the cards
  const cards = [
    {
      id: 1,
      icon: <CheckCircle size={48} className='text-secondary' />,
      title: 'Diverse Recipes',
      description:
        'Explore a wide variety of recipes from global cuisines, tailored to your taste and dietary needs.',
    },
    {
      id: 2,
      icon: <Heart size={48} className='text-secondary' />,
      title: 'Healthy Choices',
      description:
        'Find recipes that are not only delicious but also nutritious, helping you maintain a healthy lifestyle.',
    },
    {
      id: 3,
      icon: <Coffee size={48} className='text-secondary' />,
      title: 'Easy Cooking',
      description:
        'Our step-by-step instructions and video guides make cooking simple, fun, and accessible for everyone.',
    },
  ];

  return (
    <div className='p-6 max-w-5xl mx-auto'>
      {/* Text Section */}
      <div>
        <h1 className='text-5xl font-extrabold text-center text-gray-900 dark:text-white mb-8'>
          About <span className='text-secondary'>TastyBite</span>
        </h1>
        <p className='text-xl text-gray-700 dark:text-gray-300 mb-10 leading-relaxed'>
          Welcome to <strong>TastyBite</strong>, your ultimate platform for
          exploring and discovering a wide variety of delicious recipes. Whether
          you are a culinary expert or just beginning your cooking journey, we
          offer something for everyone.
        </p>

        <h2 className='text-4xl font-semibold text-gray-900 dark:text-white mb-6'>
          Our Vision
        </h2>
        <p className='text-lg text-gray-700 dark:text-gray-300 mb-10 leading-relaxed'>
          At TastyBite, we envision a world where everyone can enjoy cooking and
          eating healthy, tasty meals. We aim to inspire people to experiment
          with different cuisines, cooking styles, and new ingredients. Our
          platform is designed to empower both beginners and experienced cooks
          to discover exciting recipes and bring them to life in their kitchens.
        </p>

        <h2 className='text-4xl font-semibold text-gray-900 dark:text-white mb-6'>
          Why Choose Us?
        </h2>
        <ul className='list-inside list-disc text-lg text-gray-700 dark:text-gray-300 mb-10'>
          <li className='mb-4'>
            Access a curated selection of diverse and global recipes, tailored
            to your tastes.
          </li>
          <li className='mb-4'>
            Personalized recommendations based on your dietary preferences and
            restrictions.
          </li>
          <li className='mb-4'>
            Step-by-step cooking instructions with helpful images and videos to
            guide you.
          </li>
          <li className='mb-4'>
            Easily save and share your favorite recipes with family and friends.
          </li>
          <li className='mb-4'>
            Our website is fully responsive, ensuring a smooth experience across
            all devices.
          </li>
        </ul>

        <h2 className='text-4xl font-semibold text-gray-900 dark:text-white mb-6'>
          Join Us on Our Culinary Journey
        </h2>
        <p className='text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed'>
          We’re passionate about food and bringing people together through
          cooking. Whether you&apos;re looking for quick weeknight dinners or
          seeking inspiration for a special occasion, TastyBite is your perfect
          companion in the kitchen. Join our growing community and start
          exploring the endless culinary possibilities today!
        </p>

        {/* Cards Section */}
        <h2 className='text-4xl font-semibold text-gray-900 dark:text-white mb-6 text-center'>
          Why TastyBite?
        </h2>
        <div className='grid md:grid-cols-3 gap-8'>
          {cards.map((card) => (
            <div
              key={card.id}
              className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center'
            >
              {/* Centering the icon */}
              <div className='mb-4'>{card.icon}</div>
              <h3 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center'>
                {card.title}
              </h3>
              <p className='text-lg text-gray-700 dark:text-gray-300 text-center'>
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
