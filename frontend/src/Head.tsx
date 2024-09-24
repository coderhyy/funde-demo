import React from 'react';  
import './App.css';
import { useNavigate } from 'react-router-dom';  
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu";
import { buttonVariants,Button  } from "@/components/ui/button";

const Head = () => {

    const navigate = useNavigate();  
    const toPage = (path: string)=> {  
        navigate(path)
    }
      
    return (
    <header className='fixed top-0 left-0 right-0'>
    <div className='container m-auto mt-4'>
        <NavigationMenu>
            <NavigationMenuList className="grid-cols-3 gap-2">
            <NavigationMenuItem >
                <Button variant="ghost" onClick={()=>toPage("/search")}>Search</Button>
            </NavigationMenuItem>
            <NavigationMenuItem >
                <Button variant="ghost" onClick={()=>toPage("/")}>Home</Button>
            </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    </div>
    </header>
    );
}
export default Head;