<script>
  import { link } from "svelte-navigator";

  import { cats } from "$services/store";
  import Svg from "../../assets/svg.json";

console.log($cats,"footerdaki cats")
</script>

<footer class="relative bg-dark-300" aria-labelledby="footer-heading">
  <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
    <div class="pb-8 md:grid xl:grid-cols-5 xl:gap-2">
      <div class="md:grid md:grid-cols-2 gap-16 xl:col-span-4">
        <div class="first">
          <div class="md:grid-cols-1 md:gap-8">
            <div>
              <h3
                class="text-sm font-semibold text-white tracking-wider uppercase"
              >
                PALA EXPORT
              </h3>

              <div class="">
                <p class=" px-2 pt-5 text-md tracking-tight text-gray-200 ">
                  Herzlich willkommen auf der Startseite der Pala Export GmbH!
                  Wir freuen uns, dass Sie den Weg zu uns gefunden haben und
                  präsentieren unser Angebot aus dem bekannten und beliebten
                  Bereich der Kategorie Haushaltswaren Großhandel.
                  Haushaltswaren Großhandel mit dem Plus an Erfahrung, Angebot
                  und persönlichem Service.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-10 md:mt-0 md:grid md:grid-cols-1 md:gap-8">
          <div>
            <h3
              class="text-sm font-semibold text-white tracking-wider uppercase "
            >
              Kategoriler
            </h3>
            <div class="grid-rows-1">
              <div class="grid grid-cols-2 ">
                <div class="">
                  <ul class="mt-4 space-y-4 px-2">
                    {#each Array(4) as cat, i}
                      {#if  $cats && $cats[i]}
                        <li>
                          <a
                            use:link
                            href="/store/category/{$cats[i]._id}"
                            class="text-base text-gray-200 hover:text-white"
                          >
                            {$cats[i].name}
                          </a>
                        </li>
                      {/if}
                    {/each}
                  </ul>
                </div>
                <ul class="mt-4 space-y-4 px-2">
                  {#each Array(4) as treatment, i}
                    {#if $cats && $cats[i+4]}
                      <li>
                        <a
                          use:link
                          href="/store/category/{$cats[i+4]._id}"
                          class="text-base text-gray-200 hover:text-white"
                        >
                          {$cats[i + 4]?.name}
                        </a>
                      </li>
                    {/if}
                  {/each}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="third">
        <div class=" pt-10 md:pt-10 lg:pt-10 xl:pt-0 md:grid md:grid-cols-1 ">
          <div>
            <h3
              class="text-sm font-semibold text-white tracking-wider uppercase"
            >
              İLETİŞİM
            </h3>

            <div class="px-2">
              <p class=" pt-5 text-md tracking-tight text-gray-200">
                <a
                  href="tel:+490203559526
                "
                >
                  (+49) (0203) 55 95 26
                </a>
              </p>
              <p class=" pt-5 text-md tracking-tight text-gray-200 ">
                <a href="mailto:info@palaexport.de"> info@palaexport.de</a>
              </p>
              <p class=" pt-5 text-md tracking-tight text-gray-200 ">
                Hufstraße 80 47166 Duisburg Germany
              </p>
            </div>
          </div>
        </div>
      </div>
  
    </div>

    <div
      class="mt-8 border-t border-white/50 pt-8 md:flex md:items-center md:justify-between"
    >
      <div class="flex space-x-6 md:order-2">
        <a href="https://www.facebook.com/pages/category/Business-Service/Pala-Export-GmbH-444190548980214/" target="_blank">
          <svg
            class="h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 35 35"
            fill="#fff"
          >
            {@html Svg.facebook}
          </svg>
        </a>
        <a href="https://www.instagram.com/pala_gmbh/?hl=de" target="_blank">
          <svg
            class="h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 35 35"
            fill="#fff"
          >
            {@html Svg.instagram}
          </svg>
        </a>
     
        <a href="https://api.whatsapp.com/send?phone=+49 172 6687392">
          <svg
            class="h-6 "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 70 70"
            fill="#fff"
          >
            {@html Svg.whatsapp}
          </svg>
        </a>
      </div>
      <p class="mt-8 text-base text-white md:mt-0 md:order-1">
        Copyright © 2022 Tüm Hakları Saklıdır. - Pala Export
      </p>
    </div>
  </div>
</footer>
