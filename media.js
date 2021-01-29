function convertElapsedTime(inputSeconds) {
    var seconds = Math.floor(inputSeconds % 60);
    if(seconds < 10) {
        seconds = "0"+seconds
    }
    var minutes = Math.floor(inputSeconds / 60);
    return minutes + ":" + seconds;
}
function getCookie(name) {
    var cookieArr = document.cookie.split(";");
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        if(name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}
function majs(id, ch, w) {
    var aux = id;
    var auxsrc = aux.getElementsByTagName("source")[0];
    aux.style.display = "none";
    var container = document.createElement("div");
    container.className = "mediajs-audio-container";
    document.body.insertBefore(container, aux);
    if(ch === true) {
        container.style.width = w+"px";
    } else {
        
    }
    var playPause = document.createElement("button");
    playPause.className = "mediajs-play-control";
    playPause.id = "mediajs-play-control-audio-"+aux.id;
    var playPauseIcon = document.createElement("i");
    playPauseIcon.className = "mediajs-play-icon fas fa-play fa-2x";
    playPauseIcon.id = "mediajs-play-icon-"+aux.id;
    playPause.appendChild(playPauseIcon);
    container.appendChild(playPause);
    var lengthBar = document.createElement("div");
    lengthBar.className = "mediajs-length-bar";
    lengthBar.id = "mediajs-length-bar-"+aux.id;
    container.appendChild(lengthBar);
    var fullLength = document.createElement("span");
    fullLength.id = "mediajs-full-length-"+aux.id;
    fullLength.className = "mediajs-full-length";
    container.appendChild(fullLength);
    var canvas = document.createElement("div");
    canvas.className = "mediajs-preload-canvas";
    canvas.id = "mediajs-preload-canvas-"+aux.id;
    container.appendChild(canvas);
    var ctime = document.createElement("span");
    ctime.className = "mediajs-current-time";
    ctime.id = "mediajs-current-time-"+aux.id;
    container.appendChild(ctime);
    var timePreview = document.createElement("span");
    timePreview.id = "mediajs-time-preview-"+aux.id;
    timePreview.className = "mediajs-time-preview";
    var tPrev = document.createElement("span");
    tPrev.id = "mediajs-time-preview-caret-"+aux.id;
    tPrev.className = "mediajs-time-preview-caret fas fa-caret-up fa-2x";
    container.appendChild(timePreview);
    container.appendChild(tPrev);
    var volumeContainer = document.createElement("div");
    volumeContainer.className = "mediajs-volume-control";
    volumeContainer.id = "mediajs-volume-control-"+aux.id;
    container.appendChild(volumeContainer);
    var vol1 = document.createElement("button");
    vol1.className = "mediajs-volume-control-1";
    vol1.id = "mediajs-volume-control-1-"+aux.id;
    vol1.type = "button";
    volumeContainer.appendChild(vol1);
    var vol2 = document.createElement("button");
    vol2.className = "mediajs-volume-control-2";
    vol2.id = "mediajs-volume-control-2-"+aux.id;
    vol2.type = "button";
    volumeContainer.appendChild(vol2);
    var vol3 = document.createElement("button");
    vol3.className = "mediajs-volume-control-3";
    vol3.id = "mediajs-volume-control-3-"+aux.id;
    vol3.type = "button";
    volumeContainer.appendChild(vol3);
    var vol4 = document.createElement("button");
    vol4.className = "mediajs-volume-control-4";
    vol4.id = "mediajs-volume-control-4-"+aux.id;
    vol4.type = "button";
    volumeContainer.appendChild(vol4);
    var vol5 = document.createElement("button");
    vol5.className = "mediajs-volume-control-5";
    vol5.id = "mediajs-volume-control-5-"+aux.id;
    vol5.type = "button";
    volumeContainer.appendChild(vol5);
    var mute = document.createElement("button");
    mute.className = "mediajs-mute-control fas fa-volume-off fa-2x";
    mute.id = "mediajs-mute-control-"+aux.id;
    mute.type = "button";
    volumeContainer.appendChild(mute);
    
    var audioEl = aux;
    var canvas2 = document.getElementById("mediajs-preload-canvas-"+aux.id);
    var ctrl = document.getElementById("mediajs-play-control-audio-"+aux.id);
    audioEl.addEventListener("loadedmetadata", function() {
        var duration = audioEl.duration;
        var currentTime = audioEl.currentTime;
        document.getElementById("mediajs-full-length-"+aux.id).innerHTML = convertElapsedTime(duration);
        document.getElementById("mediajs-current-time-"+aux.id).innerHTML = convertElapsedTime(currentTime)+" / ";
        canvas2.style.width = "1%";
    });
    ctrl.addEventListener("click", function() {
        var play = ctrl.getElementsByTagName("i")[0].className === "mediajs-play-icon fas fa-play fa-2x";
        if(play) {
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
        
        if(currentTime === duration) {
            ctrl.getElementsByTagName("i")[0].className = "mediajs-play-icon fas fa-play fa-2x";
            method = "pause";
        }
        
        document.getElementById("mediajs-current-time-"+aux.id).innerHTML = convertElapsedTime(currentTime)+" / ";
        
        var percent = currentTime / duration;
        var percentage = percent.toFixed(2).replace("0.", "") - 20;
        canvas2.style.width = percentage+"%";
    });
    audioEl.addEventListener("ended", function() {
        canvas2.style.width = "1%";
    });
    lengthBar.addEventListener("click", function(event) {
        var percent = (event.offsetX/lengthBar.offsetWidth).toFixed(2).replace("0.", "").replace("1.00", "100");
        var duration = audioEl.duration;
        for(var i = 0.00; i < duration; i++) {
            var percent2 = (i / duration).toFixed(2).replace("0.", "").replace("1.00", "100");
            if(percent2 == percent) {
                audioEl.currentTime = i;
            }
        }
    });
    lengthBar.addEventListener("mouseover", function(event) {
        var percent = (event.offsetX/lengthBar.offsetWidth).toFixed(2).replace("0.", "").replace("1.00", "100");
        var duration = audioEl.duration;
        for(var i = 0.00; i < duration; i++) {
            var percent2 = (i / duration).toFixed(2).replace("0.", "").replace("1.00", "100");
            if(percent2 == percent) {
                if(parseFloat(percent) > 81.5) {
                    document.getElementById("mediajs-time-preview-"+aux.id).style.marginLeft = 81.5+"%";
                    document.getElementById("mediajs-time-preview-caret-"+aux.id).style.marginLeft = 82.3+"%";
                    document.getElementById("mediajs-time-preview-"+aux.id).innerHTML = convertElapsedTime(i);
                    document.getElementById("mediajs-time-preview-"+aux.id).style.display = "block";
                    document.getElementById("mediajs-time-preview-caret-"+aux.id).style.display = "block";
                } else {
                    document.getElementById("mediajs-time-preview-"+aux.id).style.marginLeft = parseFloat(percent)+2.25+"%";
                    document.getElementById("mediajs-time-preview-caret-"+aux.id).style.marginLeft = parseFloat(percent)+3+"%";
                    document.getElementById("mediajs-time-preview-"+aux.id).innerHTML = convertElapsedTime(i);
                    document.getElementById("mediajs-time-preview-"+aux.id).style.display = "block";
                    document.getElementById("mediajs-time-preview-caret-"+aux.id).style.display = "block";
                }
            }
        }
    });
    lengthBar.addEventListener("mouseleave", function() {
        document.getElementById("mediajs-time-preview-"+aux.id).style.display = "none";
        document.getElementById("mediajs-time-preview-caret-"+aux.id).style.display = "none";
    });
    canvas2.addEventListener("click", function(event) {
        var percent = (event.offsetX/lengthBar.offsetWidth).toFixed(2).replace("0.", "").replace("1.00", "100");
        var duration = audioEl.duration;
        for(var i = 0.00; i < duration; i++) {
            var percent2 = (i / duration).toFixed(2).replace("0.", "").replace("1.00", "100");
            if(percent2 == percent) {
                audioEl.currentTime = i;
            }
        }
    });
    canvas2.addEventListener("mouseover", function(event) {
        var percent = (event.offsetX/lengthBar.offsetWidth).toFixed(2).replace("0.", "").replace("1.00", "100");
        var duration = audioEl.duration;
        for(var i = 0.00; i < duration; i++) {
            var percent2 = (i / duration).toFixed(2).replace("0.", "").replace("1.00", "100");
            if(percent2 == percent) {
                if(parseFloat(percent) > 81.5) {
                    document.getElementById("mediajs-time-preview-"+aux.id).style.marginLeft = 81.5+"%";
                    document.getElementById("mediajs-time-preview-caret-"+aux.id).style.marginLeft = 82.3+"%";
                    document.getElementById("mediajs-time-preview-"+aux.id).innerHTML = convertElapsedTime(i);
                    document.getElementById("mediajs-time-preview-"+aux.id).style.display = "block";
                    document.getElementById("mediajs-time-preview-caret-"+aux.id).style.display = "block";
                } else {
                    document.getElementById("mediajs-time-preview-"+aux.id).style.marginLeft = parseFloat(percent)+2.25+"%";
                    document.getElementById("mediajs-time-preview-caret-"+aux.id).style.marginLeft = parseFloat(percent)+3+"%";
                    document.getElementById("mediajs-time-preview-"+aux.id).innerHTML = convertElapsedTime(i);
                    document.getElementById("mediajs-time-preview-"+aux.id).style.display = "block";
                    document.getElementById("mediajs-time-preview-caret-"+aux.id).style.display = "block";
                }
            }
        }
    });
    canvas2.addEventListener("mouseleave", function() {
        document.getElementById("mediajs-time-preview-"+aux.id).style.display = "none";
        document.getElementById("mediajs-time-preview-caret-"+aux.id).style.display = "none";
    });
    var volTmp;
    if(getCookie("vol") != null) {
        aux.volume = getCookie("vol");
        volTmp = getCookie("vol");
    } else {
        
    }
    if(getCookie("muted") != null) {
        if(getCookie("muted") === true) {
            document.getElementById("mediajs-mute-control-"+aux.id).className = "mediajs-mute-control fas fa-volume-mute fa-2x";
            volTmp = aux.volume;
            aux.volume = 0;
            document.cookie = "muted = true";
        } else {
            
        }
    }
    document.getElementById("mediajs-mute-control-"+aux.id).addEventListener("click", function() {
        if(this.className == "mediajs-mute-control fas fa-volume-mute fa-2x") {
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
    document.getElementById("mediajs-volume-control-1-"+aux.id).addEventListener("click", function() {
        aux.volume = 0.2;
        document.cookie = "vol = 0.2";
    });
    document.getElementById("mediajs-volume-control-2-"+aux.id).addEventListener("click", function() {
        aux.volume = 0.4;
        document.cookie = "vol = 0.4";
    });
    document.getElementById("mediajs-volume-control-3-"+aux.id).addEventListener("click", function() {
        aux.volume = 0.6;
        document.cookie = "vol = 0.6";
    });
    document.getElementById("mediajs-volume-control-4-"+aux.id).addEventListener("click", function() {
        aux.volume = 0.8;
        document.cookie = "vol = 0.8";
    });
    document.getElementById("mediajs-volume-control-5-"+aux.id).addEventListener("click", function() {
        aux.volume = 1.0;
        document.cookie = "vol = 1.0";
    });
}
function mvjs(id, ch, h, w) {
    var vid = id;
    var vidsrc = vid.getElementsByTagName("source")[0];
    vid.style.display = "none";
    var containerx = document.createElement("div");
    containerx.className = "mediajs-video-container";
    document.body.insertBefore(containerx, vid);
    var container = document.createElement("div");
    container.className = "mediajs-video-control-bar";
    container.id = "mediajs-video-control-bar-"+vid.id;
    containerx.appendChild(container);
    if(ch === true) {
        containerx.style.width = w+"px";
        containerx.style.height = w+"px";
    } else {
        
    }
    var playPause = document.createElement("button");
    playPause.className = "mediajs-play-control";
    playPause.id = "mediajs-play-control-video-"+vid.id;
    var playPauseIcon = document.createElement("i");
    playPauseIcon.className = "mediajs-play-icon fas fa-play fa-2x";
    playPauseIcon.id = "mediajs-play-icon-"+vid.id;
    playPause.appendChild(playPauseIcon);
    container.appendChild(playPause);
    var lengthBar = document.createElement("div");
    lengthBar.className = "mediajs-video-length-bar";
    lengthBar.id = "mediajs-length-bar-"+vid.id;
    container.appendChild(lengthBar);
    var fullLength = document.createElement("span");
    fullLength.id = "mediajs-full-length-"+vid.id;
    fullLength.className = "mediajs-video-full-length";
    container.appendChild(fullLength);
    var canvas = document.createElement("div");
    canvas.className = "mediajs-video-preload-canvas";
    canvas.id = "mediajs-preload-canvas-"+vid.id;
    container.appendChild(canvas);
    var ctime = document.createElement("span");
    ctime.className = "mediajs-video-current-time";
    ctime.id = "mediajs-current-time-"+vid.id;
    container.appendChild(ctime);
    var timePreview = document.createElement("span");
    timePreview.id = "mediajs-time-preview-"+vid.id;
    timePreview.className = "mediajs-time-preview";
    var tPrev = document.createElement("span");
    tPrev.id = "mediajs-time-preview-caret-"+vid.id;
    tPrev.className = "mediajs-time-preview-caret fas fa-caret-up fa-2x";
    container.appendChild(timePreview);
    container.appendChild(tPrev);
    var volumeContainer = document.createElement("div");
    volumeContainer.className = "mediajs-video-volume-control";
    volumeContainer.id = "mediajs-volume-control-"+vid.id;
    container.appendChild(volumeContainer);
    var vol1 = document.createElement("button");
    vol1.className = "mediajs-video-volume-control-1";
    vol1.id = "mediajs-volume-control-1-"+vid.id;
    vol1.type = "button";
    volumeContainer.appendChild(vol1);
    var vol2 = document.createElement("button");
    vol2.className = "mediajs-video-volume-control-2";
    vol2.id = "mediajs-volume-control-2-"+vid.id;
    vol2.type = "button";
    volumeContainer.appendChild(vol2);
    var vol3 = document.createElement("button");
    vol3.className = "mediajs-video-volume-control-3";
    vol3.id = "mediajs-volume-control-3-"+vid.id;
    vol3.type = "button";
    volumeContainer.appendChild(vol3);
    var vol4 = document.createElement("button");
    vol4.className = "mediajs-video-volume-control-4";
    vol4.id = "mediajs-volume-control-4-"+vid.id;
    vol4.type = "button";
    volumeContainer.appendChild(vol4);
    var vol5 = document.createElement("button");
    vol5.className = "mediajs-video-volume-control-5";
    vol5.id = "mediajs-volume-control-5-"+vid.id;
    vol5.type = "button";
    volumeContainer.appendChild(vol5);
    var mute = document.createElement("button");
    mute.className = "mediajs-video-mute-control fas fa-volume-off fa-2x";
    mute.id = "mediajs-mute-control-"+vid.id;
    mute.type = "button";
    volumeContainer.appendChild(mute);
    var pip = document.createElement("button");
    pip.className = "mediajs-picture-in-picture-control";
    pip.id = "mediajs-picture-in-picture-control-"+vid.id;
    pip.type = "button";
    pip.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98V5c0-1.1-.9-2-2-2zm0 16.01H3V4.98h18v14.03z"/></svg>';
    volumeContainer.appendChild(pip);
    var fsc = document.createElement("button");
    fsc.className = "mediajs-fullscreen-control fas fa-expand fa-2x";
    fsc.id = "mediajs-fullscreen-control-"+vid.id;
    fsc.type = "button";
    volumeContainer.appendChild(fsc);
    var videoControls = container.cloneNode(true);
    videoControls.className = "mediajs-video-control-bar mediajs-video-controls";
    videoControls.id = "mediajs-video-controls-"+vid.id;
    document.body.appendChild(videoControls);
    
    
    var video = document.createElement("video");
    var videosrc = document.createElement("source");
    videosrc.src = vidsrc.src;
    videosrc.type = vidsrc.type;
    video.appendChild(videosrc);
    video.className = "mediajs-video";
    video.id = "mediajs-video-"+vid.id;
    containerx.appendChild(video);
    
    var videoEl = document.getElementById("mediajs-video-"+vid.id);
    var canvas2 = document.getElementById("mediajs-preload-canvas-"+vid.id);
    var ctrl = document.getElementById("mediajs-play-control-video-"+vid.id);
    videoEl.addEventListener("loadedmetadata", function() {
        var duration = videoEl.duration;
        var currentTime = videoEl.currentTime;
        document.getElementById("mediajs-full-length-"+vid.id).innerHTML = convertElapsedTime(duration);
        document.getElementById("mediajs-current-time-"+vid.id).innerHTML = convertElapsedTime(currentTime)+" / ";
        canvas2.style.width = "1%";
    });
    ctrl.addEventListener("click", function() {
        var play = ctrl.getElementsByTagName("i")[0].className === "mediajs-play-icon fas fa-play fa-2x";
        if(play) {
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
        if(play) {
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
        
        if(currentTime === duration) {
            ctrl.getElementsByTagName("i")[0].className = "mediajs-play-icon fas fa-play fa-2x";
            method = "pause";
        }
        
        document.getElementById("mediajs-current-time-"+vid.id).innerHTML = convertElapsedTime(currentTime)+" / ";
        
        var percent = currentTime / duration;
        var percentage = percent.toFixed(2).replace("0.", "") - 30;
        canvas2.style.width = percentage+"%";
    });
    videoEl.addEventListener("ended", function() {
        canvas2.style.width = "1%";
    });
    lengthBar.addEventListener("click", function(event) {
        var percent = (event.offsetX/lengthBar.offsetWidth).toFixed(2).replace("0.", "").replace("1.00", "100");
        var duration = videoEl.duration;
        for(var i = 0.00; i < duration; i++) {
            var percent2 = (i / duration).toFixed(2).replace("0.", "").replace("1.00", "100");
            if(percent2 == percent) {
                videoEl.currentTime = i;
            }
        }
    });
    lengthBar.addEventListener("mouseover", function(event) {
        var percent = (event.offsetX/lengthBar.offsetWidth).toFixed(2).replace("0.", "").replace("1.00", "100");
        var duration = videoEl.duration;
        for(var i = 0.00; i < duration; i++) {
            var percent2 = (i / duration).toFixed(2).replace("0.", "").replace("1.00", "100");
            if(percent2 == percent) {
                if(parseFloat(percent) > 71.6) {
                    document.getElementById("mediajs-time-preview-"+vid.id).style.marginLeft = 71.6+"%";
                    document.getElementById("mediajs-time-preview-caret-"+vid.id).style.marginLeft = 72.4+"%";
                    document.getElementById("mediajs-time-preview-"+vid.id).innerHTML = convertElapsedTime(i);
                    document.getElementById("mediajs-time-preview-"+vid.id).style.display = "block";
                    document.getElementById("mediajs-time-preview-caret-"+vid.id).style.display = "block";
                } else {
                    document.getElementById("mediajs-time-preview-"+vid.id).style.marginLeft = parseFloat(percent)+2.25+"%";
                    document.getElementById("mediajs-time-preview-caret-"+vid.id).style.marginLeft = parseFloat(percent)+3+"%";
                    document.getElementById("mediajs-time-preview-"+vid.id).innerHTML = convertElapsedTime(i);
                    document.getElementById("mediajs-time-preview-"+vid.id).style.display = "block";
                    document.getElementById("mediajs-time-preview-caret-"+vid.id).style.display = "block";
                }
            }
        }
    });
    lengthBar.addEventListener("mouseleave", function() {
        document.getElementById("mediajs-time-preview-"+vid.id).style.display = "none";
        document.getElementById("mediajs-time-preview-caret-"+vid.id).style.display = "none";
    });
    canvas2.addEventListener("click", function(event) {
        var percent = (event.offsetX/lengthBar.offsetWidth).toFixed(2).replace("0.", "").replace("1.00", "100");
        var duration = videoEl.duration;
        for(var i = 0.00; i < duration; i++) {
            var percent2 = (i / duration).toFixed(2).replace("0.", "").replace("1.00", "100");
            if(percent2 == percent) {
                videoEl.currentTime = i;
            }
        }
    });
    canvas2.addEventListener("mouseover", function(event) {
        var percent = (event.offsetX/lengthBar.offsetWidth).toFixed(2).replace("0.", "").replace("1.00", "100");
        var duration = videoEl.duration;
        for(var i = 0.00; i < duration; i++) {
            var percent2 = (i / duration).toFixed(2).replace("0.", "").replace("1.00", "100");
            if(percent2 == percent) {
                if(parseFloat(percent) > 71.6) {
                    document.getElementById("mediajs-time-preview-"+vid.id).style.marginLeft = 71.6+"%";
                    document.getElementById("mediajs-time-preview-caret-"+vid.id).style.marginLeft = 72.4+"%";
                    document.getElementById("mediajs-time-preview-"+vid.id).innerHTML = convertElapsedTime(i);
                    document.getElementById("mediajs-time-preview-"+vid.id).style.display = "block";
                    document.getElementById("mediajs-time-preview-caret-"+vid.id).style.display = "block";
                } else {
                    document.getElementById("mediajs-time-preview-"+vid.id).style.marginLeft = parseFloat(percent)+2.25+"%";
                    document.getElementById("mediajs-time-preview-caret-"+vid.id).style.marginLeft = parseFloat(percent)+3+"%";
                    document.getElementById("mediajs-time-preview-"+vid.id).innerHTML = convertElapsedTime(i);
                    document.getElementById("mediajs-time-preview-"+vid.id).style.display = "block";
                    document.getElementById("mediajs-time-preview-caret-"+vid.id).style.display = "block";
                }
            }
        }
    });
    canvas2.addEventListener("mouseleave", function() {
        document.getElementById("mediajs-time-preview-"+vid.id).style.display = "none";
        document.getElementById("mediajs-time-preview-caret-"+vid.id).style.display = "none";
    });
    var volTmp;
    if(getCookie("vol") != null) {
        videoEl.volume = getCookie("vol");
        volTmp = getCookie("vol");
    } else {
        
    }
    if(getCookie("muted") != null) {
        if(getCookie("muted") === true) {
            document.getElementById("mediajs-mute-control-"+vid.id).className = "mediajs-mute-control fas fa-volume-mute fa-2x";
            volTmp = videoEl.volume;
            videoEl.volume = 0;
            document.cookie = "muted = true";
        } else {
            
        }
    }
    document.getElementById("mediajs-mute-control-"+vid.id).addEventListener("click", function() {
        if(this.className == "mediajs-video-mute-control fas fa-volume-mute fa-2x") {
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
    document.getElementById("mediajs-volume-control-1-"+vid.id).addEventListener("click", function() {
        videoEl.volume = 0.2;
        document.cookie = "vol = 0.2";
    });
    document.getElementById("mediajs-volume-control-2-"+vid.id).addEventListener("click", function() {
        videoEl.volume = 0.4;
        document.cookie = "vol = 0.4";
    });
    document.getElementById("mediajs-volume-control-3-"+vid.id).addEventListener("click", function() {
        videoEl.volume = 0.6;
        document.cookie = "vol = 0.6";
    });
    document.getElementById("mediajs-volume-control-4-"+vid.id).addEventListener("click", function() {
        videoEl.volume = 0.8;
        document.cookie = "vol = 0.8";
    });
    document.getElementById("mediajs-volume-control-5-"+vid.id).addEventListener("click", function() {
        videoEl.volume = 1.0;
        document.cookie = "vol = 1.0";
    });
    document.getElementById("mediajs-picture-in-picture-control-"+vid.id).addEventListener("click", function() {
        if(!document.pictureInPictureElement) {
            videoEl.requestPictureInPicture();
        } else {
            document.exitPictureInPicture();
        }
    });
    document.getElementById("mediajs-fullscreen-control-"+vid.id).addEventListener("click", function() {
        if(!document.fullscreenElement) {
            enterFS(containerx);
            document.getElementById("mediajs-video-controls-"+vid.id).style.display = "block";
        } else {
            exitFS();
            document.getElementById("mediajs-video-controls-"+vid.id).style.display = "none";
        }
    });
    document.addEventListener("fullscreenchange", function() {
        if(!document.fullscreenElement) {
            document.getElementById("mediajs-video-controls-"+vid.id).style.display = "none";
        }
    });
    setInterval(function() {
        if(videoEl.paused) {
            ctrl.getElementsByTagName("i")[0].className = "mediajs-play-icon fas fa-play fa-2x";
        } else {
            ctrl.getElementsByTagName("i")[0].className = "mediajs-play-icon fas fa-pause fa-2x";
        }
    }, 1);
    var bigPlayButton = document.createElement("button");
    bigPlayButton.className = "mediajs-big-play-button fas fa-play";
    bigPlayButton.id = "mediajs-big-play-button-"+vid.id;
    containerx.appendChild(bigPlayButton);
    bigPlayButton.addEventListener("mouseleave", function() {
        this.classList.add("mediajs-darkRed");
    });
    var playButtonGone = 0;
    bigPlayButton.addEventListener("click", function() {
        this.style.display = "none";
        container.style.visibility = "visible";
        videoEl.play();
        videoEl.pause();
        videoEl.play();
        videoEl.pause();
        videoEl.play();
        videoEl.pause();
        videoEl.play();
        playButtonGone = 1;
    });
    var volumeKeyUpInterval;
    var volumeKeyDownInterval;
    document.addEventListener("keydown", function(event) {
        if (event.which == 32 && playButtonGone == 1) {
            if(videoEl.paused) {
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
        } else if(event.which == 40 && playButtonGone == 1) {
            videoEl.volume -= 0.05;
            volumeKeyDownInterval = setInterval(function() {
                videoEl.volume -= 0.05;
            }, 500)
        } else if(event.which == 38 && playButtonGone == 1) {
            videoEl.volume += 0.05;
            volumeKeyUpInterval = setInterval(function() {
                videoEl.volume += 0.05;
            }, 500)
        } else if(event.which == 39 && playButtonGone == 1) {
            videoEl.currentTime += 5;
            vid.currentTime += 5;
        } else if(event.which == 37 && playButtonGone == 1) {
            videoEl.currentTime -= 5;
            vid.currentTime -= 5;
        } else if(event.which == 70 && playButtonGone == 1) {
            if(!document.fullscreenElement) {
                enterFS(containerx);
                document.getElementById("mediajs-video-controls-"+vid.id).style.display = "block";
            } else {
                exitFS();
                document.getElementById("mediajs-video-controls-"+vid.id).style.display = "none";
            }
        } else if(event.which == 73 && playButtonGone == 1) {
            if(!document.pictureInPictureElement) {
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
    var volumeStatus = document.createElement("span");
    volumeStatus.className = "mediajs-volume-status";
    volumeStatus.id = "mediajs-volume-status-"+vid.id;
    containerx.appendChild(volumeStatus);
    videoEl.addEventListener("volumechange", function() {
        var vol = videoEl.volume.toFixed(2).replace("0.", "").replace("1.00", "100")+"%";
        if(vol != "00%") {
            document.getElementById("mediajs-volume-status-"+vid.id).innerHTML = vol;
        } else {
            document.getElementById("mediajs-volume-status-"+vid.id).innerHTML = "0%";
        }
        document.getElementById("mediajs-volume-status-"+vid.id).style.display = "block";
        document.getElementById("mediajs-volume-status-"+vid.id).classList.add("mediajs-volume-fadeout");
        setTimeout(function() {
            document.getElementById("mediajs-volume-status-"+vid.id).style.display = "none";
            document.getElementById("mediajs-volume-status-"+vid.id).classList.remove("mediajs-volume-fadeout");
        }, 500);
    });
    if(vidsrc.src.includes("youtube.com")) {
        var firstScript = document.getElementsByTagName('script')[0],
        js = document.createElement('script');
        js.src = 'https://cdn.jsdelivr.net/npm/@thelevicole/youtube-to-html5-loader@4.0.0/dist/YouTubeToHtml5.min.js';
        js.onload = function() {
            videoEl.dataset.yt2html5 = "youtube.com/watch?v=_lbX70_Y3qo";
            var player = new YouTubeToHtml5({
                autoload: false,
                withAudio: true
            });
            player.addAction('api.before', function(element) {
                element.classList.add('is-loading');
            });
            player.addAction('api.after', function(element) {
                element.classList.remove('is-loading');
            });
            player.load();
        }
        firstScript.parentNode.insertBefore(js, firstScript);

    }
}
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
function mediaJS(id, ch, h, w, wes) {
    var fa = document.createElement("link");
    fa.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.css";
    fa.rel = "stylesheet";
    document.head.appendChild(fa);
    var mjs = id;
    if(wes === true) {
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
    if(mjs.tagName == "AUDIO") {
        if(ch === true) {
            console.log("Audio elements will not have changed height.");
            majs(mjs, true, w);
        } else {
            majs(mjs);
        }
    } else if(mjs.tagName == "VIDEO") {
        if(ch === true) {
            mvjs(mjs, true, h, w);
        } else {
            mvjs(mjs);
        }
    } else {
        console.error("Unknown media type. Supports audio and video. You have: "+mjs.tagName);
    }
}