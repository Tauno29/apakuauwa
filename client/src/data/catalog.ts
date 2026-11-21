export type ProductCategory = "Fruits" | "Vegetables" | "Beans" | "Dry Fruits" | "Grains";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  unit: string;
  price?: number;
  priceMax?: number;
  image?: string;
  imageAlt?: string;
  imageFit?: "cover" | "contain";
};

export const CATEGORIES: Array<"All" | ProductCategory> = [
  "All",
  "Fruits",
  "Vegetables",
  "Beans",
  "Dry Fruits",
  "Grains",
];

export const CATALOG: Product[] = [
  { id: "oranges", name: "Oranges", category: "Fruits", unit: "pocket", image: "/manus-storage/oranges_634434d6.png", imageAlt: "Fresh oranges in red mesh bags" },
  { id: "apples", name: "Apples", category: "Fruits", unit: "kg", image: "/manus-storage/produce-stand_7513b9aa.png", imageAlt: "Apples arranged with fresh produce on a stand" },
  { id: "bananas", name: "Bananas", category: "Fruits", unit: "bunch" },
  { id: "pineapples", name: "Pineapples", category: "Fruits", unit: "each" },
  { id: "grapes", name: "Grapes", category: "Fruits", unit: "bag", price: 20, image: "/manus-storage/grapes_37500ee3.jpg", imageAlt: "Bags of fresh red and green grapes" },
  { id: "potatoes", name: "Potatoes", category: "Vegetables", unit: "7 kg bag", price: 110, image: "/manus-storage/potatoes-7kg_e228c75d.jpg", imageAlt: "Potato sack labeled 7 kg", imageFit: "contain" },
  { id: "potatoes-10kg", name: "Potatoes", category: "Vegetables", unit: "10 kg bag", price: 155, image: "/manus-storage/potatoes_c894c14b.png", imageAlt: "Fresh potatoes for the 10 kg bag listing" },
  { id: "cabbage", name: "Cabbage", category: "Vegetables", unit: "head", price: 20, priceMax: 25, image: "/manus-storage/produce-stand_7513b9aa.png", imageAlt: "Fresh green cabbages displayed on a produce stand" },
  { id: "garlic", name: "Garlic", category: "Vegetables", unit: "bag", price: 10, image: "/manus-storage/garlic_6607c31c.png", imageAlt: "Fresh garlic packed for sale" },
  { id: "onions", name: "Onions", category: "Vegetables", unit: "pocket" },
  { id: "tomatoes", name: "Tomato crate", category: "Vegetables", unit: "crate", price: 330, image: "/manus-storage/tomatoes_36fa101f.jpg", imageAlt: "Fresh tomatoes displayed in produce trays", imageFit: "contain" },
  { id: "carrots", name: "Carrots", category: "Vegetables", unit: "kg", image: "/manus-storage/carrots_664513cc.jpg", imageAlt: "Bagged fresh carrots" },
  { id: "peppers", name: "Peppers", category: "Vegetables", unit: "kg" },
  { id: "beans", name: "Dry Beans", category: "Beans", unit: "kg" },
  { id: "dry-fruits", name: "Mixed Dry Fruits", category: "Dry Fruits", unit: "pack" },
  { id: "dates", name: "Dates", category: "Dry Fruits", unit: "bag", price: 10, image: "/manus-storage/dates_9cd27fe8.jpg", imageAlt: "Fresh dates packed in clear trays", imageFit: "contain" },
  { id: "maize", name: "Maize", category: "Grains", unit: "50 kg bag", price: 350 },
];

export const BUSINESS = {
  name: "Apaku Awua Investments CC",
  shortName: "Apaku Awua",
  phone: "0814307010",
  phoneE164: "+264814307010",
  phoneDigits: "264814307010",
  alternatePhone: "0814306048",
  alternatePhoneE164: "+264814306048",
  tagline: "Fresh, Healthy, Quality",
  hours: [
    { day: "Monday – Friday", time: "08:00 – 17:00" },
    { day: "Saturday", time: "08:30 – 13:30" },
    { day: "Sunday", time: "Closed" },
  ],
};
