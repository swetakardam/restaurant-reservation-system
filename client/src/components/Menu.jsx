import { useState } from "react";
import "../styles/Menu.css";

const CURRY_IMG = "https://images.unsplash.com/photo-1742599361539-f096753d1100?w=600&q=80&auto=format&fit=crop";
const BIRYANI_IMG = "https://images.unsplash.com/photo-1566749249285-1798d7a0e470?w=600&q=80&auto=format&fit=crop";
const DESSERT_IMG = "https://images.unsplash.com/photo-1593701461250-d7b22dfd3a77?w=600&q=80&auto=format&fit=crop";
const KEBAB_IMG = "https://images.unsplash.com/photo-1767974968707-db3d448d4ef3?w=600&q=80&auto=format&fit=crop";
const CAULIFLOWER_IMG = "https://images.unsplash.com/photo-1683543124241-e6bfe8a47781?w=600&q=80&auto=format&fit=crop";
const PANEER_IMG = "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80&auto=format&fit=crop";
const SAMOSA_IMG = "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80&auto=format&fit=crop";
const LAMB_IMG = "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=80&auto=format&fit=crop";

const MENU_DATA = {
  Starters: [
    { name: "Tandoori Cauliflower", price: "$14", desc: "Charred florets, mint chutney, pomegranate", img: CAULIFLOWER_IMG },
    { name: "Lamb Seekh Kebab", price: "$18", desc: "Ground lamb, warm spices, charred onion", img: LAMB_IMG },
    { name: "Crispy Okra Chaat", price: "$12", desc: "Tamarind, yogurt, sev, fresh herbs", img: PANEER_IMG },
    { name: "Chili Garlic Prawns", price: "$19", desc: "Wok-tossed prawns, curry leaf, chili oil", img: CURRY_IMG },
    { name: "Paneer Tikka Skewers", price: "$15", desc: "Marinated paneer, bell pepper, mint", img: KEBAB_IMG },
    { name: "Samosa Trio", price: "$13", desc: "Potato, lamb keema, and pea samosas", img: SAMOSA_IMG },
  ],
  Mains: [
    { name: "Butter Chicken", price: "$24", desc: "Tomato-cream gravy, charcoal-roasted chicken", img: CURRY_IMG },
    { name: "Lamb Rogan Josh", price: "$27", desc: "Kashmiri chili, slow-braised lamb shoulder", img: KEBAB_IMG },
    { name: "Dal Makhani", price: "$18", desc: "Black lentils, butter, smoked overnight", img: PANEER_IMG },
    { name: "Goan Fish Curry", price: "$26", desc: "Coconut, kokum, catch of the day", img: CURRY_IMG },
    { name: "Vegetable Biryani", price: "$20", desc: "Saffron rice, charred vegetables, raita", img: BIRYANI_IMG },
    { name: "Chicken Tikka Masala", price: "$23", desc: "Smoked chicken, roasted pepper gravy", img: PANEER_IMG },
  ],
  Desserts: [
    { name: "Gulab Jamun", price: "$9", desc: "Cardamom syrup, pistachio, rosewater", img: DESSERT_IMG },
    { name: "Saffron Kulfi", price: "$10", desc: "Pistachio, cardamom, house-churned", img: DESSERT_IMG },
    { name: "Gajar Halwa", price: "$9", desc: "Carrot, milk, ghee, toasted nuts", img: DESSERT_IMG },
  ],
};

function Menu() {
  const [activeTab, setActiveTab] = useState("Starters");
  return (
    <section className="menu-section" id="menu">
      <h2 className="menu-heading">Our Menu</h2>
      <p className="menu-subheading">Crafted with heritage spices and modern technique</p>
       <div className="menu-tabs">
        
        {Object.keys(MENU_DATA).map((tab) => (
          <button key={tab}
            className={`menu-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {MENU_DATA[activeTab].map((dish) => (
          <div className="menu-card" key={dish.name}>
            <img src={dish.img} alt={dish.name} className="menu-card-photo" />
            <div className="menu-card-body">
              <div className="menu-card-top">
                <h3>{dish.name}</h3>
                <span className="menu-price">{dish.price}</span>
              </div>
              <p>{dish.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Menu;