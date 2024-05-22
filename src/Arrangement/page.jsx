import { useState } from "react";
import { Reorder } from "framer-motion";
import DragItem from "./dragItem";
import Header from "../pages/header";
export default function Arrangement() {
  const [items, setItems] = useState([1, 2, 3, 4]);

  return (
    <>
    <Header/>
    <div className="flex flex-col overflow-hidden">
      <div className="w-full space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Arrangement</h2>
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
