/* ============================================================
 * EXERCISE 10 — Capstone: Type & Build a Shopping Cart
 * ============================================================
 * Pull it all together: interfaces, generics, unions, utility types,
 * narrowing, and typed operations. No `any`. Run typecheck AND test.
 * ============================================================ */

/* ---- 10a. Types ----
 * A CartItem has:
 *   productId: number
 *   name: string
 *   unitPrice: number
 *   quantity: number   (>= 1)
 *
 * A Cart has:
 *   items: CartItem[]
 *   currency: "ZAR" | "USD"   (only these two)
 */

// TODO: define CartItem
export type CartItem = {
  productId: number
  name: string
  unitPrice: number
  quantity: number
};
// TODO: define Cart
export type Cart = {
  items: CartItem[]
  currency: "ZAR" | "USD"
};

/* ---- 10b. Operations (all PURE — never mutate the input cart) ---- */

// addItem: if an item with the same productId exists, increase its
// quantity; otherwise append the new item. Returns a NEW cart.
// TODO
export function addItem(cart: Cart, item: CartItem): Cart {
  // TODO
  // 1. Create a copy of the items array to work with safely
  const updatedItems: CartItem[] = [];
  let foundExisting = false;

  // 2. Look through existing items
  for (const existingItem of cart.items) {
    if (existingItem.productId === item.productId) {
      // If it exists, add a copy with the updated quantity
      updatedItems.push({
        ...existingItem,
        quantity: existingItem.quantity + item.quantity
      });
      foundExisting = true;
    } else {
      // Otherwise, keep the item exactly as it is
      updatedItems.push(existingItem);
    }
  }
  // 3. If we checked every item and never found a match, add the brand new item
  if (!foundExisting) {
    updatedItems.push(item);
  }

  // 4. Return a brand new cart object without mutating the original one
  return {
    ...cart,
    items: updatedItems
  };
}

  // removeItem: return a new cart with the given productId removed.
  // TODO
  export function removeItem(cart: Cart, productId: number): Cart {
    // TODO
    const filteredItems: CartItem[] = [];
    for (const item of cart.items) {
      if (item.productId !== productId) {
        filteredItems.push(item);
      }
    }

    return {
      ...cart,
      items: filteredItems
    };
  }

  // subtotal: sum of unitPrice * quantity across all items.
  // TODO: returns number
  export function subtotal(cart: Cart): number {
    // TODO
    let total = 0;
    for (const item of cart.items) {
      total += item.unitPrice * item.quantity;
    }

    return total;
  }

  // applyDiscount: takes a cart and a discount rate 0..1 and returns the
  // discounted subtotal (subtotal * (1 - rate)). Throw if rate is not in
  // the range 0..1.
  // TODO: returns number
  export function applyDiscount(cart: Cart, rate: number): number {
    // TODO
    if (rate < 0 || rate > 1) {
      throw new Error("Discount rate must be between 0 and 1");
    }
    return subtotal(cart) * (1 - rate);

  }

  /* ---- 10c. Sample data (must satisfy your types) ---- */
  export const cart: Cart = {
    currency: "ZAR",
    items: [
      { productId: 1, name: "Mug", unitPrice: 80, quantity: 2 },
      { productId: 2, name: "Notebook", unitPrice: 45, quantity: 1 },
    ],
  };

  // @ts-expect-error "EUR" is not a supported currency
  export const badCart: Cart = { currency: "EUR", items: [] };
