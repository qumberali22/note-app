<template>
  <div class="container mx-auto px-4 py-8">
    <div
      class="border border-gray-200 rounded-md px-3 py-1 font-medium inline-block mb-6"
    >
      Test project
    </div>

    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold">Title</h1>

      <div class="flex space-x-2">
        <Button variant="outline" @click="showFilters = !showFilters">
          <template #icon>
            <FunnelIcon class="w-4 h-4 mr-2 inline-block" />
          </template>
          Filter
        </Button>

        <Button variant="ghost" @click="showAddForm = true">
          <template #icon>
            <PlusIcon class="w-4 h-4 mr-2 inline-block" />
          </template>
          Add New
        </Button>
      </div>
    </div>

    <!-- Filters -->
    <div v-if="showFilters" class="mb-6 p-4 bg-gray-50 rounded-lg">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Search</label>
          <input
            v-model="filters.search"
            placeholder="Search notes..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div class="flex items-center space-x-2">
          <input
            type="checkbox"
            id="has-tasks"
            v-model="filters.hasTasks"
            class="h-4 w-4 rounded border-gray-300 text-blue-500"
          />
          <label for="has-tasks" class="text-sm">
            Only show notes with tasks
          </label>
        </div>

        <div class="flex items-center space-x-2">
          <input
            type="checkbox"
            id="has-image"
            v-model="filters.hasImage"
            class="h-4 w-4 rounded border-gray-300 text-blue-500"
          />
          <label for="has-image" class="text-sm">
            Only show notes with images
          </label>
        </div>
      </div>
    </div>

    <!-- Notes Grid -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <NoteCard v-for="note in notes" :key="note.id" :note="note" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { FunnelIcon, PlusIcon } from "@heroicons/vue/24/outline";
import Button from "@/components/ui/Button.vue";
import NoteCard from "@/components/notes/NoteCard.vue";

const showFilters = ref(false);
const showAddForm = ref(false);

const filters = ref({
  search: "",
  hasTasks: false,
  hasImage: false,
});

const notes = ref([
  {
    id: "1",
    title: "Lorem ipsum dolor sit amet",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "2025-05-20",
  },
  {
    id: "2",
    title: "Lorem ipsum dolor sit amet",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    date: "2025-05-19",
  },
  {
    id: "3",
    title: "Lorem ipsum dolor sit amet",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "2025-05-18",
  },
  {
    id: "4",
    title: "Lorem ipsum dolor sit amet",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
    tasks: [
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        completed: true,
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        completed: false,
      },
    ],
    date: "2025-05-17",
  },
  {
    id: "5",
    title: "Lorem ipsum dolor sit amet",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
    date: "2025-05-16",
  },
  {
    id: "6",
    title: "Lorem ipsum dolor sit amet",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "2025-05-15",
  },
  {
    id: "7",
    title: "Lorem ipsum dolor sit amet",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
    tasks: [
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        completed: true,
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        completed: true,
      },
    ],
    date: "2025-05-14",
  },
  {
    id: "8",
    title: "Lorem ipsum dolor sit amet",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "2025-05-13",
  },
]);
</script>
