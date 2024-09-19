import React from 'react'
import Header from '../../Components/Header/Header'
import ExploreMenu from '../../Components/Header/ExploreMenu/ExploreMenu'
import { useState } from 'react'
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay'
import AppDownload from '../../Components/AppDownload/AppDownload'

const Home = () => {
  const [category, setcategory] = useState("All");
  return (
    <div>
    <Header/>
    <ExploreMenu category={category} setcategory={setcategory}/>
    <FoodDisplay category={category}/>
    <AppDownload/>
    </div>
  )
}

export default Home
