const { CKEditor } = require("@ckeditor/ckeditor5-react");
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Editor = ({
    value,
    onChange,
  }) => {
    return (
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    );
  };
  export default Editor;