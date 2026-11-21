export type ProductCategory = "Fruits" | "Vegetables" | "Dry Fruits" | "Grains";

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
  "Dry Fruits",
  "Grains",
];

export const CATALOG: Product[] = [
  { id: "onions", name: "Onions", category: "Vegetables", unit: "pocket", image: "/images/oranges.png", imageAlt: "Oranges photo used for the Onions listing" },
  { id: "apples", name: "Apples", category: "Fruits", unit: "kg", image: "/images/produce-stand.png", imageAlt: "Apples arranged with fresh produce on a stand" },
  { id: "grapes", name: "Grapes", category: "Fruits", unit: "bag", price: 20, image: "/images/grapes.jpg", imageAlt: "Bags of fresh red and green grapes" },
  { id: "potatoes", name: "Potatoes", category: "Vegetables", unit: "7 kg bag", price: 110, image: "/images/potatoes-7kg.jpg", imageAlt: "Potato sack labeled 7 kg", imageFit: "contain" },
  { id: "potatoes-10kg", name: "Potatoes", category: "Vegetables", unit: "10 kg bag", price: 155, image: "/images/potatoes.png", imageAlt: "Fresh potatoes for the 10 kg bag listing" },
  { id: "cabbage", name: "Cabbage", category: "Vegetables", unit: "head", price: 20, priceMax: 25, image: "/images/produce-stand.png", imageAlt: "Fresh green cabbages displayed on a produce stand" },
  { id: "garlic", name: "Garlic", category: "Vegetables", unit: "bag", price: 10, image: "/images/garlic.png", imageAlt: "Fresh garlic packed for sale" },
  { id: "tomatoes", name: "Tomato crate", category: "Vegetables", unit: "crate", price: 330, image: "/images/tomatoes.jpg", imageAlt: "Fresh tomatoes displayed in produce trays", imageFit: "contain" },
  { id: "carrots", name: "Carrots", category: "Vegetables", unit: "kg", image: "/images/carrots.jpg", imageAlt: "Bagged fresh carrots" },
  { id: "dates", name: "Dates", category: "Dry Fruits", unit: "bag", price: 10, image: "/images/dates.jpg", imageAlt: "Fresh dates packed in clear trays", imageFit: "contain" },
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
