import { Builder, BuilderBlocks, BuilderElement } from "@builder.io/react";

import { useState } from "react";

type TabProps = {
  tabList: { tabName: string; blocks: React.ReactNode[] }[];
  builderBlock: BuilderElement;
};

export default function CustomTabs({ tabList, builderBlock }: TabProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (!tabList?.length) return null;

  return (
    <>
      <div className="tab-buttons">
        {tabList.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${activeTab === index ? "active" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.tabName}
          </button>
        ))}
      </div>

      <BuilderBlocks
        parentElementId={builderBlock?.id}
        dataPath={`tabList.${activeTab}.blocks`}
        blocks={tabList[activeTab].blocks}
      />
    </>
  );
}

Builder.registerComponent(CustomTabs, {
  name: "TabFields",
  inputs: [
    {
      name: "tabList",
      type: "array",
      defaultValue: [],
      subFields: [
        {
          name: "tabName",
          type: "string",
        },
        {
          name: "blocks",
          type: "uiBlocks",
          hideFromUI: true,
          defaultValue: [],
        },
      ],
    },
  ],
});
