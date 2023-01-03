<script>
      import Svg from "../../assets/svg.json";

  export let handleClick = () => {};
  export let customClass = "";
  export let iconRightClass = "";
  export let active = "";
  let activeClass = "border-black text-white/90 border";
</script>

<button
  class="relative flex p-3 bg-light-300 border-light-300 rounded-md text-white/90 drop-shadow shadow-xl disabled:opacity-75 {customClass} {active
    ? activeClass
    : ''} "
  on:click={() => {
    handleClick();
  }}
  ><slot />


<div class="flex">  
  <svg class="h-[1.15rem] pl-2 pt-[0.4rem] " fill="#fff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  h-12 viewBox="0 0 199.404 199.404" style="enable-background:new 0 0 199.404 199.404;"
  xml:space="preserve">
  {@html Svg.chevron_right}

    
    

    
  </div>

</button>