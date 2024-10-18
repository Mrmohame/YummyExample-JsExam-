/// <reference types="../@types/jquery" />
const globalLoading=function(){
  $(".loading").fadeIn()
  $(".loading").css("z-index","9999")
  $(".sk-circle").fadeIn()
  $("body").css("overflow","hidden")
 }
 
// const { error } = require("../@types/jquery");
function error(){
    console.log("eror");
    
}
function closeSideBar(){
    $(".menuLinks").animate({width:"toggle",paddingInline:"toggle"},300,function(){
    
      // $(".linksUl1").css("top")!="0%"&&$(".linksUl1").css("left")!="0%" ? $(".linksUl1").animate({top:"0%",left:"0%"},3000): $(".linksUl1").animate({top:"50%",left:"-20%"},3000)
      // $(".linksUl2").show(500)
    })
   
}

$(".getLinks").on("click", function (e) {
closeSideBar()
   
    
})

$(".open").on("click", function (e){
    $(".close").addClass("d_block");
    $(".open").addClass("d_none");
    $(".open").removeClass("d_block");
 $(".linksUl1").css("top")!="0%"&&  $(".linksUl1").css("left")!="0%" ? $(".linksUl1").animate({top:"0%",left:"0%"},650): $(".linksUl1").animate({top:"50%",left:"-50%"},650)
    $(".linksUl2").show(500)
})
$(".close").on("click", function (e){
    $(".close").addClass("d_none");
    $(".close").removeClass("d_block");
    $(".open").addClass("d_block");
    $(".linksUl1").animate({top:"50%",left:"-50%"},500)
    $(".linksUl2").hide(500)
})


let linksClick=document.querySelectorAll(".menuLinks li")
for(var i = 0; i <linksClick.length ;i++ ){
linksClick[i].addEventListener("click",function(){
    closeSideBar()
    $(".close").addClass("d_none");
    $(".close").removeClass("d_block");
    $(".open").addClass("d_block");
})
}

// end side barr


// start Api



async function  getData() {
    let resp=await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    let data=await resp.json()
   let globalVar=data.meals
    console.log(data.meals);
    fDisplayData(data.meals)
    

    if(globalVar!==undefined){
        $(".sk-circle").fadeOut(500,function(){
            $(".loading").fadeOut(1000)
            $("body").css({overflow:"auto"})
            $(".side-nav-menu").animate({left:"0px"},300)
        })
    }
}
getData()

