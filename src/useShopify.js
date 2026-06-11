/**
 * useShopify.js
 * Chai Holistic — Shopify Storefront API Integration
 *
 * Keeps customers on chaiholistic.com the entire time.
 * Shopify handles cart creation, line items, and checkout
 * entirely in the background via the Storefront API.
 *
 * ─── SETUP (3 steps, 5 minutes) ──────────────────────────
 *
 * STEP 1 — Get your Storefront API token:
 *   Shopify Admin → Apps → Develop apps → Create an app
 *   → API credentials → Configure Storefront API scopes
 *   → Enable: unauthenticated_read_product_listings,
 *              unauthenticated_write_checkouts,
 *              unauthenticated_read_checkouts
 *   → Install app → Copy "Storefront API access token"
 *
 * STEP 2 — Add to your Netlify environment variables:
 *   VITE_SHOPIFY_DOMAIN=chai-holistic.myshopify.com
 *   VITE_SHOPIFY_TOKEN=your_storefront_token_here
 *
 * STEP 3 — Map your products (after uploading the CSV):
 *   In Shopify Admin → Products, click any product →
 *   copy the ID from the URL (e.g. /products/12345678)
 *   Paste into PRODUCT_MAP below, or use the admin tool
 *   which has a Shopify ID column in Settings.
 *
 * ─── HOW IT WORKS ────────────────────────────────────────
 *
 * When a customer clicks "Add to Basket":
 *   1. useShopify creates a Shopify cart (first item only)
 *   2. Subsequent items are added to the same cart
 *   3. When they click "Checkout", they go to Shopify's
 *      hosted checkout (secure, handles payment + tax)
 *   4. After purchase, Shopify sends order confirmation
 *      and handles fulfillment notifications
 *
 * ─────────────────────────────────────────────────────────
 */

// ── YOUR SHOPIFY CREDENTIALS ──────────────────────────────
// Fill these in after Shopify setup, or set as env variables
const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN || 'YOUR-STORE.myshopify.com';
const SHOPIFY_TOKEN  = import.meta.env.VITE_SHOPIFY_TOKEN  || 'YOUR_STOREFRONT_API_TOKEN';
const STOREFRONT_URL = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;

