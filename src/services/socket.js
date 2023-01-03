import ENV from "../env";
import { navigate } from "svelte-navigator";
let IO;

const startConnection = () => {
  IO = io(ENV.API_URL, {
    reconnectionDelayMax: 3000,
    auth: { token: JSON.parse(localStorage.getItem("user")).token, isWeb: check() },
  });

  IO.on("connect", (socket) => {
    console.log("connect");

    IO.on("update-tag", (event) => {
      console.log(event, "denfvkalk");
      navigate(`/panel/update-tag/${event.tagId}`);
    });
  });

  IO.on("disconnect", () => {
    console.log("disconnect");
  });
};

const stopConnection = () => {
  if (IO) {
    IO.disconnect();

    IO.on("disconnect", () => {
      console.log("disconnect");
    });
    IO = undefined;
  }
};

function check() {
  try {
    if (
      /Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return false;
    }
    return true;
  } catch (e) {
    return true;
  }
}

export default {
  stopConnection,
  startConnection,
  IO,
};
