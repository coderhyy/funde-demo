/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { createAlova } from "alova";
import adapterFetch from "alova/fetch";
import { useEffect, useState } from "react";

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

const FundraiserPage = () => {
  // 初始化一个空的Fundraiser对象
  const handleDonateClick = () => {
    alert("This feature is under construction");
  };
  const alovaInstance = createAlova({
    baseURL: "http://localhost:3000", // 替换为你的 API 基地址
    requestAdapter: adapterFetch(),
  });
  const urlParams = new URLSearchParams(window.location.search);
  const fundraiserId = urlParams.get("id");
  const [fundraiser, setFundraiser] = useState<Fundraiser>({
    ACTIVE: 0,
    CAPTION: "",
    CATEGORY_ID: 0,
    CITY: "",
    CURRENT_FUNDING: 0,
    FUNDRAISER_ID: 0,
    ORGANIZER: "",
    TARGET_FUNDING: 0,
  });
  useEffect(() => {
    alovaInstance
      .Get(`/api/fundraiser/${fundraiserId}`)
      .send()
      .then((response: any) => response.json())
      .then((data) => {
        setFundraiser(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="mx-auto max-w-4xl p-8">
      <div className="mb-4 grid gap-4 rounded-lg bg-white p-6 shadow-md">
        <img alt="Need your help" className="aspect-video w-1/2" src="/need your help.webp" />

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
      <Button className="mb-4" onClick={() => handleDonateClick()} variant="ghost">
        Donate
      </Button>
    </div>
  );
};
export default FundraiserPage;
