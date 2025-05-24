<template>
  <div class="container mx-auto px-4 py-8">
    <Header />
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold">Note</h1>

      <div class="flex space-x-2">
        <div class="relative">
          <Button variant="outline" @click="toggleFilters">
            <template #icon>
              <FunnelIcon class="w-4 h-4 mr-2 inline-block" />
            </template>
            Filter
            <span
              v-if="!filters.selectedTypes.includes('all')"
              class="ml-1 text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full"
            >
              {{ filters.selectedTypes.length }}
            </span>
          </Button>

          <DropdownFilter
            v-model="filters.selectedTypes"
            :is-open="showFilters"
            @update:modelValue="handleFilterChange"
            v-click-outside="() => (showFilters = false)"
          />
        </div>

        <Button variant="ghost" @click="openAddNoteForm">
          <template #icon>
            <PlusIcon class="w-4 h-4 mr-2 inline-block" />
          </template>
          Add New
        </Button>
      </div>
    </div>

    <div v-if="!filters.selectedTypes.includes('all')" class="mb-4">
      <div class="flex items-center space-x-2">
        <span class="text-sm text-gray-600">Filtered by:</span>
        <div class="flex space-x-1">
          <span
            v-for="type in filters.selectedTypes"
            :key="type"
            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
          >
            {{ getTypeLabel(type) }}
            <button
              @click="removeFilter(type)"
              class="ml-1 hover:text-blue-600"
            >
              ×
            </button>
          </span>
        </div>
        <button
          @click="clearAllFilters"
          class="text-xs text-gray-500 hover:text-gray-700 underline"
        >
          Clear all
        </button>
      </div>
    </div>

    <div class="mb-6">
      <p class="text-sm text-gray-600">
        Showing {{ filteredNotes.length }} of
        {{ notesStore.notes.length }} notes
      </p>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <NoteCard
        v-for="note in filteredNotes"
        :key="note.id"
        :note="note"
        @click="openNoteDetail(note.id)"
      />
    </div>

    <div v-if="filteredNotes.length === 0" class="text-center py-12">
      <div class="text-gray-400 mb-4">
        <svg
          class="mx-auto h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
      <p class="text-gray-600 mb-4">
        {{
          filters.selectedTypes.includes("all")
            ? "You haven't created any notes yet."
            : "No notes match your current filter."
        }}
      </p>
      <Button
        @click="
          filters.selectedTypes.includes('all')
            ? openAddNoteForm()
            : clearAllFilters()
        "
      >
        {{
          filters.selectedTypes.includes("all")
            ? "Create your first note"
            : "Clear filters"
        }}
      </Button>
    </div>

    <NoteForm
      :is-open="showNoteForm"
      :edit-note="currentNote"
      @close="closeNoteForm"
      @save="saveNote"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { FunnelIcon, PlusIcon } from "@heroicons/vue/24/outline";
import Button from "@/components/ui/Button.vue";
import NoteCard from "@/components/notes/NoteCard.vue";
import NoteForm from "@/components/notes/NoteForm.vue";
import DropdownFilter from "@/components/Filters/DropdownFilter.vue";
import Header from "~/components/Layout/Header.vue";
import { useNotesStore } from "~/stores/notes";
import { FILTER_OPTIONS } from "@/components/Filters/constant";

const router = useRouter();
const notesStore = useNotesStore();
const showFilters = ref(false);
const showNoteForm = ref(false);
const currentNote = ref(null);

const filters = ref({
  selectedTypes: ["all"],
});

const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};

const handleFilterChange = (newValues) => {
  filters.value.selectedTypes = newValues;
};

const filteredNotes = computed(() => {
  if (filters.value.selectedTypes.includes("all")) {
    return notesStore.notes;
  }

  return notesStore.notes.filter((note) =>
    filters.value.selectedTypes.includes(note.type)
  );
});

const getTypeLabel = (type) => {
  const option = FILTER_OPTIONS.find((opt) => opt.value === type);
  return option ? option.label : type;
};

const removeFilter = (type) => {
  const index = filters.value.selectedTypes.indexOf(type);
  if (index > -1) {
    filters.value.selectedTypes.splice(index, 1);
    if (filters.value.selectedTypes.length === 0) {
      filters.value.selectedTypes = ["all"];
    }
  }
};

const clearAllFilters = () => {
  filters.value.selectedTypes = ["all"];
};

const openAddNoteForm = () => {
  currentNote.value = null;
  showNoteForm.value = true;
};

const openNoteDetail = (noteId) => {
  router.push(`/notes/${noteId}`);
};

const closeNoteForm = () => {
  showNoteForm.value = false;
  currentNote.value = null;
};

const saveNote = (note) => {
  if (currentNote.value) {
    notesStore.updateNote(note);
  } else {
    notesStore.addNote(note);
  }
};
</script>
