import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { ColorPicker } from "primereact/colorpicker";

// import "react-device-frameset/styles/marvel-devices.min.css";
import "./page.css";
import Header from '../pages/header';
const backgroundColors = [
  { color: "#E72929", colorName: "Red" },
  { color: "#FB6D48", colorName: "Orange" },
  { color: "#008DDA", colorName: "Blue" },
  { color: "#FFF455", colorName: "Yellow" },
  { color: "#DDDDDD", colorName: "Grey" },
  { color: "#503C3C", colorName: "Brown" },
];

export default function Menu() {
  const [isTheme1, setIsTheme1] = useState(true);
  const [isTheme2, setIsTheme2] = useState(false);
  const [isTheme3, setIsTheme3] = useState(false);
  const [isTheme4, setIsTheme4] = useState(false);

  const [layoutSel, setLayoutSel] = useState("theme-grid");
  const [headerSel, setHeaderSel] = useState("logo-header");

  const [bgColorSel, setBgColor] = useState("#000000");

  const [primaryColor, setPrimaryColor] = useState("#5F6F52");
  const [secondaryColor, setSecondaryColor] = useState("#B99470");

  const handleThemeSelection = (number) => {
    switch (number) {
      case 1:
        setIsTheme1(true);
        setIsTheme2(false);
        setIsTheme3(false);
        setIsTheme4(false);
        break;
      case 2:
        setIsTheme2(true);
        setIsTheme1(false);
        setIsTheme3(false);
        setIsTheme4(false);
        break;
      case 3:
        setIsTheme3(true);
        setIsTheme1(false);
        setIsTheme2(false);
        setIsTheme4(false);
        break;
      case 4:
        setIsTheme4(true);
        setIsTheme1(false);
        setIsTheme2(false);
        setIsTheme3(false);
        break;
    }
  };

  const handleLayoutSelection = (layout) => {
    setLayoutSel(layout);
  };

  const handleHeadingSelection = (header) => {
    setHeaderSel(header);
  };

  const handleBgColorSelection = (bgColor) => {
    setBgColor(bgColor);
  };

  return (
    <>
    <Header/>
    <div className="hidden flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Menu</h2>
        </div>

        <div className="flex justify-between items-start gap-x-8">
          <Tabs defaultValue="themes" className="w-1/2">
            <TabsList className="grid gap-x-4 w-full grid-cols-2">
              <TabsTrigger value="themes">Themes</TabsTrigger>
              <TabsTrigger value="customization">Customization</TabsTrigger>
            </TabsList>

            <TabsContent value="themes">
              <div className="mt-8">
                <div className="flex flex-col">
                  <h1 className="text-lg font-medium">Theme Picker</h1>
                  <p className="text-gray-500 text-[15px] font-medium">
                    Select your preferred theme to personalize your experience.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 grid-cols-1 grid-rows-2 place-items-center gap-4 mt-6">
                  <div
                    onClick={() => handleThemeSelection(1)}
                    className={`"overflow-hidden outline outline-[2px] ${
                      isTheme1 ? "outline-black/90" : "outline-muted"
                    } border-[8px] border-white w-full h-[200px] rounded-[1px] hover:bg-bottom transition-all ease-in-out duration-700 theme-1`}
                  ></div>

                  <div
                    onClick={() => handleThemeSelection(2)}
                    className={`"overflow-hidden outline outline-[2px] ${
                      isTheme2 ? "outline-black" : "outline-muted"
                    } border-[8px] border-white w-full h-[200px] rounded-[1px] hover:bg-bottom transition-all ease-in-out duration-700 theme-2`}
                  ></div>

                  <div
                    onClick={() => handleThemeSelection(3)}
                    className={`"overflow-hidden outline outline-[2px] ${
                      isTheme3 ? "outline-black" : "outline-muted"
                    } border-[8px] border-white w-full h-[200px] rounded-[1px] hover:bg-bottom transition-all ease-in-out duration-700 theme-3`}
                  ></div>

                  <div
                    onClick={() => handleThemeSelection(4)}
                    className={`"overflow-hidden outline outline-[2px] ${
                      isTheme4 ? "outline-black" : "outline-muted"
                    } border-[8px] border-white w-full h-[200px] rounded-[1px] hover:bg-bottom transition-all ease-in-out duration-700 theme-4`}
                  ></div>
                </div>
              </div>

              <hr className="my-10" />

              <div>
                <div className="flex flex-col">
                  <h1 className="text-lg font-medium">Layout Selector</h1>
                  <p className="text-gray-500 text-[15px] font-medium">
                    Choose between two layout options.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 grid-cols-1 grid-rows-1 gap-4 mt-6">
                  <div
                    onClick={() => handleLayoutSelection("theme-grid")}
                    className={`"overflow-hidden outline outline-[2px] ${
                      layoutSel === "theme-grid"
                        ? "outline-black/90"
                        : "outline-muted"
                    } rounded-[1px] hover:bg-bottom transition-all ease-in-out duration-700`}
                  >
                    <img src="/Themes/theme-grid.png" alt="theme-grid" />
                  </div>

                  <div
                    onClick={() => handleLayoutSelection("theme-list")}
                    className={`"overflow-hidden outline outline-[2px] ${
                      layoutSel === "theme-list"
                        ? "outline-black/90"
                        : "outline-muted"
                    } rounded-[1px] hover:bg-bottom transition-all ease-in-out duration-700`}
                  >
                    <img src="/Themes/theme-list.png" alt="theme-list" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="customization">
              <div className="mt-8">
                <div className="flex flex-col">
                  <h1 className="text-lg font-medium">App Heading</h1>
                  <p className="text-gray-500 text-[15px] font-medium">
                    Choosing the right header between a logo & text.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 grid-cols-1 grid-rows-1 gap-4 mt-6">
                  <div
                    onClick={() => handleHeadingSelection("logo-header")}
                    className={`"overflow-hidden outline outline-[2px] ${
                      headerSel === "logo-header"
                        ? "outline-black/90"
                        : "outline-muted"
                    } rounded-[1px] hover:bg-bottom transition-all ease-in-out duration-700`}
                  >
                    <img src="/Themes/theme-grid.png" alt="theme-grid" />
                  </div>

                  <div
                    onClick={() => handleHeadingSelection("text-header")}
                    className={`"overflow-hidden outline outline-[2px] ${
                      headerSel === "text-header"
                        ? "outline-black/90"
                        : "outline-muted"
                    } rounded-[1px] hover:bg-bottom transition-all ease-in-out duration-700`}
                  >
                    <img src="/Themes/theme-list.png" alt="theme-list" />
                  </div>
                </div>
              </div>

              <hr className="my-10" />

              <div>
                <div className="flex flex-col">
                  <h1 className="text-lg font-medium">App Background</h1>
                  <p className="text-gray-500 text-[15px] font-medium">
                    Customize and change the color palette of your
                    application&apos;s backdrop.
                  </p>
                </div>

                <div className="mt-6">
                  <div className="grid grid-cols-3 grid-rows-2 gap-2">
                    {backgroundColors.map((bc, i) => (
                      <button
                        onClick={() => handleBgColorSelection(bc.color)}
                        key={i}
                        style={{
                          borderColor: `${
                            bgColorSel === bc.color ? bgColorSel : "#f1f5f9"
                          }`,
                        }}
                        className="inline-flex items-center text-sm font-medium ring-offset-background transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 justify-start border-2 border-accent"
                      >
                        <span
                          style={{ backgroundColor: `${bc.color}` }}
                          className="mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-slate-700"
                        >
                          {bgColorSel === bc.color && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-4 h-4 text-white"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          )}
                        </span>
                        {bc.colorName}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <hr className="my-10" />

              <div>
                <div className="flex flex-col">
                  <h1 className="text-lg font-medium">
                    Primary & Secondary Color
                  </h1>
                  <p className="text-gray-500 text-[15px] font-medium">
                    Personalize the color palette of primary & secondary text
                    color.
                  </p>
                </div>

                <div className="mt-6 flex flex-row gap-x-10 gap-y-8 justify-start items-center">
                  <div className="pt-4 pb-4 px-3 border-[2px] border-accent rounded-sm">
                    <h1 className="mb-2 font-medium text-[0.875rem]">
                      Primary
                    </h1>

                    <div className="card-menu-menu-menu-menu-menu-menu-menu-menu flex justify-content-center">
                      <ColorPicker
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.value)}
                      />
                    </div>
                  </div>

                  <div className="pt-4 pb-4 px-3 border-[2px] border-accent rounded-sm">
                    <h1 className="mb-2 font-medium text-[0.875rem]">
                      Secondary
                    </h1>

                    <div className="card-menu-menu-menu-menu-menu-menu-menu-menu flex justify-content-center">
                      <ColorPicker
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="fixed right-[46px]">
            <div className="relative border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[500px] w-[280px]">
              <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
              <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
              <div className="rounded-[2rem] overflow-hidden w-[252px] h-[472px] bg-white dark:bg-gray-800"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
