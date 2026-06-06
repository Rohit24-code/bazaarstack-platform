// 🛠️ Enterprise Asset Translation Blueprint
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.svg" {
  import * as React from "react";
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
  export { ReactComponent };
}

declare module "*.png" {
  const src: string;
  export default src;
}
