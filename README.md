# Adithya Sreepad — Personal Portfolio | Phase 2

## Project
This is the enhanced Phase 2 version of the same personal website developed in Phase 1. The core personal profile, CV, education, technical expertise, projects, activities/gallery and contact content are retained while JavaScript, DOM manipulation, jQuery and external API integration have been added.

## File Structure
```text
Phase2_Personal_Portfolio/
├── index.html
├── style.css
├── README.md
├── images/
│   └── adithya.jpg
└── js/
    └── script.js
```

## Phase 2 Features

### 1. External JavaScript
Student-written JavaScript is stored in `js/script.js` and linked from `index.html`.

### 2. Dynamic Greeting
The page checks the current hour and displays Good Morning, Good Afternoon or Good Evening using JavaScript conditions and DOM `textContent`.

### 3. DOM Manipulation and Events
The implementation demonstrates:
- `getElementById()`
- `querySelector()` / `querySelectorAll()`
- `.textContent`
- `.innerHTML`
- `.style`
- `.value`
- `addEventListener()`
- `click`, `change`, `mouseover`, `mouseout`, `submit` and `keydown` events
- `let` and `const`
- arrays and objects
- conditions, loops and functions
- arrow functions and template literals

### 4. Contact Form Validation
The contact form validates:
- Name — at least 2 characters
- Email — basic email format
- Message — at least 10 characters

Validation happens on the client side without a page reload. Error messages and input borders are updated through the DOM.

### 5. Interactive jQuery Gallery
The Projects/Activities gallery uses jQuery to select and update the main image, title, description and item counter when thumbnails are clicked.

jQuery is loaded from the official CDN:
`https://code.jquery.com/jquery-3.7.1.min.js`

### 6. DEV Community Articles
The `My Articles` / `Technology Feed` section uses the public DEV/Forem API endpoint:
`https://dev.to/api/articles/latest?per_page=5`

The page retrieves five recent articles with `fetch()`, converts the JSON response into article cards and displays clickable article links. The public endpoint is documented by Forem/DEV. See: https://developers.forem.com/api/v1

### 7. Live Weather
The weather section uses the OpenWeatherMap Current Weather API. It accepts a city name and dynamically displays:
- City and country
- Temperature in Celsius
- Weather description
- Weather icon

The current-weather endpoint supports a city query and `units=metric` for Celsius. See: https://openweathermap.org/api/current

### API Key Safety Note
The OpenWeatherMap API requires an `appid` API key. This project intentionally contains the placeholder:

```js
const OPENWEATHER_API_KEY = "PASTE_YOUR_OPENWEATHERMAP_API_KEY_HERE";
```

Before demonstrating live weather, replace the placeholder with a restricted/demo key suitable for this educational exercise. **Do not use a sensitive production secret in a public GitHub repository.** Client-side JavaScript cannot keep a production secret private; a real production application should make the API request through a protected server-side service.

If the placeholder remains, the website shows a clear configuration message instead of making a failed request.

### 8. Error Handling
The website handles:
- Invalid/empty weather city input
- Weather API authentication errors
- Weather city-not-found errors
- Network/API errors
- DEV feed loading errors
- Invalid contact form data

## Running Locally
Open `index.html` in a browser. Internet access is required for the DEV feed, jQuery CDN and external gallery images. A local web server is recommended for best browser behavior.

For VS Code, the Live Server extension can be used.

## GitHub Pages
Upload the complete project while preserving the folder structure. Enable GitHub Pages from:
**Repository → Settings → Pages → Deploy from branch → main → /(root)**

## Phase 2 Submission Evidence
Take screenshots showing:
1. Dynamic greeting
2. Contact validation error messages
3. Interactive gallery after clicking a thumbnail
4. Five DEV article items
5. Weather lookup/result (after adding a valid restricted API key)
6. Desktop and mobile responsive layouts
7. GitHub repository and deployed GitHub Pages site

## Important
This remains the same personal portfolio from Phase 1. Phase 2 extends it with JavaScript, DOM manipulation, jQuery and external data integration rather than creating a separate website.
