<script>
  import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  import "@splidejs/svelte-splide/css";
  import { lang } from "../../services/store";
  import { Translate } from "../../services/language.js";
  export let filteredReviews;
  filteredReviews = [
    {
      _id: "6311c4e2e93fc0079c0c21ec",
      reviewLang: "en",
      reviewSort: 1,
      reviewName: "Jackson Szymanowski",
      reviewDate: "22.08.2022",
      reviewPlatform: "TrustPilot",
      reviewText:
        "I want to say how if you have had a fear of the dentist 🦷 then your fear will be taken away with Armada they are professional and have your 100%care in there power from the start of you getting on your plane to the hotel ,and all your fantastic communication skills by the lovely 🌹 gorgeous Gamze and Ozzie they are amazing at keeping you updated with every step of the journey to having that final result of pearly perfect teeth can't thank you all enough and for the record it's so true what Gamze and Ozzie say you really don't feel a thing thank you all once again wish I'd of come to you months and months ago 🙏❤️🦷",
      reviewLink: "https://www.trustpilot.com/users/630382a74e17bf0013d4e3f7",
      created_at: "2022-09-02T08:54:58.917Z",
      updated_at: "2022-09-02T08:54:58.917Z",
      __v: 0,
    },
    {
      _id: "63111e21e5a2ce978e25146a",
      reviewLang: "en",
      reviewSort: 10,
      reviewName: "Isabelle Williams",
      reviewDate: "29.08.2022",
      reviewPlatform: "Google",
      reviewText:
        "When i contacted Armada Smile they got back to me instantly provided me with every information that i needed and made feel very comfortable which was the most important thing to me. Its a decision that i wish i have made years ago. I am so happy to meet a lovely team of people and thank you for making me feel like i was at home.",
      created_at: "2022-09-01T21:03:29.664Z",
      updated_at: "2022-09-02T08:44:18.192Z",
      __v: 0,
      reviewLink: "https://g.co/kgs/FJStkH",
      reviewStars: "disabled",
      reviewAvatar: "1ceuBcG_vf.png",
    },
    {
      _id: "63111db4e5a2ce978e251466",
      reviewLang: "en",
      reviewSort: 9,
      reviewName: "James Marshall",
      reviewDate: "25.08.2022",
      reviewPlatform: "Google",
      reviewText:
        "I can say i have had the most luxurious experience ever. I was never confident enough to smile and wouldn’t socialise becuase i was always embarassed. I would like to say thank you alot to Armada Smile team very professional. The finished smile i wanted was way better than what i wanted, beyond my expectations. Highly recommend to anyone that is looking for that new pearly smile!",
      created_at: "2022-09-01T21:01:40.599Z",
      updated_at: "2022-09-02T08:45:04.878Z",
      __v: 0,
      reviewLink: "https://g.co/kgs/pT6ZKw",
      reviewStars: "disabled",
      reviewAvatar: "Tawquoz3rl.png",
    },
    {
      _id: "63111d5ce5a2ce978e251452",
      reviewLang: "en",
      reviewSort: 8,
      reviewName: "Sam Hearn",
      reviewDate: "01.08.2022",
      reviewPlatform: "Google",
      reviewText:
        "For over 10 years i have battled so much with myself, could not smile, was always covering my mouth. Now on my way back to 🇮🇪 and can’t stop smiling. In tears of happiness, recommend this place to anyone! Thank you so much Armada Smile.",
      created_at: "2022-09-01T21:00:12.397Z",
      updated_at: "2022-09-02T08:47:20.739Z",
      __v: 0,
      reviewLink: "https://g.co/kgs/71iQ7X",
      reviewStars: "disabled",
      reviewAvatar: "iFWeip71s4.png",
    },
    {
      _id: "63111cf6e5a2ce978e251446",
      reviewLang: "en",
      reviewSort: 7,
      reviewName: "Tiana Bate",
      reviewPlatform: "Google",
      reviewText:
        "Can i firstly say how amazing these people are with everything they have done for me. I have been researching to have dental Implants and i must say i am delighted to be treated at Armada Smile. This clinic is the most genuine clinic i have come across after all my researches. Wouldnt even think twice, very very professional and the quality they provide is 10/10.",
      created_at: "2022-09-01T20:58:30.170Z",
      updated_at: "2022-09-02T08:48:31.199Z",
      __v: 0,
      reviewDate: "11.08.2022",
      reviewStars: "disabled",
      reviewLink: "https://g.co/kgs/mEzsTQ",
      reviewAvatar: "roE1Ci2yLM.png",
    },
    {
      _id: "63111bbee5a2ce978e251427",
      reviewLang: "en",
      reviewSort: 5,
      reviewName: "Carl Birkenshaw",
      reviewDate: "25.03.2022",
      reviewPlatform: "Google",
      reviewText:
        "So happy with result all done in 5 days after 20 years I have my smile back thank you for all you help and what you have done 9 implants and 24 crowns amazing now pain at all",
      created_at: "2022-09-01T20:53:18.892Z",
      updated_at: "2022-09-02T08:51:16.280Z",
      __v: 0,
      reviewStars: "disabled",
      reviewLink:
        "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sChdDSUhNMG9nS0VJQ0FnSUNXa3RLZzVBRRAB!2m1!1s0x0:0x336ea104e4a18dbd!3m1!1s2@1:CIHM0ogKEICAgICWktKg5AE%7CCgwI--_SkAYQwNH4vwI%7C?hl=en-US",
      reviewAvatar: "_xoKnTlu0y.png",
    },
    {
      _id: "62d484bb8857101ea79d5ae1",
      reviewLang: "en",
      reviewSort: 2,
      reviewName: "KyeSho",
      reviewDate: "11.08.2022",
      reviewPlatform: "TrustPilot",
      reviewText:
        "OH MY GOD! Back in the UK after my treatment and amazing 7 days that i have spent in Antalya. I have people complimenting my new bright teeth already since i landed. I could never express enough appreciation to this clinic and its team! I had full mouth Implants and 24 Zirconium crowns, I have not felt any pain during my surgery AT ALL! The care ive been given has been first class. Such a respectful team with big smiles on their face every time i stepped into this clinic. They listen to you and take into account everything that is important to you. I have picked this clinic out of all the other options out there because Armada Smile is after quality and not quantity. As someone concerned about traveling abroad for dental treatment.I would not hesitate to recommend them to anyone.I wish them the best of luck and success.",
      reviewLink: "https://www.trustpilot.com/users/62f4d139a86c6400125f0c35",
      created_at: "2022-07-17T21:52:59.502Z",
      updated_at: "2022-09-01T20:44:34.952Z",
      __v: 0,
      reviewStars: "5",
    },
    {
      _id: "62d47cba8857101ea79d5a78",
      reviewLang: "en",
      reviewSort: 3,
      reviewName: "Callum H",
      reviewDate: "26.07.2022",
      reviewPlatform: "TrustPilot",
      reviewText:
        "The clinic is very professional and I didn’t actually expect to get my full mouth implants done in turkey but the price was reasonable and it was all worth the experience. The doctor did my job very carefully and did what I liked for me with patience. During the treatment it was a hassle free experience the team managed everything regarding the hotel and transfer very well. The environment was friendly and the clinic was in a really nice spot. For me it was a beautiful experience I thank so much for Dr. Sayaf and his team I am completely satisfied with my teeth and I’m pleased to get my smile back. The doctor knows his job well.",
      reviewLink: "https://www.trustpilot.com/users/62dfb036327477001438149f",
      created_at: "2022-07-17T21:18:50.915Z",
      updated_at: "2022-09-01T20:45:51.691Z",
      __v: 0,
      reviewStars: "5",
    },
    {
      _id: "62d1dfa9a741faa82c4db36e",
      reviewName: "Joe M",
      reviewDate: "14.07.2022",
      reviewPlatform: "TrustPilot",
      reviewText:
        "Wow! Been in contact with Armada Smile for around 3 months. I wasent really sure on booking at first but I shouldn't have been. Im glad I got my smile back after a really long time in the UK. I wasn’t expecting how little pain there was after the injections of the course. I haven’t always been that confident with myself and have avoided going to the dentists for years. So glad after having missing teeth and broken teeth my new smile is so good and I feel so confident. The service was also Immaculate I thank the whole Armada Smile Studio Team.",
      reviewLink: "https://www.trustpilot.com/users/62cffa2dbb44fa001349b62b",
      created_at: "2022-07-15T21:44:09.705Z",
      updated_at: "2022-09-01T20:47:20.222Z",
      __v: 0,
      reviewStars: "5",
      reviewLang: "en",
      reviewSort: 4,
    },
    {
      _id: "62ceac75355bffb007fb3dec",
      reviewName: "Hannah Taylor",
      reviewDate: "24.08.2022",
      reviewPlatform: "Google",
      reviewText:
        "I cant praise this clinic enough. I have been scared of the dentist all my life, after making the decision to finally wanting to smile, i came to Turkey from the Uk. The end result was amazing. The level of professionalism, the service was amazing. Having a staff of native English speakers is a great benefit also. My dental treatment and time in Antalya was a dream,including the hotel and transfer services. These guys are brilliant.",
      reviewLink: "https://g.co/kgs/YMf6Ry",
      created_at: "2022-07-13T11:28:53.593Z",
      updated_at: "2022-09-01T21:38:34.722Z",
      __v: 0,
      reviewStars: "5",
      reviewLang: "en",
      reviewSort: 6,
      reviewAvatar: "6i5IvJJpjP.png",
    },
  ];
  // let filteredReviews = reviews.filter((filteredReviews) => {
  //   return filteredReviews.reviewLang == $lang;
  // });
  // console.log(reviews, "reviews");
  // let toShow;
  // let toScroll;
  // let dots;
  // if (window.innerWidth <= 640) {
  //   toShow = 1;
  //   toScroll = 1;
  // } else {
  //   toShow = 4;
  //   toScroll = 3;
  // }

  // $: filteredReviews = reviews.filter((filteredReviews) => {
  //   return filteredReviews.reviewLang == $lang;
  // });
