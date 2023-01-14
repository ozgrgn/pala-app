<script>
  export let icon;
  export let title;
  export let href;
</script>

<a
  {href}
  class="bg-base-100 h-[2rem] rounded text-sm text-black flex items-center px-1 gap-2 cursor-pointer"
>
  <i class="text-md  {icon}"></i>
  {title}
</a>
