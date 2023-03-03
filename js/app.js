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
    const id= blog.id;
   
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
          <button onClick="loadBlogDetails('${id}')"   type="button" class="btn btn-outline-danger rounded-circle" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></button>
  

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
const loadBlogDetails = (id) => {
   
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) =>displayBlogDetails(data.data))
      } ;

const displayBlogDetails = (blogDetails) => {
    console.log(blogDetails.features);
    // {plan: 'Basic', price: '$10/month'} 
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = "";
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
        <div class=" p-3 text-center text-success fw-bold">
            <p> ${blogDetails.pricing ? blogDetails.pricing[0].plan:'Free of Cost'} 
            ${blogDetails.pricing ? blogDetails.pricing[0].price :'/ Basic'}</p>
        </div>
        <div class=" p-3 text-center text-info fw-bold">
        <p> ${blogDetails.pricing ? blogDetails.pricing[1].plan:'Free of Cost'} 
        ${blogDetails.pricing ? blogDetails.pricing[1].price :'/ Pro'}</p>
        
        </div >
        <div class="  p-3 text-center text-danger fw-bold">
        <p>  ${blogDetails.pricing ? blogDetails.pricing[2].plan:'Free of Cost'}
        ${blogDetails.pricing ? blogDetails.pricing[2].price :'/ Enterprise'}</p>
     
        </div>
    </div>
    <div class="d-flex justify-content-between align-items-center px-3">
        <div>
            <h4>Features</h4>
            <li>${blogDetails.features? blogDetails.features[1].feature_name :'No Data Found'}</li>
            <li>${blogDetails.features? blogDetails.features[2].feature_name :'No Data Found'}</li>
            <li>${blogDetails.features? blogDetails.features[3].feature_name :'No Data Found'}</li>
        </div>
        <div>
        <ul>
        <li>${blogDetails.integrations? blogDetails.integrations[0]:'No Data Found'}</li>
        <li>${blogDetails.integrations? blogDetails.integrations[1]:'No Data Found'}</li>
        <li>${blogDetails.integrations? blogDetails.integrations[2]:'No Data Found'}</li>
        <li>${blogDetails.integrations? blogDetails.integrations[3]:'No Data Found'}</li>
      </ul>
        </div>
    </div>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card h-100">
        <img src="${blogDetails.image_link[0]}" class="card-img-top" alt="...">
        <div class="card-body">
        <h3 class="text-center">${blogDetails.input_output_examples? blogDetails.input_output_examples[0].input : 'No ! Not yet Take Break !!'}</h3>
        <p class="text-center">${blogDetails.input_output_examples? blogDetails.input_output_examples[0].output :'No ! Not yet Take Break !!'}</p>
         
        </div>
      </div>
    </div>
  </div>
    
    `;
    modalContainer.appendChild(blogDetailsDiv);

    

};
loadBlogDetails();
loadBlogs();
