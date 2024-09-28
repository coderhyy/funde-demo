/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
const Home = () => {
  const navigate = useNavigate();
  const toPage = (path: string) => {
    navigate(path);
  };

  const alovaInstance = createAlova({
    baseURL: "http://localhost:3000", // 替换为你的 API 基地址
    requestAdapter: adapterFetch(),
  });
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([]);
  useEffect(() => {
    alovaInstance
      .Get<Fundraiser[]>("/api/allFundraiser")
      .send()
      .then((response: any) => response.json())
      .then((data) => {
        setFundraisers(data.data.filter((fundraiser: Fundraiser) => fundraiser.ACTIVE === 1));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    console.log("更新后的 fundraisers:", fundraisers);
  }, [fundraisers]);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">Welcome to Our Nonprofit Organization</h1>
      <p className="mb-4">
        We are dedicated to making the world a better place by supporting various causes that
        contribute to the welfare of individuals and communities.
      </p>
      <div className="grid grid-cols-3 gap-4">
        {fundraisers?.map((fundraiser) => (
          <Card
            className="cursor-pointer bg-transparent hover:bg-gray-200"
            onClick={() => toPage(`/fundraiser?id=${fundraiser.FUNDRAISER_ID}`)}
          >
            <CardHeader>
              <img alt="Need your help" src="/need your help.webp" />
            </CardHeader>
            <CardContent>
              <h2>{fundraiser.CAPTION}</h2>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Progress
                className="mr-4"
                value={fundraiser.TARGET_FUNDING / fundraiser.CURRENT_FUNDING}
              />
              <label className="w-full text-left">${fundraiser.CURRENT_FUNDING} raised</label>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
