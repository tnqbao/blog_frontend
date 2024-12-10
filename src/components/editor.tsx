import React, {useCallback, useRef} from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import ReactQuill, {ReactQuillProps} from "react-quill";

interface ReactQuillWrapperProps extends ReactQuillProps {
    forwardedRef: React.Ref<ReactQuill>;
}

const ReactQuillWrapper = dynamic(async () => {
    const {default: RQ} = await import("react-quill");
    const Component = ({forwardedRef, ...props}: ReactQuillWrapperProps) => {
        return <RQ ref={forwardedRef} {...props} />;
    };
    return Component;
}, {ssr: false});

interface QuillEditorProps {
    value: string;
    setValue: (value: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({value, setValue}) => {
    const editorRef = useRef<ReactQuill | null>(null);

    const handleImageUpload = useCallback(() => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.click();

        input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = async () => {
                const base64 = reader.result as string;

                const fileName = `${Date.now()}-${file.name}`;
                try {
                    const response = await fetch("/api/image/upload", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({file: base64, fileName}),
                    });

                    const data = await response.json();
                    if (response.ok) {
                        const quill = editorRef.current?.getEditor();
                        if (quill) {
                            const range = quill.getSelection();
                            const imageHTML = `<div class="flex justify-center"><img src="${data.url}" alt="${fileName}" class="max-w-full h-auto" /></div>`;
                            quill.clipboard.dangerouslyPasteHTML(range ? range.index : 0, imageHTML);
                        } else {
                            console.error("Editor reference is not set");
                        }
                    } else {
                        console.error("Upload failed:", data.error);
                    }
                } catch (error) {
                    console.error("Error uploading image:", error);
                }
            };

            reader.readAsDataURL(file);
        };
    }, []);


    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "color",
        "align",
        "font",
    ];

    const modules = {
        toolbar: {
            container: [
                ["bold", "italic", "underline", "strike"],
                ["blockquote", "code-block"],
                ["image"],
                [{header: 1}, {header: 2}],
                [{list: "ordered"}, {list: "bullet"}, {list: "check"}],
                [{indent: "-1"}, {indent: "+1"}],
                [{size: ["small", false, "large", "huge"]}],
                [{header: [1, 2, 3, 4, 5, 6, false]}],
                [{color: []}],
                [{font: []}],
                [{align: []}],
            ],
            handlers: {
                image: handleImageUpload,
            },
        },
    };

    return (
        <ReactQuillWrapper
            forwardedRef={editorRef}
            theme="snow"
            value={value}
            onChange={(content) => setValue(content)}
            modules={modules}
            className="hover:backdrop-brightness-200 border border-black/50"
            formats={formats}
            style={{flex: 1}}
        />
    );
};

export default QuillEditor;