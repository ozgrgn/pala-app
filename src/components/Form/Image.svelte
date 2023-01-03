<script>
  import RestService from "../../services/rest";
  import Loading from "../Loading.svelte";
  export let value;
  export let isValid;
  let loading;

  let fileinput;

  if (value) {
    isValid = true;
  }
  const onFileSelected = async (e) => {
    let image = e.target.files[0];
    loading = true;
    try {
      let uploadedImage = await RestService.uploadImage(image);

      value = uploadedImage["file"];
      isValid = true;
    } catch (error) {
      isValid = false;
      console.log("image upload error", error.message);
    }
    loading = false;
  };
</script>

<div class="flex w-full justify-around items-center gap-4">
  <img
    class="h-10 object-cover"
    src="/assets/img/625182-200.png"
    alt=""
    on:click={() => {
      fileinput.click();
    }}
  />

  {#if value && !loading}
    <img class="w-48 max-h-[230px] rounded border object-fit" src={value} alt="" />
  {/if}

  {#if loading}
    <Loading />
  {/if}

  <input
    style="display:none"
    type="file"
    accept=".jpg, .jpeg, .png, .webp"
    on:change={(e) => onFileSelected(e)}
    bind:this={fileinput}
  />
</div>
