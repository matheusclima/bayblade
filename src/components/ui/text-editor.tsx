import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ToggleGroup, ToggleGroupItem } from './toggle-group';
import { Bold, Italic, Underline } from 'lucide-react';
import UnderlineExtension from '@tiptap/extension-underline';

type TextEditorProps = {
	onChange: (value: string) => void;
};

export default function TextEditor({ onChange }: TextEditorProps) {
	
	const editor = useEditor({
		extensions: [StarterKit, UnderlineExtension],
		content: '',
		editorProps: {
			
		},
		onUpdate: ({ editor }) => {
			const text = editor.getText();

			if (text.length > 150) {
				// Se passou de 100, remove o que sobrou
				const limitedText = text.slice(0, 150);
				editor.commands.setContent(`<p>${limitedText}</p>`);
			}
			const html = editor.getHTML();
			onChange(html);
		},
	});

	if (!editor) {
		return null;
	}

	return (
		<div className='bg-card'>
			<div className="flex items-end justify-between mb-2">
				<p className='text-card-foreground text-xs'>{editor.getText().length}/150 caracteres</p>
				{/* Toolbar */}
				<ToggleGroup variant={'outline'} type="multiple">
					<ToggleGroupItem
						value="bold"
						aria-label="Toggle bold"
						onClick={() => editor.chain().focus().toggleBold().run()}
					>
						<Bold className="h-4 w-4" />
					</ToggleGroupItem>
					<ToggleGroupItem
						value="italic"
						aria-label="Toggle italic"
						onClick={() => editor.chain().focus().toggleItalic().run()}
					>
						<Italic className="h-4 w-4" />
					</ToggleGroupItem>
					<ToggleGroupItem
						value="underline"
						aria-label="Toggle underline"
						onClick={() => editor.chain().focus().toggleUnderline().run()}
					>
						<Underline className="h-4 w-4" />
					</ToggleGroupItem>
				</ToggleGroup>
			</div>

			{/* Editor */}
			<EditorContent editor={editor} />
		</div>
	);
}