// ── PRODUCT VARIANT MAP ───────────────────────────────────
// Maps your product names to Shopify variant GIDs.
// Format: "Product Name": "gid://shopify/ProductVariant/VARIANT_ID"
//
// After uploading your CSV to Shopify:
//   1. Go to Shopify Admin → Products
//   2. Click any product → scroll to Variants
//   3. Click the variant → copy the ID from the URL
//   4. Format it as: gid://shopify/ProductVariant/1234567890
//
// You can also get all IDs at once via:
//   Shopify Admin → Apps → your app → Storefront API → 
//   run the products query below in GraphiQL explorer.
//
export const PRODUCT_MAP = {
  // ── Teas ──────────────────────────────────────────────
  "Morning Rise":                       "gid://shopify/ProductVariant/FILL_IN",
  "Grandmother's Cerasee":              "gid://shopify/ProductVariant/FILL_IN",
  "Cerasee & Ginger Blend":             "gid://shopify/ProductVariant/FILL_IN",
  "Cerasee Blood Cleanse":              "gid://shopify/ProductVariant/FILL_IN",
  "2AM Reset":                          "gid://shopify/ProductVariant/FILL_IN",
  "Immunity Shield":                    "gid://shopify/ProductVariant/FILL_IN",
  "Golden Healer":                      "gid://shopify/ProductVariant/FILL_IN",
  "Liver & Love":                       "gid://shopify/ProductVariant/FILL_IN",
  "Deep Liver Cleanse":                 "gid://shopify/ProductVariant/FILL_IN",
  "Full Body Detox":                    "gid://shopify/ProductVariant/FILL_IN",
  "Blood Purifier":                     "gid://shopify/ProductVariant/FILL_IN",
  "Kidney Flush":                       "gid://shopify/ProductVariant/FILL_IN",
  "Kidney Stone Support":               "gid://shopify/ProductVariant/FILL_IN",
  "Urinary Tract Clear":                "gid://shopify/ProductVariant/FILL_IN",
  "Night Flow Reset":                   "gid://shopify/ProductVariant/FILL_IN",
  "Dream Catcher":                      "gid://shopify/ProductVariant/FILL_IN",
  "Calm Within":                        "gid://shopify/ProductVariant/FILL_IN",
  "Heart Opener":                       "gid://shopify/ProductVariant/FILL_IN",
  "Stress Armor":                       "gid://shopify/ProductVariant/FILL_IN",
  "Gut & Glow":                         "gid://shopify/ProductVariant/FILL_IN",
  "Gut Reset":                          "gid://shopify/ProductVariant/FILL_IN",
  "Lymph Mover":                        "gid://shopify/ProductVariant/FILL_IN",
  "Blood Builder":                      "gid://shopify/ProductVariant/FILL_IN",
  "Sacred Womb":                        "gid://shopify/ProductVariant/FILL_IN",
  "Fertility Bloom":                    "gid://shopify/ProductVariant/FILL_IN",
  "PSA Defense Blend":                  "gid://shopify/ProductVariant/FILL_IN",
  "Testosterone & Prostate Balance":    "gid://shopify/ProductVariant/FILL_IN",
  "Post-50 Men's Foundation":           "gid://shopify/ProductVariant/FILL_IN",
  "Skin Deep":                          "gid://shopify/ProductVariant/FILL_IN",
  "Liver Bile Flow":                    "gid://shopify/ProductVariant/FILL_IN",
  "Ancestral Fire":                     "gid://shopify/ProductVariant/FILL_IN",
  "Ancestral Grounding Blend":          "gid://shopify/ProductVariant/FILL_IN",
  "Stardust Pineal Activation":         "gid://shopify/ProductVariant/FILL_IN",
  // ── Men's Teas ────────────────────────────────────────
  "Iron Will Morning":                  "gid://shopify/ProductVariant/FILL_IN",
  "Deep Recharge Sleep":                "gid://shopify/ProductVariant/FILL_IN",
  "Alpha Brain Focus":                  "gid://shopify/ProductVariant/FILL_IN",
  "Prostate Defense":                   "gid://shopify/ProductVariant/FILL_IN",
  "Testosterone Boost":                 "gid://shopify/ProductVariant/FILL_IN",
  "Blood Flow Max":                     "gid://shopify/ProductVariant/FILL_IN",
  "Ancestral Strength":                 "gid://shopify/ProductVariant/FILL_IN",
  "Gut Repair Men's":                   "gid://shopify/ProductVariant/FILL_IN",
  "Cortisol Defense":                   "gid://shopify/ProductVariant/FILL_IN",
  "Kidney Shield":                      "gid://shopify/ProductVariant/FILL_IN",
  "Metabolism Fire":                    "gid://shopify/ProductVariant/FILL_IN",
  "Heart Warrior":                      "gid://shopify/ProductVariant/FILL_IN",
  "Libido Prime":                       "gid://shopify/ProductVariant/FILL_IN",
  "Joint Recovery":                     "gid://shopify/ProductVariant/FILL_IN",
  "Immune Fortify":                     "gid://shopify/ProductVariant/FILL_IN",
  "Liver Cleanse Men's":                "gid://shopify/ProductVariant/FILL_IN",
  "Mindfulness Tea":                    "gid://shopify/ProductVariant/FILL_IN",
  "Longevity Formula":                  "gid://shopify/ProductVariant/FILL_IN",
  "Muscle Recovery":                    "gid://shopify/ProductVariant/FILL_IN",
  "Morning Power Blend":                "gid://shopify/ProductVariant/FILL_IN",
  // ── Rings ─────────────────────────────────────────────
  "The Spiral":                         "gid://shopify/ProductVariant/FILL_IN",
  "The Sage":                           "gid://shopify/ProductVariant/FILL_IN",
  "The Anchor":                         "gid://shopify/ProductVariant/FILL_IN",
  "The Ritual":                         "gid://shopify/ProductVariant/FILL_IN",
  "The Guardian":                       "gid://shopify/ProductVariant/FILL_IN",
  "The Visionary":                      "gid://shopify/ProductVariant/FILL_IN",
  // ── Bundles ───────────────────────────────────────────
  "The Cleanse Bundle":                 "gid://shopify/ProductVariant/FILL_IN",
  "Morning & Evening Ritual":           "gid://shopify/ProductVariant/FILL_IN",
  "Blend-Your-Own Starter":             "gid://shopify/ProductVariant/FILL_IN",
  "Gift Set Supreme":                   "gid://shopify/ProductVariant/FILL_IN",
  "Sea Moss Gel Kit":                   "gid://shopify/ProductVariant/FILL_IN",
  "Ring + Tea Starter Set":             "gid://shopify/ProductVariant/FILL_IN",
  // ── Brew Tools ────────────────────────────────────────
  "Carved Wood Cup":                    "gid://shopify/ProductVariant/FILL_IN",
  "Matte Ceramic Cup":                  "gid://shopify/ProductVariant/FILL_IN",
  "Double-Wall Glass Cup":              "gid://shopify/ProductVariant/FILL_IN",
  "Bamboo Infuser Set":                 "gid://shopify/ProductVariant/FILL_IN",
  "Ritual Kettle":                      "gid://shopify/ProductVariant/FILL_IN",
  "Measuring Spoon & Storage Jar Set":  "gid://shopify/ProductVariant/FILL_IN",
};

