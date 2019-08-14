import * as React from "react";
import debounce from "lodash.debounce";
import { isInViewport } from "../util";

interface Cancelable {
  cancel(): void;
  flush(): void;
}

export interface LazyImagePropsInfo {
  className?: string;
  style?: React.CSSProperties;
  src: string;
}

export interface LazyImageStateInfo {
  loaded: boolean;
  inViewport: boolean;
  trigger: string[];
}

type EventHandler = (() => void) & Cancelable;

class LazyImage extends React.Component<
  LazyImagePropsInfo,
  LazyImageStateInfo
> {
  _handler?: EventHandler = undefined;

  constructor(props: LazyImagePropsInfo) {
    super(props);

    this.state = {
      trigger: ["scroll", "resize"],
      loaded: false,
      inViewport: false
    };
  }

  componentDidMount() {
    const { img: $img } = this.refs;
    const { trigger } = this.state;
    const handler = debounce(this._triggerHandler.bind(this), 100, {
      leading: false,
      trailing: true,
      maxWait: 2000
    });
    for (const event of trigger) {
      addEventListener(event, handler, false);
    }
    handler($img);
    this._handler = handler;
  }

  componentWillUnmount() {
    const { trigger } = this.state;
    const handler = this._handler;
    for (const event of trigger) {
      // @ts-ignore
      removeEventListener(event, handler, false);
    }

    handler && handler.cancel();
  }

  _triggerHandler() {
    const { img: $img } = this.refs;
    if ($img && isInViewport($img as HTMLElement)) {
      this.setState({ inViewport: true, loaded: true });
    } else {
      this.setState({ inViewport: false });
    }
  }

  render() {
    const { src } = this.props;
    const { loaded } = this.state;

    return (
      <img ref="img" {...this.props} src={src && loaded ? src : undefined} />
    );
  }
}

export default LazyImage;
export { LazyImage };
