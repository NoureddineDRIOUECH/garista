import { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { axiosInstance } from "../../../../axiosInstance";

export function RecentSalesOrders({orders}) {
 console.log("The Orders SLICE => ", orders.slice(0, 10));

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await axiosInstance.get(`/api/order/${orderId}`);
      return response.data; // Assuming this returns the full order details including items
    } catch (error) {
      console.error("Failed to fetch order details:", error);
      return null; // Return null or appropriate error handling
    }
  };

  const OrderItemsCell = ({ orderId }) => {
    const [items, setItems] = useState(null);
    const [loading, setLoading] = useState(false);
  
    console.log("The Id => ", orderId);
    useEffect(() => {
      setLoading(true);
      fetchOrderDetails(orderId).then(data => {
        setItems(data.dishes); // Assuming the API returns an object with a dishes array
      });
      setLoading(false);
    }, [orderId]);
  
    if (loading) return <span>Loading...</span>;
    if (!items) return <span>No items</span>;
  
    return <span>{items.map(item => item.name).join(', ')}</span>; // Displaying item names as a string
  };

  return (
    <ScrollArea className="h-[350px] w-full rounded-md  p-4">
      <div className="space-y-8">
        {
          orders.length > 0 && orders.map((item, index) => {
            return(
            <div key={index} className="flex items-center">
              <img
                // src={`${APIURL}`}
                className="border border-black rounded-full w-9 h-9 bg-gray-300"
              />

              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{OrderItemsCell({orderId: item.id})}</p>
              </div>
              <div className="ml-auto font-medium">{parseInt(item.total).toFixed(2)} MAD</div>
            </div>
            )
          })
        }

      </div>
    </ScrollArea>
  );
}
