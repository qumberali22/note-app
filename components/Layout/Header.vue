<template>
  <div
    class="border-2 border-black rounded-[10px] w-[173px] h-[38px] inline-flex items-center justify-center px-[9.3px] mb-6 font-['Lexend_Deca'] font-black text-[22px] tracking-[1px] leading-[1.2]"
  >
    {{ text }}
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: "Test project",
  },
});
</script>
