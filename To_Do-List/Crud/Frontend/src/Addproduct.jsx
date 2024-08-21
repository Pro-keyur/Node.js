import React, { useState } from 'react'
import axios from "axios"

const initialstate={
    image:"",
    category:"",
    description:"",
    price:"",
    title:""
}
const Addproduct = () => {
    const [formdata,setformdata]=useState(initialstate)
    const {image,category,description,price,title}=formdata

    const handlechange=(e)=>{
        setformdata({...formdata,[e.target.name]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault()

        axios.post("http://localhost:8080/addproduct",formdata).then(
            (res)=>{
                console.log(res)
                alert("data added succes")
            }
        ).catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <input  type="text" name='image' value={image} onChange={(e)=>handlechange(e)} placeholder=' Enter image URL '/><br/>
        <input type="text" name='title' value={title}  onChange={(e)=>handlechange(e)}  placeholder='Enter title here'/><br/>
        <select name="category" id="" value={category}  onChange={(e)=>handlechange(e)} placeholder='title' ><br/>
            <option value={""}>select your category</option><br/><br/>
            <option value={"Women"}>Women clothing</option><br/>
            <option value={"jewellery"}>jewellery</option>
            <option value={"Electronics"}>Electronics</option>
            <option value={"Men "}>Men clothing</option>
        </select><br/>
        <input type="text" name='price' value={price}  onChange={(e)=>handlechange(e)}  placeholder='Enter price here'/><br/>
        <input type="text" name='description' value={description}   onChange={(e)=>handlechange(e)}  placeholder='Enter description'/><br/><br/>
        <input type="submit" />
      </form>
    </div>
  )
}

export default Addproduct
