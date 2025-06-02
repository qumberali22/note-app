<template>
  <div>
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-3">
      {{ label }}
    </label>
    <div class="relative">
      <select
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
        class="block w-full px-4 py-3 text-base border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
      >
        <slot></slot>
      </select>
      <div
        class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"
      >
        <ChevronDownIcon class="w-4 h-4 text-gray-400" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronDownIcon } from "@heroicons/vue/24/outline";

defineProps({
  modelValue: [String, Number],
  label: String,
});
defineEmits(["update:modelValue"]);
</script>