function fDisplayData(DataNumber){
  cartouna=""
    for(let i=0;i<DataNumber.length;i++){
        cartouna+=`

           <div class="col-md-3 ">
 <div class="position-relative rounded-3 overflow-hidden fDataGetLayer" id="${DataNumber[i].idMeal}">
               <img class="w-100 " src=${DataNumber[i].strMealThumb} alt="">
               <div class="position-absolute w-100  bottom-0 fDataLayer start-0 end-0  d-flex align-items-center">
               <h3>${DataNumber[i].strMeal}</h3>
               </div>
 </div>
           </div>


   
   `
    }
    (document.querySelector("#fData"))?document.querySelector("#fData").innerHTML=cartouna:console.log("eror");

    

let x=document.querySelectorAll(".fDataGetLayer")
for(let i=0;i<x.length;i++){
    x[i].addEventListener("click", function(e){
localStorage.setItem("ItemID",this.getAttribute("id"))
DataDetails(Number(localStorage.getItem("ItemID")))
$(".firstSection").addClass("d-none")
document.querySelector(".firstSectionEx").classList.replace("d-none","d-block")

    })
}

}

 async function DataDetails(n){
const x=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${n}`)
const y=await x.json()

if(y.meals!=undefined){
  $(".loading").fadeOut(500)
  $(".sk-circle").fadeOut(500,function(){
    $("body").css("overflow","auto")
    displayMealExamp(y.meals[0])
  })

}


console.log(y.meals);

}

function displayMealExamp(mealData){


    cartouna=`
            <div class="col-md-4">
                <img class="w-100 rounded-3" src=${mealData.strMealThumb} alt="">
                <h2>${mealData.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${mealData.strInstructions} </p>
         
         
                    <div>
                   
                        <h3 class="fs-2">Area <span class="mx-2">:</span> ${mealData.strArea}</h3>
                        <h3 class="fs-2">Category <span class="mx-2">:</span> ${mealData.strCategory}</h3>
                        <h3 class="fs-2">Recipes <span class="mx-2">:</span>
        <div class="d-flex flex-wrap gap-2 py-2" id="recipes">




        </div>
        <h3 class="fs-2">Tags <span class="mx-2">:</span>
<div class="strTags my-3">
</div>

        <div>
            <a href=${mealData.strSource} class="" target="_blank"><button class="btn btn-success p-2">Source</button></a>
        <a href=${mealData.strYoutube} class="" target="_blank"><button class="btn btn-danger p-2">Youtube</button></a>
        </div>
                    </div>
        
        
        
        
                </div>
    `



    document.querySelector("#mealExamp").innerHTML=cartouna


let x=mealData.strTags!==null?mealData.strTags.split(","):console.log("eror");



if(mealData.strTags!==null){
    for(let i=0;i<x.length;i++){
document.querySelector(".strTags").innerHTML+=`<button class="btn btn-light mx-2">${x[i]}</button>`
    }
}










    if(mealData.strMeasure1!==""&&mealData.strIngredient1!==""){
  document.querySelector("#recipes").innerHTML= `<p class="bg-info int1 p-2 fs-6 rounded-3"> ${mealData.strMeasure1 }${ mealData.strIngredient1}</p>` 
}
if(mealData.strMeasure2!==""&&mealData.strIngredient2!==""){
    document.querySelector("#recipes").innerHTML+= `<p class="bg-info int2 p-2 fs-6 rounded-3"> ${mealData.strMeasure2 }${ mealData.strIngredient2}</p>` 
  } 
     if(mealData.strMeasure3!==""&&mealData.strIngredient3!==""){
    document.querySelector("#recipes").innerHTML+= `<p class="bg-info int3 p-2 fs-6 rounded-3"> ${mealData.strMeasure3 }${ mealData.strIngredient3}</p>` 
  }  
    if(mealData.strMeasure4!==""&&mealData.strIngredient4!==""){
    document.querySelector("#recipes").innerHTML+= `<p class="bg-info int4 p-2 fs-6 rounded-3"> ${mealData.strMeasure4 }${ mealData.strIngredient4}</p>` 
  }   
   if(mealData.strMeasure5!==""&&mealData.strIngredient5!==""){
    document.querySelector("#recipes").innerHTML+= `<p class="bg-info int5 p-2 fs-6 rounded-3"> ${mealData.strMeasure5 }${ mealData.strIngredient5}</p>` 
  }   
   if(mealData.strMeasure6!==""&&mealData.strIngredient6!==""){
    document.querySelector("#recipes").innerHTML+= `<p class="bg-info int6 p-2 fs-6 rounded-3"> ${mealData.strMeasure6 }${ mealData.strIngredient6}</p>` 
  }   
   if(mealData.strMeasure7!==""&&mealData.strIngredient7!==""){
    document.querySelector("#recipes").innerHTML+= `<p class="bg-info int7 p-2 fs-6 rounded-3"> ${mealData.strMeasure7 }${ mealData.strIngredient7}</p>` 
  }   
   if(mealData.strMeasure8!==""&&mealData.strIngredient8!==""){
    document.querySelector("#recipes").innerHTML+= `<p class="bg-info int8 p-2 fs-6 rounded-3"> ${mealData.strMeasure8 }${ mealData.strIngredient8}</p>` 
  }   
   if(mealData.strMeasure9!==""&&mealData.strIngredient9!==""){
    document.querySelector("#recipes").innerHTML+= `<p class="bg-info int9 p-2 fs-6 rounded-3"> ${mealData.strMeasure9 }${ mealData.strIngredient9}</p>` 
  } 
     if(mealData.strMeasure10!==""&&mealData.strIngredient10!==""){
    document.querySelector("#recipes").innerHTML+= `<p class="bg-info int10 p-2 fs-6 rounded-3"> ${mealData.strMeasure10 }${ mealData.strIngredient10}</p>` 
  }  
    if(mealData.strMeasure11!==""&&mealData.strIngredient11!==""){
    document.querySelector("#recipes").innerHTML+= `<p class="bg-info int11 p-2 fs-6 rounded-3"> ${mealData.strMeasure11 }${ mealData.strIngredient11}</p>` 
  }   
   if(mealData.strMeasure12!==""&&mealData.strIngredient12!==""){
    document.querySelector("#recipes").innerHTML+= `<p class="bg-info int12 p-2 fs-6 rounded-3"> ${mealData.strMeasure12 }${ mealData.strIngredient12}</p>` 
  }   
   if(mealData.strMeasure13!==""&&mealData.strIngredient13!==""){
    document.querySelector("#recipes").innerHTML+= `<p class="bg-info int13 p-2 fs-6 rounded-3"> ${mealData.strMeasure13 }${ mealData.strIngredient13}</p>` 
  }   
   if(mealData.strMeasure14!==""&&mealData.strIngredient14!==""){
    document.querySelector("#recipes").innerHTML+= `<p class="bg-info int14 p-2 fs-6 rounded-3"> ${mealData.strMeasure14 }${ mealData.strIngredient14}</p>` 
  }   
   if(mealData.strMeasure15!==""&&mealData.strIngredient15!==""){
    document.querySelector("#recipes").innerHTML+= `<p class="bg-info int15 p-2 fs-6 rounded-3"> ${mealData.strMeasure15 }${ mealData.strIngredient15}</p>` 
  }  
    if(mealData.strMeasure16!==""&&mealData.strIngredient16!==""){
    document.querySelector("#recipes").innerHTML+= `<p class="bg-info int16 p-2 fs-6 rounded-3"> ${mealData.strMeasure16 }${ mealData.strIngredient16}</p>` 
  }   
   if(mealData.strMeasure17!==""&&mealData.strIngredient17!==""){
    document.querySelector("#recipes").innerHTML+= `<p class="bg-info int17 p-2 fs-6 rounded-3"> ${mealData.strMeasure17 }${ mealData.strIngredient17}</p>` 
  }   
   if(mealData.strMeasure18!==""&&mealData.strIngredient18!==""){
    document.querySelector("#recipes").innerHTML+= `<p class="bg-info int18 p-2 fs-6 rounded-3"> ${mealData.strMeasure18 }${ mealData.strIngredient18}</p>` 
  }   
   if(mealData.strMeasure19!==""&&mealData.strIngredient19!==""){
    document.querySelector("#recipes").innerHTML+= `<p class="bg-info int19 p-2 fs-6 rounded-3"> ${mealData.strMeasure19 }${ mealData.strIngredient19}</p>` 
  }   
   if(mealData.strMeasure20!==""&&mealData.strIngredient20!==""){
    document.querySelector("#recipes").innerHTML+= `<p class="bg-info int20 p-2 fs-6 rounded-3"> ${mealData.strMeasure20 }${ mealData.strIngredient20}</p>` 
  }



}



$("#NameSearch").on("keyup", function(){
  getData2(this.value)
globalLoading()
  })

$("#LetterSearch").on("keyup", function(e){
  getData3(this.value)
  globalLoading()
})




async function getData2(name){
  if(name==""){
    name=""
  }
     const resp=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
     const data=await resp.json()


     if(data.meals!=undefined){
      $(".loading").fadeOut(500)
      $(".sk-circle").fadeOut(500,function(){
        $("body").css("overflow","auto")
        fDisplayData2(data.meals)
      })
    
    }
    
  

}
async function getData3(name){
  if(name==""){
    name="a"
  }
    const resp=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`)
    const data=await resp.json()
    
    if(data.meals!=undefined){
      $(".loading").fadeOut(500)
      $(".sk-circle").fadeOut(500,function(){
        $("body").css("overflow","auto")
        fDisplayData2(data.meals)
      })
    
    }



}



