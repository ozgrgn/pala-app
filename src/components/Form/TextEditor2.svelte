<script>
  import Quill from "quill";
  import { onMount } from "svelte";

  export let incomingValue2;
  export let value2;
  export let placeholder;
  let editor;
  let toolbarOptions = [
    [{ header: 1 }, { header: 2 }, "blockquote", "link", "image", "video"],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "ordered" }],
    [{ align: [] }],
    ["clean"],
  ];

  onMount(() => {
    let quill = new Quill(editor, {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: "snow",
      placeholder,
    });

    quill.on("text-change", function (delta, oldDelta, source) {
      value2 = document.getElementsByClassName("ql-editor")[0].innerHTML;
    });
    if (incomingValue2) {
   
      document.querySelector(".ql-editor").innerHTML = incomingValue2;
    }
    
  });
</script>

<svelte:head>
  <link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
</svelte:head>

<div class="editor" style="min-height: 30rem;" bind:this={editor} />