// ── GRAPHQL QUERIES ───────────────────────────────────────
const CREATE_CART = `
  mutation cartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price { amount currencyCode }
                  product { title }
                }
              }
            }
          }
        }
        cost {
          totalAmount { amount currencyCode }
          subtotalAmount { amount currencyCode }
        }
      }
      userErrors { field message }
    }
  }
`;

const ADD_TO_CART = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price { amount currencyCode }
                  product { title }
                }
              }
            }
          }
        }
        cost {
          totalAmount { amount currencyCode }
        }
      }
      userErrors { field message }
    }
  }
`;

const REMOVE_FROM_CART = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price { amount currencyCode }
                  product { title }
                }
              }
            }
          }
        }
        cost {
          totalAmount { amount currencyCode }
        }
      }
    }
  }
`;

const UPDATE_CART_LINE = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 50) {
          edges {
            node {
              id
              quantity
            }
          }
        }
        cost {
          totalAmount { amount currencyCode }
        }
      }
    }
  }
`;

// ── SHOPIFY IS CONFIGURED CHECK ───────────────────────────
export function shopifyIsConfigured() {
  return (
    SHOPIFY_DOMAIN !== 'YOUR-STORE.myshopify.com' &&
    SHOPIFY_TOKEN  !== 'YOUR_STOREFRONT_API_TOKEN' &&
    SHOPIFY_DOMAIN.includes('.myshopify.com')
  );
}

// ── STOREFRONT API FETCH ──────────────────────────────────
async function storefrontFetch(query, variables = {}) {
  const res = await fetch(STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Shopify API error: ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}

// ── CART STATE (module-level singleton) ───────────────────
// Shared across all hook instances so cart persists during session
let _cartId       = null;
let _checkoutUrl  = null;
let _cartLines    = [];
let _cartTotal    = '0.00';
let _listeners    = [];

function notifyListeners() {
  _listeners.forEach(fn => fn({
    cartId: _cartId,
    checkoutUrl: _checkoutUrl,
    lines: _cartLines,
    total: _cartTotal,
  }));
}

function parseCart(cart) {
  _cartId      = cart.id;
  _checkoutUrl = cart.checkoutUrl;
  _cartLines   = cart.lines.edges.map(e => ({
    lineId:    e.node.id,
    variantId: e.node.merchandise.id,
    title:     e.node.merchandise.product.title,
    variant:   e.node.merchandise.title,
    price:     parseFloat(e.node.merchandise.price.amount),
    quantity:  e.node.quantity,
  }));
  _cartTotal = cart.cost?.totalAmount?.amount || '0.00';
  notifyListeners();
}

// ── GET VARIANT ID FOR A PRODUCT ──────────────────────────
function getVariantId(productName) {
  const id = PRODUCT_MAP[productName];
  if (!id || id.includes('FILL_IN')) {
    console.warn(`[useShopify] No variant ID mapped for: "${productName}"`);
    return null;
  }
  return id;
}

// ── MAIN HOOK ─────────────────────────────────────────────
import { useState, useEffect } from 'react';

export function useShopify() {
  const [state, setState] = useState({
    cartId:      _cartId,
    checkoutUrl: _checkoutUrl,
    lines:       _cartLines,
    total:       _cartTotal,
  });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);
  const configured = shopifyIsConfigured();

  useEffect(() => {
    _listeners.push(setState);
    return () => { _listeners = _listeners.filter(fn => fn !== setState); };
  }, []);

  /**
   * Add a product to the Shopify cart.
   * Accepts the same item object your existing addToCart uses:
   * { name, price, emoji, ... }
   *
   * Returns true on success, false on failure.
   */
  async function addToShopifyCart(item, qty = 1) {
    if (!configured) {
      console.info('[useShopify] Not configured yet — using local cart fallback');
      return false; // caller falls back to local cart
    }

    const variantId = getVariantId(item.name);
    if (!variantId) return false;

    setLoading(true);
    setError(null);

    try {
      const line = { merchandiseId: variantId, quantity: qty };

      if (!_cartId) {
        // Create a new cart
        const data = await storefrontFetch(CREATE_CART, { lines: [line] });
        parseCart(data.cartCreate.cart);
      } else {
        // Add to existing cart
        const data = await storefrontFetch(ADD_TO_CART, {
          cartId: _cartId,
          lines:  [line],
        });
        parseCart(data.cartLinesAdd.cart);
      }
      return true;
    } catch (e) {
      console.error('[useShopify] addToCart failed:', e);
      setError(e.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  /**
   * Remove a line item from the Shopify cart.
   * Pass the lineId from state.lines[n].lineId
   */
  async function removeFromShopifyCart(lineId) {
    if (!_cartId || !configured) return;
    setLoading(true);
    try {
      const data = await storefrontFetch(REMOVE_FROM_CART, {
        cartId:  _cartId,
        lineIds: [lineId],
      });
      parseCart(data.cartLinesRemove.cart);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Update quantity of a line item.
   */
  async function updateQuantity(lineId, quantity) {
    if (!_cartId || !configured) return;
    if (quantity <= 0) { await removeFromShopifyCart(lineId); return; }
    setLoading(true);
    try {
      const data = await storefrontFetch(UPDATE_CART_LINE, {
        cartId: _cartId,
        lines:  [{ id: lineId, quantity }],
      });
      parseCart(data.cartLinesUpdate.cart);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Redirect to Shopify checkout.
   * Customer leaves chaiholistic.com temporarily for payment,
   * then returns to your confirmation page.
   */
  function goToCheckout() {
    if (_checkoutUrl) {
      window.location.href = _checkoutUrl;
    } else {
      setError('No checkout URL available. Please add items to your basket first.');
    }
  }

  /**
   * Count of all items in the Shopify cart.
   */
  const itemCount = state.lines.reduce((sum, l) => sum + l.quantity, 0);

  return {
    // State
    configured,
    loading,
    error,
    cartId:      state.cartId,
    checkoutUrl: state.checkoutUrl,
    lines:       state.lines,
    total:       parseFloat(state.total || 0),
    itemCount,
    // Actions
    addToShopifyCart,
    removeFromShopifyCart,
    updateQuantity,
    goToCheckout,
  };
}

/**
 * GraphQL query to fetch ALL your product variant IDs at once.
 * Run this in Shopify's GraphiQL explorer after uploading your CSV.
 * Copy the output and paste into PRODUCT_MAP above.
 *
 * Query to use in GraphiQL:
 * ─────────────────────────────────────────────────────────
 * {
 *   products(first: 100) {
 *     edges {
 *       node {
 *         title
 *         variants(first: 1) {
 *           edges {
 *             node {
 *               id
 *               title
 *             }
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 * ─────────────────────────────────────────────────────────
 */
export const GRAPHQL_HELPER_QUERY = `
{
  products(first: 100) {
    edges {
      node {
        title
        variants(first: 1) {
          edges {
            node {
              id
              title
            }
          }
        }
      }
    }
  }
}
`;