function fDisplayData2(DataNumber){
    cartouna=""
      for(let i=0;i<DataNumber.length;i++){
       if(document.querySelector("#countryDataEx")==true&&i==20){
        break;
       }
        
          cartouna+=`
  
             <div class="col-md-3 ">
   <div class="position-relative rounded-3 overflow-hidden fDataGetLayer" id="${DataNumber[i].idMeal}">
                 <img class="w-100 " src=${DataNumber[i].strMealThumb} alt="">
                 <div class="position-absolute w-100  bottom-0 fDataLayer start-0 end-0  d-flex align-items-center">
                 <h3>${DataNumber[i].strMeal}</h3>
                 </div>
   </div>
             </div>
  
  
     
     `
      }

      (document.querySelector("#SearchData"))?document.querySelector("#SearchData").innerHTML=cartouna:console.log("eror");
  (document.querySelector("#countryDataEx"))?document.querySelector("#countryDataEx").innerHTML=cartouna:console.log("eror");

      
      
  
  let x=document.querySelectorAll(".fDataGetLayer")
  for(let i=0;i<x.length;i++){
      x[i].addEventListener("click", function(e){
        globalLoading()
  // console.log();
  localStorage.setItem("ItemID",this.getAttribute("id"))
  DataDetails(Number(localStorage.getItem("ItemID")))
  $(".firstSection").addClass("d-none")
  document.querySelector(".firstSectionEx").classList.replace("d-none","d-block")
  document.querySelector(".searchSection").classList.add("d-none")
  document.querySelector(".countryData").classList.add("d-none")
  document.querySelector(".catSectionExample").classList.add("d-none")
      })
  }
  
  }





 async function getCat(){
  const resp=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  const cat=await resp.json()
  console.log(cat);
  if(cat.categories!=undefined){
    $(".loading").fadeOut(500)
    $(".sk-circle").fadeOut(500,function(){
      $("body").css("overflow","auto")
      displayCatData(cat.categories)
    })
  
  }

  
}

