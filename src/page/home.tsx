import React, { useEffect, useState } from 'react';  
import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';

const Home = ()=>{
    const alovaInstance = createAlova({
        baseURL: 'http://localhost:3000', // 替换为你的 API 基地址
        requestAdapter: adapterFetch()
      });
      const [fundraisers, setFundraisers] = useState(null);  
      useEffect(() => {  
        alovaInstance.Get('/api/allUser')
          .send()
          .then(response => {  
            setFundraisers(response.data); // 处理响应数据  
            console.log(response);
            console.log(fundraisers);
          })  
          .catch(err => {  
            console.log(err)
          });  
      }, []);  
    return(
        <div>
        <h1>Welcome to Our Nonprofit Organization</h1>  
        <p>  
          We are dedicated to making the world a better place by supporting various  
          causes that contribute to the welfare of individuals and communities.  
        </p> 
        <h2>Contact Us</h2>  
        <p>Email: info@nonprofit.org</p>  
        <p>Phone: 114514</p>  
        </div>
    );
}


export default Home