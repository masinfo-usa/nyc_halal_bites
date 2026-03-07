import {create} from "zustand"
import { createCustomer } from "../../../backend/controller/customer.controller";
import { trusted } from "mongoose";


const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
const getFromLocalStorage = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  };


const getProductKey = (product) => product.uniqueKey || product._id;
const getOriginalProductKey = (product) => product._id;


const isWithinTimeRange = () => {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();

  const afterOpen = h > 11 || (h === 11 && m >= 30);   // 11:30 AM
  const beforeClose = h < 22 || (h === 22 && m <= 30); // 10:30 PM
  

  
// return true;
  return afterOpen && beforeClose;
};





const isWithinDeliveryTimeRange = () => {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();

  // Delivery window: 5:30 PM – 10:30 PM
  const afterDeliveryStart = h > 17 || (h === 17 && m >= 30);   // 5:30 PM
  const beforeDeliveryEnd  = h < 22 || (h === 22 && m <= 30);  // 10:30 PM

  //return true;
  return afterDeliveryStart && beforeDeliveryEnd;

};




export const useProductStore = create((set, get) => ({

    fulfillmentType: getFromLocalStorage("fulfillmentType", "delivery"),
    pickupAddress: getFromLocalStorage("pickupAddress", "430 Buck Jones Rd, Raleigh, NC 27606"),
    deliveryAddress: getFromLocalStorage("deliveryAddress", ""),
    unit: getFromLocalStorage("unit", ""),
    dropoffOption: getFromLocalStorage("dropoffOption", "Leave at door"),
    freeItemWithDelivery: getFromLocalStorage("freeItemWithDelivery", "Bag of Chips"),
    deliveryInstruction: getFromLocalStorage("deliveryInstruction", ""),
    deliveryDistance: getFromLocalStorage("deliveryDistance", 1),
    deliveryEtaDuration: getFromLocalStorage("deliveryEtaDuration", 25),

    setFulfillmentType: (type) => {
      saveToLocalStorage("fulfillmentType", type);
      set({ fulfillmentType: type });
    },

    setDeliveryAddress: (address) => {
      saveToLocalStorage("deliveryAddress", address);
      set({ deliveryAddress: address });
    },

    setUnit: (unit) => {
      saveToLocalStorage("unit", unit);
      set({ unit });
    },

    setDropoffOption: (option) => {
      saveToLocalStorage("dropoffOption", option);
      set({ dropoffOption: option });
    },

    setFreeItemWithDelivery: (option) => {
      saveToLocalStorage("freeItemWithDelivery", option);
      set({ freeItemWithDelivery: option });
    },

    setDeliveryInstruction: (instruction) => {
      saveToLocalStorage("deliveryInstruction", instruction);
      set({ deliveryInstruction: instruction });
    },


    setDeliveryDistance: (dist) => {
      saveToLocalStorage("deliveryDistance", dist);
      set({ deliveryDistance: dist });
    },

    setDeliveryETADuration: (duration) => {
      saveToLocalStorage("deliveryEtaDuration", duration);
      set({ deliveryEtaDuration: duration });
    },
    

    targetAddress: getFromLocalStorage("deliveryAddress", null),
    setTargetAddress: (value) => set({ targetAddress: value }),

    isFulfillmentOpen : false,
    setFulfillmentOpen: (value) => set({ isFulfillmentOpen: value }),


    checkFulfillmentType: () => {
      const { fulfillmentType, deliveryAddress } = get();

      if (fulfillmentType === "delivery" && deliveryAddress === "") {
        set({ targetAddress: null, isFulfillmentOpen: true });
      }
    },

    isStoreOpen: isWithinTimeRange(),
    isDeliveryOpen: isWithinDeliveryTimeRange(),

    // Force recalculation (optional)
    refreshStatus: () => set({ isStoreOpen: isWithinTimeRange(), isDeliveryOpen: isWithinDeliveryTimeRange() }),


    isCartOpen : false,
    setCartOpen: (value) => set({ isCartOpen: value }),

   

  

    isUpsellOpen : false,
    isUpsellChanged : false,
    
    
    setUpsellOpen: (value) =>
    set((state) => ({
      isUpsellOpen: value,
      isUpsellChanged: value ? false : state.isUpsellChanged, // reset if opening
    })),

    setUpsellChanged: (value) => set({ isUpsellChanged: value }),

    showBagButton : true,
    setShowBagButton: (value) => set({ showBagButton: value }),


    modalOpen : false,
    setModalOpen: (value) => set({ modalOpen: value }),

    currentAspectRatio : (window.innerWidth/window.innerHeight),

    updateAspectRatio: () =>
        set(() => ({
          currentAspectRatio: window.innerWidth / window.innerHeight,
        })),

    

    selectedProduct: null, // The product currently selected
    setSelectedProduct: (product) => set({ selectedProduct: product}),
    clearSelectedProduct: () => set({ selectedProduct: null }),
      
    productSource: '', // The product currently selected
    setProductSource: (src) => set({ productSource: src}),
    clearProductSource: () => set({ productSource: '' }),

    sortedProducts : null,
    setSortedProducts: (sps) => set({sortedProducts: sps}),


    // Cart state and methods
    cartItems: getFromLocalStorage("cartItems", []),




    productsByCategory: {},

    setProductsByCategory: (data) => set({ productsByCategory: data }),

  upsellProducts: [],

  // setter to initialize upsells
  setUpsellProducts: (products) => set({ upsellProducts: products }),







addToCart: (prdt, count = 1) =>
  set((state) => {
    const isSameCustomization = (a, b) => {
      // Compare required options
      if (
        JSON.stringify(a.customizations?.required || {}) !==
        JSON.stringify(b.customizations?.required || {})
      )
        return false;

      // Compare optional options (only by name to ignore order/price)
      if (
        JSON.stringify(a.customizations?.optional?.map((o) => o.name)) !==
        JSON.stringify(b.customizations?.optional?.map((o) => o.name))
      )
        return false;

      // Compare special note text (case-insensitive, trimmed)
      const noteA = (a.customizations?.note || "").trim().toLowerCase();
      const noteB = (b.customizations?.note || "").trim().toLowerCase();
      if (noteA !== noteB) return false;

      return true;
    };

    const existingProduct = state.cartItems.find(
      (item) => item._id === prdt._id && isSameCustomization(item, prdt)
    );

    const updatedCartItems = existingProduct
      ? state.cartItems.map((item) =>
          item._id === prdt._id && isSameCustomization(item, prdt)
            ? { ...item, quantity: item.quantity + count }
            : item
        )
      : [...state.cartItems, { ...prdt, quantity: count }];

    saveToLocalStorage("cartItems", updatedCartItems);
    return { cartItems: updatedCartItems };
  }),


  updateCartItem: (updatedProduct, prevKey) =>
  set((state) => {
    const updatedCartItems = state.cartItems.map((item) =>
      getProductKey(item) === prevKey
        ? updatedProduct
        : item
    );
    saveToLocalStorage("cartItems", updatedCartItems);
    return { cartItems: updatedCartItems };
  }),



getProductQuantity: (prdt) => {
  const key = getOriginalProductKey(prdt);
  const item = get().cartItems.find(
    (cartItem) => getOriginalProductKey(cartItem) === key
  );
  return item?.quantity || 0;
},  


addOneUpsellToCart: (prdt) =>
  set((state) => {
    const key = getOriginalProductKey(prdt);
    const existingProduct = state.cartItems.find(
      (item) => getOriginalProductKey(item) === key
    );

  

    const updatedCartItems = existingProduct
      ? state.cartItems.map((item) =>
          getOriginalProductKey(item) === key
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...state.cartItems, { ...prdt, quantity: 1 }];

    saveToLocalStorage("cartItems", updatedCartItems);
    return { cartItems: updatedCartItems };
  }),


removeOneUpsellFromCart: (key) =>
  set((state) => {
    const existingProduct = state.cartItems.find(
      (item) => getOriginalProductKey(item) === key
    );

    let updatedCartItems;
    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        updatedCartItems = state.cartItems.map((item) =>
          getOriginalProductKey(item) === key
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        updatedCartItems = state.cartItems.filter(
          (item) => getOriginalProductKey(item) !== key
        );
      }
    } else {
      updatedCartItems = state.cartItems;
    }

    saveToLocalStorage("cartItems", updatedCartItems);
    return { cartItems: updatedCartItems };
  }),


addOneToCart: (prdt) =>
  set((state) => {
    const key = getProductKey(prdt);
    const existingProduct = state.cartItems.find(
      (item) => getProductKey(item) === key
    );  

    const updatedCartItems = existingProduct
      ? state.cartItems.map((item) =>
          getProductKey(item) === key
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...state.cartItems, { ...prdt, quantity: 1 }];

    saveToLocalStorage("cartItems", updatedCartItems);
    return { cartItems: updatedCartItems };
  }),

removeOneFromCart: (key) =>
  set((state) => {
    const existingProduct = state.cartItems.find(
      (item) => getProductKey(item) === key
    );

    let updatedCartItems;
    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        updatedCartItems = state.cartItems.map((item) =>
          getProductKey(item) === key
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        updatedCartItems = state.cartItems.filter(
          (item) => getProductKey(item) !== key
        );
      }
    } else {
      updatedCartItems = state.cartItems;
    }

    saveToLocalStorage("cartItems", updatedCartItems);
    return { cartItems: updatedCartItems };
  }),



  
deleteFromCart: (product) =>
  set((state) => {
    const key = getProductKey(product);

    const updatedCartItems = state.cartItems.filter(
      (item) => getProductKey(item) !== key
    );

    saveToLocalStorage("cartItems", updatedCartItems);
    return { cartItems: updatedCartItems };
  }),

  
    clearCart: () => {
      saveToLocalStorage("cartItems", []); // Clear cart in localStorage
      set({ cartItems: [] });
    },

    calculateTotalPrice: () =>
        get()
            .cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2),














   createCustomer: async (newCustomer) => {
        if(!newCustomer.name || !newCustomer.phone || !newCustomer.email){
            console.log(newCustomer);
            return {success: false, message: "Please fill in all fields."}
        }
        const res = await fetch("/api/customers",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newCustomer)
        })
        const data = res.json();
        // set((state) => ({products: [...state.products, data.data]}));
        return {success: true, message: "Product created successfully", data: data.data};
    },


   createOrder: async (newOrder) => {
   // console.log("request:\n", JSON.stringify(newOrder, null, 2));

        const res = await fetch("/api/orders",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newOrder)
        })
        const data = await res.json();
   //     console.log("response:", data.data);

        return {success: true, message: "Order saved successfully", data: data.data};
    },


            

    products: [],
    setProducts: (products) => set({products}),
    
    createProduct: async (newProduct) => {
        if(!newProduct.category || !newProduct.name || !newProduct.image || !newProduct.price){
        //    console.log(newProduct);
            return {success: false, message: "Please fill in all fields."}
        }
        const res = await fetch("/api/products",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newProduct)
        })
        const data = res.json();
        set((state) => ({products: [...state.products, data.data]}));
        return {success: true, message: "Product created successfully"};
    },

    fetchProducts : async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({products: data.data}); 
    },
    
    deleteProduct: async (pid) => {
        const res = await fetch(`api/products/${pid}`, {
            method: 'DELETE'
        });
        const data = await res.json()
        if(!data.success) return {success: false, message: data.message};
        
        //Update the ui immediately
        set(state => ({products: state.products.filter(product => product._id !== pid)}));
        return {success:true, message: data.message};
    },

    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`api/products/${pid}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if(!data.success) return {success: false, message: data.message};
        
        //Update the ui immediately
        set((state) => ({
            products: state.products.map((product) => (product._id === pid ? data.data : product)),
        }));
        return {success:true, message: data.message};

    },



}));
