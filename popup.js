const platforms = ["youtube", "instagram", "facebook"];

chrome.storage.local.get({
    enabled_youtube: true,
    enabled_instagram: true,
    enabled_facebook: true,
    speed: 1,
    counter: 0,
    voice_enabled: false,
    trigger_word: "computer",
    voice_lang: "el-GR",
}, (res) => {
    for (const p of platforms) {
        document.getElementById(`tog-${p}`).checked = res[`enabled_${p}`];
    }
    setActiveSpeed(res.speed);
    document.getElementById("counter").textContent = res.counter;

    document.getElementById("tog-voice").checked   = res.voice_enabled;
    document.getElementById("voice-lang").value    = res.voice_lang;
    if (res.voice_enabled) setVoiceStatus("ok");
});

// Platform toggles
for (const p of platforms) {
    document.getElementById(`tog-${p}`).addEventListener("change", (e) => {
        chrome.storage.local.set({ [`enabled_${p}`]: e.target.checked });
    });
}

// Speed buttons
for (const btn of document.querySelectorAll(".speed-btn")) {
    btn.addEventListener("click", () => {
        const speed = parseFloat(btn.dataset.speed);
        chrome.storage.local.set({ speed });
        setActiveSpeed(speed);
    });
}

function setActiveSpeed(speed) {
    for (const btn of document.querySelectorAll(".speed-btn")) {
        btn.classList.toggle("active", parseFloat(btn.dataset.speed) === speed);
    }
}

// Counter reset
document.getElementById("reset").addEventListener("click", () => {
    chrome.storage.local.set({ counter: 0 });
    document.getElementById("counter").textContent = "0";
});

chrome.storage.onChanged.addListener((changes) => {
    if (changes.counter) {
        document.getElementById("counter").textContent = changes.counter.newValue;
    }
});

// ── Voice settings ──────────────────────────────────────────────────────────

document.getElementById("tog-voice").addEventListener("change", (e) => {
    const on = e.target.checked;
    chrome.storage.local.set({ voice_enabled: on });
    setVoiceStatus(on ? "ok" : "");
});

document.getElementById("voice-lang").addEventListener("change", (e) => {
    chrome.storage.local.set({ voice_lang: e.target.value });
});

function setVoiceStatus(state, msg = "") {
    const el = document.getElementById("voice-status");
    el.className = "voice-status" + (state === "ok" ? " ok" : state === "err" ? " err" : "");
    el.textContent = state === "ok" ? "🎙 Ενεργό — αν δεν ξεκινά, κλικ στη σελίδα" : msg;
}

