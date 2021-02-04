/*

    Copyright (c) 2021 Media.js, All Rights Reserved.
    Icons copyright (c) 2021 Font Awesome.
    YouTube capabilities Copyright (c) YouTube.
    
    Media.js Version 1.2, 2021-02-04, Patch #6 (1.2.0) [NIGHTLY BUILD]
    Font Awesome Version 5.15, 2021-01-13, Patch #2 (5.15.2)
    YouTube Iframe API Version 3, 2020-10-15
    
    This is authorized for all uses, public and private,
    however you MUST use the Font Awesome guidelines, and
    you MUST credit Media.js as the author. You MAY NOT
    try to pass this work off as your own.
    
    Changelog:
        Trying to add custom context menu with toggleable settings.
        Allows mediaJS.contextMenu(false);

*/

// Defining the CSS for the player.
const styles = "div.mediajs-audio-container{height:50px;width:100%;background:lightgrey;border:none;border-radius:8px;display:flex;flex-direction:row;align-items:center;position:relative;z-index:1;}div.mediajs-video-container{height:90vh;width:98.75vw;background:black;border:none;border-radius:8px;display:flex;flex-direction:column;align-items:center;position:absolute;z-index:-1;justify-content:center;}div.mediajs-video-control-bar{height:50px;width:100%;background:lightgrey;border:none;border-radius:8px;display:flex;flex-direction:row;align-items:center;position:absolute;z-index:1;bottom:0;visibility:hidden;border-top-right-radius:0px;border-top-left-radius:0px;}button.mediajs-play-control{border:none;background:none;outline:none;cursor:pointer;position:absolute;z-index:2;}button.mediajs-play-control:hover{color:darkgrey;}i.mediajs-play-icon{text-shadow:2px2px0pxblack;}button.mediajs-play-control:hoveri.mediajs-play-icon{text-shadow:2px2px0pxdarkgrey;}div.mediajs-length-bar{background:darkgrey;width:80%;height:10px;border:none;border-radius:8px;margin-left:3.25%;position:absolute;z-index:1;cursor:pointer;}div.mediajs-preload-canvas{height:10px;position:absolute;z-index:2;border:none;border-radius:8px;background:black;cursor:pointer;}div.mediajs-video-length-bar{background:darkgrey;width:70%;height:10px;border:none;border-radius:8px;margin-left:3.25%;position:absolute;z-index:1;cursor:pointer;}div.mediajs-video-preload-canvas{height:10px;position:absolute;z-index:2;border:none;border-radius:8px;background:black;cursor:pointer;}span.mediajs-current-time{margin-left:83.75%;position:absolute;z-index:3;font-family:Helvetica;}span.mediajs-full-length{margin-left:92%;position:absolute;z-index:3;font-family:Helvetica;}span.mediajs-video-current-time{margin-left:74%;position:absolute;z-index:3;font-family:Helvetica;}span.mediajs-video-full-length{margin-left:77.25%;position:absolute;z-index:3;font-family:Helvetica;}span.mediajs-time-preview-caret{color:black;position:absolute;z-index:5;margin-top:1.5%;margin-left:3%;display:none;}span.mediajs-time-preview{border:1px solid black;width:40px;height:20px;position:absolute;z-index:4;margin-left:2.25%;margin-top:4%;display:none;font-family:Helvetica;text-align:center;}div.mediajs-volume-control{display:flex;flex-direction:row;position:absolute;z-index:6;margin-left:90.5%;height:20px;width:20%;background:none;}div.mediajs-video-volume-control{display:flex;flex-direction:row;position:absolute;z-index:6;margin-left:80.75%;height:20px;width:20%;background:none;}button.mediajs-volume-control-1{height:10px;width:5px;background:black;margin-left:0px;border:none;border-radius:8px;position:absolute;bottom:-0.5vh;cursor:pointer;outline:none;}button.mediajs-volume-control-2{height:15px;width:5px;background:black;margin-left:15px;border:none;border-radius:8px;position:absolute;bottom:-0.5vh;cursor:pointer;outline:none;}button.mediajs-volume-control-3{height:20px;width:5px;background:black;margin-left:30px;border:none;border-radius:8px;position:absolute;bottom:-0.5vh;cursor:pointer;outline:none;}button.mediajs-volume-control-4{height:25px;width:5px;background:black;margin-left:45px;border:none;border-radius:8px;position:absolute;bottom:-0.5vh;cursor:pointer;outline:none;}button.mediajs-volume-control-5{height:30px;width:5px;background:black;margin-left:60px;border:none;border-radius:8px;position:absolute;bottom:-0.5vh;cursor:pointer;outline:none;}button.mediajs-mute-control{background:none;border:none;cursor:pointer;outline:none;margin-left:75px;position:absolute;bottom:-0.75vh;}button.mediajs-video-volume-control-1{height:10px;width:5px;background:black;margin-left:50px;border:none;border-radius:8px;position:absolute;bottom:-0.5vh;cursor:pointer;outline:none;}button.mediajs-video-volume-control-2{height:15px;width:5px;background:black;margin-left:65px;border:none;border-radius:8px;position:absolute;bottom:-0.5vh;cursor:pointer;outline:none;}button.mediajs-video-volume-control-3{height:20px;width:5px;background:black;margin-left:80px;border:none;border-radius:8px;position:absolute;bottom:-0.5vh;cursor:pointer;outline:none;}button.mediajs-video-volume-control-4{height:25px;width:5px;background:black;margin-left:95px;border:none;border-radius:8px;position:absolute;bottom:-0.5vh;cursor:pointer;outline:none;}button.mediajs-video-volume-control-5{height:30px;width:5px;background:black;margin-left:110px;border:none;border-radius:8px;position:absolute;bottom:-0.5vh;cursor:pointer;outline:none;}button.mediajs-video-mute-control{background:none;border:none;cursor:pointer;outline:none;margin-left:125px;position:absolute;bottom:-0.75vh;}button.mediajs-picture-in-picture-control{background:none;border:none;cursor:pointer;outline:none;margin-left:165px;position:absolute;bottom:-1.5vh;}button.mediajs-fullscreen-control{background:none;border:none;cursor:pointer;outline:none;margin-left:215px;position:absolute;bottom:-0.75vh;}video.mediajs-video{opacity:1;position:absolute;z-index:0;margin-top:0vh;height:99%;width:99%;border:none;border-radius:8px;}video.mediajs-video::-webkit-media-controls-enclosure{display:none!important;}div.mediajs-video-controls{z-index:2147483647;display:none;}div.mediajs-video-controls:-moz-full-screen{position:fixed;}div.mediajs-video-controls:-webkit-full-screen{position:fixed;}div.mediajs-video-controls:-ms-fullscreen{position:fixed;}div.mediajs-video-controls:fullscreen{position:fixed;}div.mediajs-video-controls{position:absolute;bottom:0;right:0;left:0;width:99%;}button.mediajs-big-play-button{padding:32px 48px;background:#FF0000;border:none;border-radius:16px;color:white;position:absolute;z-index:2;cursor:pointer;outline:none;}button.mediajs-big-play-button:hover{background:#8B0000;animation:darkRed0.4s;}button.mediajs-darkRed{animation:lightRed0.6s;}@keyframesdarkRed{0%{background:#FF0000;}100%{background:#8B0000;}}@keyframeslightRed{0%{background:#8B0000;}100%{background:#FF0000;}}span.mediajs-volume-status{z-index:2147483647;background:darkgrey;position:absolute;padding:32px 32px;border-radius:16px;border:none;opacity:0.6;display:none;font-size:18px;font-family:Helvetica;}span.mediajs-volume-fadeout{animation:volFadeOut1s;}@keyframesvolFadeOut{0%{opacity:0.6;}100%{opacity:0;}}img.mediajs-poster{position:absolute;z-index:1;}";

// Defining default variables.
var vid, vidsrc, videoEl, ytVideoId, player, duration, videoTime, oldTime, timeUpdater;

// Defining basic & core functions.
function convertElapsedTime(inputSeconds) {
  var seconds = Math.floor(inputSeconds % 60);
  if (seconds < 10) {
    seconds = "0" + seconds
  }
  var minutes = Math.floor(inputSeconds / 60);
  return minutes + ":" + seconds;
}

