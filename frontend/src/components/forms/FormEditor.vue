<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Bold from '@tiptap/extension-bold';
import Paragraph from '@tiptap/extension-paragraph';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  initialContent: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

const editor = useEditor({
  content: props.modelValue,
  editorProps: {
    attributes: {
      class:
        'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mt-3 p-2 rounded-md focus:outline-none min-h-[12rem] max-h-[12rem] overflow-y-auto bg-white dark:bg-gray-200 border-b border-gray-200 dark:border-neutral-700'
    }
  },
  onUpdate: ({ editor }) => {
    console.log(editor.getHTML());
    const content = editor.getHTML();
    emit('update:modelValue', content);
  },
  extensions: [
    StarterKit.configure({
      blockquote: false,
      history: false,
      paragraph: false,
      bold: false,
      orderedList: false,
      bulletList: false
    }),
    Placeholder.configure({
      placeholder: props.placeholder,
      emptyNodeClass: 'text-md before:text-gray-900'
    }),
    Paragraph.configure({
      HTMLAttributes: {
        class: 'text-md text-gray-900'
      }
    }),
    Bold.configure({
      HTMLAttributes: {
        class: 'font-bold'
      }
    }),
    Underline,
    BulletList.configure({
      HTMLAttributes: {
        class: 'list-disc list-inside text-gray-900'
      }
    }),
    OrderedList.configure({
      HTMLAttributes: {
        class: 'list-decimal list-inside text-gray-900'
      }
    })
  ]
});
</script>

<template>
  <div
    class="border text-md rounded-lg w-full p-2.5 block"
    :class="
      props.error
        ? 'bg-red-50 border-red-500 text-red-500 placeholder-red-500 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-rose-500 dark:placeholder-rose-500 dark:border-rose-500 dark:focus:ring-rose-700 dark:focus:border-rose-700'
        : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-700 focus:border-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-700 dark:focus:border-blue-700'
    "
  >
    <div class="tiptap" :class="props.error ? 'error' : ''">
      <div
        class="top-0 bg-gray-200 dark:bg-gray-800 flex align-middle gap-x-0.5 p-2 rounded-md border-b border-gray-200 dark:border-neutral-700"
        v-if="editor"
      >
        <button
          @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'bg-gray-100 dark:text-black': editor.isActive('bold') }"
          class="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-blue-700 dark:focus:bg-blue-700"
          type="button"
          data-hs-editor-bold
        >
          <svg
            class="shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M14 12a4 4 0 0 0 0-8H6v8"></path>
            <path d="M15 20a4 4 0 0 0 0-8H6v8Z"></path>
          </svg>
        </button>
        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'bg-gray-100 dark:text-neutral-800': editor.isActive('italic') }"
          class="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-blue-700 dark:focus:bg-blue-700"
          type="button"
          data-hs-editor-italic=""
        >
          <svg
            class="shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="19" x2="10" y1="4" y2="4"></line>
            <line x1="14" x2="5" y1="20" y2="20"></line>
            <line x1="15" x2="9" y1="4" y2="20"></line>
          </svg>
        </button>
        <button
          @click="editor.chain().focus().toggleUnderline().run()"
          :disabled="!editor.can().chain().focus().toggleUnderline().run()"
          :class="{ 'bg-gray-100 dark:text-neutral-800': editor.isActive('underline') }"
          class="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-blue-700 dark:focus:bg-blue-700"
          type="button"
          data-hs-editor-underline=""
        >
          <svg
            class="shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M6 4v6a6 6 0 0 0 12 0V4"></path>
            <line x1="4" x2="20" y1="20" y2="20"></line>
          </svg>
        </button>
        <button
          @click="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :class="{ 'bg-gray-100 dark:text-neutral-800': editor.isActive('strike') }"
          class="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-blue-700 dark:focus:bg-blue-700"
          type="button"
          data-hs-editor-strike=""
        >
          <svg
            class="shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M16 4H9a3 3 0 0 0-2.83 4"></path>
            <path d="M14 12a4 4 0 0 1 0 8H6"></path>
            <line x1="4" x2="20" y1="12" y2="12"></line>
          </svg>
        </button>
        <button
          @click="editor.chain().focus().toggleBulletList().run()"
          :disabled="!editor.can().chain().focus().toggleBulletList().run()"
          :class="{ 'bg-gray-100 dark:text-neutral-800': editor.isActive('bulletList') }"
          class="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-blue-700 dark:focus:bg-blue-700"
          type="button"
          data-hs-editor-ol=""
        >
          <svg
            class="shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="8" x2="21" y1="6" y2="6"></line>
            <line x1="8" x2="21" y1="12" y2="12"></line>
            <line x1="8" x2="21" y1="18" y2="18"></line>
            <line x1="3" x2="3.01" y1="6" y2="6"></line>
            <line x1="3" x2="3.01" y1="12" y2="12"></line>
            <line x1="3" x2="3.01" y1="18" y2="18"></line>
          </svg>
        </button>
        <button
          @click="editor.chain().focus().toggleOrderedList().run()"
          :disabled="!editor.can().chain().focus().toggleOrderedList().run()"
          :class="{ 'bg-gray-100 dark:text-neutral-800': editor.isActive('orderlist') }"
          class="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-blue-700 dark:focus:bg-blue-700"
          type="button"
          data-hs-editor-ul=""
        >
          <svg
            class="shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="10" x2="21" y1="6" y2="6"></line>
            <line x1="10" x2="21" y1="12" y2="12"></line>
            <line x1="10" x2="21" y1="18" y2="18"></line>
            <path d="M4 6h1v4"></path>
            <path d="M4 10h2"></path>
            <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
          </svg>
        </button>
      </div>
      <EditorContent :editor="editor" />
    </div>
  </div>
</template>

<style>
/* Placeholder (at the top) */
.tiptap p.is-editor-empty:first-child::before {
  color: #9ca3af;
  content: attr(data-placeholder);
  float: left;
  pointer-events: none;
  height: 0;
}
.tiptap.error p.is-editor-empty:first-child::before {
  color: #ef4444;
}
.tiptap ul p,
.tiptap ol p {
  @apply inline;
}

.tiptap p.is-editor-empty:first-child::before {
  @apply pointer-events-none float-left;
}

.ql-toolbar.ql-snow {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.ql-container.ql-snow {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top: 0;
}
.ql-toolbar.ql-snow + .ql-container.ql-snow {
  border-top: 0;
}
.ql-toolbar.ql-snow + .ql-container.ql-snow .ql-editor {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.ql-editor.ql-blank::before {
  color: white;
  font-size: 105%;
}
.ql-editor {
  min-height: 200px;
  color: white;
}
.ql-formats button {
  border-radius: 4px;
}
.ql-editor p {
  color: white;
}
</style>
