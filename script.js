// Phase 2 JavaScript: DOM, events, validation, jQuery gallery and REST APIs

const OPENWEATHER_API_KEY = "ae7d35ce103b424564c51fc5f3ea3e67";

// ---------- Dynamic greeting + DOM access ----------
const greetingElement = document.getElementById("greeting");
const profileStatus = document.querySelector("#profileStatus");
const currentHour = new Date().getHours();
let greeting = "Good Evening";

if (currentHour < 12) {
  greeting = "Good Morning";
} else if (currentHour < 17) {
  greeting = "Good Afternoon";
}

greetingElement.textContent = `${greeting}, welcome to my portfolio!`;
profileStatus.style.fontWeight = "600";
profileStatus.textContent = "Phase 2 JavaScript features are active.";

// ---------- Event listeners ----------
const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach((link) => {
  link.addEventListener("mouseover", () => {
    link.style.textDecoration = "underline";
  });
  link.addEventListener("mouseout", () => {
    link.style.textDecoration = "none";
  });
});

const subjectSelect = document.getElementById("subject");
subjectSelect.addEventListener("change", (event) => {
  const formMessage = document.getElementById("formMessage");
  formMessage.textContent = `Selected contact topic: ${event.target.value}`;
});

// ---------- Form validation ----------
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const clearErrors = () => {
  ["nameError", "emailError", "messageError"].forEach((id) => {
    document.getElementById(id).textContent = "";
  });
  document.querySelectorAll("#contactForm input, #contactForm textarea").forEach((field) => {
    field.style.borderColor = "";
  });
};

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearErrors();

  // .value is deliberately used here for DOM form access.
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  let isValid = true;

  if (name.length < 2) {
    document.getElementById("nameError").textContent = "Please enter your name.";
    nameInput.style.borderColor = "#dc2626";
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    document.getElementById("emailError").textContent = "Please enter a valid email address.";
    emailInput.style.borderColor = "#dc2626";
    isValid = false;
  }

  if (message.length < 10) {
    document.getElementById("messageError").textContent = "Message must contain at least 10 characters.";
    messageInput.style.borderColor = "#dc2626";
    isValid = false;
  }

  const formMessage = document.getElementById("formMessage");
  if (isValid) {
    formMessage.textContent = `Thanks, ${name}! Your message passed client-side validation.`;
    formMessage.style.color = "#15803d";
    contactForm.reset();
  } else {
    formMessage.textContent = "Please correct the highlighted fields.";
    formMessage.style.color = "#dc2626";
  }
});

// ---------- Interactive jQuery gallery ----------
const galleryItems = [
  {
    title: "AI Cricket Match Prediction",
    description: "An AI-based project using historical cricket match data to predict outcomes and analyze performance factors.",
    image: "images/adithya.jpg"
  },
  {
    title: "Data Analysis Project",
    description: "A beginner-friendly project involving data preprocessing, visualization and machine learning.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Hospital Database",
    description: "A database design for managing patients, doctors, appointments and treatments using SQL.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Team Collaboration",
    description: "Collaborative academic work focused on sharing ideas, dividing tasks and completing technical activities.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Programming & Learning",
    description: "Continuous practice with programming, web development and new technologies.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Creative Interests",
    description: "Activities outside the classroom that support creativity, observation and a balanced learning experience.",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80"
  }
];

const updateGallery = (index) => {
  const item = galleryItems[index];
  $("#galleryMainImage").attr("src", item.image).attr("alt", item.title);
  $("#galleryTitle").text(item.title);
  $("#galleryDescription").text(item.description);
  $("#galleryCounter").text(`Item ${index + 1} of ${galleryItems.length}`);
  $(".gallery-thumb-button").removeClass("active");
  $(`.gallery-thumb-button[data-gallery-index="${index}"]`).addClass("active");
};

$(".gallery-thumb-button, .gallery-thumb").on("click", function () {
  const index = Number($(this).data("gallery-index"));
  updateGallery(index);
});

// ---------- DEV.to feed using fetch() ----------
const articlesList = document.getElementById("articlesList");
const articlesStatus = document.getElementById("articlesStatus");

const loadArticles = async () => {
  try {
    const response = await fetch("https://dev.to/api/articles/latest?per_page=5");
    if (!response.ok) throw new Error(`Articles API returned ${response.status}`);

    const articles = await response.json();
    const fiveArticles = articles.slice(0, 5);
    articlesList.innerHTML = fiveArticles.map((article, index) => `
      <a class="article-card card" href="${article.url}" target="_blank" rel="noopener">
        <span class="project-number">0${index + 1}</span>
        <h3>${article.title}</h3>
        <p>${article.description || "Technology article from the DEV Community."}</p>
        <span class="article-link">Read on DEV →</span>
      </a>
    `).join("");
    articlesStatus.textContent = `Loaded ${fiveArticles.length} recent technology articles from DEV Community.`;
  } catch (error) {
    articlesStatus.textContent = "The DEV feed could not be loaded right now. Check your internet connection or try again later.";
    articlesStatus.style.color = "#b45309";
    console.error(error);
  }
};

loadArticles();

// ---------- OpenWeatherMap current weather ----------
const cityInput = document.getElementById("cityInput");
const weatherButton = document.getElementById("weatherButton");
const weatherMessage = document.getElementById("weatherMessage");
const weatherCity = document.getElementById("weatherCity");
const weatherTemp = document.getElementById("weatherTemp");
const weatherDescription = document.getElementById("weatherDescription");
const weatherIcon = document.getElementById("weatherIcon");

const getWeather = async () => {
  const city = cityInput.value.trim();

  if (!city) {
    weatherMessage.textContent = "Please enter a city name.";
    weatherMessage.style.color = "#dc2626";
    return;
  }

  if (OPENWEATHER_API_KEY.includes("PASTE_YOUR")) {
    weatherMessage.textContent = "Add your OpenWeatherMap API key in js/script.js to enable live weather.";
    weatherMessage.style.color = "#b45309";
    return;
  }

  weatherMessage.textContent = "Loading weather...";
  weatherMessage.style.color = "#2563eb";

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${OPENWEATHER_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) throw new Error("City not found. Please check the spelling.");
      if (response.status === 401) throw new Error("Weather API key is invalid or not activated yet.");
      throw new Error("Unable to retrieve weather data.");
    }

    const data = await response.json();
    const weather = data.weather[0];

    weatherCity.textContent = `${data.name}, ${data.sys.country}`;
    weatherTemp.textContent = `${Math.round(data.main.temp)} °C`;
    weatherDescription.textContent = weather.description;
    weatherIcon.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
    weatherIcon.alt = weather.description;
    weatherIcon.hidden = false;
    weatherMessage.textContent = "Weather updated successfully.";
    weatherMessage.style.color = "#15803d";
  } catch (error) {
    weatherCity.textContent = "Weather unavailable";
    weatherTemp.textContent = "-- °C";
    weatherDescription.textContent = error.message;
    weatherIcon.hidden = true;
    weatherMessage.textContent = "Could not update weather.";
    weatherMessage.style.color = "#dc2626";
    console.error(error);
  }
};

weatherButton.addEventListener("click", getWeather);
cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") getWeather();
});
