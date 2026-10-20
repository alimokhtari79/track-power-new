# Trak Power Project Development Guide

This project is a static, multi-page Persian website built with HTML, Tailwind CSS v4.3.3, and Vanilla JavaScript. Before making any changes, inspect the existing files and patterns, and keep the scope of changes limited to the current task.

## Key Paths

- `index.html`: Main page.
- `pages/`: Public pages, dashboard pages, and checkout flow pages.
- `src/styles/input.css`: Tailwind CSS source and custom CSS.
- `dist/output.css`: Generated CSS output; do not edit directly.
- `src/js/`: Vanilla JavaScript files.
- `assets/fonts/`, `assets/icons/`, `assets/images/`: Local assets.
- `package.json` and `package-lock.json`: Project scripts and recorded dependencies.
- `docs/`: Project documentation.

## Development Rules

- Use the existing HTML, Tailwind CSS v4, and Vanilla JavaScript stack. Do not introduce a new framework or dependency unless explicitly requested or justified by a confirmed requirement.
- Reuse existing design tokens, custom utilities, and recurring patterns. Do not invent new conventions solely for visual consistency.
- Preserve the design and functionality of pages outside the scope of the current task.
- Keep Persian pages right-to-left (RTL) and responsive. When modifying HTML, check `lang`, `dir`, and direction-dependent classes.
- Make CSS changes in `src/styles/input.css` or the appropriate source file. `dist/output.css` is generated output and must not be edited directly.
- Use only the project's established scripts. `npm run dev` starts Tailwind CSS in watch mode and may modify `dist/output.css`; do not run it unless needed. `npm run format:tailwind` formats the entire project and should only be run when its scope is appropriate. The `test` script does not run actual tests.
- When creating or moving files, verify the relative paths for CSS, JavaScript, images, icons, and fonts from the location of each HTML file.
- After modifying JavaScript, verify the relevant interactions. After changing paths, verify links and asset loading.
- Preserve the user's existing changes. Do not delete, overwrite, or reset files or unrelated work.
- If a task changes the file structure, dependencies, project scripts, or development conventions, update the relevant documentation in `docs/` and, when necessary, this `AGENTS.md` file. Avoid modifying unrelated documentation.
- In the final report, accurately list the modified files, checks performed, their results, and any limitations of the verification process. Do not claim that a check or test was run if it was not.
