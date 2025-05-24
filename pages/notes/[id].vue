<template>
  <div class="container mx-auto px-4 py-8">
    <Header />

    <div class="mb-6">
      <Button variant="ghost" @click="goBack" class="flex items-center">
        <ArrowLeftIcon class="w-4 h-4 mr-2" />
        Back to Notes
      </Button>
    </div>

    <div v-if="!note" class="text-center py-12">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Note Not Found</h2>
      <p class="text-gray-600 mb-6">
        The note you're looking for doesn't exist.
      </p>
      <Button @click="goBack">Go Back</Button>
    </div>

    <div v-else class="max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Note header -->
        <div
          class="px-6 py-4 border-b border-gray-200 flex justify-between items-start"
        >
          <div class="flex-1">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">
              {{ note.title }}
            </h1>
            <p class="text-sm text-gray-500">{{ formatDate(note.date) }}</p>
          </div>
          <div class="flex space-x-2">
            <Button variant="outline" @click="editNote">
              <PencilIcon class="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="outline"
              @click="showDeleteConfirmation = true"
              class="text-red-600 hover:text-red-700"
            >
              <TrashIcon class="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        <!-- Note body -->
        <div class="p-6">
          <!-- Image type note -->
          <div v-if="note.type === 'type1' && note.image" class="mb-6">
            <img
              :src="note.image"
              :alt="note.title"
              class="w-full h-64 object-cover rounded-lg"
            />
          </div>

          <div v-if="note.content" class="mb-6">
            <div class="prose max-w-none">
              <p class="text-gray-700 whitespace-pre-wrap">
                {{ note.content }}
              </p>
            </div>
          </div>

          <div
            v-if="note.type === 'type2' && note.tasks?.length"
            class="space-y-2"
          >
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Tasks</h3>
            <div
              v-for="(task, index) in note.tasks"
              :key="index"
              class="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <input
                type="checkbox"
                :checked="task.completed"
                @change="toggleTask(index)"
                class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
              />
              <span
                :class="
                  task.completed
                    ? 'line-through text-gray-500'
                    : 'text-gray-700'
                "
                class="flex-1"
              >
                {{ task.text }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <NoteForm
      :is-open="showEditForm"
      :edit-note="note"
      @close="closeEditForm"
      @save="saveNote"
      @delete="handleDelete"
    />

    <BaseDialog
      v-if="showDeleteConfirmation"
      type="danger"
      @close="showDeleteConfirmation = false"
      @confirm="handleDeleteConfirm"
    >
      <template #title>Delete Note</template>
      <template #content>
        Are you sure you want to delete this note? This action cannot be undone.
      </template>
    </BaseDialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
import Button from "@/components/ui/Button.vue";
import NoteForm from "@/components/notes/NoteForm.vue";
import BaseDialog from "@/components/ui/BaseDialog.vue";
import Header from "~/components/Layout/Header.vue";
import { useNotesStore } from "~/stores/notes";

const route = useRoute();
const router = useRouter();
const notesStore = useNotesStore();

const showEditForm = ref(false);
const showDeleteConfirmation = ref(false);

const noteId = computed(() => route.params.id);

const note = computed(() => {
  return notesStore.notes.find((n) => n.id === noteId.value);
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const goBack = () => {
  router.push("/notes");
};

const editNote = () => {
  showEditForm.value = true;
};

const closeEditForm = () => {
  showEditForm.value = false;
};

const saveNote = (updatedNote) => {
  notesStore.updateNote(updatedNote);
  showEditForm.value = false;
};

const toggleTask = (taskIndex) => {
  if (note.value?.tasks?.[taskIndex]) {
    const updatedNote = { ...note.value };
    updatedNote.tasks[taskIndex].completed =
      !updatedNote.tasks[taskIndex].completed;
    notesStore.updateNote(updatedNote);
  }
};

const handleDelete = (noteId) => {
  notesStore.deleteNote(noteId);
  router.push("/notes");
};

const handleDeleteConfirm = () => {
  if (note.value) {
    notesStore.deleteNote(note.value.id);
    showDeleteConfirmation.value = false;
    router.push("/notes");
  }
};

useHead({
  title: computed(() => (note.value ? note.value.title : "Note Not Found")),
});
</script>
