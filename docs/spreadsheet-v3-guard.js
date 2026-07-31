/* Small interaction guard for the Phase 3 spreadsheet grid. */
(() => {
  document.addEventListener("pointerenter", (event) => {
    if (!event.target?.matches?.("#excel-entry-grid [data-excel-cell]")) return;
    if (event.buttons === 0) event.stopImmediatePropagation();
  }, true);
})();
