const productsByCategory = {

  "Platters": [
    {
      _id: "p1_1",
      name: "Chicken Over Rice",
      price: 12.99,
      description:
        "Classic New York–style halal platter with seasoned chicken served over basmati rice with fresh salad and our famous house made white sauce.",
        // requiredOptions: [ 
        //   { label: "First Protein", choices: ["Shredded Beef", "Shredded Chicken", "Pork"], }, 
        //   { label: "Second Protein", choices: ["Shredded Beef", "Shredded Chicken", "Pork"], }, 
        //   { label: "Third Protein", choices: ["Shredded Beef", "Shredded Chicken", "Pork"], }, ], 
        optionalOptions: [ 
          { name: "Side Fries", price: 3.99 }, 
          { name: "Side Falafel", price: 3.99 }, 
          { name: "Extra Sauce", price: 0.0 }, 
        ],
    },
    {
      _id: "p1_2",
      name: "Combo Over Rice",
      price: 12.99,
      description:
        "A hearty halal combo platter with grilled chicken and lamb served over rice with fresh salad and topped with our house made white sauce."
    },
    {
      _id: "p1_3",
      name: "Falafel Over Rice",
      price: 12.99,
      description:
        "Crispy falafel served over seasoned basmati rice with fresh salad and finished with our famous house made white sauce."
    }
  ],

  "Gyros": [
    {
      _id: "p2_1",
      name: "Chicken Gyro",
      price: 12.99,
      description:
        "Warm pita bread filled with seasoned chicken, fresh salad, and our house made white sauce. Served with crispy fries."
    },
    {
      _id: "p2_2",
      name: "Combo Gyro",
      price: 12.99,
      description:
        "Delicious gyro wrap with chicken and lamb, fresh vegetables, and house white sauce inside warm pita bread. Served with fries."
    },
    {
      _id: "p2_3",
      name: "Falafel Gyro",
      price: 12.99,
      description:
        "Crispy falafel wrapped in soft pita bread with fresh salad and our signature white sauce. Served with fries."
    }
  ],

  "Hero Sandwiches": [
    {
      _id: "p3_1",
      name: "Beef Hero",
      price: 13.99,
      description:
        "Large 12-inch hero sandwich served with chopped beef, melted cheese, and flavorful sauce. Served with fries."
    },
    {
      _id: "p3_2",
      name: "Lamb Hero",
      price: 13.99,
      description:
        "Large 12-inch hero sandwich served with chopped lamb, melted cheese, and flavorful sauce. Served with fries."
    },
    {
      _id: "p3_3",
      name: "Chicken Hero",
      price: 13.99,
      description:
        "A 12-inch hero sandwich filled with chopped grilled chicken, melted cheese, and house sauce. Served with crispy fries."
    }
  ],

  "Fresh Salads": [
    {
      _id: "p4_1",
      name: "Grilled Chicken Salad",
      price: 9.99,
      description:
        "Fresh salad with lettuce, tomato, cucumber, and carrots topped with tender grilled chicken."
    },
    {
      _id: "p4_2",
      name: "Grilled Lamb Salad",
      price: 9.99,
      description:
        "Healthy fresh salad with lettuce, tomato, cucumber, and carrots topped with seasoned grilled lamb."
    }
  ],

  "Sides": [
    {
      _id: "p5_1",
      name: "French Fries",
      price: 3.99,
      description:
        "Hot and crispy golden fries — the perfect side with gyros or sandwiches."
    },
    {
      _id: "p5_2",
      name: "Side Falafel",
      price: 3.99,
      description:
        "Crispy falafel served as a side dish with fresh salad and our signature white sauce."
    }
  ],

  "Drinks": [
    {
      "_id": "p6_1",
      "name": "Arizona Watermelon Juice Cocktail",
      "price": 1.99,
      "description": "A sweet and refreshing watermelon-flavored juice cocktail."
    },
    {
      "_id": "p6_2",
      "name": "Arizona Fruit Punch Juice",
      "price": 1.99,
      "description": "A vibrant blend of fruit flavors, delivering a delicious and fruity punch."
    },
    {
      "_id": "p6_3",
      "name": "Arizona Mucho Mango",
      "price": 1.99,
      "description": "A tropical mango-flavored juice that’s sweet, tangy, and refreshing."
    },
    {
      "_id": "p6_4",
      "name": "Coke",
      "price": 1.99,
      "description": "Classic cola drink"
    },
    {
      "_id": "p6_5",
      "name": "Sprite",
      "price": 1.99,
      "description": "A refreshing citrus-flavored soda."
    },
    {
      "_id": "p6_6",
      "name": "Diet Coke",
      "price": 1.99,
      "description": "A zero-calorie version of the classic cola drink."
    }
  ]
};
  

export default productsByCategory;