function displayCatData(DataNumber){
  cartouna=""
  for(let i=0;i<DataNumber.length;i++){
      cartouna+=`

         <div class="col-md-3 ">
<div class="position-relative rounded-3 overflow-hidden fDataGetLayer" id="${DataNumber[i].strCategory}">
             <img class="w-100 " src=${DataNumber[i].strCategoryThumb} alt="">
             <div class="position-absolute w-100  bottom-0 fDataLayer start-0 end-0  d-flex align-items-center">
             <h3>${DataNumber[i].strCategory}</h3>
             </div>
</div>
         </div>


 
 `
  }
  (document.querySelector("#catNames"))?document.querySelector("#catNames").innerHTML=cartouna:console.log("eror");

  

let x=document.querySelectorAll(".fDataGetLayer")
for(let i=0;i<x.length;i++){
  x[i].addEventListener("click", function(e){
    globalLoading()
localStorage.setItem("ItemID",this.getAttribute("id"))
getCatDet(localStorage.getItem("ItemID"))
$(".firstSection").addClass("d-none")
document.querySelector(".firstSectionEx").classList.add("d-none")
document.querySelector(".categorySection").classList.add("d-none")
document.querySelector(".catSectionExample").classList.replace("d-none","d-block")
})
}

}




document.querySelector("#Search").addEventListener ("click", function(){
  // document.querySelector(".searchSection").classList.replace("d-none","d-block")
  // document.querySelector(".firstSectionEx").classList.replace("d-block","d-none")
  // document.querySelector(".firstSection").classList.add("d-none")
  document.querySelector(".firstSection").classList.add("d-none")
  document.querySelector(".firstSectionEx").classList.add("d-none")
  document.querySelector(".AreaSection").classList.add("d-none")
  document.querySelector(".categorySection").classList.add("d-none")
  document.querySelector(".catSectionExample").classList.add("d-none")
  document.querySelector(".countryData").classList.add("d-none")
  document.querySelector(".IngredientSeaction").classList.add("d-none")
  document.querySelector(".integratThings").classList.add("d-none")
  document.querySelector(".contactSection").classList.add("d-none")

  document.querySelector(".searchSection").classList.replace("d-none","d-block")

})

