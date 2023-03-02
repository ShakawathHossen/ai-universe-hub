// Define a global variable to store all the blogs
let allBlogs = [];

// fecth api 
const loadBlogs = () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) =>{
        allBlogs=data.data.tools;
        displayBLogs(allBlogs.slice(0, 6), false);
    }) ;
};

const displayBLogs = (blogs, showAll) => {
  console.log(blogs);
  const blogsContainer = document.getElementById("blog-container");

  // limited result show in search
//   blogs = blogs.slice(0, 6);
blogsContainer.innerHTML = "";
  blogs.forEach((blog) => {
    const blogDiv = document.createElement("div");
    blogDiv.classList.add("col");
    blogDiv.innerHTML = `
        <div class="card h-100 p-sm-2">
          <img src="${blog.image}" class="card-img-top p-2" alt="...">
          <div class="card-body">
            <h5 class="card-title">Features</h5>
            <ul class="card-text">
            ${blog.features.map((feature) => `<li>${feature}</li>`).join("")}
          </ul>
          </div>
          <div class="card-footer d-flex justify-content-between align-items-center">
          <div class="card-text">
          <h5>${blog.name}</h5>
          <p class="card-text"><small class="text-muted"><i class="fa-solid fa-calendar-days"></i> ${blog.published_in}</small></p>
          </div>
          <button type="button" class="btn btn-outline-danger rounded-circle"><i class="fa-solid fa-arrow-right"></i></button>
      </div>
        </div>
        `;
    blogsContainer.appendChild(blogDiv);
  });

//   show All Button functionality 
  if (!showAll) {
    const showAllButton = document.getElementById("show-all-button");
    showAllButton.addEventListener("click", () => {
      displayBLogs(allBlogs, true);
      showAllButton.style.display = "none";
    });
  }
};

loadBlogs();
