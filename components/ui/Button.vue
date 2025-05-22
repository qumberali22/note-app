<template>
  <button
    :class="buttonClasses"
    :style="buttonStyles"
    :disabled="disabled"
    :type="type"
    @click="$emit('click', $event)"
  >
    <slot name="icon"></slot>
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "default",
    validator: (value) =>
      [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ].includes(value),
  },
  size: {
    type: String,
    default: "default",
    validator: (value) => ["default", "sm", "lg", "icon"].includes(value),
  },
  className: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "button",
  },
});

defineEmits(["click"]);

// Computed property for button classes and styles
const buttonClasses = computed(() => {
  const baseClasses = [
    "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ];

  // Variant classes
  const variantClasses = {
    default: "text-white hover:opacity-90",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "text-white hover:opacity-90",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    ghost: "text-white hover:opacity-90",
    link: "text-blue-600 underline-offset-4 hover:underline",
  };

  // Size classes
  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-8",
    icon: "h-10 w-10",
  };

  return [
    ...baseClasses,
    variantClasses[props.variant],
    sizeClasses[props.size],
    props.className,
  ]
    .filter(Boolean)
    .join(" ");
});

// Computed property for inline styles
const buttonStyles = computed(() => {
  const styles = {};

  if (props.variant === "outline") {
    styles.backgroundColor = "#090909";
    styles.color = "white";
  } else if (props.variant === "ghost") {
    styles.backgroundColor = "#007AFF";
    styles.color = "white";
  }

  return styles;
});
</script>
