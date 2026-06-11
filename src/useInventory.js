/**
 * useInventory.js
 * Chai Holistic — Live inventory hook
 *
 * Fetches product stock + prices from Supabase and merges them
 * over the static product arrays in chaiholistic417.jsx.
 *
 * USAGE:
 *   import { useInventory } from "./useInventory";
 *
 *   // In ChaiHolistic component, near the top:
 *   const { getProduct, isOutOfStock, getPrice, ready } = useInventory();
 *
 *   // Then when rendering a product card:
 *   const live = getProduct(blend.name);
 *   const price = getPrice(blend.name, blend.price);       // live price or fallback
 *   const outOfStock = isOutOfStock(blend.name);           // true if marked out
 *
 *   // Show out-of-stock state on button:
 *   <button disabled={outOfStock}>
 *     {outOfStock ? "Out of Stock" : "Add to Basket"}
 *   </button>
 *
 *   // Show sale price:
 *   {live?.compare_price && (
 *     <span style={{textDecoration:'line-through',opacity:.5}}>
 *       ${live.compare_price}
 *     </span>
 *   )}
 *   <span>${price}</span>
 */

import { useState, useEffect, useRef } from "react";

const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY  = import.meta.env.VITE_SUPABASE_ANON_KEY;
const CACHE_MS      = 5 * 60 * 1000; // re-fetch every 5 minutes

let _cache     = null;
let _cacheTime = 0;
let _listeners = [];

async function fetchInventory() {
  if (!SUPABASE_URL || !SUPABASE_KEY) return {};
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/products?select=sku,name,price,compare_price,in_stock,stock_qty,emoji`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );
    if (!res.ok) throw new Error(`Inventory fetch failed: ${res.status}`);
    const rows = await res.json();
    // Index by name (lowercase) for fast lookup
    const map = {};
    rows.forEach(r => {
      map[r.name.toLowerCase()] = r;
    });
    return map;
  } catch (e) {
    console.warn("[useInventory] Could not fetch live inventory:", e.message);
    return {};
  }
}

async function getOrFetch() {
  const now = Date.now();
  if (_cache && now - _cacheTime < CACHE_MS) return _cache;
  _cache     = await fetchInventory();
  _cacheTime = now;
  // Notify all mounted hooks
  _listeners.forEach(fn => fn(_cache));
  return _cache;
}

export function useInventory() {
  const [inventory, setInventory] = useState(_cache || {});
  const [ready,     setReady]     = useState(!!_cache);

  useEffect(() => {
    // Register listener
    _listeners.push(setInventory);

    // Fetch if stale
    getOrFetch().then(data => {
      setInventory(data);
      setReady(true);
    });

    // Refresh every 5 minutes while tab is active
    const interval = setInterval(() => {
      _cacheTime = 0; // invalidate cache
      getOrFetch().then(setInventory);
    }, CACHE_MS);

    return () => {
      _listeners = _listeners.filter(fn => fn !== setInventory);
      clearInterval(interval);
    };
  }, []);

  /**
   * Get the live product record by name.
   * Returns null if not in Supabase (falls back gracefully).
   */
  function getProduct(name) {
    return inventory[name?.toLowerCase()] || null;
  }

  /**
   * Get the live price for a product.
   * Falls back to the staticPrice if Supabase is unavailable.
   */
  function getPrice(name, staticPrice) {
    const live = getProduct(name);
    return live ? parseFloat(live.price) : parseFloat(staticPrice);
  }

  /**
   * Returns true if the product is marked out of stock in Supabase.
   * Defaults to false (in stock) if not found — so missing products
   * are always treated as available, never accidentally hidden.
   */
  function isOutOfStock(name) {
    const live = getProduct(name);
    if (!live) return false; // not in Supabase = assume in stock
    return !live.in_stock;
  }

  /**
   * Get compare price (for sale display).
   * Returns null if no sale is active.
   */
  function getComparePrice(name) {
    const live = getProduct(name);
    return live?.compare_price ? parseFloat(live.compare_price) : null;
  }

  /**
   * Returns a display price string, handles sale formatting.
   * e.g. formatPrice("Morning Rise", 17.99)
   *   → { current: "17.99", compare: null, onSale: false }
   *   → { current: "14.99", compare: "17.99", onSale: true }
   */
  function formatPrice(name, staticPrice) {
    const current = getPrice(name, staticPrice);
    const compare = getComparePrice(name);
    return {
      current: current.toFixed(2),
      compare: compare ? compare.toFixed(2) : null,
      onSale:  compare && compare > current,
    };
  }

  return { inventory, ready, getProduct, getPrice, isOutOfStock, getComparePrice, formatPrice };
}

/**
 * Standalone helper — use this outside React components
 * to check a product's stock without the hook.
 * Returns a Promise<boolean>.
 */
export async function checkInStock(productName) {
  const inv = await getOrFetch();
  const p   = inv[productName?.toLowerCase()];
  return !p || p.in_stock; // default true if not found
}
