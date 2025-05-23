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
          <XMarkIcon class="h-6 w-6" />
        </button>
      </div>

      <div class="p-6 space-y-6">
        <BaseSelect v-model="noteType" label="Select type of note">
          <option value="0">Default (Title & Description)</option>
          <option value="1">Image (Title, Description & Image)</option>
          <option value="2">Checklist (Title, Description & Tasks)</option>
        </BaseSelect>

        <BaseInput
          v-model="note.title"
          label="Header"
          placeholder="Enter note title"
        />

        <ImageUploader v-if="noteType === '1'" v-model="note.image" />

        <BaseTextarea
          v-model="note.content"
          label="Description"
          placeholder="Enter note description"
        />

        <ChecklistManager v-if="noteType === '2'" v-model="note.tasks" />
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
import BaseSelect from "../ui/BaseSelect.vue";
import ImageUploader from "./ImageUploader.vue";
import ChecklistManager from "./ChecklistManager.vue";
import { DocumentArrowDownIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import BaseInput from "../ui/BaseInput.vue";
import BaseTextarea from "../ui/BaseTextarea.vue";

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
      if (note.value.tasks?.length > 0) {
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
  if (newType === "2" && !note.value.tasks?.length) {
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
  if (noteType.value !== "2") delete note.value.tasks;
  if (noteType.value !== "1") delete note.value.image;

  note.value.type = `type${noteType.value}`;

  emit("save", note.value);
  close();
}
</script>
