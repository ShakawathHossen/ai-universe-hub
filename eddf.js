//   load blog details 




const displayBlogDetails = (blogDetails) => {
    console.log(blogDetails.integrations);
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
            <li>${blogDetails?.features? blogDetails.features[1].feature_name :'No Data Found'}</li>
            <li>${blogDetails?.features? blogDetails.features[2].feature_name :'No Data Found'}</li>
            <li>${blogDetails?.features? blogDetails.features[3].feature_name :'No Data Found'}</li>

        </div>
        <div>
        <h4>Integrations</h4>
    

        </div>
    </div>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card h-100 p-2">
        <div>
        <button class="btn btn-danger position-absolute top-2 start-2">${blogDetails.accuracy ? blogDetails.accuracy.score *100 +'%': '0'} Accuracy </button>
        <img src="${blogDetails.image_link[0]}" class="card-img-top" alt="...">
        </div>
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
