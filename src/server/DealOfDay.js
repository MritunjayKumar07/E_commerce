import pizzaImage from '../assets/images/products/pizza.svg';

export const Deal = [
  {
    id: 3,
    name: 'Mushroom Pizza',
    title: 'Savor the Earthy Flavors!',
    description: 'Indulge in the earthy goodness of Mushroom Pizza. 8 inch for Rs 169 - Irresistible taste!',
    originalPrice: 110,
    discountedPrice: 169,
    rating: 4.5,
    images: [pizzaImage, pizzaImage],
    keyWords: ['Pizza', '8 inch', 'Mushroom'],
    variableProductsId: [3, 4],
    spacel: 'New Arrivals',
    categoryId: 2,
    category: ['Pizza', '8 inch', 'Mushroom'],
    deal: 'deal',
    sold: 10,
    available: 20,
    countdown: {
      days: 360,
      hours: 24,
      minutes: 59,
      seconds: 0,
    },
  }
];