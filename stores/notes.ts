// stores/notes.ts
import { defineStore } from "pinia";

export interface Task {
  text: string;
  completed: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  image?: string;
  tasks?: Task[];
  date: string;
  type?: string;
}

export const useNotesStore = defineStore("notes", {
  state: () => ({
    notes: [
      {
        id: "1",
        title: "Meeting Recap and Action Points",
        content:
          "This note covers the key points discussed during the meeting, including deadlines, responsibilities, and follow-up actions. Everyone should review and complete their assigned tasks by the end of the week.",
        image:
          "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        date: "2025-05-20",
        type: "type1",
      },
      {
        id: "2",
        title: "Project Overview",
        content:
          "This project involves a multi-step approach to design, implementation, and testing. Please ensure you're familiar with the requirements document. If you have any questions, raise them during tomorrow's check-in.\n\nWe need to maintain strong communication and share updates regularly.",
        date: "2025-05-19",
        type: "type0",
      },
      {
        id: "3",
        title: "Marketing Strategy Plan",
        content:
          "The marketing plan will focus on social media engagement, email outreach, and targeted advertising. We aim to launch the campaign by the start of next month.",
        image:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        date: "2025-05-18",
        type: "type1",
      },
      {
        id: "4",
        title: "Task Checklist for Development",
        content:
          "Here is the current progress on key development tasks. Let's make sure to finish remaining items by the sprint deadline.",
        tasks: [
          {
            text: "Finish implementing the user authentication module and run integration tests",
            completed: true,
          },
          {
            text: "Complete the UI design for the dashboard and connect with API endpoints",
            completed: false,
          },
        ],
        date: "2025-05-17",
        type: "type2",
      },
      {
        id: "5",
        title: "Design Guidelines",
        content:
          "Follow the brand's color palette and typography when designing assets. All designs should be responsive and mobile-friendly. Consult the style guide for spacing and icon use.",
        date: "2025-05-16",
        type: "type0",
      },
      {
        id: "6",
        title: "Client Feedback Summary",
        content:
          "The client has provided detailed feedback on the prototype. They like the overall layout but have requested changes to the navigation menu and font choices.",
        image:
          "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        date: "2025-05-15",
        type: "type1",
      },
      {
        id: "7",
        title: "Weekly Goals",
        content:
          "These are the objectives for this week. Review them and mark them complete as you go.",
        tasks: [
          {
            text: "Submit the final draft of the user manual to the documentation team",
            completed: true,
          },
          {
            text: "Conduct usability testing and gather initial user feedback",
            completed: true,
          },
        ],
        date: "2025-05-14",
        type: "type2",
      },
      {
        id: "8",
        title: "Team Building Event Planning",
        content:
          "We're organizing a team-building activity next month. Please share your availability and preferences by the end of this week. The event will include both indoor and outdoor options.",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        date: "2025-05-13",
        type: "type1",
      },
    ] as Note[],
  }),

  actions: {
    addNote(note: Note) {
      this.notes.unshift(note);
    },

    updateNote(updatedNote: Note) {
      const index = this.notes.findIndex((note) => note.id === updatedNote.id);
      if (index !== -1) {
        this.notes[index] = updatedNote;
      }
    },

    deleteNote(id: string) {
      this.notes = this.notes.filter((note) => note.id !== id);
    },
  },
});
