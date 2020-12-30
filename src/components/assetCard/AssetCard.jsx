import React, { useState, useEffect,useContext } from "react";
import {useParams,Redirect} from 'react-router-dom'
import styled, { ThemeProvider } from "styled-components";
import HarvestContext from "../../Context/HarvestContext";
import harvest from "../../lib/index";
import { darkTheme, lightTheme, fonts } from "../../styles/appStyles"
import { Link } from 'react-router-dom'

const Card = styled.div`
  display:flex;
  flex-direction: column;
  h1 {
      text-align:center;
  }

`
const AssetCard = (theme) => {
    const context = useContext(HarvestContext);
    const state = context.state
    const isConnected = context.isConnected
    const { card } = useParams()
    if(!isConnected) {
            return(<Redirect to="/"></Redirect>)
    }
    const summaries = state.summaries.map(harvest.utils.prettyPosition)
    console.log(state.underlyings)
    const underlying = state.underlyings.find(underlying => {
        return underlying.asset.name
    })
    console.log(underlying)
      
    const data = summaries.find(s => {
        return s.name == card
    })

    console.log(data)
    return(<ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <Link to="/">
            Back to dashboard
        </Link>
        {data &&
        <Card>
            <h1>{data.name}</h1>
            <p>isActive: {data.isActive}</p>
            <p>earnedRewards: {data.earnedRewards}</p>
            <p>stakedBalance: {data.stakedBalance}</p>
            <p>percentOfPool: {data.percentOfPool} </p>
            <p>unstakedBalance:{data.unstakedBalance}</p>
            <p>value:{data.usdValueOf}</p>

            
        </Card>}
    </ThemeProvider>)

}

export default AssetCard