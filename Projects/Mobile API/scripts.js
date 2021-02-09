var url='https://parseapi.back4app.com/classes/Cellphonedataset_Dataset_Cell_Phones_Model_Brand?limit=100'
var data =[];
async function loadData(){
        try{
            var response = await fetch(url,
                {
                  headers: {
                    'X-Parse-Application-Id': 'BIFuSFUsBJ2qItd2bGfTOZVK0SgdRTiTTmJV6rk7', // This is your app's application id
                    'X-Parse-REST-API-Key': 'ykBazmOl94XPIIlVPzdGzDbCZG5T31xDP3U4gwdB', // This is your app's REST API key
                  }
                }
              );
              data = await response.json(); // Here you have the data that you need
              console.log(data);
        }catch(err){
            console.log(err);
        }
}

loadData();   


var resultsData=document.querySelector("#resultsData");
const displayData = (mobileData)=>{
    resultsData.innerHTML="";
    // console.log("filterdata is:"+mobileData);
    var row = document.createElement("div");
    row.setAttribute("class","row");
    for(let i=0;i<mobileData.length;i++){
        var col=document.createElement("div");
        col.setAttribute("class","col-sm-12 col-md-4 my-3 mx-3 border  ");

        var subrow=document.createElement("div")
        subrow.setAttribute("class","row")
        var subCol=document.createElement("div");
        subCol.setAttribute("class","col-6")
        var subCol1= document.createElement("div");
        subCol1.setAttribute("class","col-6 position-image-div");

        var mobile_brandName = document.createElement("div");
        // btn.setAttribute("type","button");
        mobile_brandName.setAttribute("class","h2")
        mobile_brandName.innerHTML ="<b>"+mobileData[i].Brand+"</b>" 
        var div2=document.createElement("div");
        div2.innerText=mobileData[i].Internal_memory;
        var div3=document.createElement("div");
        div3.innerText=mobileData[i].Battery;

        var mobile_image = document.createElement("img");
        mobile_image.setAttribute("src","image1.png");
        mobile_image.alt="Mobile Image1";
        // mobile_image.setAttribute("class","mobile-image");
        mobile_image.width="200";
        mobile_image.height="200";

        let card_button = document.createElement("button")
        card_button.setAttribute("class","btn mt-2 color1")
        card_button.addEventListener("click",()=>{
            displayAlert(mobileData[i]);
            // displayAlert();
        })
        card_button.innerText="For More Details"  
        var br=document.createElement("br");

        subCol.append(mobile_brandName,div2,div3,card_button);
        subCol1.append(mobile_image);
        subrow.append(subCol,subCol1);
        col.append(subrow);
        row.append(col)
    }
    resultsData.append(row)
}


var searchBar = document.querySelector("#searchBar");
searchBar.addEventListener("keyup",(e)=>{
    // console.log("Data is:"+data.results[0].Brand);
    var tempData=data.results;
    const serachString = e.target.value.toLowerCase();

    console.log("Search string is:"+serachString);
    if(serachString.length>0){
        const filterData = 
            tempData.filter( (rec) => {
                return rec.Brand.toLowerCase().includes(serachString);
            });
            // console.log("Filter Data is:"+filterData);
            displayData(filterData)
    }
    else{
        displayData("");
    }
})

function search(e){
    // console.log("hii jh,g")
    let searchBar = document.querySelector('#searchBar');
    console.log("search bar is:"+searchBar.value);
    const serachString = searchBar.value;
    var tempData=data.results;
    if(serachString.length>0){
        const filterData = 
            tempData.filter( (rec) => {
                return rec.Brand.toLowerCase().includes(serachString);
            });
            // console.log("Filter Data is:"+filterData);
            displayData(filterData)
    }
    else{
        displayData("");
    }
}

function displayAlert(mobileInfo){
    console.log("sample check")
    var blur=document.querySelector("#blur");
    blur.classList.toggle('active')
    var popup =document.querySelector("#popup");
    popup.classList.toggle('active')

    popup.innerHTML="";
    var div = document.createElement("div");
    div.setAttribute("class","col-4");
    var mobile_brand_h2 = document.createElement("h2");
    mobile_brand_h2.innerText=mobileInfo.Brand;

    var mobile_size_RAM= document.createElement("label");
    mobile_size_RAM.innerHTML = "<b>RAM:</b>"
    var mobile_size_RAM_data = document.createElement("div");
    mobile_size_RAM_data.innerText=mobileInfo.RAM+" "+mobileInfo.Internal_memory;

    var mobile_size_ROM= document.createElement("label");
    mobile_size_ROM.innerHTML = "<b>ROM:</b>"
    var mobile_size_ROM_data = document.createElement("div");
    mobile_size_ROM_data.innerText=mobileInfo.Internal_memory;

    var mobile_chipset= document.createElement("label");
    mobile_chipset.innerHTML = "<b>Chipset:</b>"
    var mobile_chipset_data = document.createElement("div");
    mobile_chipset_data.innerText=mobileInfo.Chipset;

    var mobile_colors= document.createElement("label");
    mobile_colors.innerHTML = "<b>Colors:</b>"
    var mobile_colors_data = document.createElement("div");
    mobile_colors_data.innerText=mobileInfo.Colors;

    var mobile_brand_button = document.createElement("button");
    mobile_brand_button.type="button";
    mobile_brand_button.setAttribute("class","btn btn-dark")
    mobile_brand_button.addEventListener("click",()=>{
        displayAlert();
    });
    mobile_brand_button.innerText="Close";

    div.append(mobile_brand_h2,mobile_size_RAM,mobile_size_RAM_data,mobile_size_ROM,mobile_size_ROM_data,mobile_chipset,mobile_chipset_data,mobile_colors,mobile_colors_data,mobile_brand_button)

    var col2=document.createElement("div");
    col2.setAttribute("class","col-8")
    var mobile_image = document.createElement("img");
    mobile_image.setAttribute("src","image1.png");
    mobile_image.alt="Mobile Image1";
    mobile_image.setAttribute("class","mobile-image");
    mobile_image.width="150";
    // mobile_image.height="400";
    col2.append(mobile_image);
    popup.append(div,col2);
    console.log(mobileInfo)
}