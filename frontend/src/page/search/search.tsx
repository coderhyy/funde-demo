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
import { Checkbox } from "@/components/ui/checkbox"
import { useNavigate } from 'react-router-dom';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"


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

interface Catagory {
  CATEGORY_ID: number;
  NAME: string;
}

const  Search = () =>{
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([]);  
  const [categories, setCatagories] = useState<Catagory[]>([]);
  const [filterFundraisers, setfilterFundraisers] = useState<Fundraiser[]>([]);  
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const alovaInstance = createAlova({
    baseURL: 'http://localhost:3000',
    requestAdapter: adapterFetch()
  });
  const navigate = useNavigate();  
  const toPage = (path: string)=> {  
    navigate(path)
  }
  useEffect(() => {  
    alovaInstance.Get('/api/allFundraiser')
      .send()
      .then(response => response.json())
      .then(data => {
        setFundraisers(data.data)
        setfilterFundraisers(data.data)
      })
      .catch(err => {  
        console.log(err)
      });  
  }, []);
  useEffect(() => {  
    alovaInstance.Get('/api/allCategories')
      .send()
      .then(response => response.json())
      .then(data => {
        setCatagories(data.data)
      })
      .catch(err => {  
        console.log(err)
      });  
  }, []);

  const filterByCategory = (CATEGORY_ID: number) => {
    // 如果当前选择的类别等于传入的类别，则取消选择
    if (selectedCategoryId === CATEGORY_ID) {
      setSelectedCategoryId(null); // 取消选择，返回所有筹款
      setfilterFundraisers(fundraisers); // 返回所有筹款
    } else {
      setSelectedCategoryId(CATEGORY_ID); // 设置当前选择的类别
      setfilterFundraisers(fundraisers.filter(fundraiser => fundraiser.CATEGORY_ID === CATEGORY_ID)); // 过滤筹款
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Find fundraisers and nonprofits
      </h1>
      
      <Command className="rounded-lg border shadow-md md:min-w-[450px] mb-2">
        <CommandInput placeholder="Type a command or search..."  
        />
        </Command>
      <div className="flex items-center space-x-2 mb-2">
      {categories?.map(category => (  
      <div key={category.CATEGORY_ID}>  
      <Checkbox id={`terms-${category.CATEGORY_ID}`}   onCheckedChange={()=>filterByCategory(category.CATEGORY_ID)} className="mr-4"/>  
      <label  
      htmlFor={`terms-${category.CATEGORY_ID}`}  
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"  
      >  
      {category.NAME}
    </label>  
  </div>  
))}  
      </div>
      
      <div className="grid grid-cols-3 gap-6">
      {filterFundraisers?.map(filterFundraisers=>(
          <Card className="bg-transparent hover:bg-gray-200 cursor-pointer" onClick={()=>toPage(`/fundraiser?id=${fundraiser.FUNDRAISER_ID}`)}>
            <CardHeader>     
              <img   
                src="/need your help.webp"  alt="Need your help" />  
             </CardHeader>
             <CardContent>
                <h2>{filterFundraisers.CAPTION}</h2>
             </CardContent>
             <CardFooter className="flex-col flex">
                <Progress value={filterFundraisers.TARGET_FUNDING/filterFundraisers.CURRENT_FUNDING} className="mr-4"/>
                <label className="w-full text-left">${filterFundraisers.CURRENT_FUNDING} raised</label>
              </CardFooter>
          </Card> 
        ))}
      </div>
    </div>
  )
}

export default Search