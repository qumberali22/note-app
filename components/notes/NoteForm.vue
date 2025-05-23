<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-500/30 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
  >
    <BaseDialog
      v-if="showDeleteConfirmation"
      type="danger"
      @close="showDeleteConfirmation = false"
      @confirm="handleDeleteConfirm"
    >
      <template #title>Delete Note</template>
      <template #content
        >Are you sure you want to delete this note? This action cannot be
        undone.</template
      >
    </BaseDialog>

    <div class="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
      <div class="flex justify-between items-center px-6 pt-6 pb-4">
        <h2 class="text-2xl font-semibold text-gray-900">
          {{ isEditing ? "Edit Note" : "Edit Cart" }}
        </h2>
        <button
          @click="close"
          class="text-gray-400 hover:text-gray-600 transition-colors p-1"
        >
          <XMarkIcon class="h-6 w-6" />
        </button>
      </div>

      <div class="px-6 space-y-4">
        <BaseSelect
          v-model="noteType"
          :label="`Select type of ${isEditing ? 'note' : 'card'}`"
        >
          <option value="0">
            {{
              isEditing ? "Default (Title & Description)" : "Default Cart Style"
            }}
          </option>
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
          placeholder="Text Placeholder"
          :rows="4"
        />
        <ChecklistManager v-if="noteType === '2'" v-model="note.tasks" />
      </div>
      <div class="px-6 py-6 flex gap-3">
        <button
          v-if="isEditing"
          @click="showDeleteConfirmation = true"
          type="button"
          class="flex-1 flex items-center justify-center px-4 py-3 bg-red-50 text-red-600 rounded-[36px] font-medium hover:bg-red-100 transition-colors"
        >
          <TrashIcon class="h-5 w-5 mr-2" />
          Delete
        </button>

        <button
          @click="saveNote"
          type="button"
          :disabled="!isFormValid"
          class="flex-1 flex items-center justify-center px-4 py-3 text-white rounded-[36px] font-medium transition-colors"
          :class="{
            'bg-blue-600 hover:bg-blue-700': isFormValid,
            'bg-gray-300 cursor-not-allowed': !isFormValid,
          }"
        >
          <DocumentArrowDownIcon class="h-5 w-5 mr-2 stroke-current" />
          {{ isEditing ? "Update" : "Save" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import BaseInput from "../ui/BaseInput.vue";
import BaseTextarea from "../ui/BaseTextarea.vue";
import BaseSelect from "../ui/BaseSelect.vue";
import ImageUploader from "./ImageUploader.vue";
import ChecklistManager from "./ChecklistManager.vue";
import BaseDialog from "../ui/BaseDialog";
import {
  TrashIcon,
  DocumentArrowDownIcon,
  XMarkIcon,
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

const emit = defineEmits(["close", "save", "delete"]);

const isEditing = computed(() => !!props.editNote);
const showDeleteConfirmation = ref(false);

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
      noteType.value = note.value.tasks?.length
        ? "2"
        : note.value.image
        ? "1"
        : "0";
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
  const { title, image, tasks } = note.value;
  if (!title.trim()) return false;

  return noteType.value === "1"
    ? !!image
    : noteType.value === "2"
    ? tasks.length > 0 && tasks.every((t) => t.text.trim())
    : true;
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

  const cleanedNote = { ...note.value };
  if (noteType.value !== "2") delete cleanedNote.tasks;
  if (noteType.value !== "1") delete cleanedNote.image;
  cleanedNote.type = `type${noteType.value}`;

  emit("save", cleanedNote);
  close();
}

function handleDeleteConfirm() {
  emit("delete", note.value.id);
  showDeleteConfirmation.value = false;
  close();
}
</script>
