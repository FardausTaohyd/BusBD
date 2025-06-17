document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle")
  const body = document.body

  themeToggle.addEventListener("click", () => {
    if (body.classList.contains("light-theme")) {
      body.classList.remove("light-theme")
      body.classList.add("dark-theme")
      localStorage.setItem("theme", "dark")
    } else {
      body.classList.remove("dark-theme")
      body.classList.add("light-theme")
      localStorage.setItem("theme", "light")
    }
  })

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    body.classList.remove("light-theme")
    body.classList.add("dark-theme")
  } else {
    body.classList.add("light-theme")
  }

  // Profile Menu Toggle
  const profileButton = document.querySelector(".profile-button")
  const profileMenu = document.getElementById("profile-menu")

  profileButton.addEventListener("click", () => {
    profileMenu.classList.toggle("active")
  })

  // Close profile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (!profileButton.contains(event.target) && !profileMenu.contains(event.target)) {
      profileMenu.classList.remove("active")
    }
  })

  // Initialize Map
const map = L.map("map").setView([23.8103, 90.4125], 13) // Dhaka, Bangladesh coordinates

const lightTiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
})

lightTiles.addTo(map)

  // Use different map tiles based on theme
  // const lightTiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  // })

  // const darkTiles = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
  //   attribution:
  //     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  // })

  // if (body.classList.contains("dark-theme")) {
  //   darkTiles.addTo(map)
  // } else {
  //   lightTiles.addTo(map)
  // }

  // // Update map tiles when theme changes
  // themeToggle.addEventListener("click", () => {
  //   map.removeLayer(body.classList.contains("dark-theme") ? lightTiles : darkTiles)
  //   map.addLayer(body.classList.contains("dark-theme") ? darkTiles : lightTiles)
  // })

  lightTiles.addTo(map)

  // Add bus markers to the map
  const busIcon = L.divIcon({
    className: "bus-marker",
    html: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1a73e8" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="8" width="20" height="12" rx="2" ry="2"></rect><path d="M6 8v-2c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v2"></path><path d="M2 12h20"></path></svg>',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })

  // Sample bus data
  const buses = [
    { id: 1, number: "2574", route: "Mirpur 10 - Motijheel", lat: 23.8103, lng: 90.4125 },
    { id: 2, number: "6A", route: "Uttara - Azimpur", lat: 23.8203, lng: 90.4225 },
    { id: 3, number: "7C", route: "Mohammadpur - Airport", lat: 23.8003, lng: 90.4025 },
  ]

  // Add markers for each bus
  buses.forEach((bus) => {
    const marker = L.marker([bus.lat, bus.lng], { icon: busIcon }).addTo(map)
    marker.bindPopup(`<b>Bus #${bus.number}</b><br>${bus.route}`)
  })

  // Fare calculator slider
  const fareSlider = document.getElementById("fare-slider")
  const fareDistance = document.querySelector(".fare-distance span:last-child")
  const fareAmount = document.querySelector(".fare-amount span:last-child")

  fareSlider.addEventListener("input", function () {
    const distance = Number.parseFloat(this.value)
    const fare = Math.round(distance * 4.5 + 2) // Simple fare calculation formula

    fareDistance.textContent = `${distance.toFixed(1)} km`
    fareAmount.textContent = `৳${fare}`
  })

  // Bottom navigation
  const navItems = document.querySelectorAll(".nav-item")

  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      navItems.forEach((nav) => nav.classList.remove("active"))
      this.classList.add("active")
    })
  })

  // SOS Button
  const sosButton = document.querySelector(".sos-button")

  sosButton.addEventListener("click", () => {
    alert("Emergency services have been notified. Stay calm, help is on the way.")
  })

  // Share Trip Button
  const shareButton = document.querySelector(".share-trip-button")

  shareButton.addEventListener("click", () => {
    if (navigator.share) {
      navigator
        .share({
          title: "My Bus Trip",
          text: "I am currently on Bus #2574 from Mirpur 10 to Motijheel. Track my journey!",
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing:", error))
    } else {
      alert("Trip details copied to clipboard! You can now share with your contacts.")
    }
  })
})
