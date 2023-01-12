<script>
  export let title;
  export let desc;
  export let textColor = "text-primary";
</script>

<div>
  <i class="bi bi-exclamation-octagon-fill {textColor}" />
  <div>
    <h3 class="font-semibold {textColor}">
      {title}
    </h3>
    <div class="text-semibold text-xs {textColor}">
      {desc}
    </div>
  </div>
</div>
