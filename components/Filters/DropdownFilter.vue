<template>
  <div class="relative">
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-10"
    >
      <div class="p-2 space-y-2">
        <label
          v-for="option in filterOptions"
          :key="option.value"
          class="flex items-center px-3 py-1.5 hover:bg-gray-50 rounded cursor-pointer"
        >
          <input
            type="checkbox"
            :checked="isOptionSelected(option.value)"
            @change="handleOptionChange(option.value)"
            class="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
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
    type: Array,
    default: () => ["all"],
  },
  isOpen: Boolean,
});

const emit = defineEmits(["update:modelValue"]);
const filterOptions = FILTER_OPTIONS;
const selectedValues = ref([...props.modelValue]);
watch(
  () => props.modelValue,
  (newVal) => {
    selectedValues.value = [...newVal];
  }
);

const isOptionSelected = (value) => {
  return selectedValues.value.includes(value);
};

const handleOptionChange = (value) => {
  if (value === "all") {
    selectedValues.value = ["all"];
  } else {
    const currentIndex = selectedValues.value.indexOf(value);
    if (currentIndex > -1) {
      selectedValues.value.splice(currentIndex, 1);
      if (
        selectedValues.value.length === 0 ||
        (selectedValues.value.length === 1 && selectedValues.value[0] === "all")
      ) {
        selectedValues.value = ["all"];
      } else {
        const allIndex = selectedValues.value.indexOf("all");
        if (allIndex > -1) {
          selectedValues.value.splice(allIndex, 1);
        }
      }
    } else {
      const allIndex = selectedValues.value.indexOf("all");
      if (allIndex > -1) {
        selectedValues.value.splice(allIndex, 1);
      }
      selectedValues.value.push(value);
    }
  }

  emit("update:modelValue", [...selectedValues.value]);
};
</script>
