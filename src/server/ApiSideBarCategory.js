export const SideBarCategory = [
    {
        id: 1,
        title: 'Pizza',
        icon: require(`../assets/images/products/pizza.svg`).default,
        category: ['Pizza'],
        subcategories: [
            { title: 'Farmhouse', stock: 50, id: [1, 2] },
            { title: 'Mushroom', stock: 50, id: [3, 4] },
            { title: 'Peri Peri Paneer', stock: 50, id: [5, 6] },
            { title: 'Paneer Tikka', stock: 50, id: [7, 8] },
            { title: 'Paneer Makhni', stock: 50, id: [9, 10] },
            { title: 'Schezwan Paneer', stock: 50, id: [11, 12] },
        ],
    },
    {
        id: 2,
        title: 'Burger',
        icon: require(`../assets/images/products/pizza.svg`).default,
        category: ['Burger'],
        subcategories: [
            { title: 'Crispy Veggie', stock: 45, id: [13] },
            { title: 'Crispy Veggie Cheese', stock: 75, id: [14] },
            { title: 'Paneer Makhani', stock: 35, id: [15] },
        ],
    },
    {
        id: 3,
        title: 'Combo',
        icon: require(`../assets/images/products/pizza.svg`).default,
        subcategories: [
            { title: 'Party Special', stock: 46, id: [16] },
            { title: 'Spicy Veg', stock: 73, id: [17] },
            { title: 'Makhni', stock: 61, id: [18] },
        ],
    }
];