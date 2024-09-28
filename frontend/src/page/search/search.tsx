/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createAlova } from "alova";
import adapterFetch from "alova/fetch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Fundraiser {
  ACTIVE: number;
  CAPTION: string;
  CATEGORY_ID: number;
  CITY: string;
  CURRENT_FUNDING: number;
  FUNDRAISER_ID: number;
  ORGANIZER: string;
  TARGET_FUNDING: number;
}

interface Catagory {
  CATEGORY_ID: number;
  NAME: string;
}

const Search = () => {
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([]);
  const [categories, setCatagories] = useState<Catagory[]>([]);
  const [filterFundraisers, setfilterFundraisers] = useState<Fundraiser[]>([]);

  const [search, setSearch] = useState({
    category: "",
    title: "",
  });

  const alovaInstance = createAlova({
    baseURL: "http://localhost:3000",
    requestAdapter: adapterFetch(),
  });
  const navigate = useNavigate();
  const toPage = (path: string) => {
    navigate(path);
  };
  useEffect(() => {
    alovaInstance
      .Get("/api/allFundraiser")
      .send()
      .then((response: any) => response.json())
      .then((data) => {
        setFundraisers(data.data);
        setfilterFundraisers(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    alovaInstance
      .Get("/api/allCategories")
      .send()
      .then((response: any) => response.json())
      .then((data) => {
        setCatagories(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filteredFundraisers = fundraisers.filter((fundraiser) => {
      if (!search.category)
        return fundraiser.CAPTION.toLowerCase().includes(search.title.toLowerCase());
      if (!search.title) return fundraiser.CATEGORY_ID.toString() === search.category;
      return (
        fundraiser.CATEGORY_ID.toString() === search.category &&
        fundraiser.CAPTION.toLowerCase().includes(search.title.toLowerCase())
      );
    });
    setfilterFundraisers(filteredFundraisers);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">Find fundraisers and nonprofits</h1>

      <form className="mb-4 flex w-full max-w-sm items-center space-x-2" onSubmit={handleSearch}>
        <Select
          defaultValue={search.category}
          onValueChange={(value) => setSearch({ ...search, category: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem value={category.CATEGORY_ID.toString()}>{category.NAME}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          onChange={(e) => setSearch({ ...search, title: e.target.value })}
          placeholder="Search by title"
          type="text"
        />
        <Button type="submit">Search</Button>
      </form>

      <div className="grid grid-cols-3 gap-6">
        {filterFundraisers?.map((filterFundraisers) => (
          <Card
            className="cursor-pointer bg-transparent hover:bg-gray-200"
            key={filterFundraisers.FUNDRAISER_ID}
            onClick={() => toPage(`/fundraiser?id=${filterFundraisers.FUNDRAISER_ID}`)}
          >
            <CardHeader>
              <img alt="Need your help" src="/need your help.webp" />
            </CardHeader>
            <CardContent>
              <h2>{filterFundraisers.CAPTION}</h2>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Progress
                className="mr-4"
                value={filterFundraisers.TARGET_FUNDING / filterFundraisers.CURRENT_FUNDING}
              />
              <label className="w-full text-left">
                ${filterFundraisers.CURRENT_FUNDING} raised
              </label>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Search;
