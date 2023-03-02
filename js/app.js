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
          <button  type="button" class="btn btn-outline-danger rounded-circle" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></button>
  

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

//   load blog details 
const loadBlogDetails = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/01`;
    fetch(url)
      .then((res) => res.json())
      .then((data) =>displayBlogDetails(data.data))
      } ;

const displayBlogDetails = (blogDetails) => {
    console.log(blogDetails.input_output_examples[0].input);
    const modalContainer = document.getElementById('modal-container');
    const blogDetailsDiv = document.createElement("div");
    blogDetailsDiv.innerHTML = `
    <div class="row row-cols-1 row-cols-md-2 g-4">
    <div class="col">
      <div class="card h-100">
        <div class="card-body">
        <div>
        <h5>${blogDetails.description}</h5>
    </div>
    <div class="d-flex justify-content-between align-items-center">
        <div class=" p-3">
            <p>$10/month
                Basic</p>
        </div>
        <div class=" p-3">
            <p>$10/month
                Basic</p>
        </div >
        <div class="  p-3">
            <p>$10/month
                Basic</p>
        </div>
    </div>
    <div class="d-flex justify-content-around align-items-center">
        <div>
            <h6>Features</h6>
            <li>dasd</li>
            <li>dasd</li>
            <li>dasd</li>
        </div>
        <div>
            <h6>Integrations</h6>
            <li>dasd</li>
            <li>dasd</li>
            <li>dasd</li>
        </div>
    </div>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card h-100">
        <img src="${blogDetails.image_link[1]}" class="card-img-top" alt="...">
        <div class="card-body">
        <h3 class="text-center">${blogDetails.input_output_examples[0].input}</h3>
        <p class="text-center">${blogDetails.input_output_examples[0].output}</p>
         
        </div>
      </div>
    </div>
  </div>
    
    `;
    modalContainer.appendChild(blogDetailsDiv);

    

};
loadBlogDetails();
loadBlogs();
