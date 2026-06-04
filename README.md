# Auto YouTube Shorts Next Clicker

A lightweight browser console script that automatically clicks the **Next** button when a YouTube Short ends — no extensions, no installs, just paste and go.

## How It Works

The script listens for the `ended` event on the `<video>` element. When a Short finishes playing, it finds the next-navigation button (`#navigation-button-down` or any button with an `aria-label` containing "Next") and clicks it automatically.

## Usage

1. Open [YouTube Shorts](https://www.youtube.com/shorts) in your browser.
2. Open the browser console:
   - **Chrome / Edge:** `F12` → Console tab
   - **Firefox:** `F12` → Console tab
3. Paste the contents of [click-next-script.js](click-next-script.js) and press **Enter**.
4. Play any Short — it will auto-advance when it ends.

> The script stays active until you close or refresh the tab.

## Bookmarklet (optional)

Paste this as the URL of a new bookmark for one-click activation:

```
javascript:(function(){const v=document.querySelector("video");v.addEventListener("ended",()=>{const btn=document.querySelector("#navigation-button-down button")||document.querySelector('[aria-label*="Next"]');if(btn)btn.click();});})();
```

## Browser Compatibility

| Browser | Supported |
|---------|-----------|
| Chrome  | ✓         |
| Edge    | ✓         |
| Firefox | ✓         |
| Safari  | ✓         |

## Limitations

- Must be re-run after a page refresh (it is not a persistent extension).
- YouTube UI changes may break the button selector — open an issue if it stops working.

## License

[MIT](LICENSE)