document.querySelector("#Categories").addEventListener ("click",function(){
//  document.querySelector(".searchSection").classList.add("d-none")
//  document.querySelector(".firstSectionEx").classList.replace("d-block","d-none")
//  document.querySelector(".firstSection").classList.add("d-none")
//  document.querySelector(".categorySection").classList.replace("d-none","d-block")

document.querySelector(".firstSection").classList.add("d-none")
document.querySelector(".firstSectionEx").classList.add("d-none")
document.querySelector(".AreaSection").classList.add("d-none")
document.querySelector(".searchSection").classList.add("d-none")
document.querySelector(".catSectionExample").classList.add("d-none")
document.querySelector(".countryData").classList.add("d-none")
document.querySelector(".IngredientSeaction").classList.add("d-none")
document.querySelector(".integratThings").classList.add("d-none")
document.querySelector(".contactSection").classList.add("d-none")


document.querySelector(".categorySection").classList.replace("d-none","d-block")

globalLoading()

 getCat()
})


async function getCatDet(neme) {
  const x=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${neme}`)
const y=await x.json()

if(y.meals!==undefined){
  $(".loading").fadeOut(500)
  $(".sk-circle").fadeOut(500,function(){
    $("body").css("overflow","auto")
    displayMealExamp2(y.meals)
  
  })

}


console.log(y.meals);
}

function displayMealExamp2(DataNumber) {
  cartouna=""
  for(let i=0;i<DataNumber.length;i++){
    if(i==20){break;}
      cartouna+=`

         <div class="col-md-3 ">
<div class="position-relative rounded-3 overflow-hidden fDataGetLayer" id="${DataNumber[i].idMeal}">
             <img class="w-100 " src=${DataNumber[i].strMealThumb} alt="">
             <div class="position-absolute w-100  bottom-0 fDataLayer start-0 end-0  d-flex align-items-center">
             <h3>${DataNumber[i].strMeal}</h3>
             </div>
</div>
         </div>


 
 `
  }
  (document.querySelector("#catNamesEx"))?document.querySelector("#catNamesEx").innerHTML=cartouna:console.log("eror");

  

let x=document.querySelectorAll(".fDataGetLayer")
for(let i=0;i<x.length;i++){
  x[i].addEventListener("click", function(e){
    globalLoading()
localStorage.setItem("ItemID",this.getAttribute("id"))
DataDetails(Number(localStorage.getItem("ItemID")))
$(".firstSection").addClass("d-none")
$(".categorySection").addClass("d-none")
$(".catSectionExample").addClass("d-none")
document.querySelector(".firstSectionEx").classList.replace("d-none","d-block")

})
}
}






document.querySelector ("#Area").addEventListener ("click", function(){

  document.querySelector(".firstSection").classList.add("d-none")
  document.querySelector(".firstSectionEx").classList.add("d-none")
  document.querySelector(".searchSection").classList.add("d-none")
  document.querySelector(".categorySection").classList.add("d-none")
  document.querySelector(".catSectionExample").classList.add("d-none")
  document.querySelector(".countryData").classList.add("d-none")
  document.querySelector(".IngredientSeaction").classList.add("d-none")
  document.querySelector(".integratThings").classList.add("d-none")


 document.querySelector(".AreaSection").classList.replace("d-none","d-block")
 globalLoading()

 getAreas()




})


async function getAreas() {
  let resp=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  let data=await resp.json()
  if(data.meals!=undefined){
    $(".loading").fadeOut(500)
    $(".sk-circle").fadeOut(500,function(){
      $("body").css("overflow","auto")
      displayAreas(data.meals)
    })
  
  }
}

function displayAreas(areasNumber){
  cartoun=""
  for(let i=0;i<areasNumber.length;i++){
   
    cartoun+=`
    <div class="col-md-3">
    <div class="item text-center fDataGetLayer" id=${areasNumber[i].strArea}>
        <i class="AreaIcon fa-solid fa-house-laptop"></i>
        <br>
        <h2>${areasNumber[i].strArea}</h2>
    </div>
</div>
`
  }
  $("#AreaPlaces")?$("#AreaPlaces").html(cartoun):console.log("eror");
  


  let x=document.querySelectorAll(".fDataGetLayer")
for(let i=0;i<x.length;i++){
  x[i].addEventListener("click", function(e){
    globalLoading()
localStorage.setItem("ItemID",this.getAttribute("id"))
getcountryDataEx(localStorage.getItem("ItemID"))
$(".firstSection").addClass("d-none")
document.querySelector(".firstSectionEx").classList.add("d-none")
document.querySelector(".categorySection").classList.add("d-none")
document.querySelector(".catSectionExample").classList.add("d-none")
document.querySelector(".AreaSection").classList.add("d-none")
// document.querySelector(".AreaSection").classList.add("d-none")
document.querySelector(".countryData").classList.replace("d-none", "d-block")

})
}


}

async function getcountryDataEx(id){
let x=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${id}`)
let y=await x.json()

