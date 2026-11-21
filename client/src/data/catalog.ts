export type ProductCategory = "Fruits" | "Vegetables" | "Beans" | "Dry Fruits";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  unit: string;
  emoji: string;
  image?: string;
  imageAlt?: string;
};

export const CATEGORIES: Array<"All" | ProductCategory> = [
  "All",
  "Fruits",
  "Vegetables",
  "Beans",
  "Dry Fruits",
];

export const CATALOG: Product[] = [
  { id: "oranges", name: "Oranges", category: "Fruits", unit: "pocket", emoji: "🍊", image: "/manus-storage/oranges_634434d6.png", imageAlt: "Fresh oranges in red mesh bags" },
  { id: "apples", name: "Apples", category: "Fruits", unit: "kg", emoji: "🍎", image: "/manus-storage/produce-stand_7513b9aa.png", imageAlt: "Fresh apples, cabbage, and potatoes on a produce stand" },
  { id: "bananas", name: "Bananas", category: "Fruits", unit: "bunch", emoji: "🍌" },
  { id: "pineapples", name: "Pineapples", category: "Fruits", unit: "each", emoji: "🍍" },
  { id: "grapes", name: "Grapes", category: "Fruits", unit: "punnet", emoji: "🍇" },
  { id: "potatoes", name: "Potatoes", category: "Vegetables", unit: "pocket", emoji: "🥔", image: "/manus-storage/potatoes_c894c14b.png", imageAlt: "Fresh potatoes selected for quality" },
  { id: "cabbage", name: "Cabbage", category: "Vegetables", unit: "head", emoji: "🥬", image: "/manus-storage/produce-stand_7513b9aa.png", imageAlt: "Fresh green cabbages on the produce stand" },
  { id: "garlic", name: "Garlic", category: "Vegetables", unit: "pack", emoji: "🧄", image: "/manus-storage/garlic_6607c31c.png", imageAlt: "Fresh garlic packed for sale" },
  { id: "onions", name: "Onions", category: "Vegetables", unit: "pocket", emoji: "🧅" },
  { id: "tomatoes", name: "Tomatoes", category: "Vegetables", unit: "kg", emoji: "🍅" },
  { id: "carrots", name: "Carrots", category: "Vegetables", unit: "kg", emoji: "🥕" },
  { id: "peppers", name: "Peppers", category: "Vegetables", unit: "kg", emoji: "🫑" },
  { id: "beans", name: "Dry Beans", category: "Beans", unit: "kg", emoji: "🫘" },
  { id: "dry-fruits", name: "Mixed Dry Fruits", category: "Dry Fruits", unit: "pack", emoji: "🥜" },
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
