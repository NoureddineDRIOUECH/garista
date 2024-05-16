import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import {tabAchat} from './constant/page'
import Banner from "./Banner/Banner";
import Tab from "./Tabs/Tab";
import MenuItems from "./MenuItems/MenuItems";
import Info from "./Info/Info";
import Footer from "./Footer/Footer";
import Achat from "./Achat/Achat";
import Claims from "./Claims/Claims";
import Spinner from "react-spinner-material";
import { axiosInstance } from "../../axiosInstance";
import { APIURL } from "../../lib/ApiKey";

function App() {
  const [cartCount, setCartCount] = useState(tabAchat.length);
  const [validSlug, setValidSlug] = useState(false); // State to track the validity of the resto slug
  const [restos, setRestos] = useState([]);
  const [restosslug, setRestosSlug] = useState([]);
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [restoId, setRestoId] = useState(null)
  const [dishes, setDishes] = useState([])
  const [selectedTab, setSelectedTab] = useState('All');
  const [resInfo , setResInfo] = useState([])
  const [message, setMessage] = useState('')
  
  const restoSlug = window.location.pathname.split("/")[2];
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const extraInfo = queryParams.get('table_id');
  const fetchCategories = async (id) => 
  {
    if (!id) return;
    setLoading(true)
    try{
      const res = await fetch(`${APIURL}/api/getCategorieByResto/${id}`);
      const data = await res.json();
      if (data && data.length) {
        const visibleCategories = data.filter(cat => cat.visibility === 1);
        console.log("The Response of The categories => ", visibleCategories);
        setCategories(visibleCategories);
      } else {
        console.log("No categories found or all categories are not visible");
        setCategories([]); // Set to empty if no visible categories
      }

    }catch(err)
    {
      console.log("the Error => ", err);
    }
    finally{
      setLoading(false)
    }
  }

  const fetchDishes = async (restoId) => {
    try {
        let dishesUrl = `${APIURL}/api/getdishes/${restoId}`;
        let drinksUrl = `${APIURL}/api/getdrinks/${restoId}`;

        if (selectedTab !== "All") {
            const categoryQuery = `?category=${selectedTab}`;
            dishesUrl += categoryQuery;
            drinksUrl += categoryQuery;
        }

        // Execute both fetch calls concurrently
        const [dishesResponse, drinksResponse] = await Promise.all([
            fetch(dishesUrl),
            fetch(drinksUrl)
        ]);

        // Parse responses
        const dishesData = await (dishesResponse.ok ? dishesResponse.json() : dishesResponse.json().then(data => data));
        const drinksData = await (drinksResponse.ok ? drinksResponse.json() : drinksResponse.json().then(data => data));

        // Handle possible empty arrays or specific messages like "No Dishes found"

        // const typedDishes = dishesData.length > 0 && dishesData.map(item => ({ ...item, type: 'dish' }));
        // const typedDrinks = drinksData.length > 0 &&  drinksData.map(item => ({ ...item, type: 'drink' }));

        let combinedData = [];
        if (dishesData && dishesData.length) {
          combinedData.push(...dishesData.map(item => ({ ...item, type: 'dish' })));
      }
      
      // Properly adding 'type' property to each drink
      if (drinksData && drinksData.length) {
          combinedData.push(...drinksData.map(item => ({ ...item, type: 'drink' })));
      }

        setDishes(combinedData);

        if (combinedData.length === 0 || dishesData.message || drinksData.message) {
            console.log('No matching dishes or drinks found or specific message received.');
            // Optionally set a state to show this message in the UI
            setMessage(dishesData.message || drinksData.message || 'No items found.');
        }

    } catch (error) {
        console.error('Error fetching dishes and drinks:', error.message);
        setMessage('Failed to fetch data. Please try again.');
    }
};



console.log("The Resto Id => ", dishes);

const fetchInfo = async (id) => {
  try{ 
    const res = await axiosInstance.get('/api/infos/'+id)
    if(res)
    {
      console.log("The data of Info => ", res);
      let Data = [];
      Data = res.data;
      Data.map(item => {
        setResInfo(item)
      })
    }
  }
  catch(err)
  {
    console.log("the Error => ",err);
  }

}
  const fetchRestosbyslug = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${APIURL}/api/getRestoBySlug/${restoSlug}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      
      console.log("The Response => ",data);
      let Data = [];
      Data = data;
      const res = await axiosInstance.get('/api/infos/'+Data[0].id)
      if(data)
      {
        Data.map((item) => {
          setRestos(item);
          fetchCategories(item.id)
          setRestoId(item.id)
          fetchDishes(item.id)
          fetchInfo(item.id)
        })
        // setLoading(true)
        // if(res)
        //   {
        //     console.log("The data of Info => ", res);
        //     let Data = [];
        //     Data = res.data;
        //     Data.map(item => {
        //       setResInfo(item)
        //     })
        //   }
      }
      // const isValidSlug = useValidateSlug(restoSlug, Data.map(item => item.slug));

      // console.log("The IsValide => ", isValidSlug);
      // if(!isValidSlug)
      // {
      //   return <Navigate to="/not-found" replace />;
      // }
    } catch (error) {
      console.error("Error fetching restos:", error.message);
    }
    finally{
      setLoading(false)
    }
  };

  console.log('The Selected => ', selectedTab);


useEffect(() => {
  // fetchRestos();
  fetchRestosbyslug();
  fetchDishes(restoId)

}, [restoSlug]); // Fetch restos when the component mounts

useEffect(() => {
  if (selectedTab) {
    fetchDishes(restoId); // Fetch dishes when selectedTab changes
  }
}, [selectedTab, restoId]);
  if(loading)
  { 
    return(
      <div className='justify-center items-center flex  h-screen'>
      <Spinner size={100} spinnerColor={"#28509E"} spinnerWidth={1} visible={true} style={{borderColor: "#28509E", borderWidth: 2}}/>
    </div>
    )
  }

// console.log("The IsValid => ", isValidSlug);
  // if(!isValidSlug)
  // {
  //   return <Navigate to="/not-found" replace />;
  // }

  console.log("The Resto Infos => ",resInfo);
  return (
    // <Router>
      <div className="h-screen">

          <Routes>
            <Route
              path={`/`}
              element={
                <>
                  <Banner items={restos} infoRes={resInfo}/>
                  <Tab categories={categories} resto={restoId}  dishes={dishes} selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
                  <Footer slug={restoSlug}  table_id={extraInfo}/>
                </>
              }
            />
            <Route path={`/theme/:restoSlug/info`} element={
              <>
              <Info items={restos} infoRes={resInfo}/>
              <Footer slug={restoSlug}  table_id={extraInfo}/>
              </>
            } />
            <Route path={`/theme/:restoSlug/Achat`}  element={
              <>
              <Achat resto_id={restoId} tabel_id={extraInfo} restoId={restoId}/>
              <Footer slug={restoSlug}  table_id={extraInfo}/>
              </>
            } />
            <Route path={`/theme/:restoSlug/Claims`} element={
              <>
              <Claims items={restos}/>
              <Footer slug={restoSlug} table_id={extraInfo}/>
              </>
            } />
          </Routes>
      </div>
  );
}

function useValidateSlug(slug, validSlugs) {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (!validSlugs.includes(slug)) {
      setIsValid(false);
      navigate("/not-found", { replace: true }); // Redirects to a "Not Found" page
    }
  }, [slug, validSlugs, navigate]);

  return isValid;
}


export default App;
