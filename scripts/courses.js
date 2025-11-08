// Course data array
const courses = [
  {
    code: "WDD 130",
    title: "Web Fundamentals",
    credits: 3,
    completed: true,
    category: "wdd",
  },
  {
    code: "WDD 131",
    title: "Dynamic Web Fundamentals",
    credits: 3,
    completed: true,
    category: "wdd",
  },
  {
    code: "WDD 231",
    title: "Frontend Web Development",
    credits: 3,
    completed: false,
    category: "wdd",
  },
  {
    code: "CSE 110",
    title: "Introduction to Programming",
    credits: 3,
    completed: true,
    category: "cse",
  },
  {
    code: "CSE 111",
    title: "Programming with Functions",
    credits: 3,
    completed: false,
    category: "cse",
  },
  {
    code: "CSE 210",
    title: "Programming with Classes",
    credits: 3,
    completed: false,
    category: "cse",
  },
]

// DOM elements
const coursesContainer = document.getElementById("courses-container")
const filterButtons = document.querySelectorAll(".filter-btn")
const totalCreditsElement = document.getElementById("total-credits")
const filterLabelElement = document.getElementById("filter-label")

let currentFilter = "all"

// Function to render courses
function renderCourses(filteredCourses) {
  coursesContainer.innerHTML = ""

  if (filteredCourses.length === 0) {
    coursesContainer.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">No courses found.</p>'
    return
  }

  filteredCourses.forEach((course) => {
    const courseCard = document.createElement("div")
    courseCard.className = `course-card ${course.completed ? "completed" : "incomplete"}`

    courseCard.innerHTML = `
            <div class="course-header">
                <div>
                    <div class="course-code">${course.code}</div>
                    <div class="course-title">${course.title}</div>
                    <div class="course-credits">${course.credits} Credits</div>
                </div>
                <span class="course-status ${course.completed ? "completed" : "incomplete"}">
                    ${course.completed ? "Completed" : "In Progress"}
                </span>
            </div>
        `

    coursesContainer.appendChild(courseCard)
  })

  updateTotalCredits(filteredCourses)
}

// Function to filter courses
function filterCourses(filter) {
  let filtered = courses

  if (filter === "wdd") {
    filtered = courses.filter((course) => course.category === "wdd")
    filterLabelElement.textContent = "WDD courses"
  } else if (filter === "cse") {
    filtered = courses.filter((course) => course.category === "cse")
    filterLabelElement.textContent = "CSE courses"
  } else {
    filterLabelElement.textContent = "all courses"
  }

  renderCourses(filtered)
}

// Function to calculate total credits using reduce
function updateTotalCredits(filteredCourses) {
  const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0)
  totalCreditsElement.textContent = totalCredits
}

// Filter button event listeners
filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Update active button
    filterButtons.forEach((btn) => btn.classList.remove("active"))
    this.classList.add("active")

    // Update filter
    currentFilter = this.getAttribute("data-filter")
    filterCourses(currentFilter)
  })
})

// Initial render
document.addEventListener("DOMContentLoaded", () => {
  filterCourses("all")
})
