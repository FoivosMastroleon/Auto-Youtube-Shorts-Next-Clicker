const v = document.querySelector("video");

v.addEventListener("ended", () => {
    console.log("Short ended");

    const btn =
        document.querySelector("#navigation-button-down button") ||
        document.querySelector('[aria-label*="Next"]');

    if (btn) {
        console.log("Clicking next");
        btn.click();
    } else {
        console.log("Next button not found");
    }
});