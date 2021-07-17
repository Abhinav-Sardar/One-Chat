export const constants = {
  appAccentColor: localStorage.getItem("one-chat-accent-color") || "#bd14ca",
};

export function accentColorChecker(): void {
  if (!localStorage.getItem("one-chat-accent-color")) {
    localStorage.setItem("one-chat-accent-color", "#bd14ca");
  }
}
