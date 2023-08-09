console.log("THIS IS MY POSTMAN PROJECT");

// Utility function
// 1. Utility function to get DOM element from string

function getElementFromString(string){
    let div= document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// initialize number of parameters 

let addedParamsCount = 0;

// Hide the parameters Box initially

let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// if user clicks on params parametersBox, hide the json parametersBox

let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})


// if the user clicks the json parametersBox, hide the  parametersBox

let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
})

// If the user clicks on + button add more parameters 

let addParam = document.getElementById('addParam')
addParam.addEventListener('click', () => {
    let addParam = document.getElementById('params')
    let string = `<div class="form-row my-3">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamsCount + 2} </label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamsCount + 2}" placeholder="Enter Parameter ${addedParamsCount + 2} Key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addedParamsCount + 2}" placeholder="Enter Parameter ${addedParamsCount + 2} Value">
                    </div>
                    <button id="addParam" class="btn btn-primary">-</button>
                </div>`

    // Convert the element string to DOM

    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);

    // add an event listener to remove the parameter on clicking  - buttton 

    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            // TODO: add a confirmation box to confirm parameter deletion
            e.target.parentElement.remove();
        })
    }
    addedParamCount++;
})

// If the user clicks on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // Show please wait in the response box to request patience from the user
    // document.getElementById('responseJsonText').value = "Please wait.. Fetching response...";
    document.getElementById('responsePrism').innerHTML = "Please wait.. Fetching response...";

    // Fetch all the values user has entered
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
 
    // If user has used params option instead of json, collect all the parameters in an object
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value; 
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }

    // Log all the values in the console for debugging
    console.log('URL is ', url);
    console.log('requestType is ', requestType);
    console.log('contentType is ', contentType);
    console.log('data is ', data);

    // if the request type is get, invoke fetch api to create a post request
    if (requestType=='GET'){
        fetch(url, {
            method: 'GET',   
        })
        .then(response=> response.text())
        .then((text) =>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
    }

    else{
        fetch(url, {
            method: 'POST', 
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }  
        })
        .then(response=> response.text())
        .then((text) =>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });

    }


});
