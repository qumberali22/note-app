<template>
  <div class="flex items-center space-x-4">
    <div
      v-if="modelValue"
      class="relative w-24 h-24 border-2 border-gray-200 rounded-lg overflow-hidden"
    >
      <img :src="modelValue" alt="Preview" class="w-full h-full object-cover" />
      <button
        @click="removeImage"
        class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
      >
        <XMarkIcon class="h-4 w-4" />
      </button>
    </div>
    <div v-else class="flex-1">
      <label
        class="flex flex-col items-center justify-center w-full h-32 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors"
      >
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <CloudArrowUpIcon class="w-8 h-8 mb-2 text-blue-500" />
          <p class="text-sm text-blue-600 font-medium">
            Click to upload or drag and drop
          </p>
          <p class="text-xs text-blue-400 mt-1">SVG, PNG, JPG or GIF</p>
        </div>
        <input
          type="file"
          class="hidden"
          accept="image/*"
          @change="handleFileUpload"
        />
      </label>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";
import { XMarkIcon, CloudArrowUpIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      emit("update:modelValue", e.target.result);
    };
    reader.readAsDataURL(file);
  }
};

const removeImage = () => {
  emit("update:modelValue", "");
};
</script>
