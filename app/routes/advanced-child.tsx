import { BuilderComponent, builder } from "@builder.io/react";

import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import CustomTabs from "./components/CustomTabs";

builder.init("74eefffba4a442fe8737f96a03df502a");

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const page = await builder
    .get("advanced-child", {
      userAttributes: {
        urlPath: `/${request.url.split("/").pop()}`,
      },
    })
    .promise();

  if (!page) {
    throw new Response("Page Not Found", {
      status: 404,
    });
  }

  return { page };
};

export default function AdvancedChild() {
  const { page } = useLoaderData<typeof loader>();

  console.log("page", page);
  return (
    <BuilderComponent
      model="advanced-child"
      content={page}
      customComponents={CustomTabs}
    />
  );
}
