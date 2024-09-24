import React, { useEffect, useState } from 'react';  
import { createAlova  } from 'alova';
import adapterFetch from 'alova/fetch';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useNavigate } from 'react-router-dom';
  

interface Fundraiser {  
  FUNDRAISER_ID: number;  
  ORGANIZER: string;  
  CAPTION: string;  
  TARGET_FUNDING: number;  
  CURRENT_FUNDING: number;  
  CITY: string;  
  ACTIVE: number;  
  CATEGORY_ID: number;  
}  
const Home = ()=>{
  const navigate = useNavigate();  
  const toPage = (path: string)=> {  
    navigate(path)
  }
  
    const alovaInstance = createAlova({
        baseURL: 'http://localhost:3000', // 替换为你的 API 基地址
        requestAdapter: adapterFetch()
      });
      const [fundraisers, setFundraisers] = useState<Fundraiser[]>([]);  
      useEffect(() => {  
        alovaInstance.Get('/api/allFundraiser')
          .send()
          .then(response => response.json())
          .then(data => {
            setFundraisers(data.data)
          })
          .catch(err => {  
            console.log(err)
          });  
      }, []);  
      useEffect(() => {  
        console.log('更新后的 fundraisers:', fundraisers);  
      }, [fundraisers]);  
    return(
        <div>
        <h1>Welcome to Our Nonprofit Organization</h1>  
        <p>  
          We are dedicated to making the world a better place by supporting various  
          causes that contribute to the welfare of individuals and communities.  
        </p>
        <div className='grid-cols-3 grid gap-4'>
        {fundraisers?.map(fundraiser=>(
          <Card className="bg-transparent hover:bg-gray-200 cursor-pointer" onClick={()=>toPage(`/fundraiser?id=${fundraiser.FUNDRAISER_ID}`)}>
            <CardHeader>     
              <img   
                src="/need your help.webp"  alt="Need your help" />  
             </CardHeader>
             <CardContent>
                <h2>{fundraiser.CAPTION}</h2>
             </CardContent>
             <CardFooter className="flex-col flex">
                <Progress value={fundraiser.TARGET_FUNDING/fundraiser.CURRENT_FUNDING} className="mr-4"/>
                <label className="w-full text-left">${fundraiser.CURRENT_FUNDING} raised</label>
              </CardFooter>
          </Card> 
        ))}
        </div>

        </div>
    );
}


export default Home