'use client';

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
    duration = 8,
    borderWidth = 1,
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
        className={`absolute inset-[0] rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)] after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))] ${className}`}
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
                            className={`relative p-6 border rounded-lg overflow-hidden ${index === 0
                                    ? ' bg-blue-50 latest-change'
                                    : 'border-gray-300 bg-light-blue-100'
                                }`}
                        >
                            {index === 0 && (
                                <>
                                    <BorderBeam />
                                    <div className="absolute inset-[1px]" />
                                </>
                            )}
                            {index !== 0 && (
                                <div className="absolute inset-0 backdrop-blur-3xl rounded-lg" />
                            )}
                            <div className={`relative z-10`}>
                                <div className="ml-4">
                                    <div className="absolute left-0 top-0 -ml-10">
                                        <div className="w-8 h-8 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-gray-500" />
                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-semibold mb-1">{release.version}</h2>
                                    <p className="text-gray-500 text-sm mb-4">{release.date}</p>
                                    <ul className="space-y-3">
                                        {release.changes.map((change, changeIndex) => (
                                            <li key={changeIndex} className="flex items-start gap-3">
                                                <span className="flex items-center justify-center w-6 h-6 rounded border text-xs text-gray-500 border-gray-300 bg-white">
                                                    {changeIndex + 1}
                                                </span>
                                                <span className="text-gray-500">{change}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 text-center">
                    <p className="text-gray-600">Follow us on socials to get updates about changes we've made!</p>
                    <a href="https://x.com/codeinblogs" className="inline-block mt-2">
                        <img src="https://static.vecteezy.com/system/resources/previews/027/395/710/non_2x/twitter-brand-new-logo-3-d-with-new-x-shaped-graphic-of-the-world-s-most-popular-social-media-free-png.png" alt="Twitter" className="w-6 h-6 inline" />
                    </a>
                </div>
            </div>
            <style jsx global>{`
        @keyframes border-beam {
          100% {
            offset-distance: 100%;
          }
        }
        .animate-border-beam {
          animation: border-beam calc(var(--duration)*1s) infinite linear;
        }
        @keyframes gradient-background {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-background {
          animation: gradient-background 15s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>
        </div>
    );
}
