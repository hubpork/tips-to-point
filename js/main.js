// in use
// 1. close pop up info

(function () {
    const details = document.querySelector("details");
    details.addEventListener("toggle", (event) => {
        if (details.open) {
            document.addEventListener("keydown", handleEscClose);
        }
    });
    function handleEscClose(event) {
        if (event.key === "Escape") {
            details.open = false; // Programmatically close the details element
        }
    }
})();
  