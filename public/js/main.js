(function() {
    "use strict";

    // --- DOM Elements ---
    const tweetUrlInput = document.getElementById("tweet-url");
    const clearBtn = document.getElementById("clear-btn");
    const pasteBtn = document.getElementById("paste-btn");
    const downloadBtn = document.getElementById("download-btn");
    const progressContainer = document.getElementById("progress-container");
    const progressPct = document.getElementById("progress-pct");
    const progressStatus = document.getElementById("progress-status");
    const progressBar = document.getElementById("progress-bar");
    const errorCard = document.getElementById("error-card");
    const errorMsg = document.getElementById("error-msg");
    const loadingCard = document.getElementById("loading-card");
    const toolResultInject = document.getElementById("tool-result-inject");
    const scrollToTopBtn = document.getElementById("scroll-to-top");
    const navCtaBtn = document.getElementById("nav-cta");
    const ctaStartBtn = document.getElementById("cta-start-btn");

    const API_URL = 'https://twittergifapi.techiesline.workers.dev';
    const TWITTER_URL_REGEX = /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/.+\/status\/\d+/i;

    // --- Helper Functions ---
    function isValidTwitterUrl(url) {
        return TWITTER_URL_REGEX.test(url.trim());
    }

    function showStatus(type, message = "") {
        errorCard.classList.add("hidden");
        loadingCard.classList.add("hidden");
        toolResultInject.classList.add("hidden");

        if (type === "error") {
            errorMsg.textContent = message;
            errorCard.classList.remove("hidden");
        } else if (type === "loading") {
            loadingCard.classList.remove("hidden");
        } else if (type === "result") {
            toolResultInject.classList.remove("hidden");
        }
    }

    function updateInputButtons() {
        if (tweetUrlInput.value.trim().length > 0) {
            clearBtn.classList.remove("hidden");
            pasteBtn.classList.add("hidden");
        } else {
            clearBtn.classList.add("hidden");
            pasteBtn.classList.remove("hidden");
        }
    }

    // --- Clipboard Paste Handler ---
    if (pasteBtn) {
        pasteBtn.addEventListener("click", async function() {
            try {
                const text = await navigator.clipboard.readText();
                tweetUrlInput.value = text;
                updateInputButtons();
            } catch (err) {
                showStatus("error", "Unable to read clipboard. Please paste manually.");
            }
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener("click", function() {
            tweetUrlInput.value = "";
            updateInputButtons();
            showStatus("idle");
        });
    }

    tweetUrlInput.addEventListener("input", updateInputButtons);

    // --- Media Fetching Logic ---
    async function handleDownload() {
        const url = tweetUrlInput.value.trim();
        if (!url) {
            showStatus("error", "Please paste a Twitter or X URL");
            return;
        }

        if (!isValidTwitterUrl(url)) {
            showStatus("error", "Invalid URL. Please paste a valid Twitter/X tweet URL.");
            return;
        }

        showStatus("loading");

        try {
            const formData = new FormData();
            formData.append('url', url);

            const res = await fetch(API_URL, {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                throw new Error("HTTP error " + res.status);
            }

            const data = await res.json();

            if (data.error) {
                showStatus("error", data.error);
                return;
            }

            if (!data.videos || data.videos.length === 0) {
                showStatus("error", "No GIF found in this tweet.");
                return;
            }

            renderResult(data);
            showStatus("result");
        } catch (err) {
            showStatus("error", "Failed to fetch. Please check your connection and try again.");
        }
    }

    downloadBtn.addEventListener("click", handleDownload);
    tweetUrlInput.addEventListener("keydown", function(e) {
        if (e.key === 'Enter') {
            handleDownload();
        }
    });

    // --- Render Tool Result (Replicating SoundCloud Track Card layout) ---
    function renderResult(result) {
        let videoCardsHtml = '';
        if (result.videos && result.videos.length > 0) {
            result.videos.forEach((video, idx) => {
                videoCardsHtml += `
                    <div class="flex flex-col gap-2 w-full pt-3 border-t border-slate-100">
                        <div class="format-select-wrapper w-full flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 h-[42px]">
                            <span class="format-label text-[10px] font-bold text-slate-400 uppercase">Resolution</span>
                            <span class="text-xs font-bold text-slate-700">${video.resolution}</span>
                        </div>
                        <div class="grid grid-cols-2 gap-2.5 w-full">
                            <button
                                class="gif-dl-btn start-download-btn h-[42px] bg-slate-800 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-[#1DA1F2] active:scale-[0.98] transition-all"
                                data-source="${video.source_url}"
                            >
                                <svg class="w-4 h-4 dl-gif-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                <span>Download GIF</span>
                            </button>

                            <a
                                href="${video.download_url}"
                                download="twitter-gif.mp4"
                                class="start-download-btn h-[42px] bg-slate-800 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-[#1DA1F2] active:scale-[0.98] transition-all"
                            >
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M23 7a2 2 0 0 0-2.45-1.45L16 7V5a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2l4.55 1.45A2 2 0 0 0 23 17V7z"></path></svg>
                                <span>Download MP4</span>
                            </a>
                        </div>
                    </div>
                `;
            });
        }

        toolResultInject.innerHTML = `
            <div class="track-card flex flex-col md:flex-row bg-white/90 backdrop-blur-md border border-indigo-150 rounded-[28px] p-6 gap-6 shadow-xl shadow-indigo-100/40">
                ${result.thumbnail ? `
                <div class="card-left w-full md:w-[140px] h-[140px] rounded-2xl overflow-hidden relative flex-shrink-0 bg-slate-100">
                    <img
                        src="${result.thumbnail}"
                        alt="${result.title || 'Twitter GIF preview'}"
                        class="track-artwork w-full h-full object-cover"
                    />
                </div>
                ` : ''}

                <div class="card-right flex-grow flex flex-col justify-between min-w-0">
                    <div class="mb-4">
                        <span class="track-genre-tag inline-block text-[10px] font-bold text-[#1DA1F2] bg-[#e8f5fe] border border-[#1DA1F2]/15 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                            GIF
                        </span>
                        <h3 class="track-title-text text-lg font-bold text-slate-800 leading-tight truncate mb-1">
                            ${result.title || 'Twitter GIF'}
                        </h3>
                        <p class="track-artist-text text-xs text-slate-400 font-bold">
                            Source: <span class="text-slate-650">Twitter / X</span>
                        </p>
                    </div>

                    <div class="space-y-4">
                        ${videoCardsHtml}
                    </div>

                    <button
                        id="dl-another-btn"
                        class="mt-4 w-full text-center text-xs text-slate-400 hover:text-slate-600 font-bold py-2 transition-colors"
                    >
                        Download another GIF →
                    </button>
                </div>
            </div>
        `;

        // Wire up GIF conversion buttons
        const gifButtons = toolResultInject.querySelectorAll(".gif-dl-btn");
        gifButtons.forEach(btn => {
            btn.addEventListener("click", function() {
                const sourceUrl = btn.getAttribute("data-source");
                handleGifDownload(sourceUrl, btn);
            });
        });

        // Wire up "Download another GIF" button
        document.getElementById("dl-another-btn").addEventListener("click", function() {
            tweetUrlInput.value = "";
            updateInputButtons();
            showStatus("idle");
            errorCard.classList.add("hidden");
            toolResultInject.classList.add("hidden");
        });
    }

    // --- Browser-based GIF Conversion (gif.js via canvas, no SharedArrayBuffer needed) ---
    async function handleGifDownload(sourceUrl, buttonElement) {
        buttonElement.disabled = true;
        const origContent = buttonElement.innerHTML;
        buttonElement.innerHTML = `
            <svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
            <span>Converting...</span>
        `;

        progressContainer.classList.remove("hidden");
        updateProgress(5, "Preparing GIF conversion...");

        try {
            // Step 1: Load gif.js library
            updateProgress(10, "Loading GIF encoder...");
            await loadScript("https://cdn.jsdelivr.net/npm/gif.js@0.2.0/dist/gif.js");

            // Step 2: Fetch the gif.js worker as a Blob (avoids cross-origin worker restriction)
            updateProgress(18, "Loading encoder worker...");
            const workerResp = await fetch("https://cdn.jsdelivr.net/npm/gif.js@0.2.0/dist/gif.worker.js");
            const workerBlob = await workerResp.blob();
            const workerBlobUrl = URL.createObjectURL(workerBlob);

            // Step 3: Load video via proxy into a hidden <video> element
            updateProgress(28, "Downloading video source...");
            const proxyUrl = `${API_URL}/?download=${encodeURIComponent(sourceUrl)}`;

            const videoBlob = await fetch(proxyUrl).then(r => r.blob());
            const videoBlobUrl = URL.createObjectURL(videoBlob);

            const video = document.createElement("video");
            video.src = videoBlobUrl;
            video.muted = true;
            video.crossOrigin = "anonymous";
            video.style.display = "none";
            document.body.appendChild(video);

            // Wait for video metadata
            await new Promise((resolve, reject) => {
                video.onloadedmetadata = resolve;
                video.onerror = reject;
                video.load();
            });

            const duration  = video.duration;
            const FPS       = 12;
            const interval  = 1 / FPS;
            const maxFrames = Math.min(Math.ceil(duration * FPS), 120); // cap at 120 frames
            const W         = Math.min(video.videoWidth,  480);
            const H         = Math.round(video.videoHeight * (W / video.videoWidth));

            // Step 4: Set up canvas
            const canvas  = document.createElement("canvas");
            canvas.width  = W;
            canvas.height = H;
            const ctx = canvas.getContext("2d");

            // Step 5: Set up gif.js
            const gif = new GIF({ // eslint-disable-line no-undef
                workers:      2,
                quality:      8,
                width:        W,
                height:       H,
                workerScript: workerBlobUrl,
                repeat:       0
            });

            // Step 6: Capture frames by seeking through video
            updateProgress(35, "Capturing frames...");
            for (let i = 0; i < maxFrames; i++) {
                const seekTime = i * interval;
                await seekVideo(video, seekTime);
                ctx.drawImage(video, 0, 0, W, H);
                gif.addFrame(ctx, { copy: true, delay: Math.round(1000 / FPS) });

                const pct = 35 + Math.round((i / maxFrames) * 45);
                updateProgress(pct, `Capturing frame ${i + 1} of ${maxFrames}...`);
            }

            // Step 7: Render GIF
            updateProgress(82, "Encoding GIF...");
            const gifBlob = await new Promise((resolve, reject) => {
                gif.on("finished", resolve);
                gif.on("error",    reject);
                gif.render();
            });

            // Step 8: Download
            updateProgress(97, "Preparing download...");
            const downloadUrl = URL.createObjectURL(gifBlob);
            const link = document.createElement("a");
            link.href     = downloadUrl;
            link.download = "twitter.gif";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Cleanup
            URL.revokeObjectURL(downloadUrl);
            URL.revokeObjectURL(videoBlobUrl);
            URL.revokeObjectURL(workerBlobUrl);
            document.body.removeChild(video);

            updateProgress(100, "GIF downloaded!");
            setTimeout(() => progressContainer.classList.add("hidden"), 3000);

        } catch (err) {
            console.error("GIF Conversion Error:", err);
            showStatus("error", "Conversion failed. Please try downloading the MP4 instead.");
            progressContainer.classList.add("hidden");
        } finally {
            buttonElement.disabled  = false;
            buttonElement.innerHTML = origContent;
        }
    }

    /** Seek a video element to a specific time, returns a Promise */
    function seekVideo(video, time) {
        return new Promise(resolve => {
            const onSeeked = () => { video.removeEventListener("seeked", onSeeked); resolve(); };
            video.addEventListener("seeked", onSeeked);
            video.currentTime = time;
        });
    }

    /** Dynamically load an external script once */
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) return resolve();
            const s = document.createElement("script");
            s.src = src;
            s.onload  = resolve;
            s.onerror = reject;
            document.head.appendChild(s);
        });
    }

    function updateProgress(pct, status) {
        progressPct.textContent = pct;
        progressStatus.textContent = status;
        progressBar.style.width = `${pct}%`;
    }

    // --- FAQ Accordions (scrollHeight) ---
    const faqToggles = document.querySelectorAll(".faq-toggle");
    faqToggles.forEach(toggle => {
        toggle.addEventListener("click", function() {
            const item = toggle.closest(".faq-item");
            const panel = item.querySelector(".faq-panel");
            const icon = item.querySelector(".faq-icon");
            const wrapper = item.querySelector(".faq-icon-wrapper");

            const isExpanded = toggle.getAttribute("aria-expanded") === "true";
            
            // Close all other panels first
            document.querySelectorAll(".faq-item").forEach(otherItem => {
                if (otherItem !== item) {
                    const otherToggle = otherItem.querySelector(".faq-toggle");
                    const otherPanel = otherItem.querySelector(".faq-panel");
                    const otherIcon = otherItem.querySelector(".faq-icon");
                    const otherWrapper = otherItem.querySelector(".faq-icon-wrapper");

                    otherToggle.setAttribute("aria-expanded", "false");
                    otherPanel.style.maxHeight = "0px";
                    otherIcon.classList.remove("rotate-180");
                    otherWrapper.classList.remove("bg-primary", "text-white");
                    otherWrapper.classList.add("bg-slate-50", "text-slate-400");
                }
            });

            // Toggle state
            toggle.setAttribute("aria-expanded", !isExpanded ? "true" : "false");
            if (!isExpanded) {
                panel.style.maxHeight = panel.scrollHeight + "px";
                icon.classList.add("rotate-180");
                wrapper.classList.add("bg-primary", "text-white");
                wrapper.classList.remove("bg-slate-50", "text-slate-400");
            } else {
                panel.style.maxHeight = "0px";
                icon.classList.remove("rotate-180");
                wrapper.classList.remove("bg-primary", "text-white");
                wrapper.classList.add("bg-slate-50", "text-slate-400");
            }
        });
    });

    // --- Scroll-to-Top Button & Hero Smooth Scrolls ---
    function checkScroll() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.remove("opacity-0", "pointer-events-none");
            scrollToTopBtn.classList.add("opacity-100");
        } else {
            scrollToTopBtn.classList.remove("opacity-100");
            scrollToTopBtn.classList.add("opacity-0", "pointer-events-none");
        }
    }

    window.addEventListener("scroll", checkScroll);

    scrollToTopBtn.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const scrollToInput = function(e) {
        e.preventDefault();
        tweetUrlInput.focus();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (navCtaBtn) navCtaBtn.addEventListener("click", scrollToInput);
    if (ctaStartBtn) ctaStartBtn.addEventListener("click", scrollToInput);

    // --- Contact Formspree Submissions ---
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", async function(e) {
            e.preventDefault();
            const btn = contactForm.querySelector("button[type='submit']");
            const btnText = btn.querySelector(".btn-text");
            const btnIcon = btn.querySelector(".btn-icon");
            const formError = document.getElementById("form-error");

            btn.disabled = true;
            formError.classList.add("hidden");

            const origIconHtml = btnIcon.outerHTML;
            btnIcon.outerHTML = `
                <svg class="w-5 h-5 animate-spin btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
            `;
            btnText.textContent = "Sending...";

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch("https://formspree.io/f/mbdwzwgw", {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    const formContainer = document.getElementById("contact-form-container");
                    formContainer.innerHTML = `
                        <div class="contact-success-card p-12 text-center bg-white border border-slate-100 rounded-[28px] shadow-2xl shadow-indigo-100/40 animate-in fade-in zoom-in duration-500">
                            <div class="success-icon-wrapper inline-flex items-center justify-center p-4 rounded-full bg-green-50 text-green-500 mb-6">
                                <svg class="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            </div>
                            <h3 class="success-title text-3xl font-bold text-slate-800 mb-4">Message Sent!</h3>
                            <p class="success-message text-slate-500 mb-8 font-medium">Thank you for reaching out. We will get back to you shortly.</p>
                            <button 
                                id="send-another-msg-btn"
                                class="back-btn px-8 py-3.5 rounded-full bg-slate-50 border border-slate-100 text-slate-700 hover:bg-slate-100 transition-colors font-bold text-sm"
                            >
                                Send Another Message
                            </button>
                        </div>
                    `;

                    document.getElementById("send-another-msg-btn").addEventListener("click", function() {
                        window.location.reload();
                    });
                } else {
                    throw new Error("Formspree response not ok");
                }
            } catch (err) {
                console.error("Formspree submission error:", err);
                formError.classList.remove("hidden");
                // restore button
                btn.disabled = false;
                const newSpinner = contactForm.querySelector(".btn-icon");
                newSpinner.outerHTML = origIconHtml;
                btnText.textContent = "Send Message";
            }
        });
    }

})();