function getCookie(name) {
  var cookieArr = document.cookie.split(";");
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");
    if (name == cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player(videoEl.id, {
    height: videoEl.offsetHeight,
    width: videoEl.offsetWidth,
    playerVars: {
      'autoplay': 0,
      'controls': 0,
      'disablekb': 0,
      'fs': 0,
      'modestbranding': 1,
      'rel': 1,
      'cc_lang_pref': 'en',
      'enablejsapi': 1
    },
    host: 'https://www.youtube-nocookie.com',
    videoId: ytVideoId,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  duration = player.getDuration();
  var currentTime = player.getCurrentTime();
  document.getElementById("mediajs-full-length-" + vid.id).innerHTML = convertElapsedTime(duration);
  document.getElementById("mediajs-current-time-" + vid.id).innerHTML = convertElapsedTime(currentTime) + " / ";
  canvas2.style.width = "1%";
}
var done = false;

function onPlayerStateChange(event) {
  if (player.getPlayerState() === 0 && !done) {
    canvas2.style.width = "1%";
    setTimeout(stopVideo, 6000);
    done = true;
  }
}

function stopVideo() {
  player.stopVideo();
}

// Defining the Audio system for Media.js
function majs(id, ch, w) {

  // Defining and appending core elements.
  var aux = id;
  var auxsrc = aux.getElementsByTagName("source")[0];
  aux.style.display = "none";
  var container = document.createElement("div");
  container.id = "mediajs-audio-container-" + aux.id;
  container.className = "mediajs-audio-container";
  document.body.insertBefore(container, aux);
  if (ch === true) {
    container.style.width = w + "px";
  } else {

  }
  var playPause = document.createElement("button");
  playPause.className = "mediajs-play-control";
  playPause.id = "mediajs-play-control-audio-" + aux.id;
  var playPauseIcon = document.createElement("i");
  playPauseIcon.className = "mediajs-play-icon fas fa-play fa-2x";
  playPauseIcon.id = "mediajs-play-icon-" + aux.id;
  playPause.appendChild(playPauseIcon);
  container.appendChild(playPause);
  var lengthBar = document.createElement("div");
  lengthBar.className = "mediajs-length-bar";
  lengthBar.id = "mediajs-length-bar-" + aux.id;
  container.appendChild(lengthBar);
  var fullLength = document.createElement("span");
  fullLength.id = "mediajs-full-length-" + aux.id;
  fullLength.className = "mediajs-full-length";
  container.appendChild(fullLength);
  var canvas = document.createElement("div");
  canvas.className = "mediajs-preload-canvas";
  canvas.style.maxWidth = document.getElementById("mediajs-length-bar-" + aux.id).offsetWidth + "px";
  canvas.id = "mediajs-preload-canvas-" + aux.id;
  lengthBar.appendChild(canvas);
  var ctime = document.createElement("span");
  ctime.className = "mediajs-current-time";
  ctime.id = "mediajs-current-time-" + aux.id;
  container.appendChild(ctime);
  var timePreview = document.createElement("span");
  timePreview.id = "mediajs-time-preview-" + aux.id;
  timePreview.className = "mediajs-time-preview";
  var tPrev = document.createElement("span");
  tPrev.id = "mediajs-time-preview-caret-" + aux.id;
  tPrev.className = "mediajs-time-preview-caret fas fa-caret-up fa-2x";
  container.appendChild(timePreview);
  container.appendChild(tPrev);
  var volumeContainer = document.createElement("div");
  volumeContainer.className = "mediajs-volume-control";
  volumeContainer.id = "mediajs-volume-control-" + aux.id;
  container.appendChild(volumeContainer);
  var vol1 = document.createElement("button");
  vol1.className = "mediajs-volume-control-1";
  vol1.id = "mediajs-volume-control-1-" + aux.id;
  vol1.type = "button";
  volumeContainer.appendChild(vol1);
  var vol2 = document.createElement("button");
  vol2.className = "mediajs-volume-control-2";
  vol2.id = "mediajs-volume-control-2-" + aux.id;
  vol2.type = "button";
  volumeContainer.appendChild(vol2);
  var vol3 = document.createElement("button");
  vol3.className = "mediajs-volume-control-3";
  vol3.id = "mediajs-volume-control-3-" + aux.id;
  vol3.type = "button";
  volumeContainer.appendChild(vol3);
  var vol4 = document.createElement("button");
  vol4.className = "mediajs-volume-control-4";
  vol4.id = "mediajs-volume-control-4-" + aux.id;
  vol4.type = "button";
  volumeContainer.appendChild(vol4);
  var vol5 = document.createElement("button");
  vol5.className = "mediajs-volume-control-5";
  vol5.id = "mediajs-volume-control-5-" + aux.id;
  vol5.type = "button";
  volumeContainer.appendChild(vol5);
  var mute = document.createElement("button");
  mute.className = "mediajs-mute-control fas fa-volume-off fa-2x";
  mute.id = "mediajs-mute-control-" + aux.id;
  mute.type = "button";
  volumeContainer.appendChild(mute);

  var audioEl = aux;
  var canvas2 = document.getElementById("mediajs-preload-canvas-" + aux.id);
  var ctrl = document.getElementById("mediajs-play-control-audio-" + aux.id);

  // Defining events
  audioEl.addEventListener("loadedmetadata", function() {
    var duration = audioEl.duration;
    var currentTime = audioEl.currentTime;
    document.getElementById("mediajs-full-length-" + aux.id).innerHTML = convertElapsedTime(duration);
    document.getElementById("mediajs-current-time-" + aux.id).innerHTML = convertElapsedTime(currentTime) + " / ";
    canvas2.style.width = "1%";
  });
  ctrl.addEventListener("click", function() {
    var play = ctrl.getElementsByTagName("i")[0].className === "mediajs-play-icon fas fa-play fa-2x";
    if (play) {
      ctrl.getElementsByTagName("i")[0].className = "mediajs-play-icon fas fa-pause fa-2x";
      audioEl.play();
      audioEl.pause();
      audioEl.play();
      audioEl.pause();
      audioEl.play();
      audioEl.pause();
      audioEl.play();
    } else {
      ctrl.getElementsByTagName("i")[0].className = "mediajs-play-icon fas fa-play fa-2x";
      audioEl.pause();
    }
  });
  audioEl.addEventListener("timeupdate", function() {
    var currentTime = audioEl.currentTime;
    var duration = audioEl.duration;

    if (currentTime === duration) {
      ctrl.getElementsByTagName("i")[0].className = "mediajs-play-icon fas fa-play fa-2x";
      method = "pause";
    }

    document.getElementById("mediajs-current-time-" + aux.id).innerHTML = convertElapsedTime(currentTime) + " / ";

    var percent = currentTime / duration;
    var percentage = percent.toFixed(2).replace("0.", "");
    canvas2.style.width = percentage + "%";
  });
  audioEl.addEventListener("ended", function() {
    canvas2.style.width = "1%";
  });
  lengthBar.addEventListener("click", function(event) {
    var percent = (event.offsetX / lengthBar.offsetWidth).toFixed(2).replace("0.", "").replace("1.00", "100");
    var duration = audioEl.duration;
    for (var i = 0.00; i < duration; i++) {
      var percent2 = (i / duration).toFixed(2).replace("0.", "").replace("1.00", "100");
      if (percent2 == percent) {
        audioEl.currentTime = i;
      }
    }
  });
  lengthBar.addEventListener("mouseover", function(event) {
    var percent = (event.offsetX / lengthBar.offsetWidth).toFixed(2).replace("0.", "").replace("1.00", "100");
    var duration = audioEl.duration;
    for (var i = 0.00; i < duration; i++) {
      var percent2 = (i / duration).toFixed(2).replace("0.", "").replace("1.00", "100");
      if (percent2 == percent) {
        if (parseFloat(percent) > 81.5) {
          document.getElementById("mediajs-time-preview-" + aux.id).style.marginLeft = 81.5 + "%";
          document.getElementById("mediajs-time-preview-caret-" + aux.id).style.marginLeft = 82.3 + "%";
          document.getElementById("mediajs-time-preview-" + aux.id).innerHTML = convertElapsedTime(i);
          document.getElementById("mediajs-time-preview-" + aux.id).style.display = "block";
          document.getElementById("mediajs-time-preview-caret-" + aux.id).style.display = "block";
        } else {
          document.getElementById("mediajs-time-preview-" + aux.id).style.marginLeft = parseFloat(percent) + 2.25 + "%";
          document.getElementById("mediajs-time-preview-caret-" + aux.id).style.marginLeft = parseFloat(percent) + 3 + "%";
          document.getElementById("mediajs-time-preview-" + aux.id).innerHTML = convertElapsedTime(i);
          document.getElementById("mediajs-time-preview-" + aux.id).style.display = "block";
          document.getElementById("mediajs-time-preview-caret-" + aux.id).style.display = "block";
        }
      }
    }
  });
  lengthBar.addEventListener("mouseleave", function() {
    document.getElementById("mediajs-time-preview-" + aux.id).style.display = "none";
    document.getElementById("mediajs-time-preview-caret-" + aux.id).style.display = "none";
  });
  canvas2.addEventListener("click", function(event) {
    var percent = (event.offsetX / lengthBar.offsetWidth).toFixed(2).replace("0.", "").replace("1.00", "100");
    var duration = audioEl.duration;
    for (var i = 0.00; i < duration; i++) {
      var percent2 = (i / duration).toFixed(2).replace("0.", "").replace("1.00", "100");
      if (percent2 == percent) {
        audioEl.currentTime = i;
      }
    }
  });
  canvas2.addEventListener("mouseover", function(event) {
    var percent = (event.offsetX / lengthBar.offsetWidth).toFixed(2).replace("0.", "").replace("1.00", "100");
    var duration = audioEl.duration;
    for (var i = 0.00; i < duration; i++) {
      var percent2 = (i / duration).toFixed(2).replace("0.", "").replace("1.00", "100");
      if (percent2 == percent) {
        if (parseFloat(percent) > 81.5) {
          document.getElementById("mediajs-time-preview-" + aux.id).style.marginLeft = 81.5 + "%";
          document.getElementById("mediajs-time-preview-caret-" + aux.id).style.marginLeft = 82.3 + "%";
          document.getElementById("mediajs-time-preview-" + aux.id).innerHTML = convertElapsedTime(i);
          document.getElementById("mediajs-time-preview-" + aux.id).style.display = "block";
          document.getElementById("mediajs-time-preview-caret-" + aux.id).style.display = "block";
        } else {
          document.getElementById("mediajs-time-preview-" + aux.id).style.marginLeft = parseFloat(percent) + 2.25 + "%";
          document.getElementById("mediajs-time-preview-caret-" + aux.id).style.marginLeft = parseFloat(percent) + 3 + "%";
          document.getElementById("mediajs-time-preview-" + aux.id).innerHTML = convertElapsedTime(i);
          document.getElementById("mediajs-time-preview-" + aux.id).style.display = "block";
          document.getElementById("mediajs-time-preview-caret-" + aux.id).style.display = "block";
        }
      }
    }
  });
  canvas2.addEventListener("mouseleave", function() {
    document.getElementById("mediajs-time-preview-" + aux.id).style.display = "none";
    document.getElementById("mediajs-time-preview-caret-" + aux.id).style.display = "none";
  });

  // Volume stuff
  var volTmp;
  if (getCookie("vol") != null) {
    aux.volume = getCookie("vol");
    volTmp = getCookie("vol");
  } else {

  }
  if (getCookie("muted") != null) {
    if (getCookie("muted") === true) {
      document.getElementById("mediajs-mute-control-" + aux.id).className = "mediajs-mute-control fas fa-volume-mute fa-2x";
      volTmp = aux.volume;
      aux.volume = 0;
      document.cookie = "muted = true";
    } else {

    }
  }
  document.getElementById("mediajs-mute-control-" + aux.id).addEventListener("click", function() {
    if (this.className == "mediajs-mute-control fas fa-volume-mute fa-2x") {
      this.className = "mediajs-mute-control fas fa-volume-off fa-2x";
      aux.volume = volTmp;
      document.cookie = "muted = false";
    } else {
      this.className = "mediajs-mute-control fas fa-volume-mute fa-2x";
      volTmp = aux.volume;
      aux.volume = 0;
      document.cookie = "muted = true";
    }
  });
  document.getElementById("mediajs-volume-control-1-" + aux.id).addEventListener("click", function() {
    aux.volume = 0.2;
    document.cookie = "vol = 0.2";
  });
  document.getElementById("mediajs-volume-control-2-" + aux.id).addEventListener("click", function() {
    aux.volume = 0.4;
    document.cookie = "vol = 0.4";
  });
  document.getElementById("mediajs-volume-control-3-" + aux.id).addEventListener("click", function() {
    aux.volume = 0.6;
    document.cookie = "vol = 0.6";
  });
  document.getElementById("mediajs-volume-control-4-" + aux.id).addEventListener("click", function() {
    aux.volume = 0.8;
    document.cookie = "vol = 0.8";
  });
  document.getElementById("mediajs-volume-control-5-" + aux.id).addEventListener("click", function() {
    aux.volume = 1.0;
    document.cookie = "vol = 1.0";
  });

  // Keybinds
  var volumeKeyUpInterval;
  var volumeKeyDownInterval;
  document.addEventListener("keydown", function(event) {
    if (event.which == 32) {
      if (audioEl.paused) {
        audioEl.play();
        audioEl.pause();
        audioEl.play();
        audioEl.pause();
        audioEl.play();
        audioEl.pause();
        audioEl.play();
      } else {
        audioEl.pause();
      }
    } else if (event.which == 40) {
      audioEl.volume -= 0.05;
      volumeKeyDownInterval = setInterval(function() {
        audioEl.volume -= 0.05;
      }, 500)
    } else if (event.which == 38) {
      audioEl.volume += 0.05;
      volumeKeyUpInterval = setInterval(function() {
        audioEl.volume += 0.05;
      }, 500)
    } else if (event.which == 39) {
      audioEl.currentTime += 5;
      aux.currentTime += 5;
    } else if (event.which == 37) {
      audioEl.currentTime -= 5;
      aux.currentTime -= 5;
    }
  });
  document.addEventListener("keyup", function(event) {
    clearInterval(volumeKeyUpInterval);
    clearInterval(volumeKeyDownInterval);
  });

  // Icon stuff
  setInterval(function() {
    if (audioEl.paused) {
      ctrl.getElementsByTagName("i")[0].className = "mediajs-play-icon fas fa-play fa-2x";
    } else {
      ctrl.getElementsByTagName("i")[0].className = "mediajs-play-icon fas fa-pause fa-2x";
    }
  }, 1);
  videoEl.addEventListener("ended", function() {
    canvas2.style.width = "1%";
  });

  // Volume status stuff
  var volumeStatus = document.createElement("span");
  volumeStatus.className = "mediajs-volume-status";
  volumeStatus.id = "mediajs-volume-status-" + aux.id;
  document.body.appendChild(volumeStatus);
  audioEl.addEventListener("volumechange", function() {
    var vol = audioEl.volume.toFixed(2).replace("0.", "").replace("1.00", "100") + "%";
    if (vol != "00%") {
      document.getElementById("mediajs-volume-status-" + aux.id).innerHTML = vol;
    } else {
      document.getElementById("mediajs-volume-status-" + aux.id).innerHTML = "0%";
    }
    document.getElementById("mediajs-volume-status-" + aux.id).style.display = "block";
    document.getElementById("mediajs-volume-status-" + aux.id).classList.add("mediajs-volume-fadeout");
    setTimeout(function() {
      document.getElementById("mediajs-volume-status-" + aux.id).style.display = "none";
      document.getElementById("mediajs-volume-status-" + aux.id).classList.remove("mediajs-volume-fadeout");
    }, 500);
  });
}

// Defining the Video system for Media.js
function mvjs(id, ch, h, w) {

  // Defining the base element
  vid = id;
  vidsrc = vid.getElementsByTagName("source")[0];

  // Checking if the base element is for YouTube
  if (vidsrc.type.toLowerCase() == "video/youtube") {
    if (vidsrc.src.includes("youtu")) {
      const youtube_regex = /^.*(youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|\&vi?=)([^#\&\?]*).*/;
      const parsed = vidsrc.src.match(youtube_regex);
      ytVideoId = parsed[2];
    } else {
      ytVideoId = vidsrc.src;
    }

    // If it is, execute the YouTube system and stop this one.
    return mvjsYT(id, ch, h, w);
  } else {

  }

  // Defining and appending core elements
  vid.style.display = "none";
  var containerx = document.createElement("div");
  containerx.className = "mediajs-video-container";
  containerx.id = "mediajs-video-container-" + vid.id;
  document.body.insertBefore(containerx, vid);
  var container = document.createElement("div");
  container.className = "mediajs-video-control-bar";
  container.id = "mediajs-video-control-bar-" + vid.id;
  containerx.appendChild(container);
  if (ch === true) {
    containerx.style.width = w + "px";
    containerx.style.height = w + "px";
  } else {

  }
  var playPause = document.createElement("button");
  playPause.className = "mediajs-play-control";
  playPause.id = "mediajs-play-control-video-" + vid.id;
  var playPauseIcon = document.createElement("i");
  playPauseIcon.className = "mediajs-play-icon fas fa-play fa-2x";
  playPauseIcon.id = "mediajs-play-icon-" + vid.id;
  playPause.appendChild(playPauseIcon);
  container.appendChild(playPause);
  var lengthBar = document.createElement("div");
  lengthBar.className = "mediajs-video-length-bar";
  lengthBar.id = "mediajs-length-bar-" + vid.id;
  container.appendChild(lengthBar);
  var fullLength = document.createElement("span");
  fullLength.id = "mediajs-full-length-" + vid.id;
  fullLength.className = "mediajs-video-full-length";
  container.appendChild(fullLength);
  var canvas = document.createElement("div");
  canvas.className = "mediajs-video-preload-canvas";
  canvas.style.maxWidth = document.getElementById("mediajs-length-bar-" + vid.id).offsetWidth + "px";
  canvas.id = "mediajs-preload-canvas-" + vid.id;
  lengthBar.appendChild(canvas);
  var ctime = document.createElement("span");
  ctime.className = "mediajs-video-current-time";
  ctime.id = "mediajs-current-time-" + vid.id;
  container.appendChild(ctime);
  var timePreview = document.createElement("span");
  timePreview.id = "mediajs-time-preview-" + vid.id;
  timePreview.className = "mediajs-time-preview";
  var tPrev = document.createElement("span");
  tPrev.id = "mediajs-time-preview-caret-" + vid.id;
  tPrev.className = "mediajs-time-preview-caret fas fa-caret-up fa-2x";
  container.appendChild(timePreview);
  container.appendChild(tPrev);
  var volumeContainer = document.createElement("div");
  volumeContainer.className = "mediajs-video-volume-control";
  volumeContainer.id = "mediajs-volume-control-" + vid.id;
  container.appendChild(volumeContainer);
  var vol1 = document.createElement("button");
  vol1.className = "mediajs-video-volume-control-1";
  vol1.id = "mediajs-volume-control-1-" + vid.id;
  vol1.type = "button";
  volumeContainer.appendChild(vol1);
  var vol2 = document.createElement("button");
  vol2.className = "mediajs-video-volume-control-2";
  vol2.id = "mediajs-volume-control-2-" + vid.id;
  vol2.type = "button";
  volumeContainer.appendChild(vol2);
  var vol3 = document.createElement("button");
  vol3.className = "mediajs-video-volume-control-3";
  vol3.id = "mediajs-volume-control-3-" + vid.id;
  vol3.type = "button";
  volumeContainer.appendChild(vol3);
  var vol4 = document.createElement("button");
  vol4.className = "mediajs-video-volume-control-4";
  vol4.id = "mediajs-volume-control-4-" + vid.id;
  vol4.type = "button";
  volumeContainer.appendChild(vol4);
  var vol5 = document.createElement("button");
  vol5.className = "mediajs-video-volume-control-5";
  vol5.id = "mediajs-volume-control-5-" + vid.id;
  vol5.type = "button";
  volumeContainer.appendChild(vol5);
  var mute = document.createElement("button");
  mute.className = "mediajs-video-mute-control fas fa-volume-off fa-2x";
  mute.id = "mediajs-mute-control-" + vid.id;
  mute.type = "button";
  volumeContainer.appendChild(mute);
  var pip = document.createElement("button");
  pip.className = "mediajs-picture-in-picture-control";
  pip.id = "mediajs-picture-in-picture-control-" + vid.id;
  pip.type = "button";
  pip.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98V5c0-1.1-.9-2-2-2zm0 16.01H3V4.98h18v14.03z"/></svg>';
  volumeContainer.appendChild(pip);
  var fsc = document.createElement("button");
  fsc.className = "mediajs-fullscreen-control fas fa-expand fa-2x";
  fsc.id = "mediajs-fullscreen-control-" + vid.id;
  fsc.type = "button";
  volumeContainer.appendChild(fsc);
  var videoControls = container.cloneNode(true);
  videoControls.className = "mediajs-video-control-bar mediajs-video-controls";
  videoControls.id = "mediajs-video-controls-" + vid.id;
  document.body.appendChild(videoControls);

  var video = document.createElement("video");
  var videosrc = document.createElement("source");
  videosrc.src = vidsrc.src;
  videosrc.type = vidsrc.type;
  video.appendChild(videosrc);
  video.className = "mediajs-video";
  video.id = "mediajs-video-" + vid.id;
  containerx.appendChild(video);

  var poster = document.createElement("img");
  poster.id = "mediajs-poster-" + vid.id;
  poster.className = "mediajs-poster";
  poster.height = document.getElementById("mediajs-video-" + vid.id).offsetHeight;
  poster.src = vid.poster;
  containerx.appendChild(poster);

  videoEl = document.getElementById("mediajs-video-" + vid.id);
  var canvas2 = document.getElementById("mediajs-preload-canvas-" + vid.id);
  var ctrl = document.getElementById("mediajs-play-control-video-" + vid.id);

  // Event listeners
  videoEl.addEventListener("loadedmetadata", function() {
    var duration = videoEl.duration;
    var currentTime = videoEl.currentTime;
    document.getElementById("mediajs-full-length-" + vid.id).innerHTML = convertElapsedTime(duration);
    document.getElementById("mediajs-current-time-" + vid.id).innerHTML = convertElapsedTime(currentTime) + " / ";
    canvas2.style.width = "1%";
  });
  ctrl.addEventListener("click", function() {
    var play = ctrl.getElementsByTagName("i")[0].className === "mediajs-play-icon fas fa-play fa-2x";
    if (play) {
      ctrl.getElementsByTagName("i")[0].className = "mediajs-play-icon fas fa-pause fa-2x";
      videoEl.play();
      videoEl.pause();
      videoEl.play();
      videoEl.pause();
      videoEl.play();
      videoEl.pause();
      videoEl.play();
    } else {
      ctrl.getElementsByTagName("i")[0].className = "mediajs-play-icon fas fa-play fa-2x";
      videoEl.pause();
    }
  });
  videoEl.addEventListener("click", function() {
    var play = ctrl.getElementsByTagName("i")[0].className === "mediajs-play-icon fas fa-play fa-2x";
    if (play) {
      ctrl.getElementsByTagName("i")[0].className = "mediajs-play-icon fas fa-pause fa-2x";
      videoEl.play();
      videoEl.pause();
      videoEl.play();
      videoEl.pause();
      videoEl.play();
      videoEl.pause();
      videoEl.play();
    } else {
      ctrl.getElementsByTagName("i")[0].className = "mediajs-play-icon fas fa-play fa-2x";
      videoEl.pause();
    }
  });
  videoEl.addEventListener("timeupdate", function() {
    var currentTime = videoEl.currentTime;
    var duration = videoEl.duration;

    if (currentTime === duration) {
      ctrl.getElementsByTagName("i")[0].className = "mediajs-play-icon fas fa-play fa-2x";
      method = "pause";
    }

    document.getElementById("mediajs-current-time-" + vid.id).innerHTML = convertElapsedTime(currentTime) + " / ";

    var percent = currentTime / duration;
    var percentage = percent.toFixed(2).replace("0.", "");
    canvas2.style.width = percentage + "%";
  });
  videoEl.addEventListener("ended", function() {
    canvas2.style.width = "1%";
  });
  lengthBar.addEventListener("click", function(event) {
    var percent = (event.offsetX / lengthBar.offsetWidth).toFixed(2).replace("0.", "").replace("1.00", "100");
    var duration = videoEl.duration;
    for (var i = 0.00; i < duration; i++) {
      var percent2 = (i / duration).toFixed(2).replace("0.", "").replace("1.00", "100");
      if (percent2 == percent) {
        videoEl.currentTime = i;
      }
    }
  });
  lengthBar.addEventListener("mouseover", function(event) {
    var percent = (event.offsetX / lengthBar.offsetWidth).toFixed(2).replace("0.", "").replace("1.00", "100");
    var duration = videoEl.duration;
    for (var i = 0.00; i < duration; i++) {
      var percent2 = (i / duration).toFixed(2).replace("0.", "").replace("1.00", "100");
      if (percent2 == percent) {
        if (parseFloat(percent) > 71.6) {
          document.getElementById("mediajs-time-preview-" + vid.id).style.marginLeft = 71.6 + "%";
          document.getElementById("mediajs-time-preview-caret-" + vid.id).style.marginLeft = 72.4 + "%";
          document.getElementById("mediajs-time-preview-" + vid.id).innerHTML = convertElapsedTime(i);
          document.getElementById("mediajs-time-preview-" + vid.id).style.display = "block";
          document.getElementById("mediajs-time-preview-caret-" + vid.id).style.display = "block";
        } else {
          document.getElementById("mediajs-time-preview-" + vid.id).style.marginLeft = parseFloat(percent) + 2.25 + "%";
          document.getElementById("mediajs-time-preview-caret-" + vid.id).style.marginLeft = parseFloat(percent) + 3 + "%";
          document.getElementById("mediajs-time-preview-" + vid.id).innerHTML = convertElapsedTime(i);
          document.getElementById("mediajs-time-preview-" + vid.id).style.display = "block";
          document.getElementById("mediajs-time-preview-caret-" + vid.id).style.display = "block";
        }
      }
    }
  });
  lengthBar.addEventListener("mouseleave", function() {
    document.getElementById("mediajs-time-preview-" + vid.id).style.display = "none";
    document.getElementById("mediajs-time-preview-caret-" + vid.id).style.display = "none";
  });
  canvas2.addEventListener("click", function(event) {
    var percent = (event.offsetX / lengthBar.offsetWidth).toFixed(2).replace("0.", "").replace("1.00", "100");
    var duration = videoEl.duration;
    for (var i = 0.00; i < duration; i++) {
      var percent2 = (i / duration).toFixed(2).replace("0.", "").replace("1.00", "100");
      if (percent2 == percent) {
        videoEl.currentTime = i;
      }
    }
  });
  canvas2.addEventListener("mouseover", function(event) {
    var percent = (event.offsetX / lengthBar.offsetWidth).toFixed(2).replace("0.", "").replace("1.00", "100");
    var duration = videoEl.duration;
    for (var i = 0.00; i < duration; i++) {
      var percent2 = (i / duration).toFixed(2).replace("0.", "").replace("1.00", "100");
      if (percent2 == percent) {
        if (parseFloat(percent) > 71.6) {
          document.getElementById("mediajs-time-preview-" + vid.id).style.marginLeft = 71.6 + "%";
          document.getElementById("mediajs-time-preview-caret-" + vid.id).style.marginLeft = 72.4 + "%";
          document.getElementById("mediajs-time-preview-" + vid.id).innerHTML = convertElapsedTime(i);
          document.getElementById("mediajs-time-preview-" + vid.id).style.display = "block";
          document.getElementById("mediajs-time-preview-caret-" + vid.id).style.display = "block";
        } else {
          document.getElementById("mediajs-time-preview-" + vid.id).style.marginLeft = parseFloat(percent) + 2.25 + "%";
          document.getElementById("mediajs-time-preview-caret-" + vid.id).style.marginLeft = parseFloat(percent) + 3 + "%";
          document.getElementById("mediajs-time-preview-" + vid.id).innerHTML = convertElapsedTime(i);
          document.getElementById("mediajs-time-preview-" + vid.id).style.display = "block";
          document.getElementById("mediajs-time-preview-caret-" + vid.id).style.display = "block";
        }
      }
    }
  });
  canvas2.addEventListener("mouseleave", function() {
    document.getElementById("mediajs-time-preview-" + vid.id).style.display = "none";
    document.getElementById("mediajs-time-preview-caret-" + vid.id).style.display = "none";
  });

  // Volume stuff.
  var volTmp;
  if (getCookie("vol") != null) {
    videoEl.volume = getCookie("vol");
    volTmp = getCookie("vol");
  } else {

  }
  if (getCookie("muted") != null) {
    if (getCookie("muted") === true) {
      document.getElementById("mediajs-mute-control-" + vid.id).className = "mediajs-mute-control fas fa-volume-mute fa-2x";
      volTmp = videoEl.volume;
      videoEl.volume = 0;
      document.cookie = "muted = true";
    } else {

    }
  }
  document.getElementById("mediajs-mute-control-" + vid.id).addEventListener("click", function() {
    if (this.className == "mediajs-video-mute-control fas fa-volume-mute fa-2x") {
      this.className = "mediajs-video-mute-control fas fa-volume-off fa-2x";
      videoEl.volume = volTmp;
      document.cookie = "muted = false";
    } else {
      this.className = "mediajs-video-mute-control fas fa-volume-mute fa-2x";
      volTmp = videoEl.volume;
      videoEl.volume = 0;
      document.cookie = "muted = true";
    }
  });
  document.getElementById("mediajs-volume-control-1-" + vid.id).addEventListener("click", function() {
    videoEl.volume = 0.2;
    document.cookie = "vol = 0.2";
  });
  document.getElementById("mediajs-volume-control-2-" + vid.id).addEventListener("click", function() {
    videoEl.volume = 0.4;
    document.cookie = "vol = 0.4";
  });
  document.getElementById("mediajs-volume-control-3-" + vid.id).addEventListener("click", function() {
    videoEl.volume = 0.6;
    document.cookie = "vol = 0.6";
  });
  document.getElementById("mediajs-volume-control-4-" + vid.id).addEventListener("click", function() {
    videoEl.volume = 0.8;
    document.cookie = "vol = 0.8";
  });
  document.getElementById("mediajs-volume-control-5-" + vid.id).addEventListener("click", function() {
    videoEl.volume = 1.0;
    document.cookie = "vol = 1.0";
  });

  // Picture-in-picture stuff
  document.getElementById("mediajs-picture-in-picture-control-" + vid.id).addEventListener("click", function() {
    if (!document.pictureInPictureElement) {
      videoEl.requestPictureInPicture();
    } else {
      document.exitPictureInPicture();
    }
  });

  // Fullscreen stuff
  document.getElementById("mediajs-fullscreen-control-" + vid.id).addEventListener("click", function() {
    if (!document.fullscreenElement) {
      enterFS(containerx);
      document.getElementById("mediajs-video-controls-" + vid.id).style.display = "block";
    } else {
      exitFS();
      document.getElementById("mediajs-video-controls-" + vid.id).style.display = "none";
    }
  });
  document.addEventListener("fullscreenchange", function() {
    if (!document.fullscreenElement) {
      document.getElementById("mediajs-video-controls-" + vid.id).style.display = "none";
    }
  });

  // Keybind & icon stuff
  setInterval(function() {
    if (videoEl.paused) {
      ctrl.getElementsByTagName("i")[0].className = "mediajs-play-icon fas fa-play fa-2x";
    } else {
      ctrl.getElementsByTagName("i")[0].className = "mediajs-play-icon fas fa-pause fa-2x";
    }
  }, 1);
  var bigPlayButton = document.createElement("button");
  bigPlayButton.className = "mediajs-big-play-button fas fa-play";
  bigPlayButton.id = "mediajs-big-play-button-" + vid.id;
  containerx.appendChild(bigPlayButton);
  bigPlayButton.addEventListener("mouseleave", function() {
    this.classList.add("mediajs-darkRed");
  });
  var playButtonGone = 0;
  containerx.style.cursor = "pointer";
  containerx.addEventListener("click", function() {
    bigPlayButton.style.display = "none";
    container.style.visibility = "visible";
    videoEl.play();
    videoEl.pause();
    videoEl.play();
    videoEl.pause();
    videoEl.play();
    videoEl.pause();
    videoEl.play();
    containerx.style.cursor = "auto";
    document.getElementById("mediajs-poster-" + vid.id).style.display = "none";
    playButtonGone = 1;
  });
  var volumeKeyUpInterval;
  var volumeKeyDownInterval;
  document.addEventListener("keydown", function(event) {
    if (event.which == 32 && playButtonGone == 1) {
      if (videoEl.paused) {
        videoEl.play();
        videoEl.pause();
        videoEl.play();
        videoEl.pause();
        videoEl.play();
        videoEl.pause();
        videoEl.play();
      } else {
        videoEl.pause();
      }
    } else if (event.which == 40 && playButtonGone == 1) {
      videoEl.volume -= 0.05;
      volumeKeyDownInterval = setInterval(function() {
        videoEl.volume -= 0.05;
      }, 500)
    } else if (event.which == 38 && playButtonGone == 1) {
      videoEl.volume += 0.05;
      volumeKeyUpInterval = setInterval(function() {
        videoEl.volume += 0.05;
      }, 500)
    } else if (event.which == 39 && playButtonGone == 1) {
      videoEl.currentTime += 5;
      vid.currentTime += 5;
    } else if (event.which == 37 && playButtonGone == 1) {
      videoEl.currentTime -= 5;
      vid.currentTime -= 5;
    } else if (event.which == 70 && playButtonGone == 1) {
      if (!document.fullscreenElement) {
        enterFS(containerx);
        document.getElementById("mediajs-video-controls-" + vid.id).style.display = "block";
      } else {
        exitFS();
        document.getElementById("mediajs-video-controls-" + vid.id).style.display = "none";
      }
    } else if (event.which == 73 && playButtonGone == 1) {
      if (!document.pictureInPictureElement) {
        videoEl.requestPictureInPicture();
      } else {
        document.exitPictureInPicture();
      }
    }
  });
  document.addEventListener("keyup", function(event) {
    clearInterval(volumeKeyUpInterval);
    clearInterval(volumeKeyDownInterval);
  });

  // Volume status stuff
  var volumeStatus = document.createElement("span");
  volumeStatus.className = "mediajs-volume-status";
  volumeStatus.id = "mediajs-volume-status-" + vid.id;
  containerx.appendChild(volumeStatus);
  videoEl.addEventListener("volumechange", function() {
    var vol = videoEl.volume.toFixed(2).replace("0.", "").replace("1.00", "100") + "%";
    if (vol != "00%") {
      document.getElementById("mediajs-volume-status-" + vid.id).innerHTML = vol;
    } else {
      document.getElementById("mediajs-volume-status-" + vid.id).innerHTML = "0%";
    }
    document.getElementById("mediajs-volume-status-" + vid.id).style.display = "block";
    document.getElementById("mediajs-volume-status-" + vid.id).classList.add("mediajs-volume-fadeout");
    setTimeout(function() {
      document.getElementById("mediajs-volume-status-" + vid.id).style.display = "none";
      document.getElementById("mediajs-volume-status-" + vid.id).classList.remove("mediajs-volume-fadeout");
    }, 500);
  });
}

// Defining the YouTube system for Media.js
function mvjsYT(id, ch, h, w) {

  // Defining and appending core elements
  vid = id;
  vidsrc = vid.getElementsByTagName("source")[0];
  vid.style.display = "none";
  var containerx = document.createElement("div");
  containerx.className = "mediajs-video-container";
  containerx.id = "mediajs-video-container-" + vid.id;
  document.body.insertBefore(containerx, vid);
  var container = document.createElement("div");
  container.className = "mediajs-video-control-bar";
  container.id = "mediajs-video-control-bar-" + vid.id;
  containerx.appendChild(container);
  if (ch === true) {
    containerx.style.width = w + "px";
    containerx.style.height = w + "px";
  } else {

  }
  var tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  tag.async = "true";
  document.head.appendChild(tag);
  var playPause = document.createElement("button");
  playPause.className = "mediajs-play-control";
  playPause.id = "mediajs-play-control-video-" + vid.id;
  var playPauseIcon = document.createElement("i");
  playPauseIcon.className = "mediajs-play-icon fas fa-play fa-2x";
  playPauseIcon.id = "mediajs-play-icon-" + vid.id;
  playPause.appendChild(playPauseIcon);
  container.appendChild(playPause);
  var lengthBar = document.createElement("div");
  lengthBar.className = "mediajs-video-length-bar";
  lengthBar.id = "mediajs-length-bar-" + vid.id;
  container.appendChild(lengthBar);
  var fullLength = document.createElement("span");
  fullLength.id = "mediajs-full-length-" + vid.id;
  fullLength.className = "mediajs-video-full-length";
  container.appendChild(fullLength);
  var canvas = document.createElement("div");
  canvas.className = "mediajs-video-preload-canvas";
  canvas.style.maxWidth = document.getElementById("mediajs-length-bar-" + vid.id).offsetWidth + "px";
  canvas.id = "mediajs-preload-canvas-" + vid.id;
  lengthBar.appendChild(canvas);
  var ctime = document.createElement("span");
  ctime.className = "mediajs-video-current-time";
  ctime.id = "mediajs-current-time-" + vid.id;
  container.appendChild(ctime);
  var timePreview = document.createElement("span");
  timePreview.id = "mediajs-time-preview-" + vid.id;
  timePreview.className = "mediajs-time-preview";
  var tPrev = document.createElement("span");
  tPrev.id = "mediajs-time-preview-caret-" + vid.id;
  tPrev.className = "mediajs-time-preview-caret fas fa-caret-up fa-2x";
  container.appendChild(timePreview);
  container.appendChild(tPrev);
  var volumeContainer = document.createElement("div");
  volumeContainer.className = "mediajs-video-volume-control";
  volumeContainer.id = "mediajs-volume-control-" + vid.id;
  container.appendChild(volumeContainer);
  var vol1 = document.createElement("button");
  vol1.className = "mediajs-video-volume-control-1";
  vol1.id = "mediajs-volume-control-1-" + vid.id;
  vol1.type = "button";
  volumeContainer.appendChild(vol1);
  var vol2 = document.createElement("button");
  vol2.className = "mediajs-video-volume-control-2";
  vol2.id = "mediajs-volume-control-2-" + vid.id;
  vol2.type = "button";
  volumeContainer.appendChild(vol2);
  var vol3 = document.createElement("button");
  vol3.className = "mediajs-video-volume-control-3";
  vol3.id = "mediajs-volume-control-3-" + vid.id;
  vol3.type = "button";
  volumeContainer.appendChild(vol3);
  var vol4 = document.createElement("button");
  vol4.className = "mediajs-video-volume-control-4";
  vol4.id = "mediajs-volume-control-4-" + vid.id;
  vol4.type = "button";
  volumeContainer.appendChild(vol4);
  var vol5 = document.createElement("button");
  vol5.className = "mediajs-video-volume-control-5";
  vol5.id = "mediajs-volume-control-5-" + vid.id;
  vol5.type = "button";
  volumeContainer.appendChild(vol5);
  var mute = document.createElement("button");
  mute.className = "mediajs-video-mute-control fas fa-volume-off fa-2x";
  mute.id = "mediajs-mute-control-" + vid.id;
  mute.type = "button";
  volumeContainer.appendChild(mute);
  var pip = document.createElement("button");
  pip.className = "mediajs-picture-in-picture-control";
  pip.id = "mediajs-picture-in-picture-control-" + vid.id;
  pip.type = "button";
  pip.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98V5c0-1.1-.9-2-2-2zm0 16.01H3V4.98h18v14.03z"/></svg>';
  volumeContainer.appendChild(pip);
  var fsc = document.createElement("button");
  fsc.className = "mediajs-fullscreen-control fas fa-expand fa-2x";
  fsc.id = "mediajs-fullscreen-control-" + vid.id;
  fsc.type = "button";
  volumeContainer.appendChild(fsc);
  var videoControls = container.cloneNode(true);
  videoControls.className = "mediajs-video-control-bar mediajs-video-controls";
  videoControls.id = "mediajs-video-controls-" + vid.id;
  document.body.appendChild(videoControls);


  var video = document.createElement("video");
  var videosrc = document.createElement("source");
  videosrc.src = vidsrc.src;
  videosrc.type = vidsrc.type;
  video.appendChild(videosrc);
  video.className = "mediajs-video";
  video.id = "mediajs-video-" + vid.id;
  containerx.appendChild(video);

  videoEl = document.getElementById("mediajs-video-" + vid.id);
  var canvas2 = document.getElementById("mediajs-preload-canvas-" + vid.id);
  var ctrl = document.getElementById("mediajs-play-control-video-" + vid.id);

  // Event listeners
  ctrl.addEventListener("click", function() {
    var play = ctrl.getElementsByTagName("i")[0].className === "mediajs-play-icon fas fa-play fa-2x";
    if (play) {
      ctrl.getElementsByTagName("i")[0].className = "mediajs-play-icon fas fa-pause fa-2x";
      player.playVideo();
    } else {
      ctrl.getElementsByTagName("i")[0].className = "mediajs-play-icon fas fa-play fa-2x";
      player.pauseVideo();
    }
  });
  videoEl.addEventListener("click", function() {
    var play = ctrl.getElementsByTagName("i")[0].className === "mediajs-play-icon fas fa-play fa-2x";
    if (play) {
      ctrl.getElementsByTagName("i")[0].className = "mediajs-play-icon fas fa-pause fa-2x";
      player.playVideo();
    } else {
      ctrl.getElementsByTagName("i")[0].className = "mediajs-play-icon fas fa-play fa-2x";
      player.pauseVideo();
    }
  });
  lengthBar.addEventListener("click", function(event) {
    var percent = (event.offsetX / lengthBar.offsetWidth).toFixed(2).replace("0.", "").replace("1.00", "100");
    for (var i = 0.00; i < duration; i++) {
      var percent2 = (i / duration).toFixed(2).replace("0.", "").replace("1.00", "100");
      if (percent2 == percent) {
        var place = player.getCurrentTime() - percent2;
        player.seekTo(-place);
      }
    }
  });
  lengthBar.addEventListener("mouseover", function(event) {
    var percent = (event.offsetX / lengthBar.offsetWidth).toFixed(2).replace("0.", "").replace("1.00", "100");
    for (var i = 0.00; i < duration; i++) {
      var percent2 = (i / duration).toFixed(2).replace("0.", "").replace("1.00", "100");
      if (percent2 == percent) {
        if (parseFloat(percent) > 71.6) {
          document.getElementById("mediajs-time-preview-" + vid.id).style.marginLeft = 71.6 + "%";
          document.getElementById("mediajs-time-preview-caret-" + vid.id).style.marginLeft = 72.4 + "%";
          document.getElementById("mediajs-time-preview-" + vid.id).innerHTML = convertElapsedTime(i);
          document.getElementById("mediajs-time-preview-" + vid.id).style.display = "block";
          document.getElementById("mediajs-time-preview-caret-" + vid.id).style.display = "block";
        } else {
          document.getElementById("mediajs-time-preview-" + vid.id).style.marginLeft = parseFloat(percent) + 2.25 + "%";
          document.getElementById("mediajs-time-preview-caret-" + vid.id).style.marginLeft = parseFloat(percent) + 3 + "%";
          document.getElementById("mediajs-time-preview-" + vid.id).innerHTML = convertElapsedTime(i);
          document.getElementById("mediajs-time-preview-" + vid.id).style.display = "block";
          document.getElementById("mediajs-time-preview-caret-" + vid.id).style.display = "block";
        }
      }
    }
  });
  lengthBar.addEventListener("mouseleave", function() {
    document.getElementById("mediajs-time-preview-" + vid.id).style.display = "none";
    document.getElementById("mediajs-time-preview-caret-" + vid.id).style.display = "none";
  });
  canvas2.addEventListener("click", function(event) {
    var percent = (event.offsetX / lengthBar.offsetWidth).toFixed(2).replace("0.", "").replace("1.00", "100");
    for (var i = 0.00; i < duration; i++) {
      var percent2 = (i / duration).toFixed(2).replace("0.", "").replace("1.00", "100");
      if (percent2 == percent) {
        var place = player.getCurrentTime() - percent2;
        player.seekTo(place);
      }
    }
  });
  canvas2.addEventListener("mouseover", function(event) {
    var percent = (event.offsetX / lengthBar.offsetWidth).toFixed(2).replace("0.", "").replace("1.00", "100");
    for (var i = 0.00; i < duration; i++) {
      var percent2 = (i / duration).toFixed(2).replace("0.", "").replace("1.00", "100");
      if (percent2 == percent) {
        if (parseFloat(percent) > 71.6) {
          document.getElementById("mediajs-time-preview-" + vid.id).style.marginLeft = 71.6 + "%";
          document.getElementById("mediajs-time-preview-caret-" + vid.id).style.marginLeft = 72.4 + "%";
          document.getElementById("mediajs-time-preview-" + vid.id).innerHTML = convertElapsedTime(i);
          document.getElementById("mediajs-time-preview-" + vid.id).style.display = "block";
          document.getElementById("mediajs-time-preview-caret-" + vid.id).style.display = "block";
        } else {
          document.getElementById("mediajs-time-preview-" + vid.id).style.marginLeft = parseFloat(percent) + 2.25 + "%";
          document.getElementById("mediajs-time-preview-caret-" + vid.id).style.marginLeft = parseFloat(percent) + 3 + "%";
          document.getElementById("mediajs-time-preview-" + vid.id).innerHTML = convertElapsedTime(i);
          document.getElementById("mediajs-time-preview-" + vid.id).style.display = "block";
          document.getElementById("mediajs-time-preview-caret-" + vid.id).style.display = "block";
        }
      }
    }
  });
  canvas2.addEventListener("mouseleave", function() {
    document.getElementById("mediajs-time-preview-" + vid.id).style.display = "none";
    document.getElementById("mediajs-time-preview-caret-" + vid.id).style.display = "none";
  });

  // Volume stuff
  var volTmp;
  if (getCookie("vol") != null) {
    videoEl.volume = getCookie("vol");
    volTmp = getCookie("vol");
  } else {

  }
  if (getCookie("muted") != null) {
    if (getCookie("muted") === true) {
      document.getElementById("mediajs-mute-control-" + vid.id).className = "mediajs-mute-control fas fa-volume-mute fa-2x";
      volTmp = player.getVolume();
      player.mute();
      document.cookie = "muted = true";
    } else {

    }
  }
  document.getElementById("mediajs-mute-control-" + vid.id).addEventListener("click", function() {
    if (this.className == "mediajs-video-mute-control fas fa-volume-mute fa-2x") {
      this.className = "mediajs-video-mute-control fas fa-volume-off fa-2x";
      player.unMute();
      player.setVolume(volTmp);
      document.cookie = "muted = false";
    } else {
      this.className = "mediajs-video-mute-control fas fa-volume-mute fa-2x";
      volTmp = player.getVolume();
      player.mute();
      document.cookie = "muted = true";
    }
  });
  document.getElementById("mediajs-volume-control-1-" + vid.id).addEventListener("click", function() {
    player.setVolume(20);
    videoEl.volume = 0.2;
    document.cookie = "vol = 20";
  });
  document.getElementById("mediajs-volume-control-2-" + vid.id).addEventListener("click", function() {
    player.setVolume(40);
    videoEl.volume = 0.4;
    document.cookie = "vol = 40";
  });
  document.getElementById("mediajs-volume-control-3-" + vid.id).addEventListener("click", function() {
    player.setVolume(60);
    videoEl.volume = 0.6;
    document.cookie = "vol = 60";
  });
  document.getElementById("mediajs-volume-control-4-" + vid.id).addEventListener("click", function() {
    player.setVolume(80);
    videoEl.volume = 0.8;
    document.cookie = "vol = 80";
  });
  document.getElementById("mediajs-volume-control-5-" + vid.id).addEventListener("click", function() {
    player.setVolume(100);
    videoEl.volume = 1.0;
    document.cookie = "vol = 100";
  });

  // Picture-in-picture stuff
  document.getElementById("mediajs-picture-in-picture-control-" + vid.id).addEventListener("click", function() {
    if (!document.pictureInPictureElement) {
      videoEl.requestPictureInPicture();
    } else {
      document.exitPictureInPicture();
    }
  });

  // Fullscreen stuff
  document.getElementById("mediajs-fullscreen-control-" + vid.id).addEventListener("click", function() {
    if (!document.fullscreenElement) {
      enterFS(containerx);
      document.getElementById("mediajs-video-controls-" + vid.id).style.display = "block";
    } else {
      exitFS();
      document.getElementById("mediajs-video-controls-" + vid.id).style.display = "none";
    }
  });
  document.addEventListener("fullscreenchange", function() {
    if (!document.fullscreenElement) {
      document.getElementById("mediajs-video-controls-" + vid.id).style.display = "none";
    }
  });

  // Icons & keybinds stuff (also timeline stuff)
  setInterval(function() {
    if (player.getPlayerState() == 2) {
      ctrl.getElementsByTagName("i")[0].className = "mediajs-play-icon fas fa-play fa-2x";
    } else {
      ctrl.getElementsByTagName("i")[0].className = "mediajs-play-icon fas fa-pause fa-2x";
    }
    var currentTime = player.getCurrentTime();
    if (currentTime === duration) {
      ctrl.getElementsByTagName("i")[0].className = "mediajs-play-icon fas fa-play fa-2x";
      method = "pause";
    }
    document.getElementById("mediajs-current-time-" + vid.id).innerHTML = convertElapsedTime(currentTime) + " / ";

    var percent = currentTime / duration;
    var percentage = percent.toFixed(2).replace("0.", "");
    canvas2.style.width = percentage + "%";
  }, 1);
  var bigPlayButton = document.createElement("button");
  bigPlayButton.className = "mediajs-big-play-button fas fa-play";
  bigPlayButton.id = "mediajs-big-play-button-" + vid.id;
  containerx.appendChild(bigPlayButton);
  bigPlayButton.addEventListener("mouseleave", function() {
    this.classList.add("mediajs-darkRed");
  });
  var playButtonGone = 0;
  bigPlayButton.addEventListener("click", function() {
    this.style.display = "none";
    container.style.visibility = "visible";
    player.playVideo();
    playButtonGone = 1;
  });
  var volumeKeyUpInterval;
  var volumeKeyDownInterval;
  document.addEventListener("keydown", function(event) {
    if (event.which == 32 && playButtonGone == 1) {
      if (player.getPlayerState() == 2) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    } else if (event.which == 40 && playButtonGone == 1) {
      player.setVolume(player.getVolume() - 5);
      videoEl.volume -= 0.05;
      volumeKeyDownInterval = setInterval(function() {
        player.setVolume(player.getVolume() - 5);
        videoEl.volume -= 0.05;
      }, 500)
    } else if (event.which == 38 && playButtonGone == 1) {
      player.setVolume(player.getVolume() + 5);
      videoEl.volume += 0.05;
      volumeKeyUpInterval = setInterval(function() {
        player.setVolume(player.getVolume() + 5);
        videoEl.volume += 0.05;
      }, 500)
    } else if (event.which == 39 && playButtonGone == 1) {
      player.seekTo(player.getCurrentTime() + 5);
      vid.currentTime += 5;
    } else if (event.which == 37 && playButtonGone == 1) {
      player.seekTo(player.getCurrentTime() - 5);
      vid.currentTime -= 5;
    } else if (event.which == 70 && playButtonGone == 1) {
      if (!document.fullscreenElement) {
        enterFS(containerx);
        document.getElementById("mediajs-video-controls-" + vid.id).style.display = "block";
      } else {
        exitFS();
        document.getElementById("mediajs-video-controls-" + vid.id).style.display = "none";
      }
    } else if (event.which == 73 && playButtonGone == 1) {
      if (!document.pictureInPictureElement) {
        videoEl.requestPictureInPicture();
      } else {
        document.exitPictureInPicture();
      }
    }
  });
  document.addEventListener("keyup", function(event) {
    clearInterval(volumeKeyUpInterval);
    clearInterval(volumeKeyDownInterval);
  });

  // Volume status stuff
  var volumeStatus = document.createElement("span");
  volumeStatus.className = "mediajs-volume-status";
  volumeStatus.id = "mediajs-volume-status-" + vid.id;
  containerx.appendChild(volumeStatus);
  videoEl.addEventListener("volumechange", function() {
    var vol = videoEl.volume.toFixed(2).replace("0.", "").replace("1.00", "100") + "%";
    if (vol != "00%") {
      document.getElementById("mediajs-volume-status-" + vid.id).innerHTML = vol;
    } else {
      document.getElementById("mediajs-volume-status-" + vid.id).innerHTML = "0%";
    }
    document.getElementById("mediajs-volume-status-" + vid.id).style.display = "block";
    document.getElementById("mediajs-volume-status-" + vid.id).classList.add("mediajs-volume-fadeout");
    setTimeout(function() {
      document.getElementById("mediajs-volume-status-" + vid.id).style.display = "none";
      document.getElementById("mediajs-volume-status-" + vid.id).classList.remove("mediajs-volume-fadeout");
    }, 500);
  });
}

// Fullscreen functions
function enterFS(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

function exitFS() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

// The core function - deciding whether to put the element in Audio or Video stuff.
function mediaJS(id, ch, h, w, wes) {
  if (document.getElementById("mediajs-audio-container-" + id) != null || document.getElementById("mediajs-video-container-" + id) != null) {
    alert("There is already a player with that ID!");
    return "There is already a player with that ID!";
  } else {
    // Style stuffs.
    var fa = document.createElement("link");
    fa.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.css";
    fa.rel = "stylesheet";
    document.head.appendChild(fa);
    var styleC = document.createElement("style");
    styleC.innerHTML = styles;
    styleC.type = "text/css";
    document.head.appendChild(styleC);
    var mjs = id;

    // Watermark stuff
    if (wes === true) {
      var wengine = document.createElement("div");
      wengine.className = "wengine";
      var content = '<p class="wengine-pwrd">Powered by the</p><div class="logo-container"><div class="worlde"><p class="world">World</p><p class="world world2">orld</p></div><div class="enginew"><p class="world hidden">World</p><p class="engine">Engine</p><p class="world hidden2">World</p></div></div><br><br>';
      var classes = '.worlde {position: absolute;z-index: 8;display: flex;flex-direction: row;animation: move 2s;margin-left: 2.1vw;justify-content: left;align-items: center;}.enginew {position: absolute;z-index: 9;display: flex;flex-direction: row;}.hidden {opacity: 0;}.hidden2 {color: white !important;background: white;}.world {color: blue;font-size: 18px;}.engine {color: darkgreen;font-size: 18px;background: white;}.world2 {animation: off 2s;}@keyframes move {0% {margin-left: 0vw;}100%{margin-left: 2.1vw;}}@keyframes off {99% {opacity: 1;}100% {opacity: 0;}}.wengine {display: flex;flex-direction: column;font-family: Helvetica;}.wengine-pwrd {margin-bottom: -2.5vh;}';
      var classC = document.createElement("style");
      classC.innerHTML = classes;
      wengine.innerHTML = content;
      document.body.appendChild(classC);
      document.body.appendChild(wengine);
    } else {

    }

    // Decider
    var type;
    if (mjs.tagName == "AUDIO") {
      type = "AUDIO";
      if (ch === true) {
        console.log("Audio elements will not have changed height.");
        majs(mjs, true, w);
      } else {
        majs(mjs);
      }
    } else if (mjs.tagName == "VIDEO") {
      for (var i = 0; i < mjs.getElementsByTagName("source").length; i++) {
        if (mjs.getElementsByTagName("source")[i].type == "video/youtube") {
          type = "YOUTUBE";
        } else {
          type = "VIDEO";
        }
      }
      if (ch === true) {
        mvjs(mjs, true, h, w);
      } else {
        mvjs(mjs);
      }
    } else {
      console.error("Unknown media type. Supports audio and video. You have: " + mjs.tagName);
    }

    // Returns
    var element = {
      id: id.id,

      type: type,

      destroy: function() {
        if (this.type == "AUDIO") {
          var container = document.getElementById(`mediajs-audio-container-${this.id}`);
          container.remove();
          document.getElementById(this.id).style.display = "block";
        } else if (this.type == "VIDEO" || this.type == "YOUTUBE") {
          var container = document.getElementById(`mediajs-video-container-${this.id}`);
          container.remove();
          document.getElementById(this.id).style.display = "block";
        }
      },

      alertID: function() {
        alert(this.id);
      },

      alertType: function() {
        alert(this.type);
      }
    }
    return element;
  }
}

var mediaJS = {
  contextMenu: function(bool) {
    if (bool === true) {
      alert("contextMenu is set to TRUE");
    } else {
      alert("contextMenu is set to FALSE");
    }
  },

  alerX: function() {
    alert("X");
  },

  init: mediaJS,

  getPlayer: function(id) {
    var mjs = id;
    var type;
    if (mjs.tagName == "AUDIO") {
      type = "AUDIO";
    } else if (mjs.tagName == "VIDEO") {
      for (var i = 0; i < mjs.getElementsByTagName("source").length; i++) {
        if (mjs.getElementsByTagName("source")[i].type == "video/youtube") {
          type = "YOUTUBE";
        } else {
          type = "VIDEO";
        }
      }
    } else {
      console.error("Unknown media type. Supports audio and video. You have: " + mjs.tagName);
    }
    var element = {
      id: id.id,

      type: type,

      destroy: function() {
        if (this.type == "AUDIO") {
          var container = document.getElementById(`mediajs-audio-container-${this.id}`);
          container.remove();
          document.getElementById(this.id).style.display = "block";
        } else if (this.type == "VIDEO" || this.type == "YOUTUBE") {
          var container = document.getElementById(`mediajs-video-container-${this.id}`);
          container.remove();
          document.getElementById(this.id).style.display = "block";
        }
      },

      alertID: function() {
        alert(this.id);
      },

      alertType: function() {
        alert(this.type);
      }
    }
    return element;
  },

  help: function(inConsole, where) {
    if (inConsole === false) {

    } else {

    }
  }
}

/*

    Media.js Usage:
        - Initializing Media.js (creating and configuring a player):
            1. Run mediaJS.init(id, customSizing, height, width, showWatermark) or mediaJS(id, customSizing, height, width, showWatermark)
                id: Object. The id of the media element. (document.getElementById("") format)
                    Note: You have to initialize Media.js for every player INDIVIDUALLY. There is no bulk initializing...yet.
                customSizing: Boolean. Whether or not you want to use custom sizing.
                height: Number. Height of customized player.
                    Note: Requires customSizing to be TRUE. Note: This is not customizable for audio players.
                width: Number. Width of customized player.
                    Note: Requires customSizing to be TRUE.
                showWatermark: Boolean. Whether or not you want the "Powered by the WorldEngine" watermark to show.
            IMPORTANT!!!
                If you want the media player to play YouTube videos, in the Source element, put the YouTube URL/Video ID in the SRC attribute, and in the TYPE attribute, put "video/youtube".
        - Custom skins for the player:
            1. Editing this file.
                At the top of this file, you will see the words, "const styles = ". This is where the CSS is. Edit the css in there and you have your custom skin!
                    Note: The CSS MUST be one line and defined in the SAME VARIABLE.
    Developer's notes:
        - Due to issues in the code, right now you have to initialize players in seperate script tags. My apologies for the inconvienience.

*/
