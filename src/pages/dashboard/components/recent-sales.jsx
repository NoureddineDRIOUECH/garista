import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./../../../components/ui/avatar";

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <img src="/RecentSales/1.png" className="rounded-full w-9 h-9" />

        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            Beef Burger with BBQ Sauce
          </p>
        </div>
        <div className="ml-auto font-medium">182</div>
      </div>

      <div className="flex items-center">
        <img src="/RecentSales/2.png" className="rounded-full w-9 h-9" />
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            Beef Burger with Melted Cheese
          </p>
          {/* <p className="text-sm text-muted-foreground">jackson.lee@email.com</p> */}
        </div>
        <div className="ml-auto font-medium">176</div>
      </div>

      <div className="flex items-center">
        <img src="/RecentSales/3.png" className="rounded-full w-9 h-9" />

        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">BrocoChiken Salad</p>
          {/* <p className="text-sm text-muted-foreground">
              isabella.nguyen@email.com
            </p> */}
        </div>
        <div className="ml-auto font-medium">150</div>
      </div>

      <div className="flex items-center">
        <img src="/RecentSales/4.png" className="rounded-full w-9 h-9" />

        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            Chicken Penne Pasta
          </p>
          {/* <p className="text-sm text-muted-foreground">will@email.com</p> */}
        </div>
        <div className="ml-auto font-medium">128</div>
      </div>

      <div className="flex items-center">
        <img src="/RecentSales/5.png" className="rounded-full w-9 h-9" />

        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">500g Fried Chiken</p>
          {/* <p className="text-sm text-muted-foreground">sofia.davis@email.com</p> */}
        </div>
        <div className="ml-auto font-medium">98</div>
      </div>
    </div>
  );
}
