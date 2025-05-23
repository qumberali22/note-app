<template>
  <div class="relative">
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-30 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-10"
    >
      <div class="p-2 space-y-2">
        <label
          v-for="option in filterOptions"
          :key="option.value"
          class="flex items-center px-3 py-1.5 hover:bg-gray-50 rounded cursor-pointer"
        >
          <input
            type="checkbox"
            v-model="selectedValues"
            :value="option.value"
            class="h-4 w-4 text-blue-500 border-gray-300 rounded"
          />
          <span class="ml-2 text-sm text-gray-700">{{ option.label }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { FILTER_OPTIONS } from "./constant";

const props = defineProps({
  modelValue: {
    type: [Array, String],
    default: () => ["all"],
  },
  isOpen: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const filterOptions = FILTER_OPTIONS;

const selectedValues = ref([...props.modelValue]);

watch(
  selectedValues,
  (newVal) => {
    emit("update:modelValue", newVal);
  },
  { deep: true }
);
</script>
