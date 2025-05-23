<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-500/30 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
  >
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
      <div
        class="flex justify-between items-center p-6 border-b border-gray-100"
      >
        <h2 class="text-xl font-semibold text-gray-900">
          {{ isEditing ? "Edit Note" : "Create New Note" }}
        </h2>
        <button
          @click="close"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div class="p-6 space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">
            Select type of note
          </label>
          <div class="relative">
            <select
              v-model="noteType"
              class="block w-full px-4 py-3 text-base border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="0">Default (Title & Description)</option>
              <option value="1">Image (Title, Description & Image)</option>
              <option value="2">Checklist (Title, Description & Tasks)</option>
            </select>
            <div
              class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"
            >
              <svg
                class="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">
            Header
          </label>
          <input
            v-model="note.title"
            type="text"
            class="block w-full px-4 py-3 text-base border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter note title"
          />
        </div>

        <div v-if="noteType === '1'">
          <div class="flex items-center space-x-4">
            <div
              v-if="note.image"
              class="relative w-24 h-24 border-2 border-gray-200 rounded-lg overflow-hidden"
            >
              <img
                :src="note.image"
                alt="Preview"
                class="w-full h-full object-cover"
              />
              <button
                @click="removeImage"
                class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div v-if="!note.image" class="flex-1">
              <label
                class="flex flex-col items-center justify-center w-full h-32 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <div
                  class="flex flex-col items-center justify-center pt-5 pb-6"
                >
                  <svg
                    class="w-8 h-8 mb-2 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p class="text-sm text-blue-600 font-medium">
                    Click to upload or drag and drop
                  </p>
                  <p class="text-xs text-blue-400 mt-1">SVG, PNG, JPG or GIF</p>
                </div>
                <input
                  type="file"
                  class="hidden"
                  accept="image/*"
                  @change="handleImageUpload"
                />
              </label>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">
            Description
          </label>
          <textarea
            v-model="note.content"
            rows="4"
            class="block w-full px-4 py-3 text-base border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Enter note description"
          ></textarea>
        </div>
        <div v-if="noteType === '2'">
          <div class="flex justify-between items-center mb-3">
            <label class="block text-sm font-medium text-gray-700"
              >Add option</label
            >
          </div>

          <div class="space-y-3">
            <div
              v-for="(task, index) in note.tasks"
              :key="index"
              class="flex items-center space-x-3"
            >
              <input
                type="text"
                v-model="task.text"
                class="flex-1 px-4 py-3 text-base border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Text Placeholder"
              />
              <button
                @click="removeTask(index)"
                type="button"
                class="text-red-500 hover:text-red-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          <button
            @click="addTask"
            type="button"
            class="w-full mt-4 inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add option
          </button>
        </div>
      </div>

      <div class="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <button
          @click="saveNote"
          type="button"
          :disabled="!isFormValid"
          class="w-full inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
          :class="{
            'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500': isFormValid,
            'bg-gray-300 cursor-not-allowed hover:bg-gray-300 focus:ring-gray-300':
              !isFormValid,
          }"
        >
          <DocumentArrowDownIcon class="h-5 w-5 mr-2 stroke-current" />
          {{ isEditing ? "Update" : "Create" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import Button from "../ui/Button.vue";
import {
  ArrowDownOnSquareIcon,
  DocumentArrowDownIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  editNote: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["close", "save"]);

const isEditing = computed(() => !!props.editNote);

const note = ref({
  id: "",
  title: "",
  content: "",
  image: "",
  tasks: [],
  date: "",
});

const noteType = ref("0");

watch(
  () => props.editNote,
  (newVal) => {
    if (newVal) {
      note.value = JSON.parse(JSON.stringify(newVal));
      if (note.value.tasks && note.value.tasks.length > 0) {
        noteType.value = "2";
      } else if (note.value.image) {
        noteType.value = "1";
      } else {
        noteType.value = "0";
      }
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

watch(noteType, (newType) => {
  if (newType === "2" && (!note.value.tasks || !note.value.tasks.length)) {
    note.value.tasks = [{ text: "", completed: false }];
  }
});

const isFormValid = computed(() => {
  const { title, content, image, tasks } = note.value;

  if (!title.trim()) return false;

  switch (noteType.value) {
    case "1":
      return !!image;
    case "2":
      return tasks.length > 0 && tasks.every((task) => task.text.trim());
    default:
      return true;
  }
});

function close() {
  resetForm();
  emit("close");
}

function resetForm() {
  note.value = {
    id: "",
    title: "",
    content: "",
    image: "",
    tasks: [],
    date: "",
  };
  noteType.value = "0";
}

function saveNote() {
  if (!note.value.title.trim()) {
    alert("Please enter a title for the note");
    return;
  }

  if (!isEditing.value) {
    note.value.date = new Date().toISOString().split("T")[0];
    note.value.id = Date.now().toString();
  }

  if (noteType.value !== "2") {
    delete note.value.tasks;
  }

  if (noteType.value !== "1") {
    delete note.value.image;
  }

  note.value.type = `type${noteType.value}`;

  emit("save", note.value);
  close();
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      note.value.image = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function removeImage() {
  note.value.image = "";
}

function addTask() {
  if (!note.value.tasks) {
    note.value.tasks = [];
  }
  note.value.tasks.push({ text: "", completed: false });
}

function removeTask(index) {
  note.value.tasks.splice(index, 1);
}
</script>
