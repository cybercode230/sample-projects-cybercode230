"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type aboutProps={
  name:string,
  age:number,
  description:string
} 
const aboutDataSchema:aboutProps[]=[
  {
      "name":"cybercode230",
      "age":23,
      "description":"this is the about the cybercode230"
  }
]

 const AboutName = () =>{
    const params = useParams();
    const name = params.name as string;

    const [data,setData]=useState<aboutProps | null>(null)

    useEffect(()=>{
      const aboutData = aboutDataSchema.find((item)=>item.name === name)
      setData(aboutData || null)
    },[name])

    return (
        <div>
          <h1>Dynamic About Page</h1>
          {data ? (
        <>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Age:</strong> {data.age}</p>
          <p><strong>Description:</strong> {data.description}</p>
        </>
      ) : (
        <p>User not found.</p>
      )}
        </div>
      );
}

export default AboutName