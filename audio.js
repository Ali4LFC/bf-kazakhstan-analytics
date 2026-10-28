/* =========================================================
   BF in Kazakhstan — audio layer
   - calm looping background music (two tracks, cross-faded)
   - ambient rain channel with its own volume
   - soft UI micro-sounds
   - voice note recorder (MediaRecorder)
   Preferences survive page navigation.
   ========================================================= */

(function () {
  "use strict";

  var KEY = "bfk-audio-v2";
  var MUSIC_TRACKS = ["assets/ambient_loop.wav", "assets/ambient_alt.wav"];
  var XFADE = 3.0; /* seconds of overlap between the two music tracks */
  var TICK_MS = 50;

  var pref = { on: true, music: 0.3, ambience: 0.16, panel: false };

  try {
    var saved = JSON.parse(localStorage.getItem(KEY) || "{}");
    if (typeof saved.on === "boolean") pref.on = saved.on;
    if (typeof saved.music === "number") pref.music = clamp01(saved.music);
    if (typeof saved.ambience === "number") pref.ambience = clamp01(saved.ambience);
    if (typeof saved.panel === "boolean") pref.panel = saved.panel;
  } catch (e) {
    /* storage unavailable — fall back to defaults */
  }

  function clamp01(v) {
    return Math.min(1, Math.max(0, v));
  }

  /* ---------------------------------------------------- sound effects ---- */

  var SFX_SRC = {
    click: "assets/click.wav",
    toggleOn: "assets/toggle_on.wav",
    toggleOff: "assets/toggle_off.wav",
    slide: "assets/slide_switch.wav",
    hover: "assets/hover_soft.wav",
    error: "assets/error_soft.wav",
  };
  var SFX_LEVEL = 0.5;

  var sfx = {};
  Object.keys(SFX_SRC).forEach(function (name) {
    var a = new Audio(SFX_SRC[name]);
    a.preload = "auto";
    sfx[name] = a;
  });

  function playSfx(name) {
    var a = sfx[name];
    if (!a) return;
    try {
      a.currentTime = 0;
      a.volume = SFX_LEVEL;
    } catch (e) {
      /* ignore */
    }
    var p = a.play();
    if (p && p.catch) p.catch(function () {});
  }

  /* ---------------------------------------------------------- music ----- */

  function makeAudio(src, loop) {
    var a = new Audio(src);
    a.loop = !!loop;
    a.preload = "auto";
    a.volume = 0;
    return a;
  }

  var deck = MUSIC_TRACKS.map(function (src) {
    return makeAudio(src, false);
  });
  /* The idle track is only fetched when the cross-fade actually reaches it,
     so the first page load does not pull both music files at once. */
  deck[1].preload = "metadata";
  var active = 0;
  var mix = [1, 0];
  var fading = false;

  var ambience = makeAudio("assets/ambience_rain.wav", true);

  var level = { music: 0, ambience: 0 };
  var target = { music: 0, ambience: 0 };
  var playing = false;

  /* Single engine loop drives every fade: it is much simpler (and more
     predictable) than juggling timers for each channel. */
  setInterval(function () {
    ["music", "ambience"].forEach(function (ch) {
      var d = target[ch] - level[ch];
      if (Math.abs(d) < 0.002) level[ch] = target[ch];
      else level[ch] += d * (d > 0 ? 0.022 : 0.2);
    });

    if (fading) {
      var step = 1 / ((1000 / TICK_MS) * XFADE);
      mix[active] = Math.min(1, mix[active] + step);
      mix[1 - active] = Math.max(0, mix[1 - active] - step);
      if (mix[1 - active] === 0 && mix[active] === 1) fading = false;
    }

    deck[0].volume = clamp01(pref.music * level.music * mix[0]);
    deck[1].volume = clamp01(pref.music * level.music * mix[1]);
    ambience.volume = clamp01(pref.ambience * level.ambience);

    var cur = deck[active];
    if (!fading && target.music > 0 && cur.duration && cur.currentTime >= cur.duration - XFADE) {
      swapTrack();
    }
  }, TICK_MS);

  function swapTrack() {
    var next = deck[1 - active];
    try {
      next.preload = "auto";
      next.load();
    } catch (e) {
      /* ignore */
    }
    tryPlay(next);
    active = 1 - active;
    fading = true;
  }

  function tryPlay(el) {
    try {
      var p = el.play();
      if (p && p.catch) p.catch(function () {});
      return p;
    } catch (e) {
      return null;
    }
  }

  function startAudio() {
    var p = tryPlay(deck[active]);
    tryPlay(ambience);
    target.music = 1;
    target.ambience = pref.ambience > 0 ? 1 : 0;

    var settled = p && p.then ? p : Promise.resolve();
    settled
      .then(function () {
        playing = true;
        paint();
      })
      .catch(function () {
        playing = false;
        paint();
        armResume();
      });
  }

  function stopAudio() {
    target.music = 0;
    target.ambience = 0;
    playing = false;
    paint();
    setTimeout(function () {
      deck.forEach(function (d) {
        if (d.paused) return;
        d.pause();
      });
      if (!ambience.paused) ambience.pause();
    }, 1200);
  }

  /* Browsers block autoplay until the visitor interacts. If that happens,
     start on the first gesture anywhere outside the audio dock. */
  function armResume() {
    function onFirst(e) {
      document.removeEventListener("pointerdown", onFirst, true);
      document.removeEventListener("keydown", onFirst, true);
      if (!pref.on || playing) return;
      if (e.target && e.target.closest && e.target.closest(".audio-dock")) return;
      startAudio();
    }
    document.addEventListener("pointerdown", onFirst, true);
    document.addEventListener("keydown", onFirst, true);
  }

  /* ----------------------------------------------------------- dock ----- */

  var dock = document.createElement("div");
  dock.className = "audio-dock";
  dock.innerHTML =
    '<div class="audio-panel" hidden>' +
    '<div class="audio-panel-title">Sound</div>' +
    '<label class="audio-chan"><span class="audio-chan-name">Music</span>' +
    '<input class="audio-slider" type="range" min="0" max="100" step="1" ' +
    'data-ch="music" aria-label="Music volume"></label>' +
    '<label class="audio-chan"><span class="audio-chan-name">Ambience</span>' +
    '<input class="audio-slider" type="range" min="0" max="100" step="1" ' +
    'data-ch="ambience" aria-label="Ambience volume"></label>' +
    '<div class="audio-panel-title">Voice note</div>' +
    '<div class="voice">' +
    '<button class="voice-btn" type="button">&#9679; Record</button>' +
    '<span class="voice-time">00:00</span>' +
    "</div>" +
    '<audio class="voice-player" controls preload="none"></audio>' +
    '<div class="voice-actions">' +
    '<a class="voice-dl" download="voice-note.webm" aria-disabled="true">Download</a>' +
    '<button class="voice-clear" type="button">Clear</button>' +
    "</div>" +
    '<p class="voice-note"></p>' +
    "</div>" +
    '<button class="audio-toggle" type="button" aria-pressed="false" ' +
    'aria-label="Play background music">&#9835;</button>' +
    '<button class="audio-panel-btn" type="button" aria-expanded="false" ' +
    'aria-label="Sound settings">&#8942;</button>';

  var btn = dock.querySelector(".audio-toggle");
  var panelBtn = dock.querySelector(".audio-panel-btn");
  var panel = dock.querySelector(".audio-panel");
  var musicSlider = dock.querySelector('[data-ch="music"]');
  var ambSlider = dock.querySelector('[data-ch="ambience"]');
  var recBtn = dock.querySelector(".voice-btn");
  var recTime = dock.querySelector(".voice-time");
  var recPlayer = dock.querySelector(".voice-player");
  var recDl = dock.querySelector(".voice-dl");
  var recClear = dock.querySelector(".voice-clear");
  var recNote = dock.querySelector(".voice-note");

  musicSlider.value = String(Math.round(pref.music * 100));
  ambSlider.value = String(Math.round(pref.ambience * 100));

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(pref));
    } catch (e) {
      /* ignore */
    }
  }

  function paint() {
    btn.classList.toggle("playing", playing);
    btn.setAttribute("aria-pressed", playing ? "true" : "false");
    btn.setAttribute(
      "aria-label",
      playing ? "Pause background music" : "Play background music",
    );
    btn.innerHTML = playing ? "&#10074;&#10074;" : "&#9835;";
  }

  function setPanel(open) {
    pref.panel = open;
    save();
    panel.hidden = !open;
    dock.classList.toggle("open", open);
    panelBtn.setAttribute("aria-expanded", open ? "true" : "false");
    document.querySelectorAll("[data-audio-panel-toggle]").forEach(function (button) {
      button.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  btn.addEventListener("click", function () {
    var wantOn = !(pref.on && playing);
    pref.on = wantOn;
    save();
    if (wantOn) {
      playSfx("toggleOn");
      startAudio();
    } else {
      playSfx("toggleOff");
      stopAudio();
    }
  });

  panelBtn.addEventListener("click", function () {
    if (panel.hidden) playSfx("toggleOn");
    else playSfx("toggleOff");
    setPanel(panel.hidden);
  });

  document.querySelectorAll("[data-audio-panel-toggle]").forEach(function (button) {
    button.addEventListener("click", function () {
      if (panel.hidden) playSfx("toggleOn");
      else playSfx("toggleOff");
      setPanel(panel.hidden);
    });
  });

  musicSlider.addEventListener("input", function () {
    pref.music = clamp01(Number(musicSlider.value) / 100);
    save();
    if (pref.music > 0 && !playing) {
      pref.on = true;
      save();
      startAudio();
    }
  });

  ambSlider.addEventListener("input", function () {
    pref.ambience = clamp01(Number(ambSlider.value) / 100);
    save();
    target.ambience = pref.ambience > 0 ? 1 : 0;
    if (pref.ambience > 0) {
      if (!playing && pref.on) startAudio();
      else if (playing && ambience.paused) tryPlay(ambience);
    }
  });

  /* ------------------------------------------------------ voice note ---- */

  var recorder = null;
  var chunks = [];
  var recording = false;
  var startedAt = 0;
  var timerId = null;
  var blobUrl = null;

  function two(n) {
    return ("0" + n).slice(-2);
  }

  function elapsed() {
    var s = Math.floor((Date.now() - startedAt) / 1000);
    return two(Math.floor(s / 60)) + ":" + two(s % 60);
  }

  function note(msg) {
    recNote.textContent = msg || "";
  }

  function setRecording(on) {
    recording = on;
    recBtn.classList.toggle("recording", on);
    recBtn.innerHTML = on ? "&#9632; Stop" : "&#9679; Record";
    if (on) {
      startedAt = Date.now();
      recTime.textContent = "00:00";
      timerId = setInterval(function () {
        recTime.textContent = elapsed();
      }, 250);
    } else if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function pickMime() {
    if (typeof MediaRecorder === "undefined" || !MediaRecorder.isTypeSupported) return "";
    var list = [
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/ogg;codecs=opus",
      "audio/mp4",
    ];
    for (var i = 0; i < list.length; i++) {
      if (MediaRecorder.isTypeSupported(list[i])) return list[i];
    }
    return "";
  }

  function extFor(type) {
    if (type.indexOf("mp4") > -1) return "m4a";
    if (type.indexOf("ogg") > -1) return "ogg";
    return "webm";
  }

  function startRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      note("Voice recording needs https:// or localhost.");
      playSfx("error");
      return;
    }
    note("");
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        chunks = [];
        var mime = pickMime();
        try {
          recorder = mime
            ? new MediaRecorder(stream, { mimeType: mime })
            : new MediaRecorder(stream);
        } catch (e) {
          recorder = new MediaRecorder(stream);
        }

        recorder.addEventListener("dataavailable", function (e) {
          if (e.data && e.data.size) chunks.push(e.data);
        });

        recorder.addEventListener("stop", function () {
          stream.getTracks().forEach(function (tr) {
            tr.stop();
          });
          var type = (recorder && recorder.mimeType) || "audio/webm";
          if (blobUrl) URL.revokeObjectURL(blobUrl);
          blobUrl = URL.createObjectURL(new Blob(chunks, { type: type }));
          recPlayer.src = blobUrl;
          recDl.href = blobUrl;
          recDl.download = "voice-note." + extFor(type);
          recDl.removeAttribute("aria-disabled");
          note("");
        });

        recorder.start();
        setRecording(true);
        playSfx("toggleOn");
      })
      .catch(function () {
        setRecording(false);
        note("Microphone access was denied.");
        playSfx("error");
      });
  }

  function stopRecording() {
    if (recorder && recorder.state !== "inactive") recorder.stop();
    setRecording(false);
    playSfx("toggleOff");
  }

  recBtn.addEventListener("click", function () {
    if (recording) stopRecording();
    else startRecording();
  });

  recClear.addEventListener("click", function () {
    if (recording) stopRecording();
    if (blobUrl) {
      URL.revokeObjectURL(blobUrl);
      blobUrl = null;
    }
    recPlayer.removeAttribute("src");
    recPlayer.load();
    recDl.removeAttribute("href");
    recDl.setAttribute("aria-disabled", "true");
    recTime.textContent = "00:00";
    note("");
    playSfx("click");
  });

  /* --------------------------------------------------- generic hooks ---- */

  document.addEventListener("click", function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    if (t.closest(".audio-dock") || t.closest(".slider-nav")) return;
    if (!t.closest("a, button")) return;
    playSfx("click");
  });

  document.querySelectorAll(".slider-nav button").forEach(function (b) {
    b.addEventListener("click", function () {
      playSfx("slide");
    });
  });

  document.querySelectorAll("nav a, .rail-link, .btn, .icon-btn").forEach(function (el) {
    el.addEventListener("mouseenter", function () {
      playSfx("hover");
    });
  });

  /* ------------------------------------------------------------ init ---- */

  function init() {
    document.body.appendChild(dock);
    setPanel(pref.panel);
    paint();
    if (pref.on) startAudio();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
