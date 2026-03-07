  const productsByCategory = {
      "Typical Dishes": [
        { _id: "p1_1", name: "Chilaquiles", price: 12.95, 
          description: "Homemade tortilla chips tossed in a warm green salsa topped with meat. Crumbled fresco cheese, sour cream, lettuce, onions and cilantro."},
        { _id: "p1_2", name: "Mole con Pollo / Mole with Chicken", price: 13.95, 
          description: "Grilled chicken tossed in a warm mole sauce. Served with rice, beans & soft tortillas shells."},
        {
        _id: "p1_3",
        name: "Enchiladas Verdes / Green Enchiladas",
        price: 12.95,
        description:
          "Three corn tortilla enchiladas filled with your choice of shredded beef, shredded chicken, or pork, smothered with tomatillo sauce and topped with melted cheese. Served with sour cream, onions and cilantro.",
        requiredOptions: [
          {
            label: "First Protein",
            choices: ["Shredded Beef", "Shredded Chicken", "Pork"],
          },
          {
            label: "Second Protein",
            choices: ["Shredded Beef", "Shredded Chicken", "Pork"],
          },
          {
            label: "Third Protein",
            choices: ["Shredded Beef", "Shredded Chicken", "Pork"],
          },
        ],
        // optionalOptions: [
        //   { name: "Extra Avocado", price: 0.75 },
        //   { name: "Extra Beans", price: 1.0 },
        //   { name: "Extra Sauce", price: 0.0 },
        // ],
      },
        { _id: "p1_4", name: "Carne Asada", price: 13.95,  
          description: "Tender, thinly sliced grilled steak served with rice, beans and soft corn gluten-free tortilla shells."},
        { _id: "p1_5", name: "Tamale Platter", price: 12.95, 
          description: "Two chicken tamales wrapped in a corn husk served with rice and beans."},
        { _id: "p1_6", name: "Carnitas en Salsa Verde / Pork in Green Sauce", price: 13.95, 
          description: "Our traditional pork topped with green tomatillo sauce, served with pinto or black beans, rice and soft gluten free tortilla shells.",
        requiredOptions: [
          {
            label: "Side Choice",
            choices: ["Pinto Beans", "Black Beans"],
          },
        ]
      },
        { _id: "p1_7", name: "Bistec a la Mexicana / Mexican Style Steak", price: 12.95,  
          description: "Grilled steak mixed with fresh jalapeño peppers, grilled onions and tomatoes. It is served with rice, beans and soft gluten free corn tortilla shells."},
        { _id: "p1_8", name: "Carnitas a la Diabla / Deviled Pork", price: 12.95,  
          description: "Our traditional pork topped with spicy dry chili salsa, served with rice, beans and soft gluten-free corn tortilla shells."},
        { _id: "p1_9", name: "Tacos Dorados / Golden Brown Tacos", price: 12.95,  
          description: "Two chicken and two beef fried rolled tacos served with lettuce, sour cream, fresco cheese and salsa."},
        { _id: "p1_10", name: "Alambres / Steak with Peppers", price: 13.95,  
          description: "Your choice of chicken or steak strips mixed with grilled onions and bell peppers topped with melted shredded cheese. It is served with rice, beans and gluten-free soft corn tortilla shells.",
          requiredOptions: [
          {
            label: "Protein",
            choices: ["Steak", "Chicken"],
          }, ],
        },
        {
        _id: "p1_11",
        name: "Nachos Supreme",
        price: 13.95,
        description: "Crispy tortilla chips layered with seasoned protein, melted cheese, fresh lettuce, diced tomatoes and jalapeños.",
        requiredOptions: [
            {
            label: "Protein",
            choices: ["Steak", "Chicken"],
            },
            {
            label: "Side Choice",
            choices: ["Pinto Beans", "Black Beans"],
            },
        ],
        }

      ],
      "Side Orders": [
    { _id: "p2_1", name: "Arroz / Rice", price: 3.95, 
      description: "Flavorful rice entrée prepared with care and expertise." },
    { _id: "p2_2", name: "Frijoles Negros / Black Beans", price: 3.95, 
      description: "Whole black beans, simmered with traditional spices, offering a simple yet authentic side." },
    { _id: "p2_3", name: "Frijoles Pintos / Pinto Beans", price: 3.95, 
      description: "Whole pinto beans, often garnished with pico de gallo." },
    { _id: "p2_4", name: "Plátanos / Plantains", price: 3.95, 
      description: "Sweet fried plantains, served as a traditional side." },
    { _id: "p2_5", name: "Aguacate / Avocado", price: 3.95, 
      description: "Creamy avocado slices served with a wedge of fresh lime." },
    { _id: "p2_6", name: "Chips", price: 3.95, 
      description: "Fresh crisp corn tortilla chips, a light and crunchy accompaniment." },
    { _id: "p2_7", name: "Chips de Canela con Miel / Cinnamon Chips with Honey", price: 5.95, 
      description: "Fried tortilla chips dusted with cinnamon and drizzled with honey." },
    { _id: "p2_8", name: "Burrito de Plátano con Miel / Banana Burrito with Honey", price: 5.95, 
      description: "A sweet burrito filled with banana and drizzled with honey." },
    { _id: "p2_9", name: "Aderezo de Queso / Cheese Dip", price: 5.95, 
      description: "A creamy blend of melted cheese served as a rich dip." },
    { _id: "p2_10", name: "Aderezo de Frijol / Bean Dip", price: 6.95, 
      description: "Refried beans blended into a creamy dip, often garnished with cheese." },
    { _id: "p2_11", name: "Aderezo de Chorizo / Chorizo Dip", price: 7.95, 
      description: "A melted cheese dip with spicy Mexican chorizo." },
    { _id: "p2_12", name: "Aderezo de Guacamole / Guacamole Dip", price: 6.95, 
      description: "Creamy mashed avocado mixed with tomatoes, onions, cilantro. Served with chips." },
    { _id: "p2_13", name: "Pico de Gallo", price: 4.50, 
      description: "Fresh salsa with diced tomatoes, onions, cilantro, and spice." },
    { _id: "p2_14", name: "Tamal / Tamale", price: 3.95, 
      description: "Steamed corn masa dough with savory filling, wrapped in corn husk." },
    { _id: "p2_15", name: "Nopales Asados / Grilled Cactus", price: 3.95, 
      description: "Grilled cactus with onions and cilantro, a unique Mexican flavor." },
    { _id: "p2_16", name: "Salsa Verde 8 Oz (Suave o Roja Picante)", price: 4.95, 
      description: "8 oz green sauce, available in mild or red hot options." },
    { _id: "p2_17", name: "8 Oz White Chipotle Sauce", price: 4.95, 
      description: "8 oz Chipotle sauce." },
    { _id: "p2_18", name: "Papas Fritas / French Fries", price: 5.95, 
      description: "Classic crispy fries, fried to perfection." },
    { _id: "p2_19", name: "Lechuga / Lettuce", price: 3.95, 
      description: "Fresh lettuce, served as a light accompaniment." },
    { _id: "p2_20", name: "Chiles Toreados / Toreados Chilis", price: 3.95, 
      description: "Grilled jalapeños with onions and lime, spicy side." },
    { _id: "p2_21", name: "Jalapeños Encurtidos / Pickled Jalapeños", price: 2.95,
      description: "Pickled jalapeños in vinegar brine with carrots, onions, and spices." },
    { _id: "p2_22", name: "Papas Fritas con Chorizo / Chori Fries", price: 7.95, 
      description: "Crispy fries topped with chorizo and cheese sauce." },
    { _id: "p2_23", name: "Chicharrones De Harina", price: 3.95, 
      description: "Light, crispy wheat snacks fried until puffy and crunchy, served with lime and chili." }


      
  ],

  "Tacos": [
    { _id: "p3_1", name: "Taco - Cerdo Desmenuzado Picante / Spicy Pulled Pork", price: 3.50, 
      description: "Spicy pulled pork taco with cilantro, onions, and salsa." },
    { _id: "p3_2", name: "Taco - Cordero / Lamb", price: 3.95, 
      description: "Slow-cooked lamb taco with cilantro, onion, and traditional sauces." },
    { _id: "p3_3", name: "Taco - Chorizo / Pork", price: 3.50, 
      description: "Homemade Mexican chorizo taco with cilantro and onions." },
    { _id: "p3_4", name: "Taco - Pastor / Pork", price: 3.50, 
      description: "Marinated pork taco with pineapple, onions, and cilantro." },
    { _id: "p3_5", name: "Taco - Pollo / Chicken", price: 3.50, 
      description: "Grilled chicken taco with lettuce, tomato, radish, chips, salsa, guacamole, and sour cream." },
    { _id: "p3_6", name: "Taco - Barbacoa / Beef", price: 3.95, 
      description: "Slow-cooked beef barbacoa taco with onions and cilantro." },
    { _id: "p3_7", name: "Taco - Asada / Steak", price: 3.95, 
      description: "Grilled steak taco with onions, cilantro, salsa, and lime." },
    { _id: "p3_8", name: "Taco - Carnitas / Pork", price: 3.95, 
      description: "Slow-cooked pork taco with cilantro and onions." },
    { _id: "p3_9", name: "Taco - Buche", price: 3.50, 
      description: "Tender pork stomach taco with cilantro and onions." },
    { _id: "p3_10", name: "Taco - Cueritos / Pork", price: 3.50, 
      description: "Pickled pork skin taco with cilantro, onions, and salsa." },
    { _id: "p3_11", name: "Taco - Cabeza / Beef", price: 3.95, 
      description: "Tender beef head taco with onions and cilantro." },
    { _id: "p3_12", name: "Taco - Chicharrón en Salsa Verde / Fried Pork Rind in Green Sauce", price: 3.95, 
      description: "Pork rinds simmered in green tomatillo sauce with onions and cilantro." },
    { _id: "p3_13", name: "Taco - Camarón / Shrimp", price: 3.95, 
      description: "Shrimp taco with lettuce, pico de gallo, and chipotle sauce." },
    { _id: "p3_14", name: "Taco - Pescado / Fish", price: 3.95, 
      description: "Fish taco with cabbage, pico de gallo, and creamy/spicy sauce." },
    { _id: "p3_15", name: "Taco - Lengua / Tongue", price: 3.95, 
      description: "Beef tongue taco with onions and cilantro." }
  ],

  "Burritos": [
    { _id: "p4_1", name: "Burritos - Cordero / Lamb", price: 12.95, 
      description: "Lamb burrito with choice of pinto or black beans, hot or mild sauce. Served with chips & salsa.",
           requiredOptions: [
          {
            label: "Side Choice",
            choices: ["Pinto Beans", "Black Beans"],
          },
          {
            label: "Sauce Choice",
            choices: ["Hot", "Mild"],
          },
        ]
     },
    { _id: "p4_2", name: "Burritos - Res / Beef", price: 12.95, 
      description: "Beef burrito with choice of pinto or black beans, hot or mild salsa. Served with chips & salsa.",
           requiredOptions: [
          {
            label: "Side Choice",
            choices: ["Pinto Beans", "Black Beans"],
          },
          {
            label: "Sauce Choice",
            choices: ["Hot", "Mild"],
          },
        ]
      },
    { _id: "p4_3", name: "Burritos - Bistec / Steak", price: 12.95, 
      description: "Grilled steak burrito with beans, rice, cheese, and salsa. Served with chips & salsa.",
           requiredOptions: [
          {
            label: "Side Choice",
            choices: ["Pinto Beans", "Black Beans"],
          },
          {
            label: "Sauce Choice",
            choices: ["Hot", "Mild"],
          },
        ]
      },
    { _id: "p4_4", name: "Burritos - Cerdo / Pork", price: 12.95, 
      description: "Pork burrito with choice of beans and hot or mild salsa. Served with chips & salsa.",
           requiredOptions: [
          {
            label: "Side Choice",
            choices: ["Pinto Beans", "Black Beans"],
          },
          {
            label: "Sauce Choice",
            choices: ["Hot", "Mild"],
          },
        ]
      },
    { _id: "p4_5", name: "Burritos - Pastor", price: 12.95, 
      description: "Pastor burrito with marinated pork, beans, and sauce choice. Served with chips & salsa.",
           requiredOptions: [
          {
            label: "Side Choice",
            choices: ["Pinto Beans", "Black Beans"],
          },
          {
            label: "Sauce Choice",
            choices: ["Hot", "Mild"],
          },
        ]
      },
    { _id: "p4_6", name: "Burritos - Chorizo", price: 12.95, 
      description: "Chorizo burrito with beans, rice, cheese, and salsa. Served with chips & salsa.",
           requiredOptions: [
          {
            label: "Side Choice",
            choices: ["Pinto Beans", "Black Beans"],
          },
          {
            label: "Sauce Choice",
            choices: ["Hot", "Mild"],
          },
        ]
      },
    { _id: "p4_7", name: "Burritos - Pollo / Chicken", price: 12.95, 
      description: "Chicken burrito with choice of beans, hot or mild salsa. Served with chips & salsa.",
           requiredOptions: [
          {
            label: "Side Choice",
            choices: ["Pinto Beans", "Black Beans"],
          },
          {
            label: "Sauce Choice",
            choices: ["Hot", "Mild"],
          },
        ]
      }
  ],

  "Kids Menu": [
  {
    _id: "p12_1",
    name: "Small Chicken Quesadilla",
    price: 9.95,
    description: "Served with lettuce, tomato, cheese, and sour cream.",
    requiredOptions: [
      {
        label: "Side Choice",
        choices: [
          "Rice",
          "Pinto Beans",
          "Black Beans",
          "French Fries",
          "Corn Tortilla Chips",
        ],
      },
      {
        label: "Drink (Small)",
        choices: [
          "Agua Fresca - Horchata",
          "Agua Fresca - Jamaica",
          "Agua Fresca - Pineapple",
          "Agua Fresca - Cantaloupe Melon",
        ],
      },
    ],
  },
  {
    _id: "p12_2",
    name: "Small Bean & Cheese Nachos",
    price: 9.95,
    description: "Topped with lettuce, tomato, cheese, and sour cream.",
    requiredOptions: [
      {
        label: "Side Choice",
        choices: [
          "Rice",
          "Pinto Beans",
          "Black Beans",
          "French Fries",
          "Corn Tortilla Chips",
        ],
      },
      {
        label: "Drink (Small)",
        choices: [
          "Agua Fresca - Horchata",
          "Agua Fresca - Jamaica",
          "Agua Fresca - Pineapple",
          "Agua Fresca - Cantaloupe Melon",
        ],
      },
    ],
  },
  {
    _id: "p12_3",
    name: "Soft Taco (Chicken or Steak)",
    price: 9.95,
    description: "Soft taco with lettuce, tomato, cheese, and sour cream.",
    requiredOptions: [
      {
        label: "Protein",
        choices: ["Chicken", "Steak"],
      },
      {
        label: "Side Choice",
        choices: [
          "Rice",
          "Pinto Beans",
          "Black Beans",
          "French Fries",
          "Corn Tortilla Chips",
        ],
      },
      {
        label: "Drink (Small)",
        choices: [
          "Agua Fresca - Horchata",
          "Agua Fresca - Jamaica",
          "Agua Fresca - Pineapple",
          "Agua Fresca - Cantaloupe Melon",
        ],
      },
    ],
  },
  {
    _id: "p12_4",
    name: "Small Grilled Chicken Breast",
    price: 9.95,
    description: "Grilled chicken served with lettuce, tomato, cheese, and sour cream.",
    requiredOptions: [
      {
        label: "Side Choice",
        choices: [
          "Rice",
          "Pinto Beans",
          "Black Beans",
          "French Fries",
          "Corn Tortilla Chips",
        ],
      },
      {
        label: "Drink (Small)",
        choices: [
          "Agua Fresca - Horchata",
          "Agua Fresca - Jamaica",
          "Agua Fresca - Pineapple",
          "Agua Fresca - Cantaloupe Melon",
        ],
      },
    ],
  },
  {
    _id: "p12_5",
    name: "Small Beans with Chicken or Beef",
    price: 9.95,
    description: "Beans topped with your choice of protein, lettuce, tomato, cheese, and sour cream.",
    requiredOptions: [
      {
        label: "Protein",
        choices: ["Chicken", "Beef"],
      },
      {
        label: "Side Choice",
        choices: [
          "Rice",
          "Pinto Beans",
          "Black Beans",
          "French Fries",
          "Corn Tortilla Chips",
        ],
      },
      {
        label: "Drink (Small)",
        choices: [
          "Agua Fresca - Horchata",
          "Agua Fresca - Jamaica",
          "Agua Fresca - Pineapple",
          "Agua Fresca - Cantaloupe Melon",
        ],
      },
    ],
  },
  {
    _id: "p12_6",
    name: "Kids Burrito with Cheese",
    price: 9.95,
    description: "Cheese burrito served with lettuce, tomato, and sour cream.",
    requiredOptions: [
      {
        label: "Side Choice",
        choices: [
          "Rice",
          "Pinto Beans",
          "Black Beans",
          "French Fries",
          "Corn Tortilla Chips",
        ],
      },
      {
        label: "Drink (Small)",
        choices: [
          "Agua Fresca - Horchata",
          "Agua Fresca - Jamaica",
          "Agua Fresca - Pineapple",
          "Agua Fresca - Cantaloupe Melon",
        ],
      },
    ],
  },
  {
    _id: "p12_7",
    name: "Chicken Tostadas",
    price: 9.95,
    description: "Crispy tostadas topped with chicken, lettuce, tomato, cheese, and sour cream.",
    requiredOptions: [
      {
        label: "Side Choice",
        choices: [
          "Rice",
          "Pinto Beans",
          "Black Beans",
          "French Fries",
          "Corn Tortilla Chips",
        ],
      },
      {
        label: "Drink (Small)",
        choices: [
          "Agua Fresca - Horchata",
          "Agua Fresca - Jamaica",
          "Agua Fresca - Pineapple",
          "Agua Fresca - Cantaloupe Melon",
        ],
      },
    ],
  },
],




  "Breakfast Burritos": [
    { _id: "p5_1", name: "Breakfast Burrito - Rancheros / Ranch Style", price: 9.95, 
      description: "Scrambled eggs cooked with ranch style sauce. Served with rice, beans, and tortillas.",
           requiredOptions: [
          {
            label: "Preparation Choice",
            choices: ["Regular", "Burrito", "Bowl"],
          },
        ] 
      },
    { _id: "p5_2", name: "Breakfast Burrito - Con Jamón / With Ham", price: 9.95, 
      description: "Scrambled eggs cooked with chopped ham. Served with rice, beans, and tortillas.",
           requiredOptions: [
          {
            label: "Preparation Choice",
            choices: ["Regular", "Burrito", "Bowl"],
          },
        ] 
       },
    { _id: "p5_3", name: "Breakfast Burrito - Burritos - A la Mexicana / Mexican Style", price: 9.95, 
      description: "Scrambled eggs with onion, tomato, and jalapeños. Served with rice, beans, and tortillas.",
           requiredOptions: [
          {
            label: "Preparation Choice",
            choices: ["Regular", "Burrito", "Bowl"],
          },
        ] 
       },
    { _id: "p5_4", name: "Breakfast Burrito -Con Chorizo", price: 9.95, 
      description: "Scrambled eggs cooked with Mexican chorizo. Served with rice, beans, and tortillas.",
           requiredOptions: [
          {
            label: "Preparation Choice",
            choices: ["Regular", "Burrito", "Bowl"],
          },
        ]  }
  ],

  "Quesadillas": [
    { _id: "p6_1", name: "Quesadilla - Borrego / Lamb", price: 12.95, 
      description: "Slow-cooked lamb quesadilla with melted cheese in a tortilla." },
    { _id: "p6_2", name: "Quesadilla - Pollo / Chicken", price: 11.95, 
      description: "Grilled tortilla filled with seasoned chicken, cheese, lettuce, radish, tomato, chips, and dipping sauces." },
    { _id: "p6_3", name: "Quesadilla - Pastor / Pork", price: 11.95, 
      description: "Marinated pork quesadilla with melted cheese in a flour tortilla." },
    { _id: "p6_4", name: "Quesadilla - Barbacoa / Beef", price: 11.95, 
      description: "Slow-cooked beef barbacoa quesadilla with onions, cilantro, and cheese." },
    { _id: "p6_5", name: "Quesadilla - Asada / Steak", price: 11.95, 
      description: "Grilled steak quesadilla with melted cheese, onions, cilantro, and lime." },
    { _id: "p6_6", name: "Quesadilla - Chorizo", price: 11.95, 
      description: "Quesadilla filled with spicy Mexican sausage and melted cheese." },
    { _id: "p6_7", name: "Quesadilla - Carnitas / Pork", price: 11.95, 
      description: "Slow-cooked pork quesadilla with melted cheese." },
    { _id: "p6_8", name: "Quesadilla - Vegetales / Grilled Veggies", price: 10.95, 
      description: "Quesadilla with grilled zucchini, onions, mushrooms, peppers, and melted cheese." },
    { _id: "p6_9", name: "Quesadilla de Fajita", price: 12.95, 
      description: "Quesadilla with grilled chicken or steak, onions, bell peppers, and cheese." },
    { _id: "p6_10", name: "Quesabirria", price: 13.95, 
      description: "Three mini quesadillas with beef birria, cheese, lettuce, tomato, onion, cilantro, salsa, and 8 oz birria broth." }
  ],  

  "Signature Burritos": [
    {
      _id: "p7_1",
      name: "Sig. Burrito - Primo",
      price: 13.95,
      description: "Grilled chicken or steak filled with chorizo, grilled onions, black beans, pico de gallo and cheese.",
    },
    {
      _id: "p7_2",
      name: "Sig. Burrito - La Playa",
      price: 14.95,
      description: "A huge burrito stuffed with grilled shrimp and tilapia, mixed veggies, covered with cheese sauce and topped with fresh cilantro.",
    },
    {
      _id: "p7_3",
      name: "Sig. Burrito - Tipico",
      price: 12.95,
      description: "Slow-roasted pork carnitas with pineapple cheese dip sauce, beans, rice, and pico de gallo.",
    },
    {
      _id: "p7_4",
      name: "Sig. Burrito - Arriba",
      price: 12.95,
      description: "Stuffed with French fries, cheese, grilled steak, creamy chipotle sauce, and pico de gallo.",
    },
    {
      _id: "p7_5",
      name: "Sig. Burrito - Choripollo",
      price: 13.95,
      description: "Grilled chicken and chorizo filled with rice and cheese.",
    },
    {
      _id: "p7_6",
      name: "Sig. Burrito - California",
      price: 13.95,
      description: "Grilled bell peppers, cheese, onions, black beans, rice, and your choice of chicken or steak.",
      requiredOptions: [
          {
            label: "Protein",
            choices: ["Steak", "Chicken"],
          },]
        },
    {
      _id: "p7_7",
      name: "Sig. Burrito - Santa Fe",
      price: 13.95,
      description: "Grilled chicken and steak with shredded cheese, sour cream, jalapeños, tomato, pinto beans, and cheese.",
    },
    {
      _id: "p7_8",
      name: "Sig. Burrito - Verde",
      price: 13.95,
      description: "Grilled steak with black beans, cheese, sour cream, and chile verde sauce.",
    },
    {
      _id: "p7_9",
      name: "Sig. Burrito - Mar Y Tierra",
      price: 15.95,
      description: "Steak and shrimp burrito filled with cheese, sour cream, black beans, rice, and pico de gallo.",
    },
],


  "Chicken Lovers": [
    {
      _id: "p8_1",
      name: "Chicken Lover Choripollo",
      price: 13.95,
      description: "Grilled chicken breast with chorizo, cheese, rice, beans, and tortillas.",
    },
    {
      _id: "p8_2",
      name: "Chicken Lover Pollo A La Parrilla",
      price: 13.95,
      description: "Grilled chicken breasts topped with mushrooms, onions, and smothered with creamy chile con queso. Served with rice, salad, and tortillas.",
    },
    {
      _id: "p8_3",
      name: "Chicken Lover Pollo Loco",
      price: 12.95,
      description: "Marinated grilled chicken breast covered with Mexican rice and beans, served with tortillas on the side.",
    },
    {
      _id: "p8_4",
      name: "Chicken Lover Pollo Al Chipotle",
      price: 12.95,
      description: "Grilled chicken breast covered with our special creamy chipotle sauce. Served with rice, beans, and tortillas.",
    },
    {
      _id: "p8_5",
      name: "Chicken Lover ACP",
      price: 11.95,
      description: "Grilled chicken strips on a bed of Mexican rice covered with white cheese dip.",
    },
    {
      _id: "p8_6",
      name: "Chicken Lover ACP With Vegetables",
      price: 12.95,
      description: "A bed of rice topped with grilled chicken, melted cheese, mushrooms, onions, and bell peppers.",
    },
    {
      _id: "p8_7",
      name: "Chicken Lover Tinga Tostada",
      price: 5.95,
      description: "Shredded spicy chipotle chicken with grilled onions, tomato, sour cream, lettuce, and fresco crumbled cheese.",
    },
    {
      _id: "p8_8",
      name: "Chicken Lover Fajitas Plate",
      price: 13.95,
      description: "Grilled chicken with bell peppers, tomatoes, and onions. Served with rice, beans, lettuce, and pico de gallo.",
    },
    {
      _id: "p8_9",
      name: "Chicken Lover Authentic Mole",
      price: 13.95,
      description: "Bone-in chicken quarters smothered in a smoky, savory chocolate mole poblano sauce. Served with rice, beans, and tortillas.",
    },
  ],


  "Tortas Sandwiches": [
    {
      _id: "p9_1",
      name: "Torta Carnitas",
      price: 12.95,
      description: "Roasted pork served shredded in small pieces with chipotle mayo, tomato, onions, cilantro, pickled jalapeños, cheese, and lettuce.",
    },
    {
      _id: "p9_2",
      name: "Torta Pastor",
      price: 12.95,
      description: "Made with grilled pineapple, seasoned, and marinated pork with chipotle mayo and fresh toppings.",
    },
    {
      _id: "p9_3",
      name: "Torta Cubana",
      price: 13.95,
      description: "Traditional sandwich with a mix of sausages, ham, chorizo, and fried eggs with chipotle mayo and veggies.",
    },
    {
      _id: "p9_4",
      name: "Torta Chorizo Con Huevo",
      price: 12.95,
      description: "Scrambled eggs with Mexican sausage and chipotle mayo on a soft roll.",
    },
    {
      _id: "p9_5",
      name: "Torta Jamon",
      price: 11.95,
      description: "Ham and cheese torta served with chipotle mayo, lettuce, tomato, and onions.",
    },
    {
      _id: "p9_6",
      name: "Torta Asada",
      price: 12.95,
      description: "Grilled steak strips with chipotle mayo, tomato, onions, and cheese.",
    },
    {
      _id: "p9_7",
      name: "Torta Barbacoa",
      price: 12.95,
      description: "Slow-cooked beef with chipotle mayo, cheese, and fresh vegetables.",
    },
    {
      _id: "p9_8",
      name: "Torta Lengua",
      price: 13.95,
      description: "Tender beef tongue sandwich with chipotle mayo, onions, and cheese.",
    },
    {
      _id: "p9_9",
      name: "Torta Salchicha Al Huevo",
      price: 11.95,
      description: "Sausage, eggs, and cheese sandwich with chipotle mayo and toppings.",
    },
    {
      _id: "p9_10",
      name: "Torta Hawaiana",
      price: 12.95,
      description: "Ham, chorizo, cheese, and grilled pineapple sandwich with chipotle mayo and veggies.",
    },
  ],
    
  "Desserts": [
    {
      _id: "p13_1",
      name: "Churros",
      price: 5.95,
      description: "Golden fried dough sticks rolled in cinnamon sugar. Served warm.",
    },
    {
      _id: "p13_2",
      name: "Burrito Banana",
      price: 6.95,
      description: "Sweet banana wrapped in a soft tortilla, lightly fried and drizzled with honey or chocolate.",
    },
    {
      _id: "p13_3",
      name: "Cinnamon Chips",
      price: 5.95,
      description: "Crispy tortilla chips dusted with cinnamon sugar, perfect for sharing.",
    },
    // {
    //   _id: "p13_4",
    //   name: "Flan Casero",
    //   price: 6.95,
    //   description: "Traditional homemade caramel flan with a smooth, creamy texture.",
    // },
  ],



  "Drinks": [
    {
      _id: "p10_1",
      name: "Agua Fresca - Horchata",
      price: 4.95,
      description: "A refreshing rice-based drink blended with cinnamon and a touch of sweetness.",
    },
    {
      _id: "p10_2",
      name: "Agua Fresca - Jamaica",
      price: 4.95,
      description: "A chilled hibiscus flower drink with a tangy, lightly sweet flavor.",
    },
    {
      _id: "p10_3",
      name: "Agua Fresca - Pineapple",
      price: 4.95,
      description: "Fresh pineapple blended with water for a sweet and tropical refreshment.",
    },
    {
      _id: "p10_4",
      name: "Agua Fresca - Cantaloupe Melon",
      price: 4.95,
      description: "Smooth cantaloupe melon blended into a lightly sweet and refreshing drink.",
    },
  ],


    
//   "Sauces": [
//   {
//     _id: "p11_1",
//     name: "Chips Salsa",
//     price: 0.95,
//     description: "Classic house-made tomato salsa with onions, cilantro, and mild spices.",
//   },
//   {
//     _id: "p11_2",
//     name: "Guacamole Salsa",
//     price: 0.95,
//     description: "Creamy avocado-based salsa with fresh lime, cilantro, and mild seasoning.",
//   },
//   {
//     _id: "p11_3",
//     name: "White Chipotle Salsa",
//     price: 0.95,
//     description: "Smooth and creamy chipotle salsa with a smoky, mildly spicy kick.",
//   },
//   {
//     _id: "p11_4",
//     name: "Salsa Verde",
//     price: 0.95,
//     description: "Tangy tomatillo-based green salsa with fresh herbs and a bright flavor.",
//   },
//   {
//     _id: "p11_5",
//     name: "Smoked Dry Pepper Salsa",
//     price: 0.95,
//     description: "Bold and smoky salsa made from dried peppers with a rich, spicy flavor.",
//   },
// ]



      // Add other categories here...
    };
  

export default productsByCategory;
