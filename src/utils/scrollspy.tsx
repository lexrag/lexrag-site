'use client';

import useScrollspy from './useScrollspy';

interface ScrollspyNavProps {
  items: { id: string; title: string }[];
}

const ScrollspyNav = ({ items }: ScrollspyNavProps) => {
  const ids = items.map((item) => item.id);
  const activeId = useScrollspy(ids, { rootMargin: '10% 0% -50% 0%'});

  return (
    <nav className="flex flex-col gap-1 w-[250px]">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`flex items-center p-2.5 gap-1.5 border border-transparent text-sm font-medium ${
            activeId === item.id
              ? 'text-primary'
              : 'text-gray-700 hover:text-primary'
          } dark:hover:bg-coal-300 dark:hover:border-gray-100 rounded-lg`}
        >
          <span
            className={`flex w-1.5 relative before:absolute before:top-0 before:left-px before:w-1.5 before:h-1.5 before:rounded-full before:transform before:-translate-x-1/2 before:-translate-y-1/2 ${
              activeId === item.id ? 'before:bg-primary' : ''
            }`}
          />
          <p className="text-base">{item.title}</p>
        </a>
      ))}
    </nav>
  );
};

export default ScrollspyNav;