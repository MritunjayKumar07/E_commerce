export const TCSdata = {
  testimonials: [
    {
      id: 1,
      name: 'Alan Doe',
      title: 'CEO & Founder Invision',
      description: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor dolor sit amet.',
      image: require(`../assets/images/products/pizza.svg`).default,
      quotes: require(`../assets/images/icons/quotes.svg`).default,
    },
  ],
  cta: {
    banner: require(`../assets/images/cta-banner.svg`).default,
    discount: '25% Discount',
    title: 'Summer collection',
    text: 'Starting @ $10',
    buttonText: 'Shop now',
  },
  services: [
    { icon: 'boat-outline', title: 'Worldwide Delivery', description: 'For Order Over $100' },
    { icon: 'rocket-outline', title: 'Next Day delivery', description: 'UK Orders Only' },
    { icon: 'call-outline', title: 'Best Online Support', description: 'Hours: 8AM - 11PM' },
    { icon: 'arrow-undo-outline', title: 'Return Policy', description: 'Easy & Free Return' },
    { icon: 'ticket-outline', title: '30% money back', description: 'For Order Over $100' },
  ],
  modal: {
    banner: require(`../assets/images/newsletter.svg`).default,
    title : "Subscribe Newsletter.",
    desc : "Subscribe the <b>Anon</b> to get the latest products and discount updates.",
    btn : `Subscrive`,
    path : `/`,
  },
};