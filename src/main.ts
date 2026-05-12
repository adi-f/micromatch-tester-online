import "./style.css";
import { checkMatch } from "./checker";
const inputEl = document.getElementById("input") as HTMLInputElement;
const patternEl = document.getElementById("pattern") as HTMLInputElement;
const resultEl = document.getElementById("result") as HTMLDivElement;
function renderResult(): void {
  const input = inputEl.value;
  const pattern = patternEl.value;
  const result = checkMatch(input, pattern);
  resultEl.className = "result";
  resultEl.innerHTML = "";
  switch (result.state) {
    case "empty": {
      resultEl.classList.add("result--empty");
      resultEl.innerHTML = '<span class="result-placeholder">Enter an input and a pattern …</span>';
      break;
    }
    case "match": {
      resultEl.classList.add("result--match");
      resultEl.innerHTML = '<span class="result-icon">✔</span><span>Match</span>';
      break;
    }
    case "no-match": {
      resultEl.classList.add("result--no-match");
      resultEl.innerHTML = '<span class="result-icon">✘</span><span>Kein Match</span>';
      break;
    }
    case "error": {
      resultEl.classList.add("result--error");
      resultEl.innerHTML = `<span class="result-icon">⚠</span><span>Fehler: ${escapeHtml(result.message)}</span>`;
      break;
    }
  }
}
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
inputEl.addEventListener("input", renderResult);
patternEl.addEventListener("input", renderResult);
renderResult();
