import { buttonVariants,Button  } from "@/components/ui/button";
import React, { useEffect, useState } from 'react';  
import { createAlova  } from 'alova';
import adapterFetch from 'alova/fetch';
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

const Fundraiser = () => {
  // 初始化一个空的Fundraiser对象  
  const handleDonateClick = () => {  
    alert("此功能正在建设中");  
};  
const alovaInstance = createAlova({
  baseURL: 'http://localhost:3000', // 替换为你的 API 基地址
  requestAdapter: adapterFetch()
});
const urlParams = new URLSearchParams(window.location.search);  
const fundraiserId = urlParams.get('id');  
const [fundraiser, setFundraiser] = useState<Fundraiser>({});  
useEffect(() => {  
  alovaInstance.Get(`/api/fundraiser/${fundraiserId}`)
    .send()
    .then(response => response.json())
    .then(data => {
      setFundraiser(data.data)
    })
    .catch(err => {  
      console.log(err)
    });  
}, []);
  return(
      <div className="p-8 mx-auto max-w-4xl">
      <div className="grid gap-4 mb-4 bg-white p-6 rounded-lg shadow-md">  
        <h1 className="text-2xl font-bold">{fundraiser.CAPTION}</h1>  
        <div className="space-y-2">  
          <div className="flex justify-between">  
            <span className="font-semibold">Organizer:</span>  
            <span>{fundraiser.ORGANIZER}</span>  
          </div>  
          <div className="flex justify-between">  
            <span className="font-semibold">Target Funding:</span>  
            <span>${fundraiser.TARGET_FUNDING}</span>  
          </div>  
          <div className="flex justify-between">  
            <span className="font-semibold">Current Funding:</span>  
            <span>${fundraiser.CURRENT_FUNDING}</span>  
          </div>  
          <div className="flex justify-between">  
            <span className="font-semibold">City:</span>  
            <span>{fundraiser.CITY}</span>  
          </div>  
        </div>  
      </div>  
      <Button variant="ghost" className="mb-4" onClick={()=>handleDonateClick()}>Donate</Button>
      </div>            
  );
}
export default Fundraiser;