
# 🌱 Carbon Count - Chrome Extension

**Tagline:**  
**Shopping Meets Sustainability**

---

## 📖 Overview

**Carbon Count** is a Chrome extension that helps users make eco-conscious shopping decisions by estimating the carbon footprint of products on popular e-commerce websites. It displays a breakdown of a product's carbon impact — including manufacturing, transportation, materials, packaging, and disposal — and estimates the number of trees needed to offset the emissions.

## ✨ Features

- 🌎 **Instant Carbon Footprint Estimates** while browsing.
- 🛒 **Supports popular shopping platforms** like Amazon, Walmart, and Target.
- 📊 **Breakdown of carbon sources**: manufacturing, transportation, materials, packaging, and end-of-life disposal.
- 🌳 **Trees Needed**: shows how many mature trees are needed to absorb the estimated carbon emissions.
- 🎯 **User-friendly sidebar** for easy readability.

## 🛠️ Installation

1. Download or clone this repository.
2. Replace `OPENAI_API_KEY` in `sidebar.js` with your own API key, which you can generate at [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys).
3. Open **Google Chrome** and navigate to `chrome://extensions/`.
4. Enable **Developer Mode** (top right corner).
5. Click **"Load unpacked"** and select the `The extenstiom` folder.
6. The Carbon Count extension should now appear in your extensions bar!

## 🗂️ File Structure

| File             | Purpose |
|------------------|---------|
| `manifest.json`  | Extension metadata and permissions. |
| `background.js`  | Handles background tasks and events. |
| `content.js`     | Injects scripts into webpages and listens for product pages. |
| `sidebar.js`     | Controls dynamic sidebar creation and updates. |
| `sidebar.html`   | Markup for the sidebar UI. |
| `styles.css`     | Styling for the sidebar interface. |
| `icon48.png`     | Extension icon. |

## ⚙️ How It Works

- When you visit a supported shopping site, **Carbon Count** automatically displays a sidebar.
- The sidebar estimates the **carbon footprint** of the selected product.
- A table provides a clear breakdown of emissions by category.
- It also shows how many **mature trees** would be needed to absorb the carbon footprint.

## 🚀 Future Improvements

- Extend support to additional e-commerce websites.
- Allow users to input a custom shipping destination.
- Provide eco-friendly product recommendations.

## 📜 License

This project is open-source and free to use.  
