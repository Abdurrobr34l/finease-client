import React from 'react';
import tipImage from '../../assets/budgeting-tips.webp';

const BudgetingTips = () => {
  return (
    <section id='budgeting' class="flex flex-col gap-10 lg:flex-row lg:items-center">
      <div class="flex flex-col p-0 lg:w-1/2 2xl:w-[44%]">
        <img class="w-full rounded-lg" src={tipImage} />
      </div>

      <div>
        <div class="flex flex-col justify-center">
          <h2 class="title mb-6 text-justify!">Budgeting <span className='text-accent'>Tips</span></h2>
          <ul class="list-disc list-inside space-y-3 text-lg text-secondary marker:text-accent md:text-xl">
            <li class="text-base 2xl:text-xl">Track your daily income and expenses to understand your spending habits.</li>
            <li class="text-base 2xl:text-xl">Set realistic monthly budgets and stick to them consistently.</li>
            <li class="text-base 2xl:text-xl">Prioritize saving at least 10–20% of your income each month.</li>
            <li class="text-base 2xl:text-xl">Review your spending reports weekly to identify unnecessary expenses.</li>
            <li class="text-base 2xl:text-xl">Create specific savings goals for emergencies, travel, or education.</li>
            <li class="text-base 2xl:text-xl">Use financial summaries and charts to visualize progress and stay motivated.</li>
            <li class="text-base 2xl:text-xl">Avoid impulse purchases — wait 24 hours before buying non-essentials.</li>
          </ul>
        </div>
      </div>
    </section>
  )
};

export default BudgetingTips;