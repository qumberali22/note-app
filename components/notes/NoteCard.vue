<template>
  <div class="flex">
    <div
      class="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col w-full"
    >
      <div class="p-6 flex flex-col flex-grow">
        <h3 class="text-lg font-semibold mb-4">{{ note.title }}</h3>

        <img
          v-if="note.image"
          :src="note.image"
          :alt="note.title"
          class="rounded-md w-full h-48 object-cover mb-4"
        />

        <div class="flex-grow">
          <p class="text-sm text-gray-600 mb-4">{{ note.content }}</p>

          <div
            v-if="note.tasks && note.tasks.length > 0"
            class="space-y-2 mb-4"
          >
            <div
              v-for="(task, index) in note.tasks"
              :key="index"
              class="flex items-start space-x-2"
            >
              <input
                type="checkbox"
                :id="`task-${note.id}-${index}`"
                v-model="task.completed"
                class="h-4 w-4 rounded border-gray-300 text-blue-500 mt-0.5 flex-shrink-0"
              />
              <label
                :for="`task-${note.id}-${index}`"
                class="text-sm leading-relaxed"
                :class="{ 'line-through': task.completed }"
              >
                {{ task.text }}
              </label>
            </div>
          </div>
        </div>

        <div class="text-xs text-gray-500 mt-auto pt-4">
          {{ note.date }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  note: {
    type: Object,
    required: true,
  },
});
</script>
