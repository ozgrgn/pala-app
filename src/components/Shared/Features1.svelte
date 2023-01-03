<script>
  export let title;
  export let description;
  export let icon;
  export let titleClass;
  export let iconColor;
</script>
<div class=" grid grid-cols-5 gap-2 pt-6">
  <div class="col-span-1">
    <svg
      class="h-fit "
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 96 96"
      fill={iconColor}
    >
      {@html icon}
    </svg>
  </div>
  <div class="col-span-3 flex flex-col ">
    <h2 class="text-2xl md:text-lg  {titleClass} ">{title}</h2>
    <p class="text-md w-64 font-thin pt-1">
        {description}
    </p>
  </div>
</div>
