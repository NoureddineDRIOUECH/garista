/* eslint-disable react/prop-types */
import { Card, CardContent } from "@/components/ui/card";
import { useDragControls, Reorder } from "framer-motion";
import { DragIcon } from "./dragIcon";
import { Link, useLocation } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

export default function DragItem({ item }) {
  const { pathname } = useLocation();
  const dragControls = useDragControls();

  const value = getValueAfterArrangement(pathname);

  function getValueAfterArrangement(pathname) {
    const parts = pathname?.split("/");
    const index = parts.indexOf("Arrangement");
    if (index !== -1 && index < parts.length - 1) {
      return parts[index + 1];
    } else {
      return null;
    }
  }

  return (
    <Reorder.Item
      key={item}
      value={item}
      dragListener={false}
      dragControls={dragControls}
    >
      <Card
        key={item}
        className="mt-8 w-fit mx-auto border border-accent rounded-sm hover:shadow-lg transition-all duration-300"
      >
        <CardContent className="p-6">
          <div className="flex flex-row items-center gap-x-14">
            <div className="flex items-center gap-x-10">
              <div className="cursor-grab">
                <DragIcon dragControls={dragControls} />
              </div>

              <img
                src="/Themes/theme-list.png"
                alt="Arrangement-picture"
                width={150}
                className="select-none border border-accent rounded-sm"
              />
            </div>

            <div className="relative select-none">
              <div className="flex flex-col gap-y-1">
                <h1 className="text-base text-black">Order Name {item}</h1>
                {!value && (
                  <Link to={`${item}`}>
                    <div className="flex flex-row items-center gap-x-3 group">
                      <span className="text-[15px] text-gray-400 group-hover:text-black transition-colors duration-300">
                        Number 2{item}
                      </span>

                      <div className="relative text-gray-400 group-hover:text-black mt-[1px] transform group-hover:translate-x-[2px] transition-all duration-300">
                        <FiArrowRight />
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Reorder.Item>
  );
}