</script>

<!-- REVIEWS -->
<div class=" rounded-lg md:mx-0 hidden-xs ">
  <div class="container mx-auto">
    <div class="rounded-lg">
      <div class="testimonials">
        <Splide
          aria-label="My Favorite Images"
          options={{
            arrows: false,
            type: "loop",
            pagination: true,
            perPage: 3,
            breakpoints: {
              1028: {
                perPage: 2,
              },
              640: {
                perPage: 1,
              },
            },
            classes: {
              pagination: "splide__pagination main-slider-pagination",
              page: "splide__pagination__page main-slider-page",
            },
          }}
        >
          {#each filteredReviews as review}
            <SplideSlide>
              <div
                class="review-container h-72 bg-white shadow shadow-2xl mx-6 md:mx-10 mt-10 mb-20 rounded-md ≈"
              >
                <a
                  class="review-header "
                  rel="external"
                  href={review.reviewLink}
                  target="_blank"
                >
                  <div class="review-avatar">
                    <div
                      class="review-avatar-bg flex flex-col justify-center text-center "
                    >
                      {#if review.reviewAvatar}
                        <img
                          src={`https://super--bucket.s3.eu-west-3.amazonaws.com/${review.reviewAvatar}`}
                          alt=""
                          width="44"
                          height="44"
                          class="ReviewAvatar__Avatar-sc-1lraoly-2 TOyBs"
                        />
                      {:else}
                        {review.reviewName.charAt(0)}
                      {/if}
                    </div>
                  </div>
                  <div class="review-info">
                    <span class="review-author">{review.reviewName}</span>
                    <div class="review-info2">
                      <div class="ratings">
                        <div class="empty-stars" />
                        <div
                          class="full-stars-tp {review.reviewPlatform ==
                          'Google'
                            ? 'text-custom-gcolor'
                            : review.reviewPlatform == 'TrustPilot'
                            ? 'text-custom-tcolor'
                            : review.reviewPlatform == 'Facebook'
                            ? 'text-custom-fcolor'
                            : ''} {review.reviewStars == 1
                            ? 'w-1/5'
                            : review.reviewStars == 2
                            ? 'w-2/5'
                            : review.reviewStars == 3
                            ? 'w-3/5'
                            : review.reviewStars == 4
                            ? 'w-4/5'
                            : 'w-full'}"
                        />
                        <img
                          style="width:85px"
                          src="assets/images/reviews/stars.svg"
                          alt=""
                        />
                      </div>
                      <div class="review-date hidden xl:block">
                        {review.reviewDate}
                      </div>
                    </div>
                  </div></a
                >
                <div class="review-text">
                  <div class="review-text-outer">
                    <div class="review-text-inner">
                      <div>
                        {review.reviewText}
                      </div>
                    </div>
                  </div>
                </div>
                <a href={review.reviewLink}>
                  <div class="review-readmore">{$Translate("readmore")}</div></a
                >
                <a
                  class="review-link"
                  href={review.reviewLink}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  ><div class="review-logo-container">
                    <div class="review-postedon">{$Translate("posted_on")}</div>
                    <div title="Google" class="review-icon w-28">
                      <div>
                        <img
                          src="assets/img/reviews/{review.reviewPlatform}.svg"
                          alt=""
                        />
                      </div>
                    </div>
                  </div></a
                >
              </div>
            </SplideSlide>
          {/each}
        </Splide>
      </div>
    </div>
  </div>
</div>

<style>
  /* REVIEWS */

  .review-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 18px;
    padding-top: 40px;
  }
  .review-header {
    flex-wrap: nowrap !important;
    display: flex !important;
    position: static !important;
    color: inherit !important;
    max-width: 100% !important;
    text-decoration: none !important;
    border: none !important;
  }
  .review-avatar {
    flex: 0 0 auto;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    overflow: hidden;
  }
  .review-avatar-bg {
    width: 100%;
    height: 100%;
    transition: opacity 1s ease-out 0s;
    background-color: rgb(210, 210, 210);
    border-radius: 50%;
    overflow: hidden;
    opacity: 1;
  }
  .review-info {
    margin-left: 16px;
    display: flex;
    flex-direction: column;
    min-width: 0px;
  }
  .review-author {
    font-size: 14px;
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
    color: rgb(17, 17, 17);
  }
  .review-info2 {
    display: flex;
    flex-wrap: wrap;
    -webkit-box-align: center;
    align-items: center;
  }
  .ratings {
    position: relative;
    vertical-align: top;
    display: inline-block;
    color: #b1b1b1;
    overflow: hidden;
  }

  .full-stars-tp {
    position: absolute;
    left: 0;
    top: 0;
    white-space: nowrap;
    overflow: hidden;
  }
  .empty-stars:before,
  .full-stars-tp:before {
    content: "\2605\2605\2605\2605\2605";
    font-size: 12pt;
  }
  .empty-stars:before {
    -webkit-text-stroke: 1px #b1b1b1;
  }

  /* Webkit-text-stroke is not supported on firefox or IE */

  /* Firefox */
  @-moz-document url-prefix() {
    .full-stars {
      color: rgb(252, 191, 2) !important;
    }
  }
  .review-date {
    padding-left: 10px;
    overflow: hidden;
    min-width: 0px;
    font-weight: 400;
    font-size: 12px;
    line-height: 1.17;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: rgba(17, 17, 17, 0.5);
  }
  .review-text {
    font-weight: 400;
    margin-top: 8px;
    width: 100%;
    line-height: 1.3;
    color: rgb(17, 17, 17);
    font-size: 13px;
    text-align: left;
  }
  .review-text-outer {
    position: relative;
    overflow: hidden;
    height: 67px;
    width: 100%;
    line-height: 1.3;
    color: rgb(17, 17, 17);
    font-size: 13px;
    text-align: left;
  }
  .review-link {
    margin-top: 12px;
    display: block !important;
    position: static !important;
    color: inherit !important;
    max-width: 100% !important;
    text-decoration: none !important;
    border: none !important;
  }
  .review-postedon {
    color: rgba(17, 17, 17, 0.5);
    font-family: Montserrat;
    font-weight: 400;
    font-size: 13px;
  }
  .review-icon {
    font-size: 18px !important;
    flex: 0 1 0%;
  }
  .review-readmore {
    display: inline-block;
    cursor: pointer;
    font-size: 14px;
    color: rgba(17, 17, 17, 0.5);
  }

  :global(.testimonials .main-slider-page) {
    background-color: #f2f2f2 !important;
  }
  :global(.testimonials .main-slider-page.is-active) {
    background-color: #bc74a5 !important;
  }
</style>
