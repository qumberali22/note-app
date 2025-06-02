<template>
  <div>
    <div class="flex justify-between items-center mb-3">
      <label class="block text-sm font-medium text-gray-700">Add option</label>
    </div>

    <div class="space-y-3">
      <div
        v-for="(task, index) in modelValue"
        :key="index"
        class="flex items-center space-x-3"
      >
        <input
          type="text"
          :modelValue="task.text"
          @input="updateTask(index, $event.target.value)"
          class="flex-1 px-4 py-3 text-base border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Text Placeholder"
        />
        <button
          @click="removeTask(index)"
          type="button"
          class="text-red-500 hover:text-red-700 transition-colors"
        >
          <TrashIcon class="h-5 w-5" />
        </button>
      </div>
    </div>

    <button
      @click="addTask"
      type="button"
      class="w-full mt-4 inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
    >
      <PlusIcon class="h-5 w-5 mr-2" />
      Add option
    </button>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";
import { TrashIcon, PlusIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  modelValue: Array,
});

const emit = defineEmits(["update:modelValue"]);

const addTask = () => {
  const newTasks = [...props.modelValue, { text: "", completed: false }];
  emit("update:modelValue", newTasks);
};

const removeTask = (index) => {
  const newTasks = props.modelValue.filter((_, i) => i !== index);
  emit("update:modelValue", newTasks);
};

const updateTask = (index, text) => {
  const newTasks = [...props.modelValue];
  newTasks[index].text = text;
  emit("update:modelValue", newTasks);
};
</script>
