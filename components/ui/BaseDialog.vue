<!-- components/BaseDialog.vue -->
<template>
  <div
    class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
  >
    <div class="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
      <div class="p-6 space-y-4">
        <div class="flex items-center gap-3">
          <component :is="typeIcon" class="h-6 w-6" :class="iconColor" />
          <h3 class="text-lg font-semibold text-gray-900">
            <slot name="title">{{ title }}</slot>
          </h3>
        </div>

        <p class="text-gray-600">
          <slot name="content">{{ content }}</slot>
        </p>

        <div class="flex justify-end gap-3 pt-4">
          <button
            v-if="showCancel"
            @click="$emit('cancel')"
            class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {{ cancelText }}
          </button>
          <button
            @click="$emit('confirm')"
            class="px-4 py-2 rounded-lg transition-colors"
            :class="confirmButtonClasses"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps({
  type: {
    type: String,
    default: "danger",
    validator: (value) =>
      ["success", "info", "warning", "danger"].includes(value),
  },
  title: String,
  content: String,
  confirmText: {
    type: String,
    default: "Confirm",
  },
  cancelText: {
    type: String,
    default: "Cancel",
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["cancel", "confirm"]);

const typeConfig = {
  danger: {
    icon: XCircleIcon,
    iconColor: "text-red-500",
    buttonColor: "bg-red-600 hover:bg-red-700 text-white",
  },
  warning: {
    icon: ExclamationTriangleIcon,
    iconColor: "text-yellow-500",
    buttonColor: "bg-yellow-600 hover:bg-yellow-700 text-white",
  },
  success: {
    icon: CheckCircleIcon,
    iconColor: "text-green-500",
    buttonColor: "bg-green-600 hover:bg-green-700 text-white",
  },
  info: {
    icon: InformationCircleIcon,
    iconColor: "text-blue-500",
    buttonColor: "bg-blue-600 hover:bg-blue-700 text-white",
  },
};

const typeIcon = computed(() => typeConfig[props.type].icon);
const iconColor = computed(() => typeConfig[props.type].iconColor);
const confirmButtonClasses = computed(() => typeConfig[props.type].buttonColor);
</script>
