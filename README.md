# 🌍 Traveloop – Personalized Travel Planning App

A full-featured React travel planning application with 14 screens, built for the hackathon.

---

## 📋 Features Implemented

| Screen | Route | Description |
|--------|-------|-------------|
| Login / Signup | `/login` | Auth screen with validation |
| Dashboard | `/dashboard` | Home hub with stats & recent trips |
| My Trips | `/trips` | Trip list with cards, search, delete |
| Create Trip | `/create-trip` | Form to create new trips |
| Itinerary Builder | `/itinerary` | Add stops, activities, view timeline |
| City Search | `/city-search` | Browse & filter destinations |
| Activity Search | `/activity-search` | Browse activities by type/cost |
| Budget Breakdown | `/budget` | Pie & bar charts, cost tracking |
| Packing Checklist | `/packing` | Checklist with categories & progress |
| Trip Notes | `/notes` | Journal notes per trip |
| Share Trip | `/share` | Public link & social sharing |
| Profile / Settings | `/profile` | Edit user info & preferences |
| Admin Analytics | `/admin` | Platform stats & top cities |

---

## 🚀 Step-by-Step Setup Guide (VS Code)

### Prerequisites

Make sure you have the following installed:

1. **Node.js (v18 or higher)**
   - Download from: https://nodejs.org/
   - Verify: Open terminal and run `node --version`

2. **npm** (comes with Node.js)
   - Verify: `npm --version`

3. **VS Code**
   - Download from: https://code.visualstudio.com/

---

### Step 1: Extract the ZIP File

1. Right-click the `traveloop.zip` file
2. Select **"Extract All..."** (Windows) or double-click (Mac)
3. Choose a location (e.g., your Desktop or Documents)

---

### Step 2: Open in VS Code

**Option A – Drag & Drop:**
- Drag the `traveloop` folder into VS Code

**Option B – From VS Code menu:**
- Open VS Code
- Go to `File → Open Folder`
- Navigate to and select the `traveloop` folder
- Click **"Select Folder"**

**Option C – From Terminal:**
```bash
cd path/to/traveloop
code .
```

---

### Step 3: Open the Integrated Terminal

In VS Code:
- Press **`Ctrl + `` ` ``** (backtick) on Windows/Linux
- Or press **`Cmd + `` ` ``** on Mac
- Or go to `Terminal → New Terminal`

---

### Step 4: Install Dependencies

In the terminal, run:

```bash
npm install
```

⏳ This will download all required packages (React, React Router, Recharts, Lucide icons, etc.)
This may take 1–3 minutes depending on your internet speed.

You should see a `node_modules` folder appear in the file tree.

---

### Step 5: Start the Development Server

```bash
npm start
```

✅ The app will automatically open in your browser at:
```
http://localhost:3000
```

If it doesn't open automatically, open your browser and go to that URL.

---

### Step 6: Use the App

1. You'll see the **Login screen** — click **"Continue as guest →"** to skip auth
2. You'll land on the **Dashboard** with 2 sample trips pre-loaded
3. Use the **sidebar** to navigate between all features
4. On mobile, use the **hamburger menu** (top-left) to open the sidebar

---

## 📁 Project Structure

```
traveloop/
├── public/
│   └── index.html              # HTML entry point
├── src/
│   ├── context/
│   │   └── AppContext.js       # Global state (trips, cities, activities)
│   ├── components/
│   │   └── Sidebar.js          # Navigation sidebar
│   ├── pages/
│   │   ├── Login.js            # Login/Signup screen
│   │   ├── Dashboard.js        # Home dashboard
│   │   ├── MyTrips.js          # Trip list
│   │   ├── CreateTrip.js       # Create new trip
│   │   ├── Itinerary.js        # Itinerary builder & view
│   │   ├── CitySearch.js       # City explorer
│   │   ├── ActivitySearch.js   # Activity browser
│   │   ├── Budget.js           # Budget & charts
│   │   ├── PackingList.js      # Packing checklist
│   │   └── OtherPages.js       # Notes, Share, Profile, Admin
│   ├── App.js                  # Routes & layout
│   ├── index.js                # React entry point
│   └── index.css               # Global styles & design tokens
└── package.json                # Dependencies
```

---

## 🎨 Design System

- **Colors:** Navy (`#0A1628`) + Gold (`#C9A84C`) + Cream (`#F5F0E8`)
- **Fonts:** Playfair Display (headings) + DM Sans (body)
- **Theme:** Luxury travel editorial aesthetic

---

## 🛠 Troubleshooting

### "npm: command not found"
→ Install Node.js from https://nodejs.org/ and restart your terminal

### "Port 3000 is already in use"
→ The terminal will ask if you want to use another port. Type `Y` and press Enter.

### Blank page or errors
→ Run `npm install` again, then `npm start`

### Slow installation
→ Normal for first time. Wait for it to complete.

---

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `react` | UI framework |
| `react-router-dom` | Client-side routing |
| `recharts` | Budget charts (Pie, Bar) |
| `lucide-react` | Icons throughout the app |
| `date-fns` | Date utilities |

---

## 💡 Tips for Demo

1. **Start at Dashboard** – 2 sample trips are pre-loaded
2. **Click a trip** to go to its Itinerary Builder
3. **Add a stop** using the "+" button in Itinerary view
4. **Check Budget page** to see pie/bar chart breakdowns
5. **Packing List** shows interactive checkboxes with progress bar
6. **Admin page** shows platform analytics

---

*Built for Traveloop Hackathon – React + React Router + Recharts*
