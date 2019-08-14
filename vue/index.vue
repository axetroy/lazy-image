<template>
  <img ref="img" :src="src && loaded ? src : undefined" />
</template>

<script lang="ts">
import Vue from "vue";
import debounce from "lodash.debounce";
import { isInViewport } from "../util";

interface Data {
  trigger: string[];
  loaded: boolean;
  inViewport: boolean;
}

interface Cancelable {
  cancel(): void;
  flush(): void;
}

type EventHandler = (() => void) & Cancelable;

export default Vue.extend({
  name: "lazy-image",
  data(): Data {
    return {
      trigger: ["scroll", "resize"],
      loaded: false,
      inViewport: false
    };
  },
  props: {
    src: {
      type: String,
      default: undefined
    }
  },
  methods: {
    _triggerHandler() {
      const { img: $img } = this.$refs;
      if ($img && isInViewport($img as HTMLElement)) {
        this.inViewport = true;
        this.loaded = true;
      } else {
        this.inViewport = false;
      }
    }
  },
  mounted() {
    const { img: $img } = this.$refs;
    const { trigger } = this;
    const handler = debounce(this._triggerHandler.bind(this), 100, {
      leading: false,
      trailing: true,
      maxWait: 2000
    });
    for (const event of trigger) {
      addEventListener(event, handler, false);
    }
    handler($img);
    // @ts-ignore
    this._handler = handler;
  },
  beforeDestroy() {
    const { trigger } = this;
    // @ts-ignore
    const handler: EventHandler = this._handler;
    for (const event of trigger) {
      removeEventListener(event, handler, false);
    }

    handler && handler.cancel();
  }
});
</script>