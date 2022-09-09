import React from "react";
import { IBoxCastPlayerProps } from "../../IBoxCastPlayerProps";

declare global {
  interface Window {
    boxcast: any;
  }
}

const loadScript = (
  FILE_URL: string,
  async = true,
  type = "text/javascript"
) => {
  return new Promise((resolve, reject) => {
    try {
      const scriptEle = document.createElement("script");
      scriptEle.type = type;
      scriptEle.async = async;
      scriptEle.src = FILE_URL;

      scriptEle.addEventListener("load", (ev) => {
        resolve({ status: true });
      });

      scriptEle.addEventListener("error", (ev) => {
        reject({
          status: false,
          message: `Failed to load the script ＄{FILE_URL}`,
        });
      });

      document.body.appendChild(scriptEle);
    } catch (error) {
      reject(error);
    }
  });
};

const loadBroadcast = (context: any, channelId: String, broadcastId: String) => {
  const options = {
    autoplay: true,
    showTitle: false,
    showDescription: false,
    showHighlights: false,
    showRelated: false,
    showCountdown: true,
    selectedBroadcastId: broadcastId
  };
  context.unload();
  context.loadChannel(channelId, options);
};

const BoxCastPlayer = (props: IBoxCastPlayerProps) => {
  loadScript("https://js.boxcast.com/v3.min.js")
    .then((data) => {
      console.log("Script loaded successfully", data);
    })
    .catch((err) => {
      console.error(err);
    });

    const context = window.boxcast('#boxcast-widget-broadcast');

    loadBroadcast(context, props.channelId, props.broadcastId)

  return (
    <div>
      <div id="boxcast-widget-broadcast"></div>
    </div>
  );
};

export default BoxCastPlayer;