if(y.meals!=undefined){
  $(".loading").fadeOut(500)
  $(".sk-circle").fadeOut(500,function(){
    $("body").css("overflow","auto")
    fDisplayData2(y.meals)
  })

}


// console.log(y);

}


document.getElementById("Ingredients").addEventListener("click",function(e){
  // document.querySelector(".searchSection").classList.add("d-none")
  // document.querySelector(".firstSectionEx").classList.replace("d-block","d-none")
  // document.querySelector(".firstSection").classList.add("d-none")
  // document.querySelector(".categorySection").classList.add("d-none")
  // document.querySelector(".AreaSection").classList.add("d-none")
  // document.querySelector(".countryData").classList.add("d-none")
  // document.querySelector(".IngredientSeaction").classList.replace("d-none","d-block")


  document.querySelector(".firstSection").classList.add("d-none")
document.querySelector(".firstSectionEx").classList.add("d-none")
document.querySelector(".AreaSection").classList.add("d-none")
document.querySelector(".searchSection").classList.add("d-none")
document.querySelector(".catSectionExample").classList.add("d-none")
document.querySelector(".countryData").classList.add("d-none")
document.querySelector(".categorySection").classList.add("d-none")
document.querySelector(".integratThings").classList.add("d-none")
document.querySelector(".contactSection").classList.add("d-none")


document.querySelector(".IngredientSeaction").classList.replace("d-none","d-block")

 globalLoading()
  getIngredient()
})

async function getIngredient() {
  const resp=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  const data=await resp.json()
  if(data.meals!=undefined){
    $(".loading").fadeOut(500)
    $(".sk-circle").fadeOut(500,function(){
      $("body").css("overflow","auto")
      displayIngredient(data.meals)
    })
  
  }

}


function displayIngredient(areasNumber){
  cartoun=""

  
  for(let i=0;i<areasNumber.length;i++){
  //  if(areasNumber[i].strDescription==null){break;}
  if(i==20){break;}
    cartoun+=`
    <div class="col-md-3">
    <div class="item text-center fDataGetLayer" id=${areasNumber[i].strIngredient}>
        <i class="AreaIcon fa-solid fa-drumstick-bite"></i>
        <br>
        <h2>${areasNumber[i].strIngredient}</h2>
        <p>${areasNumber[i].strDescription.slice(1,109)}</p>
    </div>
</div>
`
  
}
  $("#IngredientData")?$("#IngredientData").html(cartoun):console.log("eror");
  


  let x=document.querySelectorAll(".fDataGetLayer")
for(let i=0;i<x.length;i++){
  x[i].addEventListener("click", function(e){
    globalLoading();
localStorage.setItem("ItemID",this.getAttribute("id"))
getingredient(localStorage.getItem("ItemID"))
$(".firstSection").addClass("d-none")
document.querySelector(".firstSectionEx").classList.add("d-none")
document.querySelector(".categorySection").classList.add("d-none")
document.querySelector(".catSectionExample").classList.add("d-none")
document.querySelector(".AreaSection").classList.add("d-none")
document.querySelector(".countryData").classList.add("d-none")
document.querySelector(".IngredientSeaction").classList.add("d-none")
document.querySelector(".integratThings").classList.replace("d-none","d-block")

})
}


}


