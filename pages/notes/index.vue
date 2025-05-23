<template>
  <div class="container mx-auto px-4 py-8">
    <Header />
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold">Title</h1>

      <div class="flex space-x-2">
        <div class="relative">
          <Button variant="outline" @click="toggleFilters">
            <template #icon>
              <FunnelIcon class="w-4 h-4 mr-2 inline-block" />
            </template>
            Filter
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


    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <NoteCard
        v-for="note in filteredNotes"
        :key="note.id"
        :note="note"
        @click="openEditNoteForm(note)"
      />
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
import { FunnelIcon, PlusIcon } from "@heroicons/vue/24/outline";
import Button from "@/components/ui/Button.vue";
import NoteCard from "@/components/notes/NoteCard.vue";
import NoteForm from "@/components/notes/NoteForm.vue";
import DropdownFilter from "@/components/Filters/DropdownFilter.vue";
import Header from "~/components/Layout/Header.vue";
import { useNotesStore } from "~/stores/notes";

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
  if (filters.value.selectedTypes.includes("all")) return notesStore.notes;
  return notesStore.notes.filter((note) =>
    filters.value.selectedTypes.includes(note.type)
  );
});

// Note form functions
const openAddNoteForm = () => {
  currentNote.value = null;
  showNoteForm.value = true;
};

const openEditNoteForm = (note) => {
  currentNote.value = note;
  showNoteForm.value = true;
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
