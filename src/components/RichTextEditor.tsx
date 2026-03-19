import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { useCallback, useEffect } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  maxLength?: number;
  minHeight?: string;
  editable?: boolean;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "What's on your mind?",
  minHeight = '120px',
  editable = true,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || '',
    editable,
    editorProps: {
      attributes: {
        class: 'min-h-[80px] p-3 focus:outline-none focus:ring-0',
      },
      handleDOMEvents: {
        paste: (view, event) => {
          const text = event.clipboardData?.getData('text/plain');
          if (text) {
            event.preventDefault();
            view.dispatch(view.state.tr.insertText(text));
            return true;
          }
          return false;
        },
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  const handleUpdate = useCallback(() => {
    if (editor) {
      const html = editor.getHTML();
      if (html !== '<p></p>') {
        onChange(html);
      } else {
        onChange('');
      }
    }
  }, [editor, onChange]);

  useEffect(() => {
    if (!editor) return;
    editor.on('update', handleUpdate);
    return () => {
      editor.off('update', handleUpdate);
    };
  }, [editor, handleUpdate]);

  return (
    <div
      className="rounded-lg border border-[var(--border-color)] bg-[var(--input-bg)] overflow-hidden"
      style={{ minHeight }}
    >
      {editable && (
        <div className="flex flex-wrap gap-1 p-2 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]">
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-[var(--border-color)] ${
              editor?.isActive('bold') ? 'bg-[var(--accent)]/20' : ''
            }`}
            aria-label="Bold"
          >
            <strong className="text-sm">B</strong>
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-[var(--border-color)] ${
              editor?.isActive('italic') ? 'bg-[var(--accent)]/20' : ''
            }`}
            aria-label="Italic"
          >
            <em className="text-sm">I</em>
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            className={`p-2 rounded hover:bg-[var(--border-color)] ${
              editor?.isActive('strike') ? 'bg-[var(--accent)]/20' : ''
            }`}
            aria-label="Strikethrough"
          >
            <s className="text-sm">S</s>
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-[var(--border-color)] ${
              editor?.isActive('bulletList') ? 'bg-[var(--accent)]/20' : ''
            }`}
            aria-label="Bullet list"
          >
            •
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-[var(--border-color)] ${
              editor?.isActive('orderedList') ? 'bg-[var(--accent)]/20' : ''
            }`}
            aria-label="Numbered list"
          >
            1.
          </button>
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  );
}
