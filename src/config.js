module.exports = {
  siteTitle: 'Anthon Darden',
  siteDescription:
    'Anthon Darden is a senior full stack & blockchain deveoper with 10 yearos of hands-on experience.',
  siteKeywords:
    'NFT, DAO, DEFI, DEX, Crypto Game, EVM, Solana, Terra, Cosmos platforms, React, React Native, Next.js, Remix, Angular, Node.js, Nest.js, Golang, GraphQL, Python',
  siteUrl: 'https://smartdev914.github.io/',
  siteLanguage: 'en_US',
  name: 'Anthon Darden',
  location: 'Austin, TX',
  email: 'anthon.darden102@gmail.com',
  github: 'https://github.com/smartdev914',
  twitterHandle: '@anthondarden',
  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/smartdev914',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/anthon-darden-9366aa2ba',
    },
    {
      name: 'Codepen',
      url: 'https://codepen.io/anthondarden',
    }
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Projects',
      url: '/#projects',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  navHeight: 100,

  colors: {
    green: '#64ffda',
    navy: '#0a192f',
    darkNavy: '#020c1b',
  },

  srConfig: (delay = 200) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor: 0.25,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
