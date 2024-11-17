import './styles.css';
import { useState } from 'react';

const changelogData = [
  {
    version: 'v1.2.0',
    date: '2024-11-15',
    changes: [
      'Added dark mode support',
      'Improved performance for large datasets',
      'Fixed a bug in the search functionality',
    ],
  },
  {
    version: 'v1.1.0',
    date: '2024-10-01',
    changes: [
      'Introduced new dashboard layout',
      'Added export to CSV feature',
      'Updated dependencies to latest versions',
    ],
  },
  {
    version: 'v1.0.0',
    date: '2024-09-01',
    changes: [
      'Initial release',
      'Basic CRUD operations',
      'User authentication and authorization',
    ],
  },
];

const BorderBeam = ({
  className = '',
  size = 200,
  duration = 15,
  borderWidth = 1.5,
  anchor = 90,
  colorFrom = '#3b82f6',
  colorTo = '#1d4ed8',
  delay = 0,
}) => (
  <div
    style={{
      '--size': size,
      '--duration': duration,
      '--anchor': anchor,
      '--border-width': borderWidth,
      '--color-from': colorFrom,
      '--color-to': colorTo,
      '--delay': `-${delay}s`,
    } as React.CSSProperties}
    className={`absolute inset-[0] rounded-lg [border:calc(var(--border-width)*1px)_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)] after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))] ${className}`}
  />
);

export default function Component() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12">Changelog</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {changelogData.map((release, index) => (
            <div
              key={release.version}
              className={`relative p-6 border rounded-lg overflow-hidden ${
                index === 0
                  ? 'border-blue-500 bg-blue-50 latest-change'
                  : 'border-gray-300'
              }`}
            >
              {index === 0 && (
                <>
                  <BorderBeam />
                  <div className="absolute inset-[1px] rounded-lg bg-gradient-to-br from-blue-500/30 to-purple-500/30 animate-gradient-background" />
                  <div className="absolute inset-[2px] rounded-lg bg-white" />
                  <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 text-xs font-semibold rounded z-10">
                    Current
                  </span>
                </>
              )}
              <div className={`relative z-10 ${index === 0 ? 'p-7' : 'p-6'}`}>
                <h2 className="text-2xl font-semibold">{release.version}</h2>
                <p className="text-sm text-gray-500">{release.date}</p>
                <ul className="mt-4 space-y-2">
                  {release.changes.map((change, changeIndex) => (
                    <li key={changeIndex} className="flex gap-2 items-start">
                      <span className="w-6 h-6 flex items-center justify-center border rounded-full text-xs bg-gray-100">
                        {changeIndex + 1}
                      </span>
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
