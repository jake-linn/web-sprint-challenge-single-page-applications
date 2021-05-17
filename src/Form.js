import React, {useState, useEffect} from 'react';
import axios from 'axios';
import * as yup from 'yup';
import styled from 'styled-components';


const StyledForm = styled.div `

border: 3px black solid,
display: flex;
flex-direction: column;
text-align: center;
background-color: orange;

button {

font-size: 25px;
padding: 10px;




}

`



const schema = yup.object().shape({

    name: yup.string().trim().required('Name is required').min(2, 'Must be at least 2 characters long. '),
    size: yup.string().trim().required('Size is required'),

    sausage: yup.boolean(),
    pepperoni: yup.boolean(),
    mushrooms: yup.boolean(),
    pineapple: yup.boolean(),
    notes: yup.string().trim()

})

const Form = () => {


const [orders, setOrders] = useState([])

const [disabled, setDisabled] = useState(true)

const [form, setForm] = useState({

name: '',
size: '',
sausage: false,
pepperoni: false,
mushrooms: false,
pineapple: false,
notes: ''


})

const [errors, setErrors] = useState ({

    name: '',
    size: '',
    sausage: '',
    pepperoni: '',
    mushrooms: '',
    pineapple: '',
    notes: ''

})


const setFormErrors = (name, value) => {
yup.reach(schema, name).validate(value)
.then(() => setErrors({...errors, [name]: ''}))
.catch(err => setErrors({...errors, [name]:err.errors[0]}))


}

const changeHandler = event => {
    const { checked, value, name, type } = event.target
    const valueToUse = type === "checkbox" ? checked : value
    setFormErrors(name, valueToUse)
    setForm({ ...form, [name]: valueToUse })
 }

const handleSubmit = event => {

event.preventDefault();
const newOrder = {

name:form.name,
size:form.size,
sausage: form.sausage,
pepperoni: form.pepperoni,
mushrooms: form.mushrooms,
pineapple: form.pineapple,
notes: form.notes

}

axios.post('https://reqres.in/api/users', newOrder)

.then(res => {

setOrders(...orders, res.data)
setForm({

    name: '',
    size: '',
    sausage: false,
    pepperoni: false,
    mushrooms: false,
    pineapple: false,
    notes: ''


})
console.log(res)
})
.catch(err => console.log(err.res))
}
useEffect(() => {

    schema.isValid(form).then(valid => setDisabled(!valid))
}, [form])

return (

<StyledForm onSubmit={handleSubmit}>


<label>  name  </label> 
<input 
type = 'text'
name = 'name'
placeholder = 'Enter name'
onChange = {changeHandler}
value = {form.name}
/>

<label> Pizza Size:   </label>
<select
name = 'size'
onChange = {changeHandler}
>
    <option value = ''> -- Select size -- </option>
    <option value = 'small'> Small</option>
    <option value = 'medium' > Medium</option>
    <option value = 'large' > Large</option>
    <option value = 'XL' > XL </option>

    </select>

    <label> Sausage </label>

    <input
    type = 'checkbox'
    name = 'sausage'
    checked = {form.sausage}
    onChange = {changeHandler}
    />
   
   <label> Pepperoni </label>


    <input 
    type = 'checkbox'
    name = 'pepperoni'
    checked = {form.pepperoni}
    onChange = {changeHandler}
    /> 

    
<label> Mushrooms </label>

    <input 
    type = 'checkbox'
    name  = 'mushrooms'
    checked = {form.mushrooms}
    onChange = {changeHandler}
    />

    
<label> Pineapple </label>

    <input 
    type = 'checkbox'
    name = 'pineapple'
    checked = {form.pineapple}
    onChange = {changeHandler}
    /> 
    
<label>  Notes </label>

    <input
    placeholder = 'special requests'
    type = 'text'
    onChange = {changeHandler}
    value = {form.notes}
    name = 'notes'
    />

    <button 
    disabled = {disabled}> 
    Submit
    </button>






</StyledForm>




)


}



export default Form 

