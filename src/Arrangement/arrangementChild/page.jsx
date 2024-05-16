/* eslint-disable react/prop-types */
import { Reorder } from "framer-motion";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DragItem from "../dragItem";
import { Button } from "../../components/ui/button";
import { TbArrowBackUp } from "react-icons/tb";
import Header from "../../pages/header";
export default function ArrangementChild() {
  const { pathname } = useLocation();
  const [items, setItems] = useState([1, 2, 3, 4]);

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
    <>
    <Header/>
    <div className="flex flex-col overflow-hidden">
      <div className="w-full space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Arrangement - Order Name {value}
          </h2>
        </div>

        <div className="flex flex-col gap-y-5">
          <div>
            <p className="text-gray-500 font-medium text-[15px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
              dolore repudiandae fugit, quidem sunt recusandae eligendi nihil.
              Corrupti quis nam vero laborum, iusto voluptate ipsa eos,
              cupiditate culpa voluptatum cum.
            </p>
          </div>

          <Link to="/Arrangement">
            <Button className="flex gap-x-2 items-center justify-between">
              Go back <TbArrowBackUp fontSize={18} />
            </Button>
          </Link>

          <Reorder.Group axis="y" values={items} onReorder={setItems}>
            {items.map((item) => (
              <DragItem key={item} item={item} />
            ))}
          </Reorder.Group>
        </div>
      </div>
    </div>
    </>
  );
}
