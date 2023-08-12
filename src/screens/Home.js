import React,{useEffect,useState} from "react"
import Navbar from "../components/Navbar"
import End from "../end/End"
import Cards from "../components/Cards"
// import Nb from "../components/nb";


export default function Home() {
  const [search,setSearch] = useState('');
  const [foodCat,setFoodCat] = useState([]);
  const [foodItem,setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:8000/api/foodData" ,{
      method : "POST" ,
      headers :{
        'Content-Type' : 'application/json'
      }
    });
    response = await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);
    

  }
  useEffect(()=>{
    loadData()
  },[])

return (
    <div>
       <div>
    <Navbar/>
  </div>
      <div>
        
        <div id="carouselExampleFade" className="carousel slide" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner" id='carousel'>
  <div className="carousel-caption" style={{zIndex:"10"}}>
  <div className="d-flex  w-20rem">
      <input className="div-control mb-2 me-auto w-100" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.currentTarget.value)}}/>

    </div>

  </div>

    <div className="carousel-item active" >
    
      <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100 " style={{ filter: "brightness(30%)" }}  alt="..."/>
      <div className="carousel-caption d-none d-md-block">
      

      </div>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100" style={{ filter: "brightness(30%)" }}  alt="..."/>
      <div className="carousel-caption d-none d-md-block"/>
      
      </div>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100" style={{ filter: "brightness(30%)" }}  alt="..."/>
      <div className="carousel-caption d-none d-md-block">

      
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
      </div>
      <div className="container">
      {
        foodCat !==[]
        ? foodCat.map((data)=>{
          return ( <div className="row mb-3">
            <div key={data._id} className="fs-3 m-3"> 
            {data.CategoryName}
            </div>
            <hr/>
            {foodItem !== []? foodItem.filter((item) => (item.CategoryName === data.CategoryName ) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
            .map (filterItems =>{
              return(
                <div key = {filterItems._id} className="col-12 col-md-6 col-lg-3 m-4">
                  <Cards 
                  foodName = {filterItems.name}
                  
                  options={filterItems.options[0]}
                  imgSrc = {filterItems.img}></Cards>
                </div>
              )
            })
            : <div>No such data found</div> }
            </div>
            )}) : ""}
        

       
        
      </div>
      
       <div> <End />
      </div>
    </div>
  );
}