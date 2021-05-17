import React from "react";
import {Switch, Route, Link} from 'react-router-dom';
import Form from './Form'
import styled from 'styled-components';


const StyledApp = styled.div `

h1, h2, p {

text-align = center;

}

h1 {

font-size: 100px;



}

h2{

font-size: 25px;

p {

font-size: 20px;



}


}


`



const App = () => {
  return (
    <StyledApp>

    <h1> Welcome to Lambda Eats! </h1>
    <h2> Complied with React and Love </h2>
    <Link style={{textDecoration: "none"}} to="/pizza"><p>Pizza?</p></Link>
    <Switch>
    <Route path = '/pizza' component  = {Form} />
    <Route path = '/' />


    </Switch>



    </StyledApp>
  );
};
export default App;