async function getingredient(nme){
  const x=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${nme}`)
  const y=await x.json()

  if(y.meals!=undefined){
    $(".loading").fadeOut(500)
    $(".sk-circle").fadeOut(500,function(){
      $("body").css("overflow","auto")
      displayMealExamp3(y.meals)
    })
  
  }


}

function displayMealExamp3(DataNumber) {
  cartouna=""

  for(let i=0;i<DataNumber.length;i++){
    if(i==20){break;}
      cartouna+=`

         <div class="col-md-3 ">
<div class="position-relative rounded-3 overflow-hidden fDataGetLayer" id="${DataNumber[i].idMeal}">
             <img class="w-100 " src=${DataNumber[i].strMealThumb} alt="">
             <div class="position-absolute w-100  bottom-0 fDataLayer start-0 end-0  d-flex align-items-center">
             <h3>${DataNumber[i].strMeal}</h3>
             </div>
</div>
         </div>


 
 `
  }
  (document.querySelector("#integratThingsData"))?document.querySelector("#integratThingsData").innerHTML=cartouna:console.log("eror");

  

let x=document.querySelectorAll(".fDataGetLayer")

for(let i=0;i<x.length;i++){
  x[i].addEventListener("click", function(e){
    globalLoading()
localStorage.setItem("ItemID",this.getAttribute("id"))
DataDetails(Number(localStorage.getItem("ItemID")))
$(".firstSection").addClass("d-none")
$(".categorySection").addClass("d-none")
$(".catSectionExample").addClass("d-none")
$(".integratThings").addClass("d-none")
document.querySelector(".firstSectionEx").classList.replace("d-none","d-block")

})
}


}

$("#Contact-Us").on("click", function(e){
  document.querySelector(".firstSection").classList.add("d-none")
  document.querySelector(".firstSectionEx").classList.add("d-none")
  document.querySelector(".AreaSection").classList.add("d-none")
  document.querySelector(".searchSection").classList.add("d-none")
  document.querySelector(".catSectionExample").classList.add("d-none")
  document.querySelector(".countryData").classList.add("d-none")
  document.querySelector(".categorySection").classList.add("d-none")
  document.querySelector(".integratThings").classList.add("d-none")
  document.querySelector(".IngredientSeaction").classList.add("d-none")


  document.querySelector(".contactSection").classList.replace("d-none","d-block")


})


const inputList=document.querySelectorAll(".contactSection input")
for(let i=0;i<inputList.length;i++){
  inputList[i].addEventListener("input",function(){
  // console.log(this.value);
  validation(this)

  })

inputList[i].addEventListener("change",function(){
  if(validation(document.getElementById("uName"))==true&&validation(document.getElementById("uEmail"))==true&&validation(document.getElementById("uTel"))==true&&validation(document.getElementById("uNumber"))==true&&validation(document.getElementById("userPassword1"))==true&&validation(document.getElementById("userPassword2"))==true){
    document.querySelector(".dubmitDiv button").removeAttribute("disabled")
    console.log(true+"validation");
  }
  
})
}

// const mi=document.querySelector("#uName")
// document.querySelector(".dubmitDiv button").addEventListener("click",function(){
//   console.log(validation(mi)==true)

// })

function validation(element){
  const regex={
    uName:/^[a-zA-Z]+ *[a-zA-z]*$/,
    uEmail:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    uTel:/^\d{8,}$/,
    // ^\d{8,}$
    uNumber:/^\d+$/,
    userPassword1:/^\w{8,}$/ ,
    userPassword2:/^\w{8,}$/ ,

  }


if(regex[element.getAttribute("id")].test(element.value)){

 if(element.getAttribute("id")=="userPassword2"){
  if(element.value==document.querySelector("#userPassword1").value){
  element.nextElementSibling.classList.add("d-none")
  // return true
  }else{
  element.nextElementSibling.classList.replace("d-none","d-block")
  }
  
}else if(element.getAttribute("id")=="userPassword1"){
  element.nextElementSibling.classList.add("d-none")
if(element.value==document.querySelector("#userPassword2").value){
  document.querySelector("#userPassword2").nextElementSibling.classList.add("d-none")
  // return true
  }else{
    document.querySelector("#userPassword2").nextElementSibling.classList.replace("d-none","d-block")
  }

}else{
  element.nextElementSibling.classList.add("d-none")
}

return true
}else{
  element.nextElementSibling.classList.replace("d-none","d-block")
  return false
  
}
// if(regex[element.getAttribute("id")].test(element.value)){
//   return true
// }

}

  




