// types/vue-click-outside.d.ts
declare module "vue-click-outside" {
  import type { DirectiveBinding } from "vue";

  const directive: {
    bind(el: HTMLElement, binding: DirectiveBinding): void;
    unbind(el: HTMLElement): void;
  };

  export default directive;
}
