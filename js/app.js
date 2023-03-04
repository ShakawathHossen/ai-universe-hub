const loadBlogs = (fixed) => {
  spinner(true);
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      allData = data.data.tools;
      displayBLogs(data.data.tools, fixed);
    });
};

const displayBLogs = (blogs, fixed) => {
  const blogsContainer = document.getElementById("blog-container");
  blogsContainer.innerHTML = "";
  if (fixed && blogs.length > 6) {
    blogs = blogs.slice(0, 6);
    document.getElementById("show-all-button").classList.remove("d-none");
  }
  blogs.forEach((blog) => {
    const id = blog.id;
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
          <p class="card-text"><small class="text-muted"><i class="fa-solid fa-calendar-days"></i> ${
            blog.published_in
          }</small></p>
          </div>
          <button onClick="loadBlogDetails('${id}')"   type="button" class="btn btn-outline-danger rounded-circle" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></button>
  

      </div>
        </div>
        `;
    blogsContainer.appendChild(blogDiv);
    spinner(false);
  });
};
//
//   show All Button functionality
const showAllButton = () => {
  loadBlogs();
  document.getElementById("show-all-button").classList.add("d-none");
};
// modal data start
const loadBlogDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayBlogDetails(data.data));
};
// intre gration show
const integrationsShow = (integrations) => {
  console.log(integrations);
  let integrationsValue = "";
  if (integrations === null) {
    return `<li>no data found</li>`;
  } else {
    integrations.forEach((integrations) => {
      integrationsValue += `<li>${integrations}</li>`;
    });
    return integrationsValue;
  }
};


// modal data displayed

const displayBlogDetails = (blogDetails) => {
  const modalContainer = document.getElementById("modal-container");
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
          <p> ${
            blogDetails.pricing ? blogDetails.pricing[0].plan : "Free of Cost"
          } 
          ${blogDetails.pricing ? blogDetails.pricing[0].price : "/ Basic"}</p>
      </div>
      <div class=" p-3 text-center text-info fw-bold">
      <p> ${blogDetails.pricing ? blogDetails.pricing[1].plan : "Free of Cost"} 
      ${blogDetails.pricing ? blogDetails.pricing[1].price : "/ Pro"}</p>
      
      </div >
      <div class="  p-3 text-center text-danger fw-bold">
      <p>  ${blogDetails.pricing ? blogDetails.pricing[2].plan : "Free of Cost"}
      ${blogDetails.pricing ? blogDetails.pricing[2].price : "/ Enterprise"}</p>
   
      </div>
  </div>
  <div class="d-flex justify-content-between align-items-center px-3">
      <div>
          <h4>Features</h4>
          ${modalFeature(blogDetails.features)}
      </div>
      <div>
      <h4>Integrations</h4>
        ${integrationsShow(blogDetails.integrations)}

      </div>
  </div>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card h-100 p-2">
      <div>
      <button class="btn btn-danger position-absolute top-2 start-2">${
        blogDetails.accuracy ? blogDetails.accuracy.score * 100 + "%" : "0"
      } Accuracy </button>
      <img src="${blogDetails.image_link[0]}" class="card-img-top" alt="...">
      </div>
      <div class="card-body">
      <h3 class="text-center">${
        blogDetails.input_output_examples
          ? blogDetails.input_output_examples[0].input
          : "No ! Not yet Take Break !!"
      }</h3>
      <p class="text-center">${
        blogDetails.input_output_examples
          ? blogDetails.input_output_examples[0].output
          : "No ! Not yet Take Break !!"
      }</p>
       
      </div>
    </div>
  </div>
</div>
  
  `;
  modalContainer.appendChild(blogDetailsDiv);
};
// show all modal feature
const modalFeature = (features) => {
  let modalFeatureHtml = '';
  for (const value in features) {
      modalFeatureHtml += `<li>${(features[value].feature_name)}</li>`
  }
  return modalFeatureHtml;
}

const sortDate = () => {
  spinner(true);
  const all = allData.sort(function (a, b) {
      const d1 = new Date(a.published_in);
      const d2 = new Date(b.published_in);
      return d2 - d1;
  });
  displayBLogs(all);
  document.getElementById("show-all-button").classList.add("d-none");

}
// spiner
// loading
const spinner = (value) => {
  const section = document.getElementById('spnieer-loading');
  if (value) {
      section.classList.remove("d-none");
  }
  else {
      section.classList.add("d-none");
  }
}