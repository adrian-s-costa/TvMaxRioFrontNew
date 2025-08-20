import { TabItem, Tabs, createTheme, ThemeProvider } from "flowbite-react";
import VideoCard from "./programsCards";

export function TabComponent() {

const customTheme = {
  tabs: {
    base: "flex flex-col gap-2",
    tablist: {
      base: "flex text-center",
      variant: {
        default: "flex-wrap border-b border-gray-200 dark:border-gray-700",
        underline: "-mb-px flex-wrap border-b border-gray-200 dark:border-gray-700",
        pills:
          "flex-wrap space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400",
        fullWidth:
          "grid w-full grid-flow-col divide-x divide-gray-200 rounded-none text-sm font-medium shadow dark:divide-gray-700 dark:text-gray-400",
      },
      tabitem: {
        base: "flex items-center justify-center rounded-t-lg p-4 text-sm font-medium first:ml-0 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
        variant: {
          default: {
            base: "rounded-t-lg",
            active: {
              on: "bg-gray-100 text-primary-600 dark:bg-gray-800 dark:text-primary-500",
              off: "text-gray-500 hover:bg-gray-50 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300",
            },
          },
          underline: {
            base: "rounded-t-lg",
            active: {
              on: "rounded-t-lg border-b-2 border-white text-white dark:border-primary-500 dark:text-primary-500",
              off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
            },
          },
          pills: {
            base: "",
            active: {
              on: "rounded-lg bg-primary-600 text-white",
              off: "rounded-lg hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white",
            },
          },
          fullWidth: {
            base: "ml-0 flex w-full rounded-none first:ml-0",
            active: {
              on: "rounded-none bg-gray-100 p-4 text-gray-900 dark:bg-gray-700 dark:text-white",
              off: "rounded-none bg-white hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white",
            },
          },
        },
        icon: "mr-2 h-5 w-5",
      },
    },
    tabitemcontainer: {
      base: "",
      variant: {
        default: "",
        underline: "",
        pills: "",
        fullWidth: "",
      },
    },
    tabpanel: "py-3",
  },
};

  return (
    <ThemeProvider theme={customTheme}>
    <Tabs className="" aria-label="Tabs with icons" variant="underline">
      <TabItem active title="Temporada 1" className="">
        <div className='flex justify-between'>
          <VideoCard
            image="https://res.cloudinary.com/dmo7nzytn/image/upload/v1755659104/3c575843646e55ad599a10779f42f2eea6934552_1_ijgpfl.png"
            title="Conexão 21"
            subtitle="Segunda às 20h"
          />
          <VideoCard
            image="https://res.cloudinary.com/dmo7nzytn/image/upload/v1755659104/3c575843646e55ad599a10779f42f2eea6934552_1_ijgpfl.png"
            title="Conexão 21"
            subtitle="Segunda às 20h"
          />
          <VideoCard
            image="https://res.cloudinary.com/dmo7nzytn/image/upload/v1755659104/3c575843646e55ad599a10779f42f2eea6934552_1_ijgpfl.png"
            title="Conexão 21"
            subtitle="Segunda às 20h"
          />
          <VideoCard
            image="https://res.cloudinary.com/dmo7nzytn/image/upload/v1755659104/3c575843646e55ad599a10779f42f2eea6934552_1_ijgpfl.png"
            title="Conexão 21"
            subtitle="Segunda às 20h"
          />
          <VideoCard
            image="https://res.cloudinary.com/dmo7nzytn/image/upload/v1755659104/3c575843646e55ad599a10779f42f2eea6934552_1_ijgpfl.png"
            title="Conexão 21"
            subtitle="Segunda às 20h"
          />
        </div>
      </TabItem>
      <TabItem title="Temporada 2">
        This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</span>.
        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
        control the content visibility and styling.
      </TabItem>
      <TabItem title="Temporada 3">
        This is <span className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</span>.
        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
        control the content visibility and styling.
      </TabItem>
      <TabItem title="Temporada 4">
        This is <span className="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</span>.
        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
        control the content visibility and styling.
      </TabItem>
    </Tabs>
    </ThemeProvider>
  );
}
