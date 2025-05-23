<template>
  <div>
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-3">
      {{ label }}
    </label>
    <textarea
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :rows="rows"
      :placeholder="placeholder"
      class="block w-full px-4 py-3 text-base border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
    ></textarea>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  rows: {
    type: [String, Number],
    default: 4,
  },
});
defineEmits(["update:modelValue"]);
</script>
