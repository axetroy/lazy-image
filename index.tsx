import * as React from "react";
import LazyImage from "./react";
import images from "./images1.json";

interface AppPropsInfo {}

interface AppStateInfo {}

export default class App extends React.Component<AppPropsInfo, AppStateInfo> {
  constructor(props: AppPropsInfo) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h2>React Version</h2>

        <div>
          {images.map((src: string) => {
            return (
              <LazyImage style={{ maxWidth: "100%" }} key={src} src={src} />
            );
          })}
        </div>
      </div>
    );
  }
}
